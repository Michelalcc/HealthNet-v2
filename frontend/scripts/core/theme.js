// ================================================
// HEALTHNET V2 — THEME ENGINE
// Guardar en: frontend/scripts/core/theme.js
// ================================================

const HOSPITAL_CONFIG = {
  1: {
    name:       "Hospital Cayetano Heredia",
    shortName:  "HNCH",
    themeClass: "theme-hospital-1",
    color:      "#C9A84C",
    logo:       "../assets/images/logos/Logo_Cayetano.jpeg",
    bg:         "../assets/images/fondos/fondo_inicio.png"
  },
  2: {
    name:       "Hospital Almenara",
    shortName:  "HNAL",
    themeClass: "theme-hospital-2",
    color:      "#16a34a",
    logo:       "../assets/images/logos/Logo_Loayza.jpeg",
    bg:         "../assets/images/fondos/fondo_inicio.png"
  },
  3: {
    name:       "Hospital Dos de Mayo",
    shortName:  "HNDM",
    themeClass: "theme-hospital-3",
    color:      "#2563eb",
    logo:       "../assets/images/logos/Logo_Mayo.png",
    bg:         "../assets/images/fondos/fondo_inicio.png"
  }
};

const ADMIN_CONFIG = {
  name:       "Administración Central",
  shortName:  "ADMIN",
  themeClass: "theme-admin",
  color:      "#6366f1",
  logo:       "../assets/images/logos/logo.png",
  bg:         "../assets/images/fondos/fondo_inicio.png"
};

function applyTheme() {
  const userRaw = localStorage.getItem("user");
  if (!userRaw) return;
  let user;
  try { user = JSON.parse(userRaw); } catch { return; }

  document.body.classList.forEach(cls => {
    if (cls.startsWith("theme-")) document.body.classList.remove(cls);
  });

  const config = user.rol === "admin"
    ? ADMIN_CONFIG
    : (HOSPITAL_CONFIG[user.hospital_id] || ADMIN_CONFIG);

  document.body.classList.add(config.themeClass);
  document.documentElement.style.setProperty("--primary-color", config.color);
  applyPageBackground();
  return config;
}

function applyPageBackground() {
  const page = window.location.pathname.split("/").pop();
  document.body.classList.remove(
    "page-login", "page-diagnostico", "page-historial", "page-perfil"
  );
  const pageMap = {
    "index.html":       "page-login",
    "diagnostico.html": "page-diagnostico",
    "historial.html":   "page-historial",
    "perfil.html":      "page-perfil"
  };
  if (pageMap[page]) document.body.classList.add(pageMap[page]);
}

function getHospitalConfig() {
  const userRaw = localStorage.getItem("user");
  if (!userRaw) return ADMIN_CONFIG;
  try {
    const user = JSON.parse(userRaw);
    return user.rol === "admin"
      ? ADMIN_CONFIG
      : (HOSPITAL_CONFIG[user.hospital_id] || ADMIN_CONFIG);
  } catch { return ADMIN_CONFIG; }
}

function renderHospitalBadge() {
  const badge = document.getElementById("hospitalBadge");
  if (!badge) return;
  const config = getHospitalConfig();
  badge.textContent      = config.shortName;
  badge.style.background = config.color;
  badge.style.color      = "#ffffff";
}

function renderHospitalLogo() {
  const logo = document.getElementById("hospitalLogoSidebar");
  if (!logo) return;
  const config = getHospitalConfig();
  logo.src = config.logo;
  logo.alt = config.name;
}

window.applyTheme          = applyTheme;
window.getHospitalConfig   = getHospitalConfig;
window.renderHospitalBadge = renderHospitalBadge;
window.renderHospitalLogo  = renderHospitalLogo;
window.HOSPITAL_CONFIG     = HOSPITAL_CONFIG;
window.ADMIN_CONFIG        = ADMIN_CONFIG;