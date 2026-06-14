import { api } from "../core/api.js";

window.addEventListener("DOMContentLoaded", initHistorial);

async function initHistorial() {
  const raw = localStorage.getItem("pacienteActivo");
  if (!raw) {
    document.getElementById("historialContent").innerHTML = "<p>Sin paciente seleccionado.</p>";
    return;
  }
  const paciente = JSON.parse(raw);
  document.getElementById("historialNombre").innerText = paciente.nombre;

  try {
    const data = await api.get(`/diagnosis/paciente/${paciente.id}`);
    const lista = document.getElementById("historialLista");
    if (!data.data.length) {
      lista.innerHTML = "<p>Sin diagnosticos registrados.</p>";
      return;
    }
    lista.innerHTML = data.data.map(d => `
      <div class="historial-item">
        <div class="historial-fecha">${new Date(d.created_at).toLocaleDateString("es-PE")}</div>
        <div class="historial-resultado nivel-${d.resultado}">${d.resultado.toUpperCase()}</div>
        <div class="historial-reco">${d.recomendacion}</div>
        <div class="historial-extra">Probabilidad: ${Math.round(d.probabilidad * 100)}% | Fibroma: ${d.tiene_fibroma ? "Si" : "No"}</div>
      </div>
    `).join("");
  } catch (e) {
    console.error("Error historial:", e.message);
  }
}

