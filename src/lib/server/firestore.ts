import { error } from '@sveltejs/kit';
import jwt from '@tsndr/cloudflare-worker-jwt';
import { env } from '$env/dynamic/private';

const GOOGLE_OAUTH_URL = 'https://oauth2.googleapis.com/token';
const ACCESS_TOKEN_VALID_FOR_SECONDS = 3600;
const CACHE_EXPIRY_MARGIN = 120;

const FIRESTORE_PROJECT_ID = 'planar-ember-470822-n7';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/(default)/documents`;

export interface CollectionAndDocument {
  collection: string,
  document_id: string,
}

export interface FieldUpdate {
  field: string,
  value: any,
}

function resourcePath(path: CollectionAndDocument[]): string {
  if (!path.length) {
    return FIRESTORE_BASE;
  }
  return `${FIRESTORE_BASE}/${path.map(pair => `${pair.collection}/${pair.document_id}`).join('/')}`;
}

export async function getDocument(path: CollectionAndDocument[]): Promise<any | null> {
  const accessToken = await getAccessToken();
  if (!path.length) {
    error(500, `Internal error: empty Firestore path queried`);
  }

  const response = await fetch(
      resourcePath(path),
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      },
  );
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    error(500, `Firestore error: ${await response.text()}`);
  }
  return await response.json();
}

export async function getDocuments(path: CollectionAndDocument[], collection: string): Promise<any[]> {
  const accessToken = await getAccessToken();
  const documents: any[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${resourcePath(path)}/${collection}`);
    if (pageToken) {
      url.searchParams.set('pageToken', pageToken);
    }

    const response = await fetch(
        url.toString(),
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        },
    );

    if (response.status == 404) {
      return documents;
    }
    if (!response.ok) {
      error(500, `Firestore error: ${await response.text()}`);
    }
    
    const result = await response.json();
    documents.push(...(result.documents ?? []));
    pageToken = result.nextPageToken;
  } while (pageToken);

  return documents;
}

export async function getCollectionGroupDocuments(collectionId: string): Promise<any[]> {
  const accessToken = await getAccessToken();

  const structuredQuery = {
    from: [{ collectionId, allDescendants: true }],
  };
  const response = await fetch(
      `${FIRESTORE_BASE}:runQuery`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ structuredQuery }),
      },
  );

  if (!response.ok) {
    error(500, `Firestore error: ${await response.text()}`);
  }

  const results: any[] = await response.json();
  return results.filter(r => r.document).map(r => r.document);
}

export async function createDocument(
    path: CollectionAndDocument[],
    collection: string,
    body: any,
    documentId?: string,
): Promise<any> {
  const accessToken = await getAccessToken();
  
  const url = new URL(`${resourcePath(path)}/${collection}`);
  if (documentId) {
    url.searchParams.set('documentId', documentId);
  }

  const response = await fetch(
      url.toString(),
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      },
  );

  if (!response.ok) {
    error(response.status, `Firestore error: ${await response.text()}`);
  }
  return await response.json();
}

export async function patchDocument(path: CollectionAndDocument[], fieldUpdates: FieldUpdate[]) {
  const accessToken = await getAccessToken();

  const fieldMaskParams = fieldUpdates.map(update => `updateMask.fieldPaths=${update.field}`).join('&');
  let body: { fields: any } = { fields: {} };
  fieldUpdates.forEach(update => body.fields[update.field] = update.value);

  const response = await fetch(
      `${resourcePath(path)}?${fieldMaskParams}`,
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      },
  );

  if (!response.ok) {
    error(response.status, `Firestore error: ${await response.text()}`);
  }
  return await response.json();
}

let cachedAccessToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (cachedAccessToken && cachedAccessToken.expiresAt > nowSeconds + CACHE_EXPIRY_MARGIN) {
    return cachedAccessToken.value;
  }

  const accessToken = await getUncachedAccessToken();
  cachedAccessToken = { value: accessToken, expiresAt: nowSeconds + ACCESS_TOKEN_VALID_FOR_SECONDS };
  return accessToken;
}

async function getUncachedAccessToken(): Promise<string> {
  const assertion = await generateJWT();
  const response = await fetch(
      GOOGLE_OAUTH_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
      },
  );

  const data = await response.json();
  if (!response.ok) {
    error(response.status, `Failed to get access token: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function generateJWT(): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    iss: env.FIRESTORE_CLIENT_EMAIL,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: GOOGLE_OAUTH_URL,
    iat: nowSeconds,
    exp: nowSeconds + ACCESS_TOKEN_VALID_FOR_SECONDS,
  };

  return await jwt.sign(
      payload,
      env.FIRESTORE_PRIVATE_KEY,
      { algorithm: 'RS256' },
  );
}
