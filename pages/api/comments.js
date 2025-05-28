import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { token, fileKey } = req.query;

  if (!token || !fileKey) {
    return res.status(400).json({ error: 'Missing token or fileKey' });
  }

  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/comments`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  res.status(200).json(data);
}