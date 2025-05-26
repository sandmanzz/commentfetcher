// pages/api/login.js
export default function handler(req, res) {
  const { FIGMA_CLIENT_ID, REDIRECT_URI } = process.env;

  if (!FIGMA_CLIENT_ID || !REDIRECT_URI) {
    return res.status(500).json({ error: 'Missing OAuth config' });
  }

  const authUrl = `https://www.figma.com/oauth?client_id=${FIGMA_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=file_read&state=12345&response_type=code`;

  res.redirect(authUrl);
}
