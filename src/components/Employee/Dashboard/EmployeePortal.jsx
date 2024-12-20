import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Navbar from '../Navbar/Navbar';
import EmployeeProfile from '../EmployeeProfile/EmployeeProfile';
import MyProfile from '../MyProfile/MyProfile';


export default function EmployeePortal() {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({});
    const [employeeSnapshot,setEmployeeSnapshot] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const empToken= localStorage.getItem("empToken");
    if(!empToken){
      navigate('/');
    }
    if (error) {
        return <div>{error}</div>;
    }


    return (
        <Box sx={{ p: 3, bgcolor: '#f7f8fc', minHeight: '100vh' }}>
            {/* {loading && (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>
          )} */}
            <Navbar empImage={employee.empImage} empName={employee.empName} loading={loading} setLoading={setLoading}/>
            {/* <EmployeeDashboard/> */}
            <Routes>
                <Route path='' element={<MyProfile employee={employee} setEmployee={setEmployee} employeeSnapshot={employeeSnapshot} setEmployeeSnapshot={setEmployeeSnapshot} error={error} setError={setError} loading={loading} setLoading={setLoading}/>} />
                <Route path=":empId" element={<EmployeeProfile />} />
            </Routes>
            
        </Box>
    );
}