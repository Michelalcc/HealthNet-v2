const pool = require("../config/db");

const getAdminStats = async () => {
  const [p, d, c] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM pacientes"),
    pool.query("SELECT COUNT(*) FROM diagnosticos"),
    pool.query("SELECT COUNT(*) FROM diagnosticos WHERE resultado='alto'")
  ]);
  return { pacientes: +p.rows[0].count, diagnosticos: +d.rows[0].count, criticos: +c.rows[0].count };
};

const getHospitalStats = async (hospital_id) => {
  // Contar diagnósticos creados por los especialistas de ESTE hospital
  // (filtrando por doctor_id de usuarios con ese hospital_id)
  const [d, c, p] = await Promise.all([
    pool.query(
      `SELECT COUNT(*) FROM diagnosticos d
       JOIN usuarios u ON d.doctor_id = u.id
       WHERE u.hospital_id = $1`, [hospital_id]
    ),
    pool.query(
      `SELECT COUNT(*) FROM diagnosticos d
       JOIN usuarios u ON d.doctor_id = u.id
       WHERE u.hospital_id = $1 AND d.resultado = 'alto'`, [hospital_id]
    ),
    pool.query("SELECT COUNT(*) FROM pacientes")
  ]);
  return {
    pacientes:    +p.rows[0].count,
    diagnosticos: +d.rows[0].count,
    criticos:     +c.rows[0].count
  };
};

module.exports = { getAdminStats, getHospitalStats };