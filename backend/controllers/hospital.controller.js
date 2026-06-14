const service = require("../services/hospital.service");
const pool    = require("../config/db");
const bcrypt  = require("bcrypt");

const getHospitals = async (req, res) => {
  try {
    res.json({ ok: true, data: await service.getAllHospitals() });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

const createHospital = async (req, res) => {
  try {
    const { nombre, direccion, email, logo } = req.body;
    if (!nombre) return res.status(400).json({ ok: false, message: "El nombre es obligatorio" });
    if (!email)  return res.status(400).json({ ok: false, message: "El correo institucional es obligatorio" });

    // 1. Crear el hospital
    const hospital = await service.createHospital({ nombre, direccion, email, logo });

    // 2. Crear usuario automáticamente con el email del hospital (rol: doctor, pass: hn1234)
    const hash = await bcrypt.hash("hn1234", 10);
    await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol, hospital_id)
       VALUES ($1, $2, $3, 'doctor', $4)
       ON CONFLICT (email) DO NOTHING`,
      [nombre, email, hash, hospital.id]
    );

    res.json({ ok: true, data: hospital });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (id <= 3) return res.status(403).json({
      ok: false,
      message: "No se pueden eliminar los hospitales originales del sistema"
    });
    await service.deleteHospital(id);
    res.json({ ok: true, message: "Hospital eliminado correctamente" });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

module.exports = { getHospitals, createHospital, deleteHospital };