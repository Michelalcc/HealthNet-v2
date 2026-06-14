const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidDni   = (dni)   => /^\d{8}$/.test(String(dni));
const isPositive   = (n)     => Number(n) > 0;

module.exports = { isValidEmail, isValidDni, isPositive };