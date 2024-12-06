import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import ConfirmDialog from "../../../../utils/ConfirmDialog";
import FilterDialog from "../../../../utils/FilterDialog";
import Badge from "@mui/material/Badge";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
  Chip,
  Box,
} from "@mui/material";
const Datatable = ({ searchTerm,setSearchTerm,filteredData, setFilteredData }) => {
  const [openErrorToast,setOpenErrorToast] = useState(false);
  const [openSuccessToast,setOpenSuccessToast] = useState(false);
  const [data, setData] = useState([]);
  const [empCount,setEmpCount]=useState(0);
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
  const [selectedEmpId, setSelectedEmpId] = useState(null); // State to track which employee to delete
  const [errorMessage,setErrorMessage]=useState('');
  const [successMessage,setSuccessMessage] = useState('');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const [allSkills,setAllSkills]=useState([]);
  const [allDomains,setAllDomains] = useState([]);
  
  const jwtToken = localStorage.getItem('jwtToken');
  const getAllEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/admin/getAllEmp', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        },
      });
      if (response.ok) {
        const employeeData = JSON.parse(await response.text())
        console.log(employeeData)
        setData(employeeData)
        setFilteredData(employeeData)
        setEmpCount(filteredData.length)
        return;
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  const getAllSkills = async()=>{
    try {
      // First API call to admin login
      const skillResponse = await fetch('http://localhost:8080/api/v1/employee/getSkills', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = JSON.parse(await skillResponse.text());
      setAllSkills(data)
      console.log(data)
      }
      catch(error){

      }
  }
  const getAllDomains = async()=>{
    try {
      // First API call to admin login
      const domainResponse = await fetch('http://localhost:8080/api/v1/employee/getDomain', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = JSON.parse(await domainResponse.text());
      setAllDomains(data)
      console.log(data)
      }
      catch(error){

      }
  }
  useEffect(()=>{
    getAllSkills();
    getAllDomains()
  },[])

  useEffect(() => {
    getAllEmployees();
  }, [])

  useEffect(() => {
    if (!searchTerm) {
      // If the search term is empty, reset to original data
      setFilteredData(data);
      setEmpCount(data.length)
      return;
    }

    // Filter the data based on the search term
    const filtered = data.filter((employee) =>
      employee.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.empEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.empId.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
    setEmpCount(filtered.length)
  }, [searchTerm, data]); // Re-run when searchTerm or data changes

  const deleteEmployee = async (empId) => {
    try {

      const response = await fetch('http://localhost:8080/api/v1/admin/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        },
        body: JSON.stringify({ empId: empId })
      });

      if (response.ok) {
        setData(data.filter((item) => item.empId !== empId));
        setFilteredData(data.filter((item) => item.empId !== empId));
        setEmpCount(filteredData.length)
        setSuccessMessage("Deleted Successfully!!")
        setOpenSuccessToast(true);
        return;
      }
    } catch (error) {
      setErrorMessage("Something went wrong!!")
      setOpenErrorToast(true);
    }
  }
  const handleDelete = (empId) => {
    setSelectedEmpId(empId); // Store the employee ID
    setDialogOpen(true); // Open the dialog
  };
  const handleDialogClose = (confirm) => {
    setDialogOpen(false); // Close the dialog
    if (confirm && selectedEmpId) {
      // If confirmed, delete the employee
      deleteEmployee(selectedEmpId);
    }
    setSelectedEmpId(null); // Reset the selected employee ID
  };
  const handleCloseSuccessToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  
    setOpenSuccessToast(false);
  };
  const handleCloseErrorToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  
    setOpenErrorToast(false);
  };
  const handleFilter = () => {
    setSearchTerm(''); // Clear any existing search term
    console.log(selectedSkills, selectedDomain);

    const filtered = data.filter((employee) => {
      // Match skills with OR logic
      const matchesSkills = selectedSkills.length
        ? selectedSkills.some((skill) => employee.primaryTechSkill.includes(skill))
        : true;

      // Match domains with OR logic
      const matchesDomains = selectedDomain.length
        ? selectedDomain.some((domain) => employee.functionalKnowledge.includes(domain))
        : true;

      // AND condition between skills and domains
      return matchesSkills && matchesDomains;
    });

    // Update state with filtered data and employee count
    setFilteredData(filtered);
    setEmpCount(filtered.length);
    setFilterDialogOpen(false); // Close the dialog
};


  // Handle Reset
  const handleReset = () => {
    setSelectedSkills([]);
    setSelectedDomain("");
    setFilteredData(data);
    setFilterDialogOpen(false);
  };
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/admin/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.empId)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">

        <div className="titleWithBadge">
          Employees
          <Badge
            badgeContent={empCount}
            color="primary"
            sx={{
              marginLeft: "18px", // Add some spacing between "Employees" and badge
            }}
          />
        </div>
        <div className="edit-table">
          <div className="filter-table" onClick={() => setFilterDialogOpen(true)}>
            <FilterListIcon />
            Filter
          </div>
          <Link to="/admin/users/new" className="link">
            Add New
          </Link>
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9]}
        // checkboxSelection
        getRowId={(row) => row.empId} // Specify that `empId` should be used as the row id
      />
      <ConfirmDialog 
        open={dialogOpen}
        handleClose={(confirm) => handleDialogClose(confirm)}
        message={"Are you sure you want to delete employee record?"}
        buttonText = {"Delete"}
      />
       <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Filter Employees</DialogTitle>
        <DialogContent>
          {/* Skills Filter */}
          <Box sx={{ marginBottom: 3 }}>
            <Autocomplete
              multiple
              options={allSkills}
              value={selectedSkills}
              onChange={(event, value) => setSelectedSkills(value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip key={option} label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => <TextField {...params} label="Select Skills" />}
            />
          </Box>

          {/* Domain Filter */}
          <Box sx={{ marginBottom: 3 }}>
            <Autocomplete
              multiple
              options={allDomains}
              value={selectedDomain}
              onChange={(event, value) => setSelectedDomain(value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip key={option} label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => <TextField {...params} label="Select Domains" />}
            />
          </Box>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          <Button onClick={handleReset} color="secondary">
            Reset
          </Button>
          <Button onClick={handleFilter} variant="contained">
            Filter
          </Button>
        </DialogActions>
      </Dialog>
      {/* <FilterDialog
        open={dialogOpen}
        handleClose={(confirm) => handleDialogClose(confirm)}
        message={"Are you sure you want to delete employee record?"}
        buttonText={"Delete"}
      /> */}
      <Snackbar open={openErrorToast} autoHideDuration={6000} 
      onClose={handleCloseErrorToast}
      >
        <Alert
          onClose={handleCloseErrorToast}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccessToast} autoHideDuration={6000} 
      onClose={handleCloseSuccessToast}
      >
        <Alert
          onClose={handleCloseSuccessToast}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Datatable;
