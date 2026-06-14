import { api } from "../core/api.js";

window.addEventListener("DOMContentLoaded", initHospitales);

async function initHospitales() {
  await cargarHospitales();
}

async function cargarHospitales() {
  try {
    const data = await api.get("/hospitals");
    const lista = document.getElementById("hospitalesList");
    if (!lista) return;
    lista.innerHTML = data.data.map(h => `
      <div class="card hospital-card">
        <h3>${h.nombre}</h3>
        <p>${h.direccion || "Sin direccion registrada"}</p>
      </div>
    `).join("");
  } catch (e) {
    console.error("Error hospitales:", e.message);
  }
}
