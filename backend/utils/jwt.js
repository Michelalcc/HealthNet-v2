const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });

const verifyToken = (token) =>
  jwt.verify(token, JWT_SECRET);

module.exports = { generateToken, verifyToken };