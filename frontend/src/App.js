import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContactList from "./components/ContactList";
import SearchBar from "./components/SearchBar";
import AddContact from "./components/AddContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const apiUrl = window.config.API_URL;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/showdata`);
      setContacts(response.data.contacts);
      setFilteredContacts(response.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(term.toLowerCase()) ||
        contact.contact.includes(term)
    );
    setFilteredContacts(filtered);
  };

  const handleAddContact = async (newContact) => {
    try {
      await axios.post(`${apiUrl}/adddata`, newContact);
      fetchContacts();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      await axios.put(`${apiUrl}/updatedata/${updatedContact.name}`, {
        contact: updatedContact.contact,
      });
      fetchContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async (name) => {
    try {
      await axios.delete(`${apiUrl}/deletedata/${name}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1">
          Contact Manager
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <IconButton sx={{ ml: 2 }} onClick={handleOpenModal}>
          <AddIcon
            sx={{
              fontSize: 40,
              color: "primary.main",
            }}
          />
        </IconButton>
      </Box>

      <AddContact
        open={openModal}
        onClose={handleCloseModal}
        handleAddContact={handleAddContact}
      />

      <Box sx={{ mt: 4 }}>
        <ContactList
          contacts={filteredContacts}
          handleUpdateContact={handleUpdateContact}
          handleDeleteContact={handleDeleteContact}
        />
      </Box>
    </Container>
  );
}

export default App;
