
export function clearUser() : void {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("sessionToken");
}

export function setUser(user: User) : void {
  localStorage.setItem("username", user.username);
  localStorage.setItem("role", user.role);
  localStorage.setItem("sessionToken", user.sessionToken);
}
