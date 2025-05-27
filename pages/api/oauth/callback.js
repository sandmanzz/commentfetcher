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

import { storeToken } from '../tokenstore';

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
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: "Missing code or state" });
  }

  try {
    const params = new URLSearchParams();
    params.append("client_id", process.env.FIGMA_CLIENT_ID);
    params.append("client_secret", process.env.FIGMA_CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.FIGMA_REDIRECT_URI);
    params.append("code_verifier", state); // must match what you used in code_challenge

    const tokenRes = await fetch("https://api.figma.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!tokenRes.ok) {
      const errorBody = await tokenRes.text();
      console.error("Figma token exchange error:", errorBody);
      return res.status(500).json({ error: "Token exchange failed", details: errorBody });
    }

    const tokenData = await tokenRes.json();

    // Here you should securely save the tokens, for demo let's just return success
    console.log("Token data:", tokenData);

    // Redirect or show success page
    return res.redirect("/?success=1");

  } catch (error) {
    console.error("Exception in OAuth callback:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
}


