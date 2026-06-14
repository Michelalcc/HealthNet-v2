const service = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ ok: false, message: "Email y password requeridos" });

    const result = await service.login(email, password);
    res.json({ ok: true, ...result });
  } catch (e) {
    res.status(401).json({ ok: false, message: e.message });
  }
};

module.exports = { login };