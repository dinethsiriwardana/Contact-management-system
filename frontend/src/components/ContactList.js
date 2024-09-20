import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import UpdateContact from "./UpdateContact";

function ContactList({ contacts, handleUpdateContact, handleDeleteContact }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) =>
            contact.name && contact.contact ? (
              <TableRow key={contact.name}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.contact}</TableCell>
                <TableCell>
                  <UpdateContact
                    contact={contact}
                    handleUpdateContact={handleUpdateContact}
                  />
                  &nbsp; &nbsp; &nbsp;
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteContact(contact.name)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ) : null
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContactList;
