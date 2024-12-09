import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Box, Avatar, Typography, Button, Chip, TextField, Accordion, AccordionSummary, AccordionDetails, capitalize } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import theme from '../../../style/theme'
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { EditCalendar } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
}));

export default function AdminEmployeeDashboard() {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {empId} = useParams();
    
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {

        // Fetch employee details using empId
        const fetchEmployeeDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/getById/${empId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwtToken 
            }
            });
            const data = await response.json();
            // console.log(data);
            
            if (response.ok) {
            // console.log(data);
            
            setEmployee(data); // Set the employee data
            } else {
            setError("Failed to fetch employee details.");
            }
        } catch (err) {
            setError("An error occurred while fetching employee details.");
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
        };

        fetchEmployeeDetails();
    }, []); // Empty dependency array means this effect runs once when the component is mounted

    const handleEdit = () => {
        console.log("Editing mode..");
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box sx={{ p: 3, bgcolor: '#f7f8fc', minHeight: '100vh' }}>
            <Grid container spacing={2} >
                <Grid size={{ xs: 6, md: 4 }}>
                    <Item sx={{position: 'relative'}}>
                        <Tooltip title="Edit">
                            <Box onClick={handleEdit} sx={{position: 'absolute',top: 10, right: 10,cursor: 'pointer' }}>
                                <EditIcon/>
                            </Box>
                        </Tooltip>
                        {/* <EditIcon sx={{position: 'absolute',top: 10, right: 10}}/> */}
                        <Box>
                            <Avatar
                                src="https://mui.com/static/images/avatar/3.jpg"
                                alt="Ananya Grover"
                                sx={{ width: 120, height: 120,m:2, mx: 'auto' }}
                            />
                            <Typography align="center" variant="h6" sx={{ mt: 2,fontWeight: 700,color: '#1e88e5' }}>
                                Ananya Grover
                            </Typography>
                            <Typography align="center" color="text.secondary" sx={{fontWeight: 500}}>
                                Software Engineer Specialist
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center',m:2}}>
                                Full-stack product designer with hands-on experience in solving problems for clients across various domains. Skilled in communication, collaboration, and user-centered design.
                                Full-stack product designer with hands-on experience in solving problems for clients across various domains. Skilled in communication, collaboration, and user-centered design.
                            </Typography>

                            {/* Skills Section */}
                            <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Skills
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2,mt: 1 }}>
                                    {["Java","Python","C++"].map((skill) => (
                                        <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                    ))}
                                </Box>
                            </Box>

                            {/* Domain Section */}
                            <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Domain Knowledge
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt:1 }}>
                                    {["Real Time Billing"].map((skill) => (
                                        <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                    ))}
                                </Box>
                            </Box>

                            {/* Functional Knowledge */}
                            <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Functional Knowledge
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt:1 }}>
                                    {[
                                        "PSU",
                                        "D1",
                                        "C1",
                                        "R1"
                                    ].map((skill) => (
                                        <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Item>
                </Grid>
                <Grid direction="column" container size={{ xs: 6, md: 8 }}>
                    <Grid>
                        <Item>
                            {/* Basic Information */}
                            <Box sx={{m:0.5}}>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Basic Information
                                    <Tooltip title="Edit">
                                        <Box onClick={handleEdit} sx={{display: 'flex',cursor: 'pointer' }}>
                                            <EditIcon/>
                                        </Box>
                                    </Tooltip>
                                </Typography>
                                <Box sx={{m:1}}>
                                    <Grid container spacing={{xs:2, md:3}} columns={{xs:4,sm:8,md:12}}>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Employee ID</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>{employee.empId}</Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Experience in Amdocs</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>6 Years</Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Current Account</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>TMO</Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Email ID</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>himanshu.tanwar@amdocs.com</Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Total Experience</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>9 Years</Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Supervisor</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>Monika Borikar</Typography>
                                        </Grid>
                                    </Grid>
                                    {/* <Box sx={{ mt: 2 }}>
                                        <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                                            Download
                                        </Button>
                                    </Box> */}
                                </Box>
                                
                            </Box>
                            
                        </Item>
                    </Grid>
                        <Grid>
                            <Item>
                                {/* Experience Section */}
                            <Box sx={{m:0.5}}>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Experience
                                    <Tooltip title="Edit">
                                        <Box onClick={handleEdit} sx={{display: 'flex',cursor: 'pointer' }}>
                                            <EditIcon/>
                                        </Box>
                                    </Tooltip>
                                </Typography>
                                {[
                                    { company: 'Infosys', role: 'Product Designer', duration: 'Apr 2018 - Present', location: 'Pune, India' },
                                    { company: 'Pixel Studio', role: 'UI/UX Designer', duration: 'Oct 2016 - Jul 2018', location: 'Bengaluru, India' },
                                    { company: 'Ramotion Studio', role: 'Web Designer', duration: 'Apr 2015 - Oct 2016', location: 'Bengaluru, India' },
                                ].map((exp, index) => (
                                    <Box key={index} sx={{ m: 1 }}>
                                        <Typography variant="subtitle1" fontWeight={600} sx={{color: '#1e88e5'}}>
                                            {exp.company}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {exp.role} | {exp.duration} | {exp.location}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            </Item>
                        </Grid>
                    <Grid> 
                        {/* Other Sections */}
                        {['Education', 'Accomplishments'].map((section, index) => (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                {section}
                                <Tooltip title="Edit">
                                    <Box onClick={handleEdit} sx={{display: 'flex',cursor: 'pointer' }}>
                                        <EditIcon/>
                                    </Box>
                                </Tooltip>
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography color="text.secondary">Details about {section} will go here.</Typography>
                            </AccordionDetails>
                        </Accordion>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}