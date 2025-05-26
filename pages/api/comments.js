// pages/api/comments.js
import cookie from 'cookie';

export default async function handler(req, res) {
  const { COOKIE_NAME = 'figma_auth' } = process.env;
  const cookies = cookie.parse(req.headers.cookie || '');
  const accessToken = cookies[COOKIE_NAME];
  const fileKey = req.query.file_key;

  if (!accessToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (!fileKey) {
    return res.status(400).json({ error: 'Missing file_key in query' });
  }

  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/comments`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json(data);
  } else {
    res.status(response.status).json({ error: 'Failed to fetch comments', details: data });
  }
}
