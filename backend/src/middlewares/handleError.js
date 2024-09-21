const { logErrorToDB } = require("../models/ErrorLog");

const handleError = async (err, req, res, next) => {
  console.error("Error:", err.message);
  await logErrorToDB(err, `${req.method} ${req.url}`, new Date());
  res.status(500).json({ error: "An unexpected error occurred." });
};

module.exports = { handleError };
