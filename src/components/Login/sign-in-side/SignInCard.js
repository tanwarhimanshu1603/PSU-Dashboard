import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
// import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GLOBAL_CONFIG from '../../../constants/global';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {
  const [email,setEmail] = React.useState(null);
  const [password,setPassword] = React.useState(null);
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [forgotPasswordMail,setForgotPasswordMail] = React.useState("");
  const [openSuccessToast,setOpenSuccessToast] = React.useState(false);
  const [openErrorToast,setOpenErrorToast] = React.useState(false);
  const [errorMessage,setErrorMessage]= React.useState('');
  const [successMessage,setSuccessMessage] = React.useState('');
  const navigate = useNavigate();
  const {setJwtToken} = React.useContext(AuthContext);
  // const navigate = useNavigate(); 
  const hashText = async (text) => {
    const encoder = new TextEncoder(); // Converts the string to a Uint8Array
    const data = encoder.encode(text); // Encode the text
  
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Compute the hash
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toString(); // Convert bytes to hex
    return hashHex; // Return the hash as a hex string
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleForgotPassword = async ()=>{
    
    try {
      // First API call to forgot password
      const response = await fetch(`${GLOBAL_CONFIG.BASE_URL}/api/v1/employee/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({empEmail: forgotPasswordMail})
      });
      if(response.ok){
        setSuccessMessage(`Mail has been sent to your Email ID ${forgotPasswordMail}`)
        setOpenSuccessToast(true);
      }else{
        setErrorMessage("Error sending mail for reset password. Please check email id")
        setOpenErrorToast(true);
      }
      }
      catch(error){
        setErrorMessage("Something went wrong!!")
        setOpenErrorToast(true);
      }finally{
        setOpen(false);
      }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    if (emailError || passwordError || !validateInputs()) {
      return; // Validate inputs before making API calls
    }
  
    const hashedPassword = await hashText(password);
    setLoading(true);
  
    try {
      // First API call to admin login
      const adminResponse = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminEmail: email, adminPassword: hashedPassword }),
      });
  
      if (adminResponse.ok) {
        // Successful admin login
        const token = await adminResponse.text();
        // localStorage.setItem("jwtToken", jwtToken);
        setJwtToken(token);
        // console.log("navigating to admin");
        
        navigate('/admin');
        return;
      } else if (adminResponse.status === 401) {
        // setErrorMessage('Unauthorized: Invalid admin credentials')
        // setOpenErrorToast(true);
        //console.warn('Unauthorized: Invalid admin credentials');
      } else {
        setErrorMessage(`Login failed with status: ${adminResponse.status}`)
        setOpenErrorToast(true);
        // console.error(`Admin login failed with status: ${adminResponse.status}`);
      }
  
      // Second API call to employee login
      const employeeResponse = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/employee/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ empEmail: email, empPassword: hashedPassword }),
      });
  
      if (employeeResponse.ok) {
        // Successful employee login
        const response = await employeeResponse.json();
        const jwtToken = response.token;
        const empId = response.employee.empId;
        localStorage.setItem("empToken", jwtToken);
        localStorage.setItem("empId", empId);
        navigate('/dashboard');
      } else if (employeeResponse.status === 401) {
        setErrorMessage('401 Unauthorized: Invalid credentials')
        setOpenErrorToast(true)
      } else {
        setErrorMessage(`Login failed with status: ${employeeResponse.status}`)
        setOpenErrorToast(true)
      }
    } catch (error) {
      setErrorMessage("Error : ",error.message)
      setOpenErrorToast(true)
    } finally {
      setLoading(false); // Always stop loading, even if there's an error
    }
  };
  

  const validateInputs = () => {
    
    let isValid = true;

    if (!email || !/^[a-zA-Z0-9._%+-]+@amdocs\.com$/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid amdocs email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };
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
  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        //component="form"
        // onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@amdocs.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            // autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </FormControl>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <ForgotPassword open={open} handleClose={handleClose} mail={forgotPasswordMail} setMail={setForgotPasswordMail} handleForgotPassword={handleForgotPassword} />
        <Button type="submit" fullWidth variant="contained" onClick={handleSubmit}>
             {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link
              href="/register"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider></Divider>
      
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
    </Card>
  );
}