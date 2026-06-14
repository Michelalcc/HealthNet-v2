import { api } from "../core/api.js";

let resultadoIA    = null;
let pacienteActivo = null;
let imagenCargada  = false;

window.addEventListener("DOMContentLoaded", initDiagnostico);

function initDiagnostico() {
  const raw = localStorage.getItem("pacienteActivo");
  if (raw) {
    pacienteActivo = JSON.parse(raw);
    document.getElementById("pNombre").innerText = pacienteActivo.nombre;
    document.getElementById("pDni").innerText    = "DNI: " + pacienteActivo.dni;
  }
  document.getElementById("imageInput").addEventListener("change", previewImagen);
  document.getElementById("btnAnalyze").addEventListener("click", analizarIA);
  document.getElementById("btnSave").addEventListener("click", guardarDiagnostico);
}

function previewImagen(e) {
  const file = e.target.files[0];
  if (!file) return;
  imagenCargada = true;
  const reader = new FileReader();
  reader.onload = () => {
    const img = document.getElementById("previewImg");
    img.src = reader.result;
    img.style.display = "block";
    document.getElementById("previewEmpty").style.display = "none";
  };
  reader.readAsDataURL(file);
}

async function analizarIA() {
  if (!pacienteActivo) { alert("Selecciona un paciente primero"); return; }
  if (!imagenCargada)  { alert("Sube una imagen primero"); return; }

  document.getElementById("iaText").innerText = "Analizando...";
  await new Promise(r => setTimeout(r, 1500));

  const prob = Math.random();
  const nivel = prob > 0.7 ? "ALTO" : prob > 0.4 ? "MEDIO" : "BAJO";
  const recomendacion = prob > 0.7 ? "Riesgo elevado. Evaluacion urgente."
                      : prob > 0.4 ? "Hallazgos moderados. Seguimiento clinico."
                      : "Sin anomalias relevantes. Control periodico.";

  resultadoIA = { probabilidad: prob, nivel, recomendacion };
  renderResultado();
  document.getElementById("btnSave").disabled = false;
}

function renderResultado() {
  const { probabilidad, nivel, recomendacion } = resultadoIA;
  const pct = Math.round(probabilidad * 100);
  document.getElementById("iaText").innerText  = nivel;
  document.getElementById("iaConf").innerText  = pct + "%";
  document.getElementById("iaBar").style.width = pct + "%";
  document.getElementById("iaLevel").innerText = nivel;
  document.getElementById("iaReco").innerText  = recomendacion;
  ["lightGreen","lightYellow","lightRed"].forEach(id =>
    document.getElementById(id).classList.remove("active"));
  if (nivel === "BAJO")  document.getElementById("lightGreen").classList.add("active");
  if (nivel === "MEDIO") document.getElementById("lightYellow").classList.add("active");
  if (nivel === "ALTO")  document.getElementById("lightRed").classList.add("active");
}

async function guardarDiagnostico() {
  if (!resultadoIA) { alert("Analiza primero"); return; }
  try {
    await api.post("/diagnosis", {
      paciente_id:  pacienteActivo.id,
      resultado:    resultadoIA.nivel.toLowerCase(),
      probabilidad: resultadoIA.probabilidad.toFixed(2),
      tiene_fibroma: document.getElementById("fibromasSelect").value === "Si",
      recomendacion: resultadoIA.recomendacion
    });
    alert("Diagnostico guardado");
  } catch (e) {
    alert("Error: " + e.message);
  }
}
