module.exports = (roles = []) => (req, res, next) => {
  try {
    if (!req.user?.rol)
      return res.status(401).json({ ok: false, message: "No autenticado" });

    const rol = req.user.rol.toLowerCase().trim();
    if (!roles.includes(rol))
      return res.status(403).json({ ok: false, message: "No autorizado para este rol" });

    next();
  } catch {
    res.status(500).json({ ok: false, message: "Error validación de roles" });
  }
};