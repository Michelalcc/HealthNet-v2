const log = (level, msg, data = "") => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] [${level.toUpperCase()}] ${msg}`, data);
};

module.exports = {
  info:  (msg, d) => log("info",  msg, d),
  warn:  (msg, d) => log("warn",  msg, d),
  error: (msg, d) => log("error", msg, d)
};