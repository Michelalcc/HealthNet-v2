const service = require("../services/dashboard.service");

const getDashboard = async (req, res) => {
  try {
    const { rol } = req.user;
    const data = rol === "admin"
      ? await service.getAdminStats()
      : await service.getHospitalStats(req.hospital_id);
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

module.exports = { getDashboard };
