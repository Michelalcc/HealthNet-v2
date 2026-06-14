const pool   = require("../config/db");
const bcrypt = require("bcrypt");

const getAllUsers = async () =>
  (await pool.query(
    "SELECT id, nombre, email, rol, hospital_id FROM usuarios ORDER BY id"
  )).rows;

const createUser = async ({ nombre, email, password, rol, hospital_id }) => {
  if (!email || !password) throw new Error("Email y contraseña son obligatorios");
  const hash = await bcrypt.hash(password, 10);
  try {
    const r = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol, hospital_id)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id, nombre, email, rol, hospital_id`,
      [nombre || email.split("@")[0], email, hash, rol, hospital_id || null]
    );
    return r.rows[0];
  } catch (e) {
    if (e.code === "23505") throw new Error("El email ya está registrado");
    throw e;
  }
};

const deleteUser = async (id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Desasociar diagnósticos (doctor_id → NULL)
    await client.query(
      "UPDATE diagnosticos SET doctor_id = NULL WHERE doctor_id = $1", [id]
    );

    // 2. Desasociar pacientes (doctor_id → NULL)
    await client.query(
      "UPDATE pacientes SET doctor_id = NULL WHERE doctor_id = $1", [id]
    );

    // 3. Eliminar el usuario
    await client.query("DELETE FROM usuarios WHERE id = $1", [id]);

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

module.exports = { getAllUsers, createUser, deleteUser };