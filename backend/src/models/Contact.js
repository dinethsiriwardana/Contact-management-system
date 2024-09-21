const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: String,
  contact: String,
});

const Contact = mongoose.model("Contact", contactsSchema);

module.exports = { Contact };
