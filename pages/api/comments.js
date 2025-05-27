import { getToken } from '../utils/tokenStore';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { fileId, pageId, state } = req.query;
  const token = getToken(state);

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated. Please login first.' });
  }

  const figmaRes = await fetch(`https://api.figma.com/v1/files/${fileId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await figmaRes.json();

  const comments = data.comments.filter((c) =>
    c.client_meta?.node_id?.startsWith(pageId)
  );

  res.status(200).json(comments);
}
