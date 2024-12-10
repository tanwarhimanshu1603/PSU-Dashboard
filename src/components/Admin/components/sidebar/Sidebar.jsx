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
const Sidebar = ({ requestCount }) => {
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const redirectToApprovals = () => {
    navigate("/admin", { state: { scrollTo: "approvals" } });
  };

  const handleLogout = () => {
    setLoading(true);  // Start showing the progress bar
    setTimeout(() => {
      localStorage.removeItem('jwtToken');
      navigate('/')
      setLoading(false); // Hide the progress bar after 3 seconds
      // You can also add your logout logic here
    }, 3000);
  }

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
          <span className="logo">Vikrant</span>
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
          <li onClick={handleLogout}>
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
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
