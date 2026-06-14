const pool = require("../config/db");

const getAllHospitals = async () =>
  (await pool.query("SELECT * FROM hospitales ORDER BY id")).rows;

const createHospital = async ({ nombre, direccion, email, logo }) => {
  const r = await pool.query(
    `INSERT INTO hospitales (nombre, direccion, email, logo)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [nombre, direccion || "", email || null, logo || null]
  );
  return r.rows[0];
};

const deleteHospital = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("UPDATE usuarios  SET hospital_id = NULL WHERE hospital_id = $1", [id]);
    await client.query("UPDATE pacientes SET hospital_id = NULL WHERE hospital_id = $1", [id]);
    await client.query("UPDATE alertas   SET hospital_id = NULL WHERE hospital_id = $1", [id]);
    await client.query("DELETE FROM hospitales WHERE id = $1", [id]);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

module.exports = { getAllHospitals, createHospital, deleteHospital };