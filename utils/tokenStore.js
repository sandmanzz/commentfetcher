
const store = {};

export function storeToken(key, token) {
  store[key] = token;
}

export function getToken(key) {
  return store[key];
}
