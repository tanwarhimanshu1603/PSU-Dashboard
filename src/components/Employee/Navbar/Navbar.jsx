import React, { useEffect, useState,useCallback } from 'react'
import '../Navbar/Navbar.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Avatar,Button, Menu, MenuItem, Drawer, List, TextField, Stack, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { resultColumns } from '../searchResultDatatableColumn';
import { DataGrid } from '@mui/x-data-grid';
import GLOBAL_CONFIG from '../../../constants/global';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import debounce from 'lodash/debounce';
function Navbar({empImage,empName,loading,setLoading}) {
    let debounceTimeout;
    const navigate = useNavigate();
    const [searchQuery,setSearchQuery]=useState('');
    const [searchResultData,setSearchResultData]=useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerState, setDrawerState] = React.useState({left:false,right: false,top:false,bottom:false});
    const open = Boolean(anchorEl);

    const handleImgDropDown = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleDropDownClose = () => {
        setAnchorEl(null);
    }
    const handleBack = () => {
        navigate(-1);
    }
    const handleLogout = () => {
        setAnchorEl(null);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            localStorage.removeItem("empId"); // Remove empId from localStorage
            localStorage.removeItem("empToken"); // Remove login status
            localStorage.removeItem("isLoggedIn");
            navigate("/"); // Redirect to the homepage
          
        }, 3000);
      }
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setDrawerState({ ...drawerState, [anchor]: open });
    };
    const handleRowClick = (params) => {
      toggleDrawer("right", false);  
      const selectedEmployee = params.row;  
      navigate(`${selectedEmployee.empId}`, { state: { employee: selectedEmployee } }); 
    };
    const searchEmployees = async(searchTerm)=>{
      if(searchTerm===''){
        setSearchResultData([]);
        return
      }
      try {
        const response = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/employee/getEmp/${searchTerm}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data= JSON.parse(await response.text())
        setSearchResultData(data)
       
      } catch (error) {
        
      }
    }
    const debouncedFetch = useCallback(
      debounce((searchTerm) => {
        searchEmployees(searchTerm);
      }, 500), // Adjust debounce delay as needed
      []
    );
   
    const handleSearch = (e) => {
      
      const value = e.target.value;
      setSearchQuery(value);
      debouncedFetch(value);
    };
    if(loading){
      return (
        <>
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="inherit" />
        </Stack>
        <Box sx={{display:"flex" , justifyContent:"center" ,alignItems:"center"}}>
          Please wait...
        </Box>
        </>
      )
    }

  return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'fixed',
                    top: 0, // Ensures it's pinned to the top of the viewport
                    left: 0, // Ensures alignment with the left edge
                    right: 0, // Ensures it spans the full width of the screen
                    zIndex: 1000, // High z-index to stay on top of other elements
                    backgroundColor: 'background.paper', // Professional background color (can customize)
                    padding: 2, // Adds padding around the content
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow
                }}
            >
              
                <Button onClick={handleBack} variant="text" sx={{ display: 'flex', gap: 1 }}>
                    <ArrowBackIcon />
                    Back
                </Button>
                <Box sx={{cursor:"pointer",display:"flex",alignItems:"center"}}>
                  <Button onClick={toggleDrawer("right", true)} sx={{ alignItems: "center" }}>
                    <SearchOutlinedIcon sx={{ marginRight: "20px" }} />
                  </Button>

                  <Box >

                    <Avatar aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleImgDropDown} alt={empName} src={empImage} />
                      <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleDropDownClose}
                          MenuListProps={{
                          'aria-labelledby': 'basic-button',
                          }}
                      >
                          <MenuItem onClick={() => navigate('/dashboard')}><AccountBoxIcon sx={{marginRight:"10px"}}/> My Profile</MenuItem>
                          <MenuItem onClick={handleLogout}><LogoutIcon sx={{marginRight:"10px"}}/>Logout</MenuItem>
                      </Menu>
                  </Box>
                </Box>
                
                <Drawer
                    anchor="right"
                    open={drawerState["right"]}
                    onClose={toggleDrawer("right", false)}
                >
                  <Box
                      sx={{ width: 400 }}
                      role="presentation"
                    >
                      <List>
                          <div className="search">
                            <TextField id="standard-basic" label="Search by name,id or email" name='empRole'  variant="standard" sx={{width:"90%"}} value={searchQuery}  onChange={handleSearch} autoFocus/>
                            <SearchOutlinedIcon className='icon'/>
                          </div>
                          <DataGrid
                              className="datagrid"
                              rows={searchResultData}
                              columns={resultColumns}
                              pageSize={10}
                              rowsPerPageOptions={[10]}
                              autoHeight
                              onRowClick={handleRowClick}
                              // checkboxSelection
                              sx={{
                                '& .MuiDataGrid-row:hover': {
                                  cursor: 'pointer',
                                },
                              }}
                              getRowId={(row) => row.empId} // Specify that `empId` should be used as the row id
                            />
                      </List>
                  </Box>
                </Drawer>
            </Box>
  )
}

export default Navbar