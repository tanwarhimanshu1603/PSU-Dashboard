import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows ,approvalColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import ConfirmDialog from "../../../../utils/ConfirmDialog";
import FilterDialog from "../../../../utils/FilterDialog";
import Badge from "@mui/material/Badge";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const Approvaltable = () => {
    const [rows,setRows] = useState([]);
    const [requestCount,setRequestCount] = useState(0);
    const [openErrorToast,setOpenErrorToast] = useState(false);
    const [openSuccessToast,setOpenSuccessToast] = useState(false);
    const [approveDialogOpen, setApproveDialogOpen] = useState(false); // State for dialog visibility
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [selectedEmpId, setSelectedEmpId] = useState(null); // State to track which employee to delete
    const [errorMessage,setErrorMessage]=useState('');
    const [successMessage,setSuccessMessage] = useState('');
    const jwtToken = localStorage.getItem('jwtToken');
    
    const getApprovalRequests = async()=>{
        try {
          
          const response = await fetch('http://localhost:8080/api/v1/admin/getApprovals', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${jwtToken}`
            }
          });
          if (response.ok) {
            const data = JSON.parse(await response.text())
            
            setRows(data)
            setRequestCount(data.length)
            return;
          }
        } catch (error) {
            setErrorMessage("Something went wrong!!")
            setOpenErrorToast(true);
        }
      }
    
      useEffect(()=>{
        getApprovalRequests()
      },[])
  
  
      const approveRequest = async(employeeId)=>{
        try {
          const employee = rows.find(row => row.empId === employeeId);
          
          const response = await fetch('http://localhost:8080/api/v1/admin/approve', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${jwtToken}`
            },
            body: JSON.stringify(employee),
          });
          if (response.ok) {
            setRows(rows.filter((item) => item.empId !== employeeId));
            setRequestCount(rows.length)
            setSuccessMessage("Approved Successfully!!")
            setOpenSuccessToast(true);
            return;
          }
        } catch (error) {
            setErrorMessage("Something went wrong!!")
            setOpenErrorToast(true);
        }
    
      }
      const rejectRequest = async(employeeId)=>{
        try {
          const employee = rows.find(row => row.empId === employeeId);
          console.log(employee);
          
          const response = await fetch('http://localhost:8080/api/v1/admin/reject', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${jwtToken}`
            },
            body: JSON.stringify(employee),
          });
          if (response.ok) {
            setRows(rows.filter((item) => item.empId !== employeeId));
            setRequestCount(rows.length)
            setSuccessMessage("Rejected Successfully!!")
            setOpenSuccessToast(true);
            return;
          }
        } catch (error) {
            setErrorMessage("Something went wrong!!")
            setOpenErrorToast(true);
        }
      }
      const handleApproveDialogClose = (confirm) => {
        console.log(confirm,selectedEmpId)
        setApproveDialogOpen(false); // Close the dialog
        if (confirm && selectedEmpId) {
          // If confirmed, delete the employee
          approveRequest(selectedEmpId);
        }
        setSelectedEmpId(null); // Reset the selected employee ID
      };
      const handleRejectDialogClose = (confirm) => {
        setRejectDialogOpen(false); // Close the dialog
        if (confirm && selectedEmpId) {
          // If confirmed, delete the employee
          rejectRequest(selectedEmpId);
        }
        setSelectedEmpId(null); // Reset the selected employee ID
      };
      const handleApprove = (empId) => {
        
        setSelectedEmpId(empId); // Store the employee ID
        setApproveDialogOpen(true); // Open the dialog
      };
      const handleReject = (empId) => {
        setSelectedEmpId(empId); // Store the employee ID
        setRejectDialogOpen(true); // Open the dialog
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
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           
            <div className="viewButton" onClick={()=>handleApprove(params.row.empId)}>Approve</div>
            
            <div
              className="deleteButton"
              onClick={()=>handleReject(params.row.empId)}
            >
              Reject
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
          Approval Requests
          <Badge
            badgeContent={requestCount}
            color="primary"
            sx={{
              marginLeft: "18px", // Add some spacing between "Employees" and badge
            }}
          />
        </div>
        
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={approvalColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9]}
        // checkboxSelection
        getRowId={(row) => row.empId} // Specify that `empId` should be used as the row id
      />
      <ConfirmDialog 
        open={approveDialogOpen}
        handleClose={(confirm) => handleApproveDialogClose(confirm)}
        message={"Are you sure you want to approve the request?"}
        buttonText = {"Approve"}
      />
      <ConfirmDialog 
        open={rejectDialogOpen}
        handleClose={(confirm) => handleRejectDialogClose(confirm)}
        message={"Are you sure you want to reject the request?"}
        buttonText = {"Reject"}
      />

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

export default Approvaltable;
