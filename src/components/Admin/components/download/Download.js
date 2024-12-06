import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function Download({filteredData}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log(filteredData)
    setAnchorEl(null);
  };

  const downloadCSV = () => {
    handleClose();
    const headers = ["Employee ID","Name", "Email", "Supervisor","Current Domain"];
    const rows = filteredData.map(emp => [
      emp.empId,
      emp.empName,
      emp.empEmail,
      emp.supervisorName,
      emp.currentAccount
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Create a Blob from the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "employees.csv");
      link.click();
    }
  };
  const downloadPDF = () => {
    handleClose();
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Employee List", 20, 20);

    const headers = ["Employee ID","Name", "Email", "Supervisor","Current Domain"];
    const rows = filteredData.map(emp => [
      emp.empId,
      emp.empName,
      emp.empEmail,
      emp.supervisorName,
      emp.currentAccount
    ]);

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 30,  // Adjust to prevent overlap
    });

    doc.save("employees.pdf");
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FileDownloadOutlinedIcon className="icon" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={downloadCSV}>
            <DescriptionIcon /> &nbsp;
            CSV
        </MenuItem>
        <MenuItem onClick={downloadPDF}>
            <PictureAsPdfIcon /> &nbsp;
            PDF
        </MenuItem>
      </Menu>
    </div>
  );
}
