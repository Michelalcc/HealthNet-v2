const PERMISSIONS = {
  admin:        ["dashboard","pacientes","historial","hospitales","users","reportes"],
  doctor:       ["dashboard","pacientes","historial","reportes"],
  especialista: ["diagnostico","historial"]
};

function canAccess(rol, page) {
  return (PERMISSIONS[rol] || []).includes(page);
}

function initProtection(rolesPermitidos = []) {
  const token   = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  if (!token || !userRaw) { window.location.href = "/pages/index.html"; return; }
  let user;
  try { user = JSON.parse(userRaw); } catch {
    localStorage.clear();
    window.location.href = "/pages/index.html";
    return;
  }
  const rol = user.rol.toLowerCase().trim();
  if (rolesPermitidos.length && !rolesPermitidos.includes(rol)) {
    window.location.href = getRouteByRole(rol);
  }
}

window.canAccess      = canAccess;
window.initProtection = initProtection;

