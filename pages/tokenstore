const tokens = {};

export function storeToken(userId, token) {
  tokens[userId] = token;
}

export function getToken(userId) {
  return tokens[userId];
}
export function removeToken(userId) {
  delete tokens[userId];
}
export function clearTokens() {
  for (const userId in tokens) {
    delete tokens[userId];
  }
}
export function hasToken(userId) {
  return tokens.hasOwnProperty(userId);
}
