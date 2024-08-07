import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadIcon from "@mui/icons-material/CloudUpload";
import OtherIcon from "@mui/icons-material/MoreHoriz";
import NotificationIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/logo1.svg";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#171b36",
        color: "#fff",
        height: "100vh",
        p: 2,
      }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
        <Typography variant="h6">Book Rent</Typography>
      </Box>
      <List>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <UploadIcon />
          </ListItemIcon>
          <ListItemText primary="Book Upload" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <OtherIcon />
          </ListItemIcon>
          <ListItemText primary="Other" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <OtherIcon />
          </ListItemIcon>
          <ListItemText primary="Other" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <OtherIcon />
          </ListItemIcon>
          <ListItemText primary="Other" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <NotificationIcon />
          </ListItemIcon>
          <ListItemText primary="Notification" />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "#fff" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItem>
      </List>
      <Button
        startIcon={<LogoutIcon />}
        fullWidth
        variant="contained"
        sx={{ bgcolor: "#ff5252", mt: 2, mb: 2 }}>
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
