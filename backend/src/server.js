const express = require("express");
const cors = require("cors");
const { connectWithRetry } = require("./db");
const contactRoutes = require("./routes/contacts");
const { logRequest } = require("./middlewares/logRequest");

require("dotenv").config();

//app setup
const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

// connect to db
connectWithRetry();

// Middleware
app.use(logRequest);

// Routes
app.use("", contactRoutes);

// Error handling middleware
const { handleError } = require("./middlewares/handleError");
app.use(handleError);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
