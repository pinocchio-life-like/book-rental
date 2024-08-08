import React from "react";
import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const SidebarIconButton = ({ onClick, expanded }) => (
  <IconButton
    onClick={onClick}
    sx={{ color: "#fff", marginLeft: expanded ? "" : 1 }}>
    <MenuIcon />
  </IconButton>
);

export default SidebarIconButton;
