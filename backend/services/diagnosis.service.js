const pool = require("../config/db");

const createDiagnosis = async ({ paciente_id, resultado, probabilidad, tiene_fibroma, recomendacion, doctor_id }) => {
  const r = await pool.query(
    "INSERT INTO diagnosticos (paciente_id,resultado,probabilidad,tiene_fibroma,recomendacion,doctor_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [paciente_id, resultado, probabilidad, tiene_fibroma, recomendacion, doctor_id]
  );
  return r.rows[0];
};

const getByPatient = async (paciente_id) =>
  (await pool.query("SELECT * FROM diagnosticos WHERE paciente_id=$1 ORDER BY created_at DESC", [paciente_id])).rows;

const runAI = async () => {
  const prob = Math.random();
  return {
    probabilidad: parseFloat(prob.toFixed(2)),
    resultado:    prob > 0.7 ? "alto" : prob > 0.4 ? "medio" : "bajo",
    tiene_fibroma: prob > 0.6,
    recomendacion: prob > 0.7 ? "Evaluacion urgente recomendada"
                 : prob > 0.4 ? "Seguimiento medico sugerido"
                 : "Sin riesgo significativo"
  };
};

// Visibilidad por rol:
//   admin        → todos los diagnósticos de todos los hospitales
//   doctor       → diagnósticos creados por usuarios de su mismo hospital
//   especialista → solo sus propios diagnósticos (doctor_id = su id)
const getAll = async ({ rol, hospital_id, doctor_id }) => {
  let query, params;

  if (rol === "admin") {
    // Admin ve todo
    query = `SELECT d.*, p.nombre AS paciente_nombre, p.dni, p.edad, p.sexo, p.foto
             FROM diagnosticos d
             JOIN pacientes p ON d.paciente_id = p.id
             ORDER BY d.created_at DESC`;
    params = [];

  } else if (rol === "doctor") {
    // Doctor general ve diagnósticos creados por cualquier usuario de su hospital
    // Filtra por el hospital_id del usuario que creó el diagnóstico (JOIN con usuarios)
    query = `SELECT d.*, p.nombre AS paciente_nombre, p.dni, p.edad, p.sexo, p.foto
             FROM diagnosticos d
             JOIN pacientes p ON d.paciente_id = p.id
             JOIN usuarios u ON d.doctor_id = u.id
             WHERE u.hospital_id = $1
             ORDER BY d.created_at DESC`;
    params = [hospital_id];

  } else {
    // Especialista: solo los diagnósticos que él mismo generó
    query = `SELECT d.*, p.nombre AS paciente_nombre, p.dni, p.edad, p.sexo, p.foto
             FROM diagnosticos d
             JOIN pacientes p ON d.paciente_id = p.id
             WHERE d.doctor_id = $1
             ORDER BY d.created_at DESC`;
    params = [doctor_id];
  }

  return (await pool.query(query, params)).rows;
};

module.exports = { createDiagnosis, getByPatient, getAll, runAI };