import React from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Cierra el menú antes de navegar
    handleClose();
    // Aquí puedes agregar cualquier lógica de cierre de sesión, como limpiar tokens, etc.
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
        <Avatar sx={{ width: 32, height: 32 }}>E</Avatar>
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
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar sx={{ width: 32, height: 32 }}>E</Avatar>
          <Typography variant="body1">Emmanuel Dorantes Ayala</Typography>
        </MenuItem>
        <MenuItem>Perfil</MenuItem>
        <MenuItem>Configuración personal</MenuItem>
        <MenuItem>Notificaciones</MenuItem>
        <MenuItem>Tema</MenuItem>
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
