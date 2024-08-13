import { useState } from "react";
import { Box, List, Button } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
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
import useAuth from "../hooks/useAuth";
import useAbility from "../hooks/useAbility";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { logout } = useAuth();
  const ability = useAbility();

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
        position: "relative",
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
      <List
        sx={{
          borderTop: "0.5px solid #F8F8F880",
          borderBottom: "0.5px solid #F8F8F880",
          py: 4,
        }}>
        <SidebarItem
          to="/dashboard"
          icon={dashboardIcon}
          text="Dashboard"
          expanded={expanded}
        />
        {ability.can("manages", "Book") && (
          <SidebarItem
            to="/books"
            icon={uploadIcon}
            text="Books"
            expanded={expanded}
          />
        )}
        {ability.can("upload", "Book") && (
          <SidebarItem
            to="/book-upload"
            icon={uploadIcon}
            text="Book Upload"
            expanded={expanded}
          />
        )}
        {ability.can("manages", "Owners") && (
          <SidebarItem
            to="/owners"
            icon={ownersIcon}
            text="Owners"
            expanded={expanded}
          />
        )}
        {ability.can("upload", "Book") && (
          <SidebarItem
            to="/other1"
            icon={plusIcon}
            text="Other"
            expanded={expanded}
          />
        )}
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
      <List sx={{ mt: 2, borderBottom: "0.5px solid #F8F8F880", pb: 4 }}>
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
        {ability.can("upload", "Book") && (
          <SidebarItem
            to="/admin-login"
            icon={userIcon}
            text="Login as Admin"
            expanded={expanded}
          />
        )}
        {ability.cannot("upload", "Book") && (
          <SidebarItem
            to="/admin-login"
            icon={userIcon}
            text="Login as Owner"
            expanded={expanded}
          />
        )}
      </List>
      <Button
        startIcon={<LogoutIcon />}
        fullWidth={expanded}
        onClick={() => logout()}
        variant="contained"
        sx={{
          bgcolor: "#FFFFFF33",
          position: "absolute",
          bottom: 100,
          margin: "auto",
          maxWidth: 238,
        }}>
        {expanded ? "Logout" : ""}
      </Button>
    </Box>
  );
};

export default Sidebar;
