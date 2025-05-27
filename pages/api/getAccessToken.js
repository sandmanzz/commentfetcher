export default function handler(req, res) {
  if (!accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json({ access_token: accessToken });
}