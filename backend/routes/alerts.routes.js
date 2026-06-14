// ============================================================
// HEALTHNET V2 — alerts.routes.js
// CORRECCIÓN: maneja gracefully si la tabla alerts no existe,
// y también devuelve los últimos diagnósticos como actividad
// Guardar en: backend/routes/alerts.routes.js
// ============================================================

const router = require("express").Router();
const auth   = require("../middleware/auth.middleware");
const pool   = require("../config/db");

router.get("/", auth, async (req, res) => {
  try {
    const { rol, hospital_id } = req.user;

    // 1. Intentar leer la tabla alerts
    let alertas = [];
    try {
      const result = rol === "admin"
        ? await pool.query(
            "SELECT * FROM alerts ORDER BY created_at DESC LIMIT 10"
          )
        : await pool.query(
            "SELECT * FROM alerts WHERE hospital_id=$1 ORDER BY created_at DESC LIMIT 10",
            [hospital_id]
          );
      alertas = result.rows;
    } catch (tableErr) {
      // Si la tabla no existe aún, no es error crítico
      console.warn("Tabla alerts no disponible:", tableErr.message);
    }

    // 2. Complementar con los últimos diagnósticos como actividad
    let diagActividad = [];
    try {
      const diagQuery = rol === "admin"
        ? await pool.query(`
            SELECT
              d.created_at,
              'Diagnóstico ' || d.resultado || ' registrado para paciente ' || p.nombre AS mensaje,
              CASE d.resultado
                WHEN 'alto'  THEN 'critical'
                WHEN 'medio' THEN 'warning'
                ELSE              'info'
              END AS tipo,
              p.hospital_id
            FROM diagnosticos d
            JOIN patients p ON d.paciente_id = p.id
            ORDER BY d.created_at DESC
            LIMIT 5
          `)
        : await pool.query(`
            SELECT
              d.created_at,
              'Diagnóstico ' || d.resultado || ' registrado para paciente ' || p.nombre AS mensaje,
              CASE d.resultado
                WHEN 'alto'  THEN 'critical'
                WHEN 'medio' THEN 'warning'
                ELSE              'info'
              END AS tipo,
              p.hospital_id
            FROM diagnosticos d
            JOIN patients p ON d.paciente_id = p.id
            WHERE p.hospital_id = $1
            ORDER BY d.created_at DESC
            LIMIT 5
          `, [hospital_id]);
      diagActividad = diagQuery.rows;
    } catch (e) {
      console.warn("Error leyendo diagnósticos para actividad:", e.message);
    }

    // 3. Unir y ordenar por fecha desc, limitar a 10
    const combinado = [...alertas, ...diagActividad]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);

    res.json({ ok: true, data: combinado });

  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
});

module.exports = router;
