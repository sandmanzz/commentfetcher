// lib/session.js
import cookie from 'cookie';

export function getAccessToken(req) {
  const { COOKIE_NAME = 'figma_auth' } = process.env;
  const cookies = cookie.parse(req.headers.cookie || '');
  return cookies[COOKIE_NAME];
}
