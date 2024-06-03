import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UserModal from "components/UserModal";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUserToEdit(null);
    fetchUsers();
  };

  const handleSave = async (user) => {
    if (userToEdit) {
      // Edit user
      await axios.put(`http://localhost:8000/users/${userToEdit.id}`, user);
    } else {
      // Add new user
      await axios.post("http://localhost:8000/users", user);
    }
    handleClose();
  };

  return (
    <Box p={3}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>Function</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Employed</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar alt={user.first_name} src={user.avatar} />
                    <Box ml={2}>
                      <Typography variant="body1">{`${user.first_name} ${user.paternal_last_name}`}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{user.function}</TableCell>
                <TableCell>{user.status ? "Online" : "Offline"}</TableCell>
                <TableCell>{new Date(user.employed_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserModal
        open={open}
        handleClose={handleClose}
        userToEdit={userToEdit}
        handleSave={handleSave}
      />
    </Box>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

export default UsersTable;