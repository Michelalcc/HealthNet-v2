const jwt = require("../utils/jwt");

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header)
      return res.status(401).json({ ok: false, message: "No autorizado: falta token" });

    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token)
      return res.status(401).json({ ok: false, message: "Formato de token inválido" });

    req.user = jwt.verifyToken(token);
    next();
  } catch {
    res.status(401).json({ ok: false, message: "Token inválido o expirado" });
  }
};