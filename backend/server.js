require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "../frontend")));

const authRoutes      = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const diagnosisRoutes = require("./routes/diagnosis.routes");
const patientRoutes   = require("./routes/patient.routes");
const alertsRoutes    = require("./routes/alerts.routes");
const userRoutes      = require("./routes/user.routes");
const hospitalRoutes  = require("./routes/hospital.routes");

app.use("/api/auth",      authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/pacientes", patientRoutes);
app.use("/api/alerts",    alertsRoutes);
app.use("/api/users",     userRoutes);
app.use("/api/hospitals", hospitalRoutes);

// Catch-all: devolver index para rutas frontend
app.use("/pages", express.static(path.join(__dirname, "../frontend/pages")));

app.use((err, req, res, next) => {
  console.error("ERROR GLOBAL:", err);
  res.status(500).json({ ok: false, message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅  Servidor corriendo en http://localhost:${PORT}`));