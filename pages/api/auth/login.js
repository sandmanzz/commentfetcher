export default function handler(req, res) {
  const { CLIENT_ID, REDIRECT_URI } = process.env;
  const state = Math.random().toString(36).substring(2);
  const scope = 'file_read';
  const authUrl = `https://www.figma.com/oauth?client_id=ZsfKW7oFqEaSEMMGex3O2G&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scope}&state=${state}&response_type=code`;
  res.redirect(authUrl);
}