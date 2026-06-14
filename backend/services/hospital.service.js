const pool = require("../config/db");

const getAllHospitals  = async () => (await pool.query("SELECT * FROM hospitales ORDER BY id")).rows;
const createHospital  = async ({ nombre, direccion }) =>
  (await pool.query("INSERT INTO hospitales (nombre,direccion) VALUES($1,$2) RETURNING *", [nombre, direccion || ""])).rows[0];

module.exports = { getAllHospitals, createHospital };
