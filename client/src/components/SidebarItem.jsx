import React from "react";
import { ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const SidebarItem = ({ to, icon, text, expanded }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <ListItem
      button
      component={RouterLink}
      to={to}
      sx={{
        bgcolor: isActive(to) ? "#00ABFF" : "transparent",
        borderRadius: "5px",
        "&:hover": {
          bgcolor: "#00ABFF40",
        },
      }}>
      <ListItemIcon sx={{ color: "#fff" }}>
        <Box
          component="img"
          src={icon}
          alt={`${text} Icon`}
          sx={{ width: 24, height: 24 }}
        />
      </ListItemIcon>
      {expanded && (
        <ListItemText
          primary={text}
          primaryTypographyProps={{ noWrap: true }}
        />
      )}
    </ListItem>
  );
};

export default SidebarItem;
