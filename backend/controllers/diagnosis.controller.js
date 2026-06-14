const service        = require("../services/diagnosis.service");
const patientService = require("../services/patient.service");

const create = async (req, res) => {
  try {
    const { paciente_id, tiene_fibroma, recomendacion_manual, resultado, probabilidad } = req.body;
    const { id: doctor_id, rol } = req.user;

    if (!paciente_id)
      return res.status(400).json({ ok: false, message: "paciente_id es requerido" });

    // Buscar paciente: admin sin restricción, doctor busca en su hospital
    // PERO también permitimos que el doctor vea pacientes de su hospital aunque
    // el paciente haya sido registrado por otro doctor (mismo hospital)
    let patient = await patientService.getPatientById(paciente_id);

    if (!patient)
      return res.status(404).json({ ok: false, message: "Paciente no encontrado en el sistema" });

    // Solo bloquear si el paciente tiene hospital explícito diferente al del usuario
    // Pacientes con hospital_id NULL son accesibles por cualquier doctor/especialista
    if (rol !== "admin" && patient.hospital_id !== null && patient.hospital_id !== req.hospital_id)
      return res.status(403).json({ ok: false, message: "El paciente pertenece a otro hospital" });

    // Construir datos del diagnóstico
    let aiData;
    if (resultado && probabilidad !== undefined) {
      const prob = parseFloat(probabilidad);
      aiData = {
        probabilidad: prob,
        resultado:    resultado.toLowerCase(),
        tiene_fibroma: tiene_fibroma ?? prob > 0.6,
        recomendacion: recomendacion_manual ||
          (prob > 0.7 ? "Evaluación urgente recomendada"
            : prob > 0.4 ? "Seguimiento médico sugerido"
            : "Sin riesgo significativo")
      };
    } else {
      aiData = await service.runAI();
      aiData.tiene_fibroma  = tiene_fibroma ?? aiData.tiene_fibroma;
      aiData.recomendacion  = recomendacion_manual || aiData.recomendacion;
    }

    const data = await service.createDiagnosis({ paciente_id, ...aiData, doctor_id });
    res.json({ ok: true, data });
  } catch (e) {
    console.error("Error en create diagnosis:", e);
    res.status(500).json({ ok: false, message: e.message });
  }
};

const getByPatient = async (req, res) => {
  try {
    const data = await service.getByPatient(req.params.id);
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

const getAll = async (req, res) => {
  try {
    const { rol, id: doctor_id, hospital_id } = req.user;
    const data = await service.getAll({
      rol,
      hospital_id: req.hospital_id || hospital_id || null,
      doctor_id
    });
    res.json({ ok: true, data });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

module.exports = { create, getByPatient, getAll };