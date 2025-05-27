// // pages/api/comments.js
// import cookie from 'cookie';

// export default async function handler(req, res) {

//   if (req.method === 'OPTIONS') {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // or 'null' for Figma plugin
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.status(200).end(); // important: must return 200 OK
//     return;
//   }

//   // Actual request (GET, POST, etc.)
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   const { COOKIE_NAME = 'figma_auth' } = process.env;

//   // Parse cookies
//   const cookies = cookie.parse(req.headers.cookie || '');
//   const accessToken = cookies[COOKIE_NAME];

//   if (!accessToken) {
//     return res.status(401).json({ error: 'Unauthorized. Missing access token.' });
//   }

//   // Here you would call the Figma API to fetch comments
//   // Example: Fetch comments from a file ID (passed as query param)
//   const { fileId } = req.query;

//   if (!fileId) {
//     return res.status(400).json({ error: 'Missing fileId query parameter' });
//   }

//   try {
//     const figmaRes = await fetch(`https://api.figma.com/v1/files/${fileId}/comments`, {
//       headers: {
//         'X-Figma-Token': accessToken,
//       },
//     });

//     if (!figmaRes.ok) {
//       throw new Error(`Figma API error: ${figmaRes.statusText}`);
//     }

//     const comments = await figmaRes.json();
//     console.log($file)
//     res.status(200).json(comments);
//   } catch (error) {
//     console.log("${fileId}");
//     console.error('Error fetching comments from Figma:', error); // Add this line
//     res.status(500).json({ error: error.message });
//   }
// }


import { getToken } from '../utils/tokenStore';
import fetch from 'node-fetch';

export default async function handler(req, res) {

    if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // or 'null' for Figma plugin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end(); // important: must return 200 OK
    return;
  }

  // Actual request (GET, POST, etc.)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
