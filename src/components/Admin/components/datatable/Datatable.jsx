import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import ConfirmDialog from "../../../../utils/ConfirmDialog";
import FilterDialog from "../../../../utils/FilterDialog";
import Badge from "@mui/material/Badge";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GLOBAL_CONFIG from '../../../../constants/global'
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import SettingsIcon from '@mui/icons-material/Settings';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
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
import Download from "../download/Download";
const Datatable = ({ searchTerm, setSearchTerm, filteredData, setFilteredData, data, setData, allSkills, allDomains }) => {
  // console.log(filteredData)
  const [openErrorToast, setOpenErrorToast] = useState(false);
  const [openSuccessToast, setOpenSuccessToast] = useState(false);
  // const [data, setData] = useState([]);
  const [empCount, setEmpCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog visibility
  const [selectedEmpId, setSelectedEmpId] = useState(null); // State to track which employee to delete
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken');

  const [selectedColumns, setSelectedColumns] = useState([
    "empId",
    "empName",
    "empEmail",
  ]);
  const [openModal, setOpenModal] = useState(false);

  // Filter columns based on user selection
  const filteredColumns = userColumns.filter((col) =>
    selectedColumns.includes(col.field)
  );

  // Toggle field selection
  const handleFieldToggle = (field) => {
    setSelectedColumns((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field) // Remove field
        : [...prev, field] // Add field
    );
  };

  // const [allSkills,setAllSkills]=useState([]);
  // const [allDomains,setAllDomains] = useState([]);

  const location = useLocation();

  useEffect(() => {

    const searchParams = new URLSearchParams(location.search);
    const domainParam = searchParams.get("domain");
    const skillParam = searchParams.get("skill");
    // console.log(selectedDomain,selectedSkills)
    if (domainParam) {
      const updatedDomain = [...selectedDomain, domainParam]
      setSelectedDomain(updatedDomain);
    }
    if (skillParam) {
      setSelectedSkills([
        ...selectedSkills, skillParam
      ]);
    }
    
    else handleReset(false);

  }, [location.search]); // Re-run if the search string changes

  useEffect(() => {
    if (selectedDomain.length > 0 || selectedSkills.length > 0) handleFilter(false);
    else if (selectedDomain.length === 0 && selectedSkills.length === 0) handleReset(false);
  }, [selectedDomain, selectedSkills]);




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
    setSelectedEmpId(empId); // Store the employee ID to delete
    setDialogOpen(true); // Open the dialog
  };
  const selectedSkillsHandleDelete = (skillToDelete) => {
    // console.log("Deleting ",skillToDelete)
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToDelete));
    // console.log(selectedSkills)
  };
  const selectedDomainsHandleDelete = (domainToDelete) => {
    // console.log("Deleting ",domainToDelete)
    setSelectedDomain(selectedDomain.filter(domain => domain !== domainToDelete));
    // console.log(selectedDomain)
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
  const handleFilter = (calledFromFilterDialog) => {

    setSearchTerm(''); // Clear any existing search term
    const filtered = data.filter((employee) => {
      // Match skills with OR logic
      const matchesSkills = selectedSkills.length
        ? selectedSkills.some((skill) => employee.primaryTechSkill?.includes(skill))
        : true;

      // Match domains with OR logic
      const matchesDomains = selectedDomain.length
        ? selectedDomain.some((domain) => employee.functionalKnowledge?.includes(domain))
        : true;
      // AND condition between skills and domains
      return matchesSkills && matchesDomains;
    });
    setFilteredData(filtered);
    setEmpCount(filtered.length);

    // Update state with filtered data and employee count
    // setFilteredData(filtered);
    // setEmpCount(filtered.length);
    if (calledFromFilterDialog) setFilterDialogOpen(false); // Close the dialog
  };


  // Handle Reset
  const handleReset = (calledByClickingButton) => {
    if (calledByClickingButton) {
      setSelectedSkills([]);
      setSelectedDomain([]);
    }
    setFilteredData(data);
    setEmpCount(data.length);
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
            <Link to={`/admin/employees/${params.row.empId}`} style={{ textDecoration: "none" }}>
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
        
        <div  >            
            <Download filteredData={filteredData} columnsList={filteredColumns} />
          </div>
          <div className="filter-table" onClick={() => setFilterDialogOpen(true)}>
            <FilterListIcon />
            Filter
          </div>
          {/* <Link to="/admin/employees/new" className="link">
            Add New
          </Link> */}
          <SettingsIcon onClick={() => setOpenModal(true)} sx={{cursor:"pointer"}}/>
        </div>
      </div>
      
      
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h3>Select Columns to Display</h3>
          {userColumns.map((col) => (
            <div key={col.field}>
              <Checkbox
                checked={selectedColumns.includes(col.field)}
                onChange={() => handleFieldToggle(col.field)}
              />
              {col.headerName}
            </div>
          ))}
          <Button
            variant="contained"
            onClick={() => setOpenModal(false)}
            style={{ marginTop: 10 }}
          >
            Apply
          </Button>
        </Box>
      </Modal>
      <DataGrid
        className="datagrid"
        rows={filteredData}
        columns={filteredColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9, 10]}
        // checkboxSelection
        getRowId={(row) => row.empId} // Specify that `empId` should be used as the row id
      />
      <ConfirmDialog
        open={dialogOpen}
        handleClose={(confirm) => handleDialogClose(confirm)}
        message={"Are you sure you want to delete employee record?"}
        buttonText={"Delete"}
      />
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Filter Employees</DialogTitle>
        <DialogContent>
          {/* Skills Filter */}
          <Box sx={{ marginBottom: 3 }}>
            <Autocomplete
              multiple
              options={[...new Set(allSkills)]}
              value={selectedSkills}
              onChange={(event, value) => setSelectedSkills(value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const tagProps = getTagProps({ index });
                  return (
                    // Pass `key` directly and spread the rest of the props
                    <Chip
                      key={option}
                      label={option}
                      {...tagProps}
                      onDelete={() => selectedSkillsHandleDelete(option)}
                    />
                  );
                })
              }
              renderInput={(params) => <TextField {...params} label="Select Skills" />}
            />
          </Box>


          {/* Domain Filter */}
          <Box sx={{ marginBottom: 3 }}>
            <Autocomplete
              multiple
              options={[...new Set(allDomains)]}
              value={selectedDomain}
              onChange={(event, value) => setSelectedDomain(value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip key={option} label={option} {...getTagProps({ index })} onDelete={() => selectedDomainsHandleDelete(option)} />
                ))
              }
              renderInput={(params) => <TextField {...params} label="Select Domains" />}
            />
          </Box>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          <Button onClick={() => handleReset(true)} color="secondary">
            Reset
          </Button>
          <Button onClick={() => setFilterDialogOpen(false)} variant="contained">
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
      <Snackbar open={openErrorToast} autoHideDuration={GLOBAL_CONFIG.ALERT_TIME}
        onClose={handleCloseErrorToast} anchorOrigin={{ vertical: GLOBAL_CONFIG.ALERT_VERTICAL_POSITION, horizontal: GLOBAL_CONFIG.ALERT_HORIZONTAL_POSITION }}
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
      <Snackbar open={openSuccessToast} autoHideDuration={GLOBAL_CONFIG.ALERT_TIME}
        onClose={handleCloseSuccessToast} anchorOrigin={{ vertical: GLOBAL_CONFIG.ALERT_VERTICAL_POSITION, horizontal: GLOBAL_CONFIG.ALERT_HORIZONTAL_POSITION }}
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
