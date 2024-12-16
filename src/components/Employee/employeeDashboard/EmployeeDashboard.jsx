import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Box, Avatar, Typography, Button, Chip, TextField, Accordion, AccordionSummary, AccordionDetails, capitalize, Autocomplete, Menu, MenuItem } from '@mui/material';
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
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import GLOBAL_CONFIG from '../../../constants/global';
import EditAmdocsJourney from '../../../utils/EditAmdocsJourney';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
}));

export default function EmployeeDashboard() {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [employeeSnapshot,setEmployeeSnapshot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updateMode,setUpdateMode] = useState(false);  
    const [changesMade,setChangesMade] = useState(false);
    const [skillOptions,setSkillOptions] = useState([]);
    const [primaryTechSkills, setPrimaryTechSkills] = useState([]);
    const [secondaryTechSkills, setSecondaryTechSkills] = useState([]);
    const [domainKnowledge,setDomainKnowledge] = useState([]);
    const [domainList,setDomainList] = useState([]);
    const [openErrorToast,setOpenErrorToast] = useState(false);
    const [openSuccessToast,setOpenSuccessToast] = useState(false);
    const [openWarningToast,setOpenWarningToast] = useState(false);
    const [errorMessage,setErrorMessage]=useState('');
    const [successMessage,setSuccessMessage] = useState('');
    const [warningMessage,setWarningMessage]= useState('');
    const [amdocsJourney,setAmdocsJourney]=useState(null)
    const [editAmdocsJourneyDialogOpen, setEditAmdocsJourneyDialogOpen] = useState(false);
    const [journeys, setJourneys] = useState([]);
    const [empImageLink,setEmpImageLink] = useState('');
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const uploadedUrl = await uploadToCloudinary(file);
          setEmpImageLink(uploadedUrl); // Store the Cloudinary URL
          setEmployee({...employee,"empImage":uploadedUrl})
          setChangesMade(true)
        } catch (err) {
          console.error("Image upload failed:", err);
        }
      };
    
      const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset",GLOBAL_CONFIG.CLOUDINARY_UPLOAD_PRESET);
      
        try {
          // Make the POST request with fetch
          const response = await fetch(GLOBAL_CONFIG.CLOUDINARY_URL, {
            method: "POST",
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error("Failed to upload image to Cloudinary");
          }
      
          const data = await response.json(); // Parse JSON response
        //   console.log("Uploaded Image URL:", data.secure_url);
      
          return data.secure_url; // Return the uploaded image URL
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
          throw error;
        }
      };
      
      const triggerFileInput = () => {
        document.getElementById("imageUpload").click();
      };
    
    const openEditAmdocsJourneyDialog = () => {
        setEditAmdocsJourneyDialogOpen(true);
    };

    const closeEditAmdocsJourneyDialog = (confirmation) => {
        if(journeys.length>=1 && (journeys[journeys.length-1]["account"]==='' || journeys[journeys.length-1]["description"]==='' || journeys[journeys.length-1]["startDate"]==='' || (journeys[journeys.length-1]["endDate"]==='' && journeys[journeys.length-1]["isPresent"]===false))){
            setErrorMessage("Please fill all details first or delete incomplete experience.")
            setOpenErrorToast(true);
            return;
        }
        if(confirmation){
            setAmdocsJourney(journeys);
            employee.amdocsJourney = JSON.stringify(journeys);
            updateDetails();
        } else {
            setAmdocsJourney(JSON.parse(employeeSnapshot.amdocsJourney));
            setJourneys(JSON.parse(employeeSnapshot.amdocsJourney));
            
        }
        setEditAmdocsJourneyDialogOpen(false);
    };
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
            const response = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/employee/getById/${empId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': empToken 
            }
            });
            const data = await response.json();
            // console.log(data);
            
            if (response.ok) {
            // console.log(data);
            setEmployee(data); // Set the employee data
            setEmployeeSnapshot(data);
            setJourneys(await JSON.parse(data.amdocsJourney))
            // console.log(j)

            try {
                const journey= JSON.parse(data.amdocsJourney);
                setAmdocsJourney(journey)
            } catch (error) {
                console.log(error)
            }
            
            setPrimaryTechSkills(data.primaryTechSkill);
            setSecondaryTechSkills(data.secondaryTechSkill);
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
        const skillResponse = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/employee/getSkills`, {
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
        const domainResponse = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/employee/getDomain`, {
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
        setAnchorEl(null);
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
        // console.log("Editing mode..");
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

    const secondarySkillsHandleChange = (event, newValue) => {
        setSecondaryTechSkills(newValue);
        setChangesMade(true);
        setEmployee({
            ...employee,
            secondaryTechSkill: newValue
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

    const secondarySkillsHandleDelete = (skillToDelete) => {
        const updatedSkills = secondaryTechSkills.filter(skill => skill !== skillToDelete);
        setSecondaryTechSkills(updatedSkills);
        setChangesMade(true);
        setEmployee({
            ...employee,
            secondaryTechSkill: updatedSkills
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
          const response = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/employee/update`, {
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
            const updatedEmployee = JSON.parse(await response.text())
            setEmployee(updatedEmployee);
            setEmployeeSnapshot(updatedEmployee);
            setTimeout(() => {
            
                setSuccessMessage("Changes saved successfully.")
                setOpenSuccessToast(true);
            },1500);
            setLoading(false);
          }
    
        //   alert('Employee updated successfully!');
        } catch (err) {
            setErrorMessage("An error occured while updating your details");
            setOpenErrorToast(true);
            setEmployee(employeeSnapshot);
            setAmdocsJourney(JSON.parse(employeeSnapshot.amdocsJourney));
            setJourneys(JSON.parse(employeeSnapshot.amdocsJourney));
            setLoading(false)
        }
      };

    const undoChanges = () =>{
        setEmployee(employeeSnapshot);
        setAmdocsJourney(JSON.parse(employeeSnapshot.amdocsJourney));
        setJourneys(JSON.parse(employeeSnapshot.amdocsJourney));
    }


    const handleSaveDetails = () => {
        // console.log("Saving Details");
        if(!changesMade) return;
        updateDetails();
        setUpdateMode((prev) => !prev);
        
        setChangesMade(false);
        
    }

    const handleBoolean = (name) => {
        // console.log("Deleting", name);
        const updatedEmployee = {
            ...employee,
            [name]:  employee[name]===true ? false : true
        }
        setChangesMade(true);
        // updatedEmployee[name]
        // console.log("Updated Employee: ",updatedEmployee);
        setEmployee(updatedEmployee);
        
    }

    // const handleBooleanAdd = (name) => {
    //     console.log("Adding", name);
    // }

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
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleImgDropDown = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleDropDownClose = () => {
        setAnchorEl(null);
    }
  
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
                {/* <Button onClick={handleSaveDetails} variant="contained" disabled={!changesMade}>
                    Save
                </Button> */}
                <Box>
                    <Avatar aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleImgDropDown} alt={employee.empName} src={employee.empImage} />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleDropDownClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Box>

            <Grid container spacing={2} sx={{marginTop:8}}>
                <Grid size={{ xs: 6, md: 4 }}>
                    <Item sx={{position: 'relative'}}>
                        <Tooltip title={updateMode ? changesMade ? 'Save' : 'Cancel' : 'Edit'}>
                            {
                                changesMade ?
                                <Box onClick={handleSaveDetails} sx={{position: 'absolute',top: 10, right: 10,cursor: 'pointer' }}>
                                    <DoneAllIcon color="primary"/>
                                </Box>
                                :
                                <Box onClick={handleEdit} sx={{position: 'absolute',top: 10, right: 10,cursor: 'pointer' }}>
                                    {
                                        updateMode ? <ClearIcon /> : <EditIcon />
                                    }
                                </Box>   
                            }
                            {/* <Box onClick={handleEdit} sx={{position: 'absolute',top: 10, right: 10,cursor: 'pointer' }}>
                                {
                                    updateMode ? <EditOffIcon /> : <EditIcon />
                                }
                            </Box> */}
                        </Tooltip>
                        {/* <EditIcon sx={{position: 'absolute',top: 10, right: 10}}/> */}
                        <Box sx={{position:"relative"}}>
                            <Avatar
                                src={employee.empImage}
                                alt={employee.empName}
                                sx={{ width: 120, height: 120,m:2, mx: 'auto' }}
                            />
                            {updateMode && <><IconButton
                                color="primary"
                                onClick={triggerFileInput}
                                sx={{
                                position: "absolute",
                                top: 80,
                                right: 110,
                                zIndex: 2,
                                background: "white", // Optional: Add a white background for better visibility
                                borderRadius: "50%",
                                }}
                            >
                                <AddAPhotoIcon />
                            </IconButton>
                            <input
                                id="imageUpload"
                                type="file"
                                style={{ display: "none" }} // Hide input
                                accept="image/*" // Accept only images
                                onChange={handleImageUpload}
                            /></>}
                            <Typography align="center" variant="h6" sx={{ mt: 2,fontWeight: 700,color: '#1e88e5' }}>
                                {employee.empName}
                            </Typography>
                            <Typography align="center" color="text.secondary" sx={{fontWeight: 500}}>
                                {/* Software Engineer Specialist */}
                                {
                                    updateMode ? 
                                    <TextField id="standard-basic" label="Designation" name='empRole' value={employee.empRole} onChange={handleChange} variant="standard" /> : 
                                    employee.empRole
                                }  
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center',m:2}}>
                                {/* Full-stack product designer with hands-on experience in solving problems for clients across various domains. Skilled in communication, collaboration, and user-centered design. */}
                                {
                                    updateMode ? 
                                    <TextField fullWidth label="About You" name="empDesc" value={employee.empDesc} onChange={handleChange} id="fullWidth" /> : 
                                    employee.empDesc
                                }
                                
                            </Typography>

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

                            {/* Secondary Skills Section */}
                            <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Secondary Skills
                                </Typography>
                                <Typography sx={{display: 'flex',flexWrap: 'wrap', gap: 1}}>
                                
                                {
                                    updateMode ? 
                                    <Autocomplete
                                        multiple
                                        id="primary-skills"
                                        options={skillOptions}
                                        value={secondaryTechSkills}
                                        onChange={secondarySkillsHandleChange}
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
                                            onDelete={() => secondarySkillsHandleDelete(option)}
                                            key={index}
                                            />
                                        ))
                                        }
                                        freeSolo
                                        getOptionLabel={(option) => option}
                                    /> : 
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2,mt: 1 }}>
                                {employee.secondaryTechSkill?.map((skill,index) => (
                                        <Chip key={index} label={skill} color="success" variant="outlined" />
                                    ))}
                            </Box>
                                }
                            </Typography>
                            </Box>
                            {/* Functional Knowledge */}
                        </Box>
                    </Item>
                </Grid>
                <Grid direction="column" container size={{ xs: 6, md: 8 }}>
                    <Grid>
                        <Item>
                            {/* Basic Information */}
                            <Box sx={{m:0.5,position: 'relative'}}>
                            {/* <Tooltip title="Logout">
                                <Box onClick={handleLogout} sx={{ bgcolor: 'text.error', color: 'background.paper',position: 'absolute',top: 5, right: 5,cursor: 'pointer' }}>
                                    <LogoutIcon color="error"/>
                                </Box>
                            </Tooltip> */}
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Basic Information
                                    
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
                                    
                                </Box>
                                
                            </Box>
                            
                        </Item>
                    </Grid>
                        <Grid>
                            <EditAmdocsJourney open={editAmdocsJourneyDialogOpen} handleClose={closeEditAmdocsJourneyDialog} buttonText={"Save"} setAmdocsJourney={setAmdocsJourney} journeys={journeys} setJourneys={setJourneys} setErrorMessage={setErrorMessage} setOpenErrorToast={setOpenErrorToast}/>
                            <Item sx={{position:"relative"}}>
                                {/* Amdocs Journey Section */}
                                <Tooltip title={updateMode ? 'Cancel' : 'Edit'}>
                            <Box onClick={openEditAmdocsJourneyDialog} sx={{position: 'absolute',top: 10, right: 10,cursor: 'pointer' }}>
                                {
                                    updateMode ? <ClearIcon /> : <EditIcon />
                                }
                            </Box>
                        </Tooltip>
                            <Box sx={{m:0.5}}>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Amdocs Journey
                                    
                                </Typography>
                                {amdocsJourney?.map((exp,index)=>(
                                    <Box key={index} sx={{ m: 1 }}>
                                    <Typography variant="subtitle1" fontWeight={600} sx={{color: '#1e88e5'}}>
                                        {exp.account}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {exp.description} | {exp.startDate} - {exp.isPresent?"Present": exp.endDate}
                                    </Typography>
                                </Box>
                                ))}
                                {/* {[
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
                                ))} */}
                            </Box>
                            </Item>
                        </Grid>
                    <Grid> 
                        {/* Other Sections */}
                        {/* <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                Secondary Skills
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{display: 'flex',flexDirection: 'column',gap: 2}}>
                            <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                
                                {!updateMode && "Devops Knowledge: " } 
                                {
                                    updateMode ? 
                                    <TextField onChange={handleChange} value={employee.devOpsKnowledge} id="outlined-basic" label="devops knowledge..." name="devOpsKnowledge" variant="outlined" sx={{width: '50ch'}}/> : 
                                    <span style={{color: 'gray'}}>{employee.devOpsKnowledge}</span>
                                }
                            </Typography>
                            </AccordionDetails>
                        </Accordion> */}
                        
                        {/* <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                More Info    
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{display: 'flex',flexDirection: 'column',gap: 2}}>
                            <Typography sx={{display: 'flex',flexWrap: 'wrap', gap: 1}}>
                                {
                                    updateMode ? 
                                    [{data: employee.engagementActivityContribution, label:"Contributed to Engagement Acitivities",name: "engagementActivityContribution"},
                                        {data: employee.explorationInterest, label:"Exploration Interest",name: "explorationInterest"},
                                        {data: employee.contributedToDesign, label:"Contributed to Design",name: "contributedToDesign"},
                                        {data: employee.mentoringAbility, label:"Mentoring Ability",name: "mentoringAbility"}]
                                        .map(({data,label,name},index) => (
                                            data ? <Chip key={index} label={label} onDelete={() => handleBoolean(name)} deleteIcon={<RemoveIcon />} variant='outlined' color="success" /> 
                                            : <Chip key={index} label={label} onDelete={() => handleBoolean(name)} deleteIcon={<AddIcon />} variant='outlined' color="error" />
                                    )) : 
                                    [{data: employee.engagementActivityContribution, label:"Contributed to Engagement Acitivities",name: "engagementActivityContribution"},
                                    {data: employee.explorationInterest, label:"Exploration Interest",name: "explorationInterest"},
                                    {data: employee.contributedToDesign, label:"Contributed to Design",name: "contributedToDesign"},
                                    {data: employee.mentoringAbility, label:"Mentoring Ability",name: "mentoringAbility"}]
                                    .map(({data,label,name},index) => (
                                        data && <Chip key={index} label={label} name={name} color="success" variant="outlined" />
                                    ))
                                }
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
                        </Accordion> */}
                        <Grid>
                            <Item>
                                <Box sx={{m:0.5}}>
                                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        More Info    
                                    </Typography>
                                    <Box sx={{m:1, display: "flex", flexDirection: "column", gap: 2}}>
                                        <Typography sx={{display: 'flex',flexWrap: 'wrap', gap: 1}}>
                                            {/* Details about {section} will go here. */}
                                            {
                                                updateMode ? 
                                                [{data: employee.engagementActivityContribution, label:"Contributed to Engagement Acitivities",name: "engagementActivityContribution"},
                                                    {data: employee.explorationInterest, label:"Exploration Interest",name: "explorationInterest"},
                                                    {data: employee.contributedToDesign, label:"Contributed to Design",name: "contributedToDesign"},
                                                    {data: employee.mentoringAbility, label:"Mentoring Ability",name: "mentoringAbility"}]
                                                    .map(({data,label,name},index) => (
                                                        data ? <Chip key={index} label={label} onDelete={() => handleBoolean(name)} deleteIcon={<RemoveIcon />} variant='outlined' color="success" /> 
                                                        : <Chip key={index} label={label} onDelete={() => handleBoolean(name)} deleteIcon={<AddIcon />} variant='outlined' color="error" />
                                                )) : 
                                                [{data: employee.engagementActivityContribution, label:"Contributed to Engagement Acitivities",name: "engagementActivityContribution"},
                                                {data: employee.explorationInterest, label:"Exploration Interest",name: "explorationInterest"},
                                                {data: employee.contributedToDesign, label:"Contributed to Design",name: "contributedToDesign"},
                                                {data: employee.mentoringAbility, label:"Mentoring Ability",name: "mentoringAbility"}]
                                                .map(({data,label,name},index) => (
                                                    data && <Chip key={index} label={label} name={name} color="success" variant="outlined" />
                                                ))
                                            }
                                        </Typography>
                                        <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                    
                                    {!updateMode && "Devops Knowledge: " } 
                                    {
                                        updateMode ? 
                                        <TextField onChange={handleChange} value={employee.devOpsKnowledge} id="outlined-basic" label="devops knowledge..." name="devOpsKnowledge" variant="outlined" sx={{width: '50ch'}}/> : 
                                        <span style={{color: 'gray'}}>{employee.devOpsKnowledge}</span>
                                    }
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
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={openErrorToast} autoHideDuration={GLOBAL_CONFIG.ALERT_TIME} onClose={handleCloseErrorToast} anchorOrigin={{ vertical: GLOBAL_CONFIG.ALERT_VERTICAL_POSITION, horizontal: GLOBAL_CONFIG.ALERT_HORIZONTAL_POSITION }}>
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
      <Snackbar open={openWarningToast} autoHideDuration={GLOBAL_CONFIG.ALERT_TIME} onClose={handleCloseWarningToast} anchorOrigin={{ vertical: GLOBAL_CONFIG.ALERT_VERTICAL_POSITION, horizontal: GLOBAL_CONFIG.ALERT_HORIZONTAL_POSITION }}>
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