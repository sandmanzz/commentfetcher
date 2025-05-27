export default function handler(req, res) {
  const { FIGMA_CLIENT_ID, REDIRECT_URI } = process.env;

  if (!FIGMA_CLIENT_ID || !REDIRECT_URI) {
    return res.status(500).json({ error: 'Missing FIGMA_CLIENT_ID or REDIRECT_URI' });
  }

  const redirectUrl = `https://www.figma.com/oauth?client_id=${FIGMA_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=file_read&state=figma&response_type=code`;

  res.redirect(302, redirectUrl);
}