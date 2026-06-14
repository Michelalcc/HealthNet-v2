const service = require("../services/hospital.service");

const getHospitals    = async (req, res) => {
  try { res.json({ ok: true, data: await service.getAllHospitals() }); }
  catch (e) { res.status(500).json({ ok: false, message: e.message }); }
};

const createHospital  = async (req, res) => {
  try { res.json({ ok: true, data: await service.createHospital(req.body) }); }
  catch (e) { res.status(500).json({ ok: false, message: e.message }); }
};

module.exports = { getHospitals, createHospital };
