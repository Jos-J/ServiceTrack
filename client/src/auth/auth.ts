// client/src/auth/auth.ts

export function setToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function clearToken() {
  localStorage.removeItem("accessToken");
}

export function getToken() {
  return localStorage.getItem("accessToken");
}

export function isLoggedIn(): boolean {
  return Boolean(localStorage.getItem("accessToken"));
}
