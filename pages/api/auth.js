// pages/api/auth.js

import { generatePKCECodes } from '../../utils/pkce';

export default async function handler(req, res) {
  const state = crypto.randomUUID(); // for security
  const { codeVerifier, codeChallenge } = await generatePKCECodes();

  const clientId = process.env.FIGMA_CLIENT_ID;
  const redirectUri = `${process.env.BASE_URL}/api/token`;

  const authUrl = new URL('https://www.figma.com/oauth');

  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'file_read');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  res.setHeader('Set-Cookie', [
    `code_verifier=${codeVerifier}; Path=/; HttpOnly; Secure; SameSite=Lax`,
    `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax`
  ]);

  res.redirect(authUrl.toString());
}
