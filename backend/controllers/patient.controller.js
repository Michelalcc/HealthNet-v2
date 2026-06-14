const service = require("../services/patient.service");

// ─── CREAR ───────────────────────────────────────────────────────────────────
const createPatient = async (req, res) => {
  try {
    const { id: doctor_id, rol } = req.user;
    const nombre = (req.body.nombre || "").trim();
    const dni    = (req.body.dni    || "").trim();
    const edad   = req.body.edad;
    const sexo   = (req.body.sexo   || "").trim();

    if (!nombre || !dni || edad === undefined || edad === null || edad === "" || !sexo)
      return res.status(400).json({ ok: false, message: "Todos los campos son obligatorios (nombre, dni, edad, sexo)" });

    if (!/^\d{8}$/.test(String(dni)))
      return res.status(400).json({ ok: false, message: "DNI debe tener exactamente 8 dígitos numéricos" });

    const hospital_id = rol === "admin" ? (req.body.hospital_id || null) : req.hospital_id;
    if (!hospital_id)
      return res.status(400).json({ ok: false, message: "hospital_id requerido" });

    const data = await service.createPatient({ nombre, dni: String(dni), edad: parseInt(edad), sexo, hospital_id, doctor_id });
    res.status(201).json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

// ─── LISTAR ──────────────────────────────────────────────────────────────────
const getPatients = async (req, res) => {
  try {
    const { rol } = req.user;
    const data = rol === "admin"
      ? await service.getAllPatients()
      : await service.getPatientsByHospital(req.hospital_id);
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

// ─── OBTENER POR ID ──────────────────────────────────────────────────────────
const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.user;
    const patient = rol === "admin"
      ? await service.getPatientById(id)
      : await service.getPatientByIdAndHospital(id, req.hospital_id);
    if (!patient)
      return res.status(404).json({ ok: false, message: "Paciente no encontrado" });
    res.json({ ok: true, data: patient });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

// ─── BUSCAR POR NOMBRE O DNI ─────────────────────────────────────────────────
// GET /api/pacientes/search?q=Adriana Soto
const searchPatient = async (req, res) => {
  try {
    const { q } = req.query;
    const { rol } = req.user;

    if (!q || q.trim().length < 2)
      return res.status(400).json({ ok: false, message: "Ingresa al menos 2 caracteres para buscar" });

    const hospital_id = rol === "admin" ? null : req.hospital_id;

    let resultado = null;

    // 1. Intentar por DNI exacto si q tiene 8 dígitos
    if (/^\d{8}$/.test(q.trim())) {
      resultado = await service.searchByDni(q.trim(), hospital_id);
      if (resultado) return res.json({ ok: true, data: resultado });
    }

    // 2. Búsqueda por nombre (devuelve lista)
    const lista = await service.searchByName(q.trim(), hospital_id);
    if (lista.length === 1) return res.json({ ok: true, data: lista[0] });
    if (lista.length > 1)  return res.json({ ok: true, data: lista[0], multiple: lista });

    return res.status(404).json({ ok: false, message: "Paciente no encontrado" });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

// ─── ACTUALIZAR ──────────────────────────────────────────────────────────────
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, sexo } = req.body;
    const { rol } = req.user;
    const existing = rol === "admin"
      ? await service.getPatientById(id)
      : await service.getPatientByIdAndHospital(id, req.hospital_id);
    if (!existing)
      return res.status(404).json({ ok: false, message: "Paciente no encontrado" });
    const data = await service.updatePatient(id, { nombre, edad, sexo });
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

module.exports = { createPatient, getPatients, getPatientById, searchPatient, updatePatient };