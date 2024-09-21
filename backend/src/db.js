const mongoose = require("mongoose");
const { logErrorToDB } = require("./models/ErrorLog");

require("dotenv").config();

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
const maxRetries = 5;

const connectWithRetry = async (retries = maxRetries) => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    if (retries > 0) {
      console.error(
        `MongoDB connection error: ${err}. Retrying... ${retries} attempts left`
      );
      setTimeout(() => connectWithRetry(retries - 1), 5000);
    } else {
      console.error("MongoDB connection failed after multiple attempts.");
      await logErrorToDB(err, "MongoDB Connection", new Date());
    }
  }
};

module.exports = { connectWithRetry };
