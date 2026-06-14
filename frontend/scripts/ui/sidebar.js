// ================================================
// HEALTHNET V2 — SIDEBAR DINÁMICO
// Guardar en: frontend/scripts/ui/sidebar.js
// ================================================

function renderSidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return;

  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const config      = getHospitalConfig();
  const currentPage = window.location.pathname.split("/").pop();

  const avatars = {
    admin:        "../assets/images/users/admin.png",
    doctor:       "../assets/images/users/doctor1.png",
    especialista: "../assets/images/users/doc_esp.png"
  };

  const linksPorRol = {
    admin: [
      { href: "dashboard.html",  label: "Dashboard",  icon: "ti-layout-dashboard"  },
      { href: "pacientes.html",  label: "Pacientes",  icon: "ti-users"             },
      { href: "historial.html",  label: "Historial",  icon: "ti-clipboard-list"    },
      { href: "hospitales.html", label: "Hospitales", icon: "ti-building-hospital" },
      { href: "users.html",      label: "Usuarios",   icon: "ti-user-cog"          }
    ],
    doctor: [
      { href: "dashboard.html", label: "Dashboard", icon: "ti-layout-dashboard" },
      { href: "pacientes.html", label: "Pacientes", icon: "ti-users"            },
      { href: "historial.html", label: "Historial", icon: "ti-clipboard-list"   }
    ],
    especialista: [
      { href: "diagnostico.html", label: "Diagnóstico", icon: "ti-brain"          },
      { href: "historial.html",   label: "Historial",   icon: "ti-clipboard-list" }
    ]
  };

  const links = linksPorRol[user.rol] || [];

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <img id="hospitalLogoSidebar"
           class="hospital-logo-sidebar"
           src="${config.logo}"
           alt="${config.name}">
      <div>
        <h3 style="margin:0;font-size:13px;font-weight:500;color:white;">HealthNet v2</h3>
        <small style="color:var(--primary-light,#aaa);font-size:10px;">${config.shortName}</small>
      </div>
    </div>

    <div class="sidebar-user">
      <img class="sidebar-avatar"
           src="${avatars[user.rol] || avatars.admin}"
           alt="avatar"
           style="object-fit:cover;">
      <div>
        <div style="font-size:13px;font-weight:500;color:white;">${user.nombre || user.email}</div>
        <small style="font-size:11px;opacity:0.6;text-transform:uppercase;">${user.rol}</small>
      </div>
    </div>

    <div style="height:1px;background:rgba(255,255,255,0.08);margin:8px 0;"></div>

    <div class="sidebar-links">
      ${links.map(l => `
        <a href="${l.href}" class="${currentPage === l.href ? "active" : ""}">
          <i class="ti ${l.icon}" style="margin-right:8px;font-size:16px;" aria-hidden="true"></i>
          ${l.label}
        </a>
      `).join("")}
    </div>

    <div class="sidebar-footer">
      <div style="
        text-align:center;
        margin-bottom:10px;
        padding:6px;
        border-radius:8px;
        font-size:11px;
        background:rgba(255,255,255,0.06);
        color:var(--primary-light,#aaa);">
        ${config.name}
      </div>
      <button class="logout-btn" onclick="logout()">
        <i class="ti ti-logout" style="margin-right:6px;" aria-hidden="true"></i>
        Cerrar sesión
      </button>
    </div>
  `;
}

window.renderSidebar = renderSidebar;
