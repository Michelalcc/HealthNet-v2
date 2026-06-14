const router   = require("express").Router();
const ctrl     = require("../controllers/patient.controller");
const auth     = require("../middleware/auth.middleware");
const hospital = require("../middleware/hospital.middleware");

router.get("/search", auth, hospital, ctrl.searchPatient);   // DEBE ir antes de /:id
router.get("/",       auth, hospital, ctrl.getPatients);
router.get("/:id",    auth, hospital, ctrl.getPatientById);
router.post("/",      auth, hospital, ctrl.createPatient);
router.put("/:id",    auth, hospital, ctrl.updatePatient);

module.exports = router;