import { api } from "../core/api.js";

async function initDashboard() {
  try {
    const data = await api.get("/dashboard");
    document.getElementById("kpiPatients").innerText  = data.data.pacientes;
    document.getElementById("kpiDiagnoses").innerText = data.data.diagnosticos;
    document.getElementById("kpiCritical").innerText  = data.data.criticos;
  } catch (e) {
    console.error("Error dashboard:", e.message);
  }
}
window.initDashboard = initDashboard;
