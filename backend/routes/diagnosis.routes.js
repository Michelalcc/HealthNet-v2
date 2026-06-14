const router   = require("express").Router();
const ctrl     = require("../controllers/diagnosis.controller");
const auth     = require("../middleware/auth.middleware");
const hospital = require("../middleware/hospital.middleware");

router.post("/",             auth, hospital, ctrl.create);
router.get("/",               auth, hospital, ctrl.getAll);
router.get("/paciente/:id",  auth, hospital, ctrl.getByPatient);

module.exports = router;