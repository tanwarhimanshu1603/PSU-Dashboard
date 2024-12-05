import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import {Link as LinkScroll} from "react-scroll";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const redirectToApprovals = () => {
    navigate("/admin", { state: { scrollTo: "approvals" } });
  };

  const handleLogout = ()=>{
    localStorage.removeItem('jwtToken');
    navigate('/')
  }

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
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
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <LinkScroll onClick={redirectToApprovals} to="/admin" smooth duration={1000} style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Approvals</span>
            </li>
          </LinkScroll>
          <p className="title">USER</p>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
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
