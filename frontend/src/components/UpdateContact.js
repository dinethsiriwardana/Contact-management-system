import React, { useState } from "react";
import { Button, TextField, Modal, Box, Typography } from "@mui/material";

function UpdateContact({ contact, handleUpdateContact }) {
  const [showModal, setShowModal] = useState(false);
  const [updatedName, setUpdatedName] = useState(contact.name);
  const [updatedContact, setUpdatedContact] = useState(contact.contact);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateContact({ name: updatedName, contact: updatedContact });
    setShowModal(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => setShowModal(true)}
      >
        Update
      </Button>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Contact
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              margin="normal"
              fullWidth
              sx={{ mt: 2 }}
            />

            <TextField
              label="Contact"
              value={updatedContact}
              onChange={(e) => setUpdatedContact(e.target.value)}
              margin="normal"
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default UpdateContact;
