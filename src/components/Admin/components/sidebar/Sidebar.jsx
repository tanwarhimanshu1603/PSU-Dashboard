import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link as LinkScroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";
import ConfirmDialog from "../../../../utils/ConfirmDialog";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
const Sidebar = ({ requestCount,employeeCount }) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);

  const redirectToApprovals = () => {
    navigate("/admin", { state: { scrollTo: "approvals" } });
  };

  const handleLogout = () => {
    setLoading(true);  // Start showing the progress bar
    setTimeout(() => {
      logout();
      setLoading(false); // Hide the progress bar after 3 seconds
      navigate("/");
      // You can also add your logout logic here
    }, 3000);
  }
  const handleDialogClose = (confirm) => {
    setDialogOpen(false); // Close the dialog
    if (confirm) {
      handleLogout();
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          {/* <div className="item">
            <img style={{borderRadius:"50%"}} width={"20px"}
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="admin_image"
              className="avatar"
            />
          </div> */}
          <span className="logo" style={{color:"#1976d2"}}>Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to='/admin' style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/admin/employees" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Employees</span>
              <div style={{ marginLeft: '2px' }}><Badge
                badgeContent={employeeCount}
              /></div>
            </li>
          </Link>
          <Link to="/admin/approval-requests" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Approvals</span>
              <div style={{ color: "white" }}><Badge
                badgeContent={requestCount}
                color="error"
                sx={{
                  marginLeft: "18px",
                }}
              /></div>

            </li>
          </Link>
          <p className="title">USER</p>
          <li onClick={()=>setDialogOpen(true)}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          {loading && (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>
          )}
        </ul>
      </div>
      <ConfirmDialog 
        open={dialogOpen}
        handleClose={(confirm) => handleDialogClose(confirm)}
        message={"Are you sure you want to logout?"}
        buttonText = {"Logout"}
      />
      
    </div>
  );
};

export default Sidebar;
