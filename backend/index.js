const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const env = require("dotenv").config();

//app setup
const app = express();
app.use(cors());

const port = 3001;

app.use(express.json());

//connect to db
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//Schema
const contactsSchema = new mongoose.Schema({
  name: String,
  contact: String,
});

//model
const Contact = mongoose.model("Contact", contactsSchema);

// Middleware for logging request details
const logRequest = (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
};

// Middleware for handling errors
const handleError = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "An unexpected error occurred." });
};

// Routes
app.use(logRequest);

// POST /adddata
app.post("/adddata", async (req, res) => {
  try {
    const { name, contact } = req.body;

    if (!name || !contact) {
      return res.status(400).json({ error: "Name and contact are required." });
    }

    const newContact = new Contact({ name, contact });
    await newContact.save();

    res
      .status(201)
      .json({ message: "Contact added successfully.", contact: newContact });
  } catch (err) {
    handleError(err, req, res);
  }
});

// GET /showdata
app.get("/showdata", async (req, res) => {
  try {
    const contacts = await Contact.find().lean();

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ error: "No contacts found." });
    }

    res.status(200).json({ contacts });
  } catch (err) {
    handleError(err, req, res);
  }
});

// GET /showdata/:name
app.get("/showdata/:name", async (req, res) => {
  try {
    const contact = await Contact.findOne({ name: req.params.name }).lean();

    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.status(200).json(contact);
  } catch (err) {
    handleError(err, req, res);
  }
});

// GET /showdatacon/:contact
app.get("/showdatacon/:contact", async (req, res) => {
  try {
    const contact = await Contact.findOne({
      contact: req.params.contact,
    }).lean();

    if (!contact) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.status(200).json(contact);
  } catch (err) {
    handleError(err, req, res);
  }
});

// PUT /updatedata/:name
app.put("/updatedata/:name", async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({ error: "Contact is required." });
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { name: req.params.name },
      { contact },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    handleError(err, req, res);
  }
});

// PUT /updatedatabycon/:contact
app.put("/updatedatabycon/:contact", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { contact: req.params.contact },
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    handleError(err, req, res);
  }
});

// DELETE /deletedata/:name
app.delete("/deletedata/:name", async (req, res) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      name: req.params.name,
    });

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (err) {
    handleError(err, req, res);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
