import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Box, Avatar, Typography, Button, Chip, TextField, Accordion, AccordionSummary, AccordionDetails, capitalize, Autocomplete } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import theme from '../../../style/theme'
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import InputBase from '@mui/material/InputBase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
}));

export default function EmployeeDashboard() {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updateMode,setUpdateMode] = useState(false);
    const [profileUpdate,setProfileUpdate] = useState(false);    
    const [basicInfoUpdate,setBasicInfoUpdate] = useState(false);    
    const [specialitiesUpdate,setSpecialitiesUpdate] = useState(false);    
    const [moreInfoUpdate,setMoreInfoUpdate] = useState(false);    
    const [changesMade,setChangesMade] = useState(false);
    const [skillOptions,setSkillOptions] = useState([]);
    const [primaryTechSkills, setPrimaryTechSkills] = useState([]);
    const [domainKnowledge,setDomainKnowledge] = useState([]);
    const [domainList,setDomainList] = useState([]);
    const [openErrorToast,setOpenErrorToast] = useState(false);
    const [openSuccessToast,setOpenSuccessToast] = useState(false);
    const [openWarningToast,setOpenWarningToast] = useState(false);
    const [errorMessage,setErrorMessage]=useState('');
    const [successMessage,setSuccessMessage] = useState('');
    const [warningMessage,setWarningMessage]= useState('')

    useEffect(() => {
        // Retrieve empId from localStorage
        const empId = localStorage.getItem("empId");
        const empToken = localStorage.getItem("empToken");
        // console.log(empId);
        
        if (!empId || !empToken) {
        // If no empId is found, redirect to login page
        window.location.href = "/";
        return;
        }

        // Fetch employee details using empId
        const fetchEmployeeDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/employee/getById/${empId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': empToken 
            }
            });
            const data = await response.json();
            // console.log(data);
            
            if (response.ok) {
            console.log(data);
            
            setEmployee(data); // Set the employee data
            setPrimaryTechSkills(data.primaryTechSkill);
            setDomainKnowledge(data.functionalKnowledge);
            // console.log(data.functionalKnowledge);
            
            
            } else {
            setError("Failed to fetch employee details.");
            setErrorMessage("Failed to fetch employee details.")
            setOpenErrorToast(true);
            }
        } catch (err) {
            setError("An error occurred while fetching employee details.");
            setErrorMessage("An error occurred while fetching employee details.")
            setOpenErrorToast(true);
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
        };

        fetchEmployeeDetails();
        getAllSkills();
        getAllDomains();
    }, []); // Empty dependency array means this effect runs once when the component is mounted

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
        setSkillOptions(data)
        }
        catch(error){

        }
    }

    const getAllDomains = async()=>{
        try {
        const domainResponse = await fetch('http://localhost:8080/api/v1/employee/getDomain', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        });
        const data = JSON.parse(await domainResponse.text());
        setDomainList(data)
        }
        catch(error){
    
        }
    }

    const handleLogout = () => {
        setLoading(true);  // Start showing the progress bar
        setTimeout(() => {
            localStorage.removeItem("empId"); // Remove empId from localStorage
            localStorage.removeItem("empToken"); // Remove login status
            localStorage.removeItem("isLoggedIn");
            navigate("/"); // Redirect to the homepage
          setLoading(false); // Hide the progress bar after 3 seconds
          // You can also add your logout logic here
        }, 3000);
      }

    const handleEdit = () => {
        console.log("Editing mode..");
        if(changesMade){
            //alert('Click on save to update details!!');
            setWarningMessage("Please click on save to update details!!")
            setOpenWarningToast(true);
            
        }else setUpdateMode((prev) => !prev);
    }

    const handleBack = () => {
        navigate(-1);
    }

    const primarySkillsHandleChange = (event, newValue) => {
        setPrimaryTechSkills(newValue);
        setChangesMade(true);
        setEmployee({
            ...employee,
            primaryTechSkill: newValue
        });
    };

    const domainKnowledgeHandleChange = (event, newValue) => {
        setDomainKnowledge(newValue);
        setChangesMade(true);
        setEmployee({
            ...employee,
            functionalKnowledge: newValue
        });
    };

    const primarySkillsHandleDelete = (skillToDelete) => {
        const updatedSkills = primaryTechSkills.filter(skill => skill !== skillToDelete);
        setPrimaryTechSkills(updatedSkills);
        setChangesMade(true);
        setEmployee({
            ...employee,
            primaryTechSkill: updatedSkills
        });
    };

    const domainKnowledgeHandleDelete = (toBeDeleted) => {
        const updatedDomain = domainKnowledge.filter(skill => skill !== toBeDeleted);
        setDomainKnowledge(updatedDomain)
        setChangesMade(true);
        setEmployee({
            ...employee,
            functionalKnowledge: updatedDomain
        });
    };

    const updateDetails = async () => {
        setLoading(true)
        try {
          const response = await fetch('http://localhost:8080/api/v1/employee/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('empToken'),
            },
            body: JSON.stringify(employee),
          });
    
          if (!response.ok) {
            setLoading(false)
            throw new Error('Failed to update employee. Please check the input fields.');
          }
          else{
            setLoading(false);
          }
    
        //   alert('Employee updated successfully!');
        } catch (err) {
            setLoading(false)
        }
      };


    const handleSaveDetails = () => {
        console.log("Saving Details");
        if(!changesMade) return;
        updateDetails();
        setTimeout(() => {
            setUpdateMode((prev) => !prev);
            //alert("changes saved successfully")
            setSuccessMessage("Changes saved successfully.")
            setOpenSuccessToast(true);
        },1500);
        setChangesMade(false);
        
    }

    const handleChange = (e) => {
        setChangesMade(true);
        const {name,value} = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    }
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

      const handleCloseWarningToast = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
      
        setOpenWarningToast(false);
      };
  
    if (loading) {
        return <div>{loading && (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>
          )} Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box sx={{ p: 3, bgcolor: '#f7f8fc', minHeight: '100vh' }}>
            {loading && (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>
          )}
            <Box sx={{mb: 1,display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={handleBack} variant="text" sx={{display: 'flex', gap:1}}>
                    <ArrowBackIcon />
                    Back
                </Button>
                <Button onClick={handleSaveDetails} variant="contained" disabled={!changesMade}>Save</Button>
            </Box>
            <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 4 }}>
                    <Item sx={{position: 'relative'}}>
                        <Tooltip title={updateMode ? 'Edit Off' : 'Edit'}>
                            <Box onClick={handleEdit} sx={{position: 'absolute',top: 10, right: 10,cursor: 'pointer' }}>
                                {
                                    updateMode ? <EditOffIcon /> : <EditIcon />
                                }
                            </Box>
                        </Tooltip>
                        {/* <EditIcon sx={{position: 'absolute',top: 10, right: 10}}/> */}
                        <Box>
                            <Avatar
                                src={employee.empImage}
                                alt={employee.empName}
                                sx={{ width: 120, height: 120,m:2, mx: 'auto' }}
                            />
                            <Typography align="center" variant="h6" sx={{ mt: 2,fontWeight: 700,color: '#1e88e5' }}>
                                {employee.empName}
                            </Typography>
                            <Typography align="center" color="text.secondary" sx={{fontWeight: 500}}>({employee.empId})</Typography>
                            <Typography align="center" color="text.secondary" sx={{fontWeight: 500}}>
                                Software Engineer Specialist
                                {/* <TextField id="standard-basic" label="Designation" variant="standard" /> */}
                                {/* <InputBase
                                    sx={{ flex: 1, textAlign: 'center', '& input': {textAlign: 'center'} }}
                                    placeholder="Designation!!"
                                    inputProps={{ 'aria-label': 'role' }}
                                /> */}
                            </Typography>
                            {/* <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center',m:2}}>
                                Full-stack product designer with hands-on experience in solving problems for clients across various domains. Skilled in communication, collaboration, and user-centered design.
                                Full-stack product designer with hands-on experience in solving problems for clients across various domains. Skilled in communication, collaboration, and user-centered design.
                            </Typography> */}

                            {/* Skills Section */}
                            <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Skills
                                </Typography>
                                {
                                    updateMode ? 
                                    <Autocomplete
                                    multiple
                                    id="primary-skills"
                                    options={skillOptions}
                                    value={primaryTechSkills}
                                    onChange={primarySkillsHandleChange}
                                    disableCloseOnSelect
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // label="Select Skills"
                                        placeholder="Search & select skills"
                                        required
                                        size="small"
                                        variant="outlined"
                                    />
                                    )}
                                    renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                        label={option}
                                        {...getTagProps({ index })}
                                        onDelete={() => primarySkillsHandleDelete(option)}
                                        key={index}
                                        />
                                    ))
                                    }
                                    freeSolo
                                    getOptionLabel={(option) => option}
                                /> : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2,mt: 1 }}>
                                {employee.primaryTechSkill.map((skill) => (
                                    <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                ))}
                            </Box>
                                }
                            </Box>

                            {/* Domain Section */}
                            {/* <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Domain Knowledge
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt:1 }}>
                                    {employee.primaryProductSubdomain.map((skill) => (
                                        <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                    ))}
                                </Box>
                            </Box> */}
                            <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Domain Knowledge
                                </Typography>
                                {
                                    updateMode ? 
                                    <Autocomplete
                                    multiple
                                    id="domain-knowledge"
                                    options={domainList}
                                    value={domainKnowledge}
                                    onChange={domainKnowledgeHandleChange}
                                    disableCloseOnSelect
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        // label="Select Skills"
                                        placeholder="Search & select domain"
                                        required
                                        size="small"
                                        variant="outlined"
                                    />
                                    )}
                                    renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                        label={option}
                                        {...getTagProps({ index })}
                                        onDelete={() => domainKnowledgeHandleDelete(option)}
                                        key={index}
                                        />
                                    ))
                                    }
                                    freeSolo
                                    getOptionLabel={(option) => option}
                                /> : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2,mt: 1 }}>
                                {employee.functionalKnowledge.map((skill) => (
                                    <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                ))}
                            </Box>
                                }
                            </Box>

                            {/* Functional Knowledge */}
                            {/* <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Functional Knowledge
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt:1 }}>
                                    {employee.functionalKnowledge.map((skill) => (
                                        <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                    ))}
                                </Box>
                            </Box> */}
                        </Box>
                    </Item>
                </Grid>
                <Grid direction="column" container size={{ xs: 6, md: 8 }}>
                    <Grid>
                        <Item>
                            {/* Basic Information */}
                            <Box sx={{m:0.5,position: 'relative'}}>
                            <Tooltip title="Logout">
                                <Box onClick={handleLogout} sx={{ bgcolor: 'text.error', color: 'background.paper',position: 'absolute',top: 5, right: 5,cursor: 'pointer' }}>
                                    <LogoutIcon color="error"/>
                                </Box>
                            </Tooltip>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Basic Information
                                    {/* <Tooltip title="Edit">
                                        <Box onClick={handleEdit} sx={{display: 'flex',cursor: 'pointer' }}>
                                            <EditIcon/>
                                        </Box>
                                    </Tooltip> */}
                                </Typography>
                                <Box sx={{m:1}}>
                                    <Grid container spacing={{xs:2, md:3}} columns={{xs:4,sm:8,md:12}}>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Employee ID</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {employee.empId}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Experience in Amdocs</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {
                                                    updateMode ? 
                                                    <TextField onChange={handleChange} id="standard-basic" name='amdocsExperience' value={employee.amdocsExperience} variant="standard" /> 
                                                    : `${employee.amdocsExperience} Years`
                                                }
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Current Account</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {
                                                    updateMode ? 
                                                    <TextField onChange={handleChange} id="standard-basic" name='currentAccount' value={employee.currentAccount} variant="standard" /> 
                                                    : employee.currentAccount && employee.currentAccount
                                                }
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Email ID</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>{employee.empEmail}</Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Total Experience</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {
                                                    updateMode ? 
                                                    <TextField onChange={handleChange} id="standard-basic" name='totalExperience' value={employee.totalExperience} variant="standard" /> 
                                                    : `${employee.totalExperience} Years`
                                                }
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Supervisor</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {
                                                    updateMode ? 
                                                    <TextField onChange={handleChange} id="standard-basic" name='supervisorName' value={employee.supervisorName} variant="standard" /> 
                                                    : `${employee.supervisorName}`
                                                }
                                            </Typography>
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
                                {/* Amdocs Journey Section */}
                            <Box sx={{m:0.5}}>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Amdocs Journey
                                    {/* <Tooltip title="Edit">
                                        <Box onClick={handleEdit} sx={{display: 'flex',cursor: 'pointer' }}>
                                            <EditIcon/>
                                        </Box>
                                    </Tooltip> */}
                                </Typography>
                                {[
                                    { Account: 'T-Mobile', desc: 'Devops', duration: 'Apr 2018 - Present', location: 'Pune, India' },
                                    { Account: 'Bel Canada', desc: 'Build Jenkins Pipeline', duration: 'Oct 2016 - Jul 2018', location: 'Bengaluru, India' },
                                    { Account: 'ATT', desc: 'Front End Developer', duration: 'Apr 2015 - Oct 2016', location: 'Bengaluru, India' },
                                ].map((exp, index) => (
                                    <Box key={index} sx={{ m: 1 }}>
                                        <Typography variant="subtitle1" fontWeight={600} sx={{color: '#1e88e5'}}>
                                            {exp.Account}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {exp.desc} | {exp.duration} 
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            </Item>
                        </Grid>
                    <Grid> 
                        {/* Other Sections */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                Specialities
                                {/* <Tooltip title="Edit">
                                    <Box onClick={handleEdit} sx={{display: 'flex',cursor: 'pointer' }}>
                                        <EditIcon/>
                                    </Box>
                                </Tooltip> */}
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{display: 'flex',flexDirection: 'column',gap: 2}}>
                            <Typography sx={{display: 'flex',flexWrap: 'wrap', gap: 1}}>
                                {/* Details about {section} will go here. */}
                                {employee.secondaryProduct && <Chip label={employee.secondaryProduct} color="success" variant="outlined" />}
                                {employee.secondaryTechSkill && <Chip label={employee.secondaryTechSkill} color="success" variant="outlined" />}
                            </Typography>
                            <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                
                                {!updateMode && "Devops Knowledge: " } 
                                {
                                    updateMode ? 
                                    <TextField onChange={handleChange} value={employee.devOpsKnowledge} id="outlined-basic" label="devops knowledge..." name="devOpsKnowledge" variant="outlined" sx={{width: '50ch'}}/> : 
                                    <span style={{color: 'gray'}}>{employee.devOpsKnowledge}</span>
                                }
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        {/* {['Education', 'Miscellaneous'].map((section, index) => (
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
                            <Typography sx={{display: 'flex',flexWrap: 'wrap', gap: 1}}> */}
                                {/* Details about {section} will go here. */}
                                {/* {employee.engagementActivityContribution && <Chip label='Contributed to Engagement Acitivities' color="success" variant="outlined" />}
                                {employee.explorationInterest && <Chip label='Exploration Interest' color="success" variant="outlined" />}
                                {employee.contributedToDesign && <Chip label='Contributed to Design' color="success" variant="outlined" />}
                                {employee.mentoringAbility && <Chip label='Mentoring Ability' color="success" variant="outlined" />} */}
                                
                                {/* {[
                                    { company: 'Infosys', role: 'Product Designer', duration: 'Apr 2018 - Present', location: 'Pune, India' },
                                    { company: 'Pixel Studio', role: 'UI/UX Designer', duration: 'Oct 2016 - Jul 2018', location: 'Bengaluru, India' },
                                    { company: 'Ramotion Studio', role: 'Web Designer', duration: 'Apr 2015 - Oct 2016', location: 'Bengaluru, India' },
                                ].map((exp, index) => (
                                    <Box key={index}>
                                        <Typography variant="subtitle1" fontWeight={600} sx={{color: '#1e88e5'}}>
                                            {exp.company}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {exp.role} | {exp.duration} | {exp.location}
                                        </Typography>
                                    </Box>
                                ))} */}
                            {/* </Typography>
                            </AccordionDetails>
                        </Accordion>
                        ))} */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                More Info
                                {/* <Tooltip title="Edit">
                                    <Box onClick={handleEdit} sx={{display: 'flex',cursor: 'pointer' }}>
                                        <EditIcon/>
                                    </Box>
                                </Tooltip> */}
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{display: 'flex',flexDirection: 'column',gap: 2}}>
                            <Typography sx={{display: 'flex',flexWrap: 'wrap', gap: 1}}>
                                {/* Details about {section} will go here. */}
                                {employee.engagementActivityContribution && <Chip label='Contributed to Engagement Acitivities' color="success" variant="outlined" />}
                                {employee.explorationInterest && <Chip label='Exploration Interest' color="success" variant="outlined" />}
                                {employee.contributedToDesign && <Chip label='Contributed to Design' color="success" variant="outlined" />}
                                {employee.mentoringAbility && <Chip label='Mentoring Ability' color="success" variant="outlined" />}
                            </Typography>
                            <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                 
                                {!updateMode && "Presentation Skills: " }
                                {
                                    updateMode ? 
                                    <TextField onChange={handleChange} value={employee.presentationSkills} id="outlined-basic" label="presentation skills" name="presentationSkills" variant="outlined" sx={{width: '50ch'}}/> : 
                                    <span style={{color: 'gray'}}>{employee.presentationSkills}/5</span>
                                }
                                
                            </Typography>
                            <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                 
                                {!updateMode && "Hobbies: " }
                                {
                                    updateMode ? 
                                    <TextField onChange={handleChange} value={employee.hobbiesSports} id="outlined-basic" label="hobbies" name="hobbiesSports" variant="outlined" sx={{width: '50ch'}}/> : 
                                    <span style={{color: 'gray'}}>{employee.hobbiesSports}</span>
                                }
                                
                            </Typography>
                            <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                {!updateMode && "Additional Info: " }
                                {
                                    updateMode ? 
                                    <TextField onChange={handleChange} value={employee.additionalInfo} id="outlined-basic" label="Additional info" name="additionalInfo" variant="outlined" sx={{width: '50ch'}}/> : 
                                    <span style={{color: 'gray'}}>{employee.additionalInfo}</span>
                                }
                                
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={openErrorToast} autoHideDuration={6000} onClose={handleCloseErrorToast}>
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
      <Snackbar open={openWarningToast} autoHideDuration={6000} onClose={handleCloseWarningToast}>
        <Alert
          onClose={handleCloseWarningToast}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {warningMessage}
        </Alert>
      </Snackbar>
        </Box>
    );
}