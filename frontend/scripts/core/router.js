// ================================================
// HEALTHNET V2 — ROUTER.JS
// Guardar en: frontend/scripts/core/router.js
// ================================================

function getRouteByRole(role) {
  const routes = {
    admin:        "/pages/dashboard.html",
    doctor:       "/pages/dashboard.html",
    especialista: "/pages/diagnostico.html"
  };
  return routes[(role || "").toLowerCase().trim()] || "/pages/index.html";
}

function redirectByRole(role) {
  window.location.href = getRouteByRole(role);
}

function routeGuard() {
  const token   = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  const isLogin = window.location.pathname.includes("index.html");

  if (!token || !userRaw) {
    if (!isLogin) window.location.href = "/pages/index.html";
    return;
  }

  let user;
  try { user = JSON.parse(userRaw); }
  catch {
    localStorage.clear();
    window.location.href = "/pages/index.html";
    return;
  }

  const rol  = (user.rol || "").toLowerCase().trim();
  const page = window.location.pathname.split("/").pop();

  // Si está en login con sesión activa → redirigir
  if (isLogin) { redirectByRole(rol); return; }

  // Especialista solo puede ver diagnostico e historial
  if (rol === "especialista") {
    const permitidas = ["diagnostico.html", "historial.html"];
    if (!permitidas.includes(page)) {
      window.location.href = "/pages/diagnostico.html";
      return;
    }
  }

  // Doctor y admin no entran a diagnóstico
  if ((rol === "doctor" || rol === "admin") && page === "diagnostico.html") {
    window.location.href = "/pages/dashboard.html";
    return;
  }

  // Solo admin accede a users y hospitales
  if (rol !== "admin" && (page === "users.html" || page === "hospitales.html")) {
    window.location.href = "/pages/dashboard.html";
    return;
  }

  // Rol desconocido → logout
  if (!["admin", "doctor", "especialista"].includes(rol)) {
    localStorage.clear();
    window.location.href = "/pages/index.html";
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "/pages/index.html";
}

window.getRouteByRole = getRouteByRole;
window.redirectByRole = redirectByRole;
window.routeGuard     = routeGuard;
window.logout         = logout;
