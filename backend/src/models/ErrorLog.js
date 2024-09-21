const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({
  errorType: String,
  location: String,
  message: String,
  time: { type: Date, default: Date.now },
});

const ErrorLog = mongoose.model("ErrorLog", errorLogSchema);

const logErrorToDB = async (err, location, time) => {
  const errorLog = new ErrorLog({
    errorType: err.name || "Unknown",
    location,
    message: err.message || "No message available",
    time,
  });

  try {
    await errorLog.save();
    console.log("Error logged to MongoDB");
  } catch (saveErr) {
    console.error("Failed to log error to MongoDB:", saveErr);
  }
};

module.exports = { ErrorLog, logErrorToDB };
