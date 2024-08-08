import React, { useState } from "react";
import { Box, List, Button } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import logo3 from "../assets/logo3.svg";
import plusIcon from "../assets/plusIcon.svg";
import dashboardIcon from "../assets/dashboardIcon.svg";
import uploadIcon from "../assets/uploadIcon.svg";
import notificationIcon from "../assets/notificationIcon.svg";
import settingsIcon from "../assets/settingsIcon.svg";
import userIcon from "../assets/userIcon.svg";
import ownersIcon from "../assets/ownersIcon.svg";
import SidebarIconButton from "./SidebarIconButton";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        width: expanded ? 240 : 60,
        bgcolor: "#171B36",
        color: "#fff",
        height: "100vh",
        p: 2,
        transition: "width 0.3s",
        borderRadius: "15px",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}>
        <SidebarIconButton onClick={toggleSidebar} expanded={expanded} />
        <SidebarLogo expanded={expanded} />
      </Box>
      <List>
        <SidebarItem
          to="/dashboard"
          icon={dashboardIcon}
          text="Dashboard"
          expanded={expanded}
        />
        <SidebarItem
          to="/book-upload"
          icon={uploadIcon}
          text="Book Upload"
          expanded={expanded}
        />
        <SidebarItem
          to="/owners"
          icon={ownersIcon}
          text="Owners"
          expanded={expanded}
        />
        <SidebarItem
          to="/other1"
          icon={plusIcon}
          text="Other"
          expanded={expanded}
        />
        <SidebarItem
          to="/other2"
          icon={plusIcon}
          text="Other"
          expanded={expanded}
        />
        <SidebarItem
          to="/other3"
          icon={plusIcon}
          text="Other"
          expanded={expanded}
        />
      </List>
      <List sx={{ mt: 2 }}>
        <SidebarItem
          to="/notification"
          icon={notificationIcon}
          text="Notification"
          expanded={expanded}
        />
        <SidebarItem
          to="/setting"
          icon={settingsIcon}
          text="Setting"
          expanded={expanded}
        />
        <SidebarItem
          to="/admin-login"
          icon={userIcon}
          text="Login as Admin"
          expanded={expanded}
        />
      </List>
      <Button
        startIcon={<LogoutIcon />}
        fullWidth={expanded}
        variant="contained"
        sx={{ bgcolor: "#FFFFFF33", mt: "auto", mb: 2, bottom: 2 }}>
        {expanded ? "Logout" : ""}
      </Button>
    </Box>
  );
};

export default Sidebar;
