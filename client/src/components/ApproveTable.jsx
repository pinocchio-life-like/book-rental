import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Avatar,
  Box,
  Switch,
  Button,
} from "@mui/material";
import useAbility from "../hooks/useAbility";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridOnIcon from "@mui/icons-material/GridOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import checkIcon from "../assets/checkIcon.svg";

const owners = {
  "Nardos T": "https://randomuser.me/api/portraits/women/14.jpg",
  "Harry M": "https://randomuser.me/api/portraits/men/24.jpg",
  "Tesfu N": "https://randomuser.me/api/portraits/men/16.jpg",
};

const rows = [
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Pending",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
  {
    no: 1,
    owner: "Nardos T",
    upload: "15 Books",
    location: "Addis Ababa",
    status: "Active",
    action: "Approve",
  },
];

const ApproveTable = () => {
  const ability = useAbility();
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "15px",
        bgcolor: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}>
      <Box sx={{ display: "flex", justifyContent: "right", mb: 2 }}>
        <Box>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <FilterListIcon />
          </IconButton>
          <IconButton>
            <ViewListIcon />
          </IconButton>
          <IconButton>
            <GridOnIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" color="text.primary">
          List of Owner
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: "none",
          mt: 0,
          height: "79.72vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
            opacity: "30%",
          },
          "&::-webkit-scrollbar-track": {
            background: "#fff",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#A3A3A3",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#656575" }}>No.</TableCell>
              <TableCell sx={{ color: "#656575" }}>Owner</TableCell>
              <TableCell sx={{ color: "#656575" }}>Upload</TableCell>
              <TableCell sx={{ color: "#656575" }}>Location</TableCell>
              <TableCell sx={{ color: "#656575" }}>Status</TableCell>
              {ability.can("update", "Book") && (
                <>
                  <TableCell sx={{ color: "#656575" }}>Action</TableCell>
                  <TableCell sx={{ color: "#656575" }}></TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{`0${row.no}`}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={owners[row.owner]}
                      alt={row.owner}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography>{row.owner}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "#656575" }}>
                    {row.upload}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: "#656575" }}>
                    {row.location}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor:
                          row.status === "Active" ? "#0080001A" : "#f8d7da",
                        padding: "2px 15px",
                        borderRadius: "15px",
                      }}>
                      {row.status === "Active" && (
                        <Box
                          component="img"
                          src={checkIcon}
                          alt={"Check Icon"}
                          sx={{ width: 16, height: 16, mr: 2 }}
                        />
                      )}
                      <Typography
                        sx={{
                          color:
                            row.status === "Active" ? "#28a745" : "#a72845",
                          fontSize: "1rem",
                        }}
                        variant="body2">
                        {row.status}
                      </Typography>
                      <Switch
                        checked={row.status === "Active"}
                        inputProps={{ "aria-label": "controlled" }}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#28a745",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#28a745",
                            },
                        }}
                      />
                    </Box>
                  </Box>
                </TableCell>
                {ability.can("update", "Book") && (
                  <TableCell>
                    <IconButton aria-label="view" size="small">
                      <VisibilityIcon
                        sx={{ color: "black", width: 26, height: 26, mr: 1 }}
                        fontSize="inherit"
                      />
                    </IconButton>
                    <IconButton aria-label="delete" size="small">
                      <DeleteIcon
                        sx={{ color: "red", width: 26, height: 26 }}
                        fontSize="inherit"
                      />
                    </IconButton>
                  </TableCell>
                )}
                {ability.can("update", "Book") && (
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor:
                          row.action === "Approved" ? "#007bff" : "#6c757d",
                        color: "#fff",
                        "&:hover": {
                          bgcolor:
                            row.action === "Approved" ? "#0056b3" : "#5a6268",
                        },
                      }}>
                      {row.action}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApproveTable;
