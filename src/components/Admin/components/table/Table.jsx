import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const List = () => {
  const [rows,setRows] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken')
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
        console.log(data)
        setRows(data)
        return;
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getApprovalRequests()
  },[])
  // const rows = [
  //   {
  //     id: 1143155,
  //     product: "Acer Nitro 5",
  //     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "John Smith",
  //     date: "1 March",
  //     amount: 785,
  //     method: "Cash on Delivery",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2235235,
  //     product: "Playstation 5",
  //     img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Michael Doe",
  //     date: "1 March",
  //     amount: 900,
  //     method: "Online Payment",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2342353,
  //     product: "Redragon S101",
  //     img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "John Smith",
  //     date: "1 March",
  //     amount: 35,
  //     method: "Cash on Delivery",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2357741,
  //     product: "Razer Blade 15",
  //     img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Jane Smith",
  //     date: "1 March",
  //     amount: 920,
  //     method: "Online",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2342355,
  //     product: "ASUS ROG Strix",
  //     img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Harold Carol",
  //     date: "1 March",
  //     amount: 2000,
  //     method: "Online",
  //     status: "Pending",
  //   },
  // ];
  const handleApprove = async(employeeId)=>{
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
        return;
      }
    } catch (error) {
      
    }

  }
  const handleReject = async(employeeId)=>{
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
        return;
      }
    } catch (error) {
      
    }
  }
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Employee ID</TableCell>
            <TableCell className="tableCell">Employee</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Supervisor</TableCell>
            <TableCell className="tableCell">Domain</TableCell>
            <TableCell className="tableCell">Account</TableCell>
            {/* <TableCell className="tableCell">Skills</TableCell> */}
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.empId}>
              <TableCell className="tableCell">{row.empId}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src="https://th.bing.com/th/id/OIP.7Y9SRus3J-ceVx7KDrTthQHaDz?rs=1&pid=ImgDetMain" alt="" className="image" />
                  {row.empName}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.empEmail}</TableCell>
              <TableCell className="tableCell">{row.supervisorName}</TableCell>
              <TableCell className="tableCell">{row.functionalKnowledge && row.functionalKnowledge[0]}</TableCell>
              <TableCell className="tableCell">{row.currentAccount}</TableCell>
              {/* <TableCell className="tableCell">Java</TableCell> */}
              <TableCell className="tableCell">
                {/* <span className={`status ${row.status}`}>{row.status}</span> */}
                <div className="cellAction">
            {/* <Link to="/admin/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <Button
              className="viewButton"
              onClick={() => handleApprove(row.empId)}
            >
              Approve
            </Button>
            <Button
              className="deleteButton"
              onClick={() => handleReject(row.empId)}
              color="error"
              
            >
              Reject
            </Button>
          </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
