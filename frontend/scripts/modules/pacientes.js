import { api } from "../core/api.js";

window.addEventListener("DOMContentLoaded", initPacientes);

async function initPacientes() {
  await cargarPacientes();
  document.getElementById("formPaciente")?.addEventListener("submit", crearPaciente);
}

async function cargarPacientes() {
  try {
    const data = await api.get("/pacientes");
    const lista = document.getElementById("listaPacientes");
    if (!lista) return;
    lista.innerHTML = "";
    data.data.forEach(p => {
      const li = document.createElement("li");
      li.className = "paciente-item";
      li.innerHTML = `
        <div>
          <strong>${p.nombre}</strong><br>
          <small>DNI: ${p.dni} | Edad: ${p.edad} | ${p.sexo}</small>
        </div>
        <button class="btn-diagnostico">Diagnosticar</button>
      `;
      li.querySelector(".btn-diagnostico").addEventListener("click", () => {
        localStorage.setItem("pacienteActivo", JSON.stringify(p));
        window.location.href = "/pages/diagnostico.html";
      });
      lista.appendChild(li);
    });
  } catch (e) {
    console.error("Error pacientes:", e.message);
  }
}

async function crearPaciente(e) {
  e.preventDefault();
  try {
    await api.post("/pacientes", {
      nombre: document.getElementById("nombre").value,
      dni:    document.getElementById("dni").value,
      edad:   document.getElementById("edad").value,
      sexo:   document.getElementById("sexo").value
    });
    alert("Paciente creado");
    e.target.reset();
    cargarPacientes();
  } catch (err) {
    alert(err.message);
  }
}
