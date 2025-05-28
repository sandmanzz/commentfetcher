
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