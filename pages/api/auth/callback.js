export default async function handler(req, res) {
  const { code } = req.query;
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

//   const tokenResponse = await fetch('https://www.figma.com/api/oauth/token', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       redirect_uri: REDIRECT_URI,
//       code,
//       grant_type: 'authorization_code',
//     }),
//   });

//   const tokenData = await tokenResponse.json();
//   const { access_token } = tokenData;

//   // Redirect to a page that can communicate with the plugin
//   res.redirect(`/oauth.html?token=${access_token}`);
  const client_id = "ZsfKW7oFqEaSEMMGex3O2G";
  const client_secret = "n9uWTExMsVfzCYrH3LRPuXgYWXlZYm";
  const redirect_uri = "https://commentfetcher.vercel.app/api/auth/callback";


 const response = await fetch("https://api.figma.com/v1/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ZsfKW7oFqEaSEMMGex3O2G:n9uWTExMsVfzCYrH3LRPuXgYWXlZYm`
    },
    body: new URLSearchParams({
      client_id,
      client_secret,
      redirect_uri,
      code,
      grant_type: "authorization_code"
    })
  });

  const data = await response.json();
  res.redirect(`/plugin.html#token=${data.access_token}`);
}