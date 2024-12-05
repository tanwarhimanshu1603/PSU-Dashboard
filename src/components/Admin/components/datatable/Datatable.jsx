import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';


const Datatable = () => {
  const [data, setData] = useState([]);
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
        return;
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getAllEmployees();
  }, [])

  const deleteEmployee = async(empId)=>{
    console.log(empId)
    try {
      console.log("Entered delete emp")
      const response = await fetch('http://localhost:8080/api/v1/admin/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        },
        body: JSON.stringify({ empId: empId })
      });
      console.log(response)
      if (response.ok) {
        setData(data.filter((item) => item.empId !== empId));
        return;
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = (id) => {
    deleteEmployee(id);
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
        Employees
        <div className="edit-table">
          <div className="filter-table">
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
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row.empId} // Specify that `empId` should be used as the row id
      />
    </div>
  );
};

export default Datatable;
