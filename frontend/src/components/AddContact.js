import React, { useState } from "react";
import { Button, TextField, Modal, Box, Typography } from "@mui/material";

function AddContact({ open, onClose, handleAddContact }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddContact({ name, contact });
    setName("");
    setContact("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          Add Contact
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            fullWidth
            sx={{ mt: 2 }}
          />

          <TextField
            label="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
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
            Add Contact
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default AddContact;
