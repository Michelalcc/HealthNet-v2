// ================================================
// HEALTHNET V2 — LAYOUT ENGINE
// Guardar en: frontend/scripts/ui/layout.js
// ================================================

function toggleSidebar() {
  document.body.classList.toggle("sidebar-hidden");
  document.getElementById("sidebar")?.classList.toggle("hidden");
  syncLayout();
}

function syncLayout() {
  const hidden  = document.body.classList.contains("sidebar-hidden");
  const content = document.querySelector(".content");
  const topbar  = document.querySelector(".topbar");
  if (content) content.style.marginLeft = hidden ? "0" : "270px";
  if (topbar)  topbar.style.marginLeft  = hidden ? "0" : "270px";
}

function loadTopbarUser() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return;

  const avatars = {
    admin:        "../assets/images/users/admin.png",
    doctor:       "../assets/images/users/doctor1.png",
    especialista: "../assets/images/users/doc_esp.png"
  };

  const nameEl   = document.getElementById("topUserName");
  const roleEl   = document.getElementById("topUserRole");
  const avatarEl = document.getElementById("topAvatar");

  if (nameEl)   nameEl.innerText = user.nombre || user.email;
  if (roleEl)   roleEl.innerText = user.rol.toUpperCase();
  if (avatarEl) {
    avatarEl.src   = avatars[user.rol] || avatars.admin;
    avatarEl.style.objectFit = "cover";   /* tamaño uniforme */
  }

  renderHospitalBadge();
}

function initLayout() {
  const token   = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  if (!token || !userRaw) {
    window.location.href = "/pages/index.html";
    return;
  }

  let user;
  try { user = JSON.parse(userRaw); } catch {
    localStorage.clear();
    window.location.href = "/pages/index.html";
    return;
  }

  applyTheme();
  syncLayout();
  loadTopbarUser();
  if (typeof renderSidebar === "function") renderSidebar();
}

function logout() {
  localStorage.clear();
  document.body.classList.remove("sidebar-hidden");
  window.location.href = "/pages/index.html";
}

window.toggleSidebar  = toggleSidebar;
window.syncLayout     = syncLayout;
window.loadTopbarUser = loadTopbarUser;
window.initLayout     = initLayout;
window.logout         = logout;
