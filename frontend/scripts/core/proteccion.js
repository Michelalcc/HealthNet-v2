function protectRoute(rolesPermitidos = []) {
  const token   = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  if (!token || !userRaw) { window.location.href = "/pages/index.html"; return; }
  try {
    const user = JSON.parse(userRaw);
    if (rolesPermitidos.length && !rolesPermitidos.includes(user.rol)) {
      window.location.href = "/pages/index.html";
    }
  } catch {
    localStorage.clear();
    window.location.href = "/pages/index.html";
  }
}
window.protectRoute = protectRoute;

