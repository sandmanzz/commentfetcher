export default async function handler(req, res) {
  const { token, fileId } = req.body;
  const response = await fetch(`https://api.figma.com/v1/files/${fileId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  res.status(200).json(data);
}