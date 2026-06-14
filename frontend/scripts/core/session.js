// ================================================
// HEALTHNET V2 — SESSION.JS
// Guardar en: frontend/scripts/core/session.js
// ================================================

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

function getHospitalId() {
  return getUser()?.hospital_id || null;
}

function isAuthenticated() {
  return !!getToken() && !!getUser();
}

function logout() {
  localStorage.clear();
  window.location.href = "/pages/index.html";
}

function requireAuth() {
  if (!isAuthenticated()) logout();
}

window.getToken        = getToken;
window.getUser         = getUser;
window.getHospitalId   = getHospitalId;
window.isAuthenticated = isAuthenticated;
window.logout          = logout;
window.requireAuth     = requireAuth;
