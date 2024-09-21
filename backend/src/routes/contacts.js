const express = require("express");
const router = express.Router();
const { Contact } = require("../models/Contact");
const { handleError } = require("../middlewares/handleError");

// POST /adddata
router.post("/adddata", async (req, res) => {
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
router.get("/showdata", async (req, res) => {
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
router.get("/showdata/:name", async (req, res) => {
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

// PUT /updatedata/:name
router.put("/updatedata/:name", async (req, res) => {
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

// DELETE /deletedata/:name
router.delete("/deletedata/:name", async (req, res) => {
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

module.exports = router;
