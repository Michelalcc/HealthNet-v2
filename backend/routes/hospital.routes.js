const router = require("express").Router();
const ctrl   = require("../controllers/hospital.controller");
const auth   = require("../middleware/auth.middleware");
const role   = require("../middleware/role.middleware");

router.get("/",  auth, ctrl.getHospitals);
router.post("/", auth, role(["admin"]), ctrl.createHospital);

module.exports = router;
