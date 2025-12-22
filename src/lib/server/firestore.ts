import { error } from '@sveltejs/kit';
import jwt from '@tsndr/cloudflare-worker-jwt';
import { env } from '$env/dynamic/private';

const GOOGLE_OAUTH_URL = 'https://oauth2.googleapis.com/token';
const ACCESS_TOKEN_VALID_FOR_SECONDS = 3600;
const CACHE_EXPIRY_MARGIN = 120;

const FIRESTORE_PROJECT_ID = 'planar-ember-470822-n7';

export interface Filter {
  field: string,
  op: 'EQUAL' | 'NOT_EQUAL' | 'GREATER_THAN' | 'GREATER_THAN_OR_EQUAL' | 'LESS_THAN' | 'LESS_THAN_OR_EQUAL',
  value: any,
}

export interface FieldUpdate {
  field: string,
  value: any,
}

export async function queryDocuments(collection: string, filters: Filter[]) {
  const accessToken = await getAccessToken();
  const body = {
    structuredQuery: {
      from: [{ collectionId: collection }],
      where: {
        compositeFilter: {
          op: 'AND',
          filters: filters.map(
            filter => {
              return {
                fieldFilter: {
                  field: { fieldPath: filter.field },
                  op: filter.op,
                  value: filter.value,
                },
              };
            }
          ),
        }
      },
    },
  };

  const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/(default)/documents:runQuery`,
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
    error(500, `Firestore error: ${await response.text()}`);
  }

  // When there are not any actual results, a single element will still be returned with the read time,
  // but missing the document field.
  const results = await response.json();
  return results.filter((doc: any) => doc.document).map((doc: any) => doc.document);
}

export async function createDocument(collection: string, body: any): Promise<any> {
  const accessToken = await getAccessToken();
  const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/(default)/documents/${collection}`,
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

export async function patchDocument(documentName: string, fieldUpdates: FieldUpdate[]) {
  const accessToken = await getAccessToken();

  const fieldMaskParams = fieldUpdates.map(update => `updateMask.fieldPaths=${update.field}`).join('&');
  let body: { fields: any } = { fields: {} };
  fieldUpdates.forEach(update => body.fields[update.field] = update.value);

  const response = await fetch(
      `https://firestore.googleapis.com/v1/${documentName}?${fieldMaskParams}`,
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
