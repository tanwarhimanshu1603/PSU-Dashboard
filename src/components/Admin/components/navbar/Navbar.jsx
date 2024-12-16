import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Download from "../download/Download";

const Navbar = ({setSearchTerm,filteredData}) => {
  let debounceTimeout;

  const handleSearch = (e) => {
    const value = e.target.value;

    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      setSearchTerm(value); 
    }, 500); 
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..."  onChange={handleSearch} />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">            
            <Download filteredData={filteredData} />
          </div>
          <div className="item">
            <img
              src="https://res.cloudinary.com/dczif4pj4/image/upload/v1734180819/gmtnwdvmduhiuk7hrpxp.jpg"
              alt="admin_image"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
