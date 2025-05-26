// pages/api/callback.js
import cookie from 'cookie';

export default async function handler(req, res) {
  const {
    FIGMA_CLIENT_ID,
    FIGMA_CLIENT_SECRET,
    REDIRECT_URI,
    COOKIE_NAME = 'figma_auth',
  } = process.env;

  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Missing code query parameter' });
  }

  // Exchange code for access token
  const params = new URLSearchParams();
  params.append('client_id', FIGMA_CLIENT_ID);
  params.append('client_secret', FIGMA_CLIENT_SECRET);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('code', code);
  params.append('grant_type', 'authorization_code');

  try {
    console.log(params.toString());
    //const tokenRes = await fetch('https://www.figma.com/api/oauth/token', {
    const tokenRes = await fetch('https//api.figma.com/v1/oauth/token', {
  
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!tokenRes.ok) {
      throw new Error(`Figma token request failed: ${tokenRes.statusText}`);
      console.log(params.toString());
    }

    const tokenData = await tokenRes.json();

    // Set a cookie with the access token
    res.setHeader('Set-Cookie', cookie.serialize(COOKIE_NAME, tokenData.access_token, {
      httpOnly: true,
        secure: true,
        path: '/',
        maxAge: tokenData.expires_in,
    }));

    res.redirect('/'); // redirect to home or wherever you want

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}