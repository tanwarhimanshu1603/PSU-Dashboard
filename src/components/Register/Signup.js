import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AppTheme from '../Register/shared-theme/AppTheme';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ColorModeIconDropdown from '../Register/shared-theme/ColorModeIconDropdown';
import BasicInfo from './signup-components/BasicInfo';
import TechDetails from './signup-components/TechDetails';
import AdditionalDetails from './signup-components/AdditionalDetails';
import Content from '../Login/sign-in-side/Content';
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AmdocsJourney from './signup-components/AmdocsJourney';
import GLOBAL_CONFIG from '../../constants/global';
const steps = ['Basic Information', 'Technical Details','Amdocs Journey', 'Additional Information'];
function getStepContent(step,propsCombined) {
  switch (step) {
    case 0:
      return <BasicInfo props={propsCombined[step]} />;
    case 1:
      return <TechDetails props={propsCombined[step]}/>;
    case 2:
      return <AmdocsJourney props={propsCombined[step]}/>
    case 3:
      return <AdditionalDetails props={propsCombined[step]}/>;
    default:
      throw new Error('Unknown step');
  }
}
export default function Signup(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [empImage,setEmpImage] = useState("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png")
  const [empEmail,setEmpEmail] = useState("");
  const [empPassword,setEmpPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [empId,setEmpId] = useState("");
  const [empName,setEmpName] = useState('');
  const [supervisorName,setSupervisorName] = useState('')
  const [currentAccount,setCurrentAccount] = useState('');
  const [amdocsExperience,setAmdocsExperience]=useState('');
  const [totalExperience,setTotalExperience]=useState('');
  const [amdocsJourney, setAmdocsJourney] = useState('');
  const [journeys, setJourneys] = useState([
    // { account: '', description: '', startDate: '', endDate: '',isPresent:false },
  ]);
  const [functionalKnowledge, setFunctionalKnowledge] = useState([]);
  const [primaryTechSkill, setPrimaryTechSkill] = useState([]);
  const [primaryProductSubdomain, setPrimaryProductSubdomain] = useState([]);
  const [secondaryTechSkill, setSecondaryTechSkill] = useState([]);
  const [secondaryProduct, setSecondaryProduct] = useState(null);
  const [devOpsKnowledge, setDevOpsKnowledge] = useState('');
  const [engagementActivityContribution, setEngagementActivityContribution] = useState(null);
  const [presentationSkills, setPresentationSkills] = useState(null);
  const [hobbiesSports, setHobbiesSports] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [approved, setApproved] = useState(false);
  const [openErrorToast,setOpenErrorToast] = useState(false);
  const [openSuccessToast,setOpenSuccessToast] = useState(false);
  const [errorMessage,setErrorMessage]=useState('');
  const [successMessage,setSuccessMessage] = useState('');
  const [mentoringAbility, setMentoringAbility] = useState(null);
  const [contributedToDesign, setContributedToDesign] = useState(null);
  const [explorationInterest, setExplorationInterest] = useState(null);
  const [skillOptions,setSkillOptions] = useState([]);
  const [domainList,setDomainList] = useState([]);
  const [emailValidated,setEmailValidated] = useState(false);
  const basicInfoProps = {
    empImage,setEmpImage,empEmail,setEmpEmail,empId,setEmpId,empPassword,setEmpPassword,confirmPassword,setConfirmPassword,emailValidated,setEmailValidated
  }
  const techDetailsProps = {
    empName,setEmpName,supervisorName,setSupervisorName,currentAccount,setCurrentAccount,devOpsKnowledge,setDevOpsKnowledge,functionalKnowledge, setFunctionalKnowledge,
    primaryTechSkill,setPrimaryTechSkill,secondaryTechSkill,setSecondaryTechSkill,amdocsExperience,setAmdocsExperience,
    totalExperience,setTotalExperience,skillOptions,domainList
  }
  const amdocsJourneyProps = {
    setAmdocsJourney,journeys,setJourneys,setErrorMessage,setOpenErrorToast
  }
  const additionalInfoProps = {
    presentationSkills,setPresentationSkills,hobbiesSports,setHobbiesSports,mentoringAbility,setMentoringAbility,
    contributedToDesign,setContributedToDesign,explorationInterest,setExplorationInterest,engagementActivityContribution,setEngagementActivityContribution,
    additionalInfo,setAdditionalInfo
  }
  const propsCombined = [basicInfoProps,techDetailsProps,amdocsJourneyProps,additionalInfoProps]

  const navigate = useNavigate();

  const validateEmail = async () => {
    // e.preventDefault(); // Prevent default form submission behavior
    if (!empEmail || !/^[a-zA-Z0-9._%+-]+@amdocs\.com$/.test(empEmail)) {
      setErrorMessage('Please enter a valid email address with the @amdocs.com domain.')
      setOpenErrorToast(true);
      return;
    }
    try {
      const response = await fetch(`${GLOBAL_CONFIG.BASE_URL}/api/v1/employee/getEmp/${empEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        // Successful employee login
        const EmployeeResponse= JSON.parse(await response.text());
        if(EmployeeResponse.length===0){
          setSuccessMessage('Email and Id validated successfully.')
          setOpenSuccessToast(true);
          setEmailValidated(true);
        }
        else if(EmployeeResponse[0]["empId"]!==empId){

          setErrorMessage(`Email is already registered with different Emp Id`)
          setOpenErrorToast(true);
        }
        else {
          setErrorMessage(`Email and Id is already registered`)
          setOpenErrorToast(true);
        }
      }
       else {
        setErrorMessage(`Something went wrong while validating.`)
        setOpenErrorToast(true);
      }
    } catch (error) {
      setErrorMessage("Something went wrong while validating. : ",error.message)
      setOpenErrorToast(true)
    } finally {
      // setLoading(false); 
    }
  };
  
  const saveAmdocsJourney = () =>{
    const journeyAsString = JSON.stringify(journeys);
    setAmdocsJourney(journeyAsString)
  }
  const hashText = async (text) => {
    const encoder = new TextEncoder(); // Converts the string to a Uint8Array
    const data = encoder.encode(text); // Encode the text
  
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Compute the hash
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toString(); // Convert bytes to hex
    return hashHex; // Return the hash as a hex string
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    const hashedPassword = await hashText(empPassword);
    try {
      const response = await fetch(`${GLOBAL_CONFIG.BASE_URL}/api/v1/employee/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empEmail, empPassword:hashedPassword, empId, empName,
          empImage,currentAccount,supervisorName,amdocsExperience,
          totalExperience,amdocsJourney,functionalKnowledge,primaryTechSkill,
          primaryProductSubdomain,secondaryTechSkill,secondaryProduct,
          devOpsKnowledge,mentoringAbility,explorationInterest,contributedToDesign,
          engagementActivityContribution,presentationSkills,hobbiesSports,additionalInfo,approved
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register employee. Please check the input fields.");
      }
      handleNext();
    } catch (err) {
      console.log(err.message)
    }
};
const getAllSkills = async()=>{
  try {
    // First API call to admin login
    const skillResponse = await fetch(`${GLOBAL_CONFIG.BASE_URL}/api/v1/employee/getSkills`, {
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
    // First API call to admin login
    const domainResponse = await fetch(`${GLOBAL_CONFIG.BASE_URL}/api/v1/employee/getDomain`, {
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
useEffect(()=>{
  getAllSkills();
  getAllDomains()
},[])
  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };
  const handleCloseErrorToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  
    setOpenErrorToast(false);
  };
  const handleCloseSuccessToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  
    setOpenSuccessToast(false);
  };
  const validateInputs = () => {
    
    let isValid = true;

    if (!empEmail || !/^[a-zA-Z0-9._%+-]+@amdocs\.com$/.test(empEmail)) {
      setErrorMessage('Please enter a valid email address with the @amdocs.com domain.')
      setOpenErrorToast(true);
      isValid = false;
    }
    if (!empPassword || empPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.")
      setOpenErrorToast(true);
      isValid = false;
    } 
    if (empPassword!==confirmPassword) {
      setErrorMessage("Password does not match")
      setOpenErrorToast(true);
      isValid = false;
    }
    return isValid;
  };
  const handleNext = () => {
    let isValid = true;
  
    // Validation logic based on the active step
    if (activeStep === 0) {
      
      if (!empEmail || !empId || !empPassword || !confirmPassword) {
        isValid = false;
        setErrorMessage("Please fill in all required field before proceeding.")
        setOpenErrorToast(true);
        
      }
      else if(!validateInputs()) return;
      
    } else if (activeStep === 1) {
      if (
        !empName ||
        !supervisorName ||
        !currentAccount ||
        !functionalKnowledge ||
        !primaryTechSkill ||
        !secondaryTechSkill ||
        !amdocsExperience ||
        !totalExperience
      ) {
        isValid = false;
        setErrorMessage("Please fill in all required field before proceeding.")
        setOpenErrorToast(true);
        
      }
      // else if(parseFloat(amdocsExperience)<1){
      //   setJourneys([{ account: '', description: '', startDate: '', endDate: '',isPresent:false}])
      // }
    }
    else if(activeStep ===2){
      // if(amdocsExperience>0 && journeys[0].account===''){
      //   isValid=false;
      
      // }
      //else 
      if(journeys.length>=1 && (journeys[journeys.length-1]["account"]==='' || journeys[journeys.length-1]["description"]==='' || journeys[journeys.length-1]["startDate"]==='' || (journeys[journeys.length-1]["endDate"]==='' && journeys[journeys.length-1]["isPresent"]===false))){
        setErrorMessage("Please fill all details first or delete this experience.")
        setOpenErrorToast(true);
        return;
    }
      saveAmdocsJourney();
    }
  
    // Move to the next step only if the validation passes
    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
        <ColorModeIconDropdown />
      </Box>

      <Grid
        container
        sx={{
          height: {
            xs: '100%',
            sm: 'calc(100dvh - var(--template-frame-height, 0px))',
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          {/* <SitemarkIcon />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Info totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
          </Box> */}
          <Content/>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: '100%', height: 40 }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1"><DoneAllIcon  /></Typography>
                <Typography variant="h5">Thank you for filling your details!</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  A request have been sent to Administrator for approval. You will receive an email after getting approved.
                </Typography>
                <Button onClick={() => navigate('/')} variant="contained" sx={{maxWidth: '120px'}}>Login</Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,propsCombined)}
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={emailValidated?<ChevronRightRoundedIcon />:""}
                    onClick={
                      () => {
                        if(activeStep ===0 && !emailValidated){
                          validateEmail();
                        }
                        else if (activeStep === steps.length - 1) {
                          handleSubmit();
                        } else {
                          handleNext();
                        }
                      }
                    }
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {(() => {
                      if(activeStep ===0 && !emailValidated){
                        return 'Validate Email'
                      }
                      else if (activeStep === steps.length - 1) {
                            return 'Send for approval';
                        } else {
                            return 'Next';
                        }
                      })()}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}