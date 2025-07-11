// // pages/api/callback.js
// import cookie from 'cookie';

// export default async function handler(req, res) {
//   const {
//     FIGMA_CLIENT_ID,
//     FIGMA_CLIENT_SECRET,
//     REDIRECT_URI,
//     COOKIE_NAME = 'figma_auth',
//   } = process.env;

//   const code = req.query.code;

//   if (!code) {
//     return res.status(400).json({ error: 'Missing code query parameter' });
//   }

//   // Exchange code for access token
//   const params = new URLSearchParams();
//   params.append('client_id', FIGMA_CLIENT_ID);
//   params.append('client_secret', FIGMA_CLIENT_SECRET);
//   params.append('redirect_uri', REDIRECT_URI);
//   params.append('code', code);
//   params.append('grant_type', 'authorization_code');

//   const credentials = Buffer.from(
//         `${FIGMA_CLIENT_ID}:${FIGMA_CLIENT_SECRET}`
//       ).toString("base64");

//   try {
//     console.log(params.toString());
//     //const tokenRes = await fetch('https://www.figma.com/api/oauth/token', {
//     const tokenRes = await fetch('https::s//api.figma.com/v1/oauth/token', {
  
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' ,'Authorization': 'Basic ${credentials}'},
//       body: params.toString(),
//     });

//     if (!tokenRes.ok) {
//       throw new Error(`Figma token request failed: ${tokenRes.statusText}`);
//       console.log(params.toString());
//     }

//     const tokenData = await tokenRes.json();

//     // Set a cookie with the access token
//     res.setHeader('Set-Cookie', cookie.serialize(COOKIE_NAME, tokenData.access_token, {
//       httpOnly: true,
//         secure: true,
//         path: '/',
//         maxAge: tokenData.expires_in,
//     }));

//     res.redirect('/'); // redirect to home or wherever you want
//     return{ tokens: {
//           access_token: json.access_token,
//           refresh_token: json.refresh_token,
//           expires_in: json.expires_in,
//           token_type: json.token_type || "Bearer",
//         }}

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// import { storeToken } from '../utils/tokenStore';
// import fetch from 'node-fetch';

// export default async function handler(req, res) {
//   const { code, state } = req.query;

//   // You should send the code_verifier from the plugin to the server (e.g., via cookies or a custom flow)
//   const codeVerifier = req.cookies?.figma_code_verifier || 'manually_copy_for_testing';

//   const params = new URLSearchParams({
//     client_id: process.env.FIGMA_CLIENT_ID,
//     grant_type: 'authorization_code',
//     redirect_uri: process.env.REDIRECT_URI,
//     code,
//     code_verifier: codeVerifier,
//   });

//   const tokenRes = await fetch('https://www.figma.com/api/oauth/token', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: params.toString(),
//   });

//   const data = await tokenRes.json();

//   if (data.access_token) {
//     storeToken(state, data.access_token);
//     res.send('Login successful! You can close this tab and return to the plugin.');
//   } else {
//     res.status(400).json(data);
//   }
// }

//6eXKTOkWGg2T8aMLNI4mSU

// import { storeToken } from './token';

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
//   const { code, state } = req.query;

//   if (!code || !state) {
//     return res.status(400).json({ error: "Missing code or state" });
//   }

//   try {
//     const params = new URLSearchParams();
//     params.append('client_id', 'ZsfKW7oFqEaSEMMGex3O2G');
//     params.append('client_secret', 'n9uWTExMsVfzCYrH3LRPuXgYWXlZYm');
//     params.append('grant_type', 'authorization_code');
//     params.append('code', code);
//     params.append('redirect_uri', process.env.FIGMA_REDIRECT_URI);
//     params.append('code_verifier', state); // state is used as code_verifier

//     const tokenRes = await fetch('https://api.figma.com/v1/oauth/token', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: params.toString(),
//     });

//     const bodyText = await tokenRes.text();
//     if (!tokenRes.ok) {
//       console.error('OAuth Token Error:', bodyText);
//       return res.status(500).json({ error: 'Token exchange failed', details: bodyText });
//     }

//     const tokenData = JSON.parse(bodyText);

//     // TEMP: redirect to plugin success page with token in query (insecure for production!)
//     return res.redirect(`https://www.figma.com/plugin-docs/oauth/?token=${tokenData.access_token}`);
//   } catch (e) {
//     console.error('OAuth callback error:', e);
//     return res.status(500).json({ error: 'Internal server error', details: e.message });
//   }
// }

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
  
  const code = req.query.code;
  const client_id = "ZsfKW7oFqEaSEMMGex3O2G";
  const client_secret = "n9uWTExMsVfzCYrH3LRPuXgYWXlZYm";
  const redirect_uri = "https://commentfetcher.vercel.app/api/callback";

  const response = await fetch("https://api.figma.com/v1/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`
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

// On /callback page
const params = new URLSearchParams(window.location.hash.substring(1));
const token = params.get('token');
window.opener.postMessage({ type: 'auth-token', token }, '*');
window.close();




