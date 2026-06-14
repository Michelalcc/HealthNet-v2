const router   = require("express").Router();
const ctrl     = require("../controllers/dashboard.controller");
const auth     = require("../middleware/auth.middleware");
const hospital = require("../middleware/hospital.middleware");

router.get("/", auth, hospital, ctrl.getDashboard);

module.exports = router;
