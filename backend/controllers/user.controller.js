const service = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    res.json({ ok: true, data: await service.getAllUsers() });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nombre, email, password, rol, hospital_id } = req.body;

    // Validaciones básicas
    if (!email || !password)
      return res.status(400).json({ ok: false, message: "Email y contraseña son obligatorios" });

    const rolesValidos = ["admin", "doctor", "especialista"];
    if (!rolesValidos.includes(rol))
      return res.status(400).json({ ok: false, message: `Rol inválido. Usa: ${rolesValidos.join(", ")}` });

    const data = await service.createUser({ nombre, email, password, rol, hospital_id });
    res.json({ ok: true, data });
  } catch (e) {
    // e.message puede ser "El email ya está registrado" o un error de BD
    const status = e.message.includes("registrado") ? 409 : 500;
    res.status(status).json({ ok: false, message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Proteger al admin principal (id=1)
    if (id === 1)
      return res.status(403).json({ ok: false, message: "No se puede eliminar al administrador principal" });

    await service.deleteUser(id);
    res.json({ ok: true, message: "Usuario eliminado correctamente" });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

module.exports = { getUsers, createUser, deleteUser };