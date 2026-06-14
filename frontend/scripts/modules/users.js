import { api } from "../core/api.js";

window.addEventListener("DOMContentLoaded", initUsers);

async function initUsers() {
  await cargarUsuarios();
  document.getElementById("formUser")?.addEventListener("submit", crearUsuario);
}

async function cargarUsuarios() {
  try {
    const data = await api.get("/users");
    const tbody = document.getElementById("usersTable");
    if (!tbody) return;
    tbody.innerHTML = data.data.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.nombre || "—"}</td>
        <td>${u.email}</td>
        <td>${u.rol}</td>
        <td>${u.hospital_id || "—"}</td>
        <td><button onclick="eliminarUsuario(${u.id})">Eliminar</button></td>
      </tr>
    `).join("");
  } catch (e) {
    console.error("Error usuarios:", e.message);
  }
}

async function crearUsuario(e) {
  e.preventDefault();
  try {
    await api.post("/users", {
      nombre:      document.getElementById("uNombre").value,
      email:       document.getElementById("uEmail").value,
      password:    document.getElementById("uPassword").value,
      rol:         document.getElementById("uRol").value,
      hospital_id: document.getElementById("uHospital").value || null
    });
    alert("Usuario creado");
    e.target.reset();
    cargarUsuarios();
  } catch (err) { alert(err.message); }
}

window.eliminarUsuario = async function(id) {
  if (!confirm("Eliminar usuario?")) return;
  try {
    await api.delete(`/users/${id}`);
    cargarUsuarios();
  } catch (e) { alert(e.message); }
};

