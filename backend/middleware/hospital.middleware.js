module.exports = (req, res, next) => {
  try {
    if (!req.user)
      return res.status(401).json({ ok: false, message: "No autenticado" });

    const { rol, hospital_id } = req.user;

    // Admin puede operar sin hospital_id
    if (rol === "admin") return next();

    if (!hospital_id)
      return res.status(403).json({ ok: false, message: "Sin hospital asignado al usuario" });

    req.hospital_id = hospital_id;
    next();
  } catch {
    res.status(500).json({ ok: false, message: "Error validación hospitalaria" });
  }
};