import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const UserModal = ({ open, handleClose, userToEdit, handleSave }) => {
  const [user, setUser] = useState({
    first_name: "",
    paternal_last_name: "",
    maternal_last_name: "",
    email: "",
    function: "",
    status: false,
    employed_date: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    } else {
      setUser({
        first_name: "",
        paternal_last_name: "",
        maternal_last_name: "",
        email: "",
        function: "",
        status: false,
        employed_date: "",
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    handleSave(user);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{userToEdit ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          name="first_name"
          value={user.first_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Paternal Last Name"
          name="paternal_last_name"
          value={user.paternal_last_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Maternal Last Name"
          name="maternal_last_name"
          value={user.maternal_last_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Function"
          name="function"
          value={user.function}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Status"
          name="status"
          value={user.status}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Employed Date"
          name="employed_date"
          value={user.employed_date}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userToEdit: PropTypes.object,
  handleSave: PropTypes.func.isRequired,
};

export default UserModal;