const pool = require("../config/db");

const createPatient = async ({ nombre, dni, edad, sexo, hospital_id, doctor_id }) => {
  try {
    const age = Number(edad);
    if (!Number.isInteger(age) || age <= 0)
      throw new Error("Edad invÃ¡lida: debe ser un nÃºmero mayor a 0");

    const r = await pool.query(
      `INSERT INTO pacientes (nombre, dni, edad, sexo, hospital_id, doctor_id)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [nombre, String(dni), age, sexo, hospital_id, doctor_id]
    );
    return r.rows[0];
  } catch (e) {
    if (e.code === "23505") throw new Error("DNI ya registrado en el sistema");
    throw new Error("Error al crear paciente: " + e.message);
  }
};

const getAllPatients = async () =>
  (await pool.query("SELECT * FROM pacientes ORDER BY created_at DESC")).rows;

const getPatientsByHospital = async (hid) => {
  // Si hospital_id es null (pacientes sin hospital asignado), devolver todos
  if (!hid) return (await pool.query("SELECT * FROM pacientes ORDER BY created_at DESC")).rows;
  // Si tiene hospital_id, devolver los de ese hospital MÁS los que no tienen hospital (hospital_id IS NULL)
  return (await pool.query(
    "SELECT * FROM pacientes WHERE hospital_id=$1 OR hospital_id IS NULL ORDER BY created_at DESC", [hid]
  )).rows;
};

const getPatientById = async (id) =>
  (await pool.query("SELECT * FROM pacientes WHERE id=$1", [id])).rows[0] || null;

const getPatientByIdAndHospital = async (id, hid) =>
  (await pool.query(
    "SELECT * FROM pacientes WHERE id=$1 AND (hospital_id=$2 OR hospital_id IS NULL)", [id, hid]
  )).rows[0] || null;

// BÃºsqueda flexible por nombre (ILIKE insensible a mayÃºsculas y tildes) dentro del hospital
const searchByName = async (nombre, hospital_id) => {
  const query = hospital_id
    ? `SELECT * FROM pacientes
       WHERE (hospital_id=$2 OR hospital_id IS NULL)
         AND unaccent(lower(nombre)) ILIKE unaccent(lower('%'||$1||'%'))
       ORDER BY nombre LIMIT 10`
    : `SELECT * FROM pacientes
       WHERE unaccent(lower(nombre)) ILIKE unaccent(lower('%'||$1||'%'))
       ORDER BY nombre LIMIT 10`;

  const params = hospital_id ? [nombre, hospital_id] : [nombre];

  try {
    const r = await pool.query(query, params);
    return r.rows;
  } catch (e) {
    // Si unaccent no estÃ¡ disponible, caer a ILIKE simple
    const fallback = hospital_id
      ? `SELECT * FROM pacientes WHERE hospital_id=$2 AND lower(nombre) ILIKE lower('%'||$1||'%') ORDER BY nombre LIMIT 10`
      : `SELECT * FROM pacientes WHERE lower(nombre) ILIKE lower('%'||$1||'%') ORDER BY nombre LIMIT 10`;
    const r = await pool.query(fallback, params);
    return r.rows;
  }
};

// BÃºsqueda exacta por DNI dentro del hospital (o global para admin)
const searchByDni = async (dni, hospital_id) => {
  const query = hospital_id
    ? "SELECT * FROM pacientes WHERE (hospital_id=$2 OR hospital_id IS NULL) AND dni=$1 LIMIT 1"
    : "SELECT * FROM pacientes WHERE dni=$1 LIMIT 1";
  const params = hospital_id ? [String(dni), hospital_id] : [String(dni)];
  const r = await pool.query(query, params);
  return r.rows[0] || null;
};

const updatePatient = async (id, { nombre, edad, sexo }) => {
  const r = await pool.query(
    "UPDATE pacientes SET nombre=$1, edad=$2, sexo=$3 WHERE id=$4 RETURNING *",
    [nombre, parseInt(edad), sexo, id]
  );
  return r.rows[0];
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientsByHospital,
  getPatientById,
  getPatientByIdAndHospital,
  searchByName,
  searchByDni,
  updatePatient
};