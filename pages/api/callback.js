// pages/api/callback.js

const cookie = require('cookie');

module.exports = async function handler(req, res) {
  const { 
    FIGMA_CLIENT_ID, 
    FIGMA_CLIENT_SECRET, 
    REDIRECT_URI, 
    COOKIE_NAME = 'figma_auth' } = process.env;



  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'Missing code from Figma' });
  }

  const response = await fetch('https://www.figma.com/api/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: FIGMA_CLIENT_ID,
      client_secret: FIGMA_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
      grant_type: 'authorization_code',
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(COOKIE_NAME, data.access_token, {
        httpOnly: true,
        maxAge: 3600,
        path: '/',
      })
    );
    res.redirect('/api/comments'); // optional: redirect somewhere useful
  } else {
    res.status(500).json({ error: 'Failed to get access token', details: data });
  }
}
