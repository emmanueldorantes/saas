import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar, Divider, ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "UserContext";
import Logout from "@mui/icons-material/Logout";

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/authentication/sign-in");
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>{user ? user.first_name[0] : "U"}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 0,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            "& .MuiTypography-root": {
              color: "inherit",
              "&:hover": {
                color: "inherit",
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar sx={{ width: 32, height: 32 }} />
          {user ? `${user.first_name} ${user.paternal_last_name}` : "Usuario"}
        </MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>Perfil</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;
