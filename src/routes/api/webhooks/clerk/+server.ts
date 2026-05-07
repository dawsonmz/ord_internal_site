import { type RequestHandler, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const REPLAY_TOLERANCE_SECONDS = 5 * 60;
const CACHE_KEY = 'users:all';
const INVALIDATING_EVENTS = new Set(['user.created', 'user.updated', 'user.deleted']);

export const POST: RequestHandler = async ({ request, platform }) => {
  const secret = env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    console.error('CLERK_WEBHOOK_SECRET is not configured');
    error(500, 'Webhook secret not configured');
  }

  const svixId = request.headers.get('svix-id');
  const svixTimestamp = request.headers.get('svix-timestamp');
  const svixSignature = request.headers.get('svix-signature');
  if (!svixId || !svixTimestamp || !svixSignature) {
    error(401, 'Missing Svix headers');
  }

  const timestamp = parseInt(svixTimestamp, 10);
  if (isNaN(timestamp)) {
    error(401, 'Invalid Svix timestamp');
  }
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - timestamp) > REPLAY_TOLERANCE_SECONDS) {
    error(401, 'Webhook timestamp out of tolerance');
  }

  const rawBody = await request.text();
  const isValid = await verifySignature(secret, svixId, svixTimestamp, rawBody, svixSignature);
  if (!isValid) {
    error(401, 'Invalid Svix signature');
  }

  let event: { type?: string };
  try {
    event = JSON.parse(rawBody);
  } catch {
    error(400, 'Invalid JSON body');
  }

  if (event.type && INVALIDATING_EVENTS.has(event.type)) {
    const cache = platform?.env.USERS_CACHE;
    if (!cache) {
      console.error('USERS_CACHE binding not available');
      error(500, 'KV binding not available');
    }
    await cache.delete(CACHE_KEY);
  }

  return new Response(null, { status: 200 });
};

async function verifySignature(
    secret: string,
    svixId: string,
    svixTimestamp: string,
    rawBody: string,
    signatureHeader: string,
): Promise<boolean> {
  const secretBytes = decodeBase64(secret.replace(/^whsec_/, ''));

  const key = await crypto.subtle.importKey(
      'raw',
      secretBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
  );

  const signedContent = `${svixId}.${svixTimestamp}.${rawBody}`;
  const computedSignature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(signedContent),
  );
  const expected = encodeBase64(new Uint8Array(computedSignature));

  for (const entry of signatureHeader.split(' ')) {
    const [version, sig] = entry.split(',');
    if (version !== 'v1' || !sig) continue;
    if (timingSafeEqual(expected, sig)) return true;
  }
  return false;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function decodeBase64(s: string): Uint8Array<ArrayBuffer> {
  const binary = atob(s);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function encodeBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
