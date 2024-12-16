// import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

// export default function ResetPassword() {
//   // Extract the 'token' query parameter
//   const [searchParams] = useSearchParams();
//   const [password,setPassword]=useState("");
//   const [confirmPassword,setConfirmPassword]=useState("");
//   const token = searchParams.get('token'); // Get the 'token' parameter from the URL

//   const handleResetPassword = async ()=>{
//     try {
//       // First API call to forgot password
//       const response = await fetch('http://localhost:8080/api/v1/employee/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token
//         },
//         body: JSON.stringify({empPassword: password})
//       });
//       const data = await response.text();
//     // console.log(response);
    
//       if(response.ok){
//         console.log(data);
//       }else console.error("Error resetting password.");
//       }
//       catch(error){
//         console.log(error);
//       }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if(password === confirmPassword)handleResetPassword();
//   }

//   return (
//     <div>
//       <h1>Reset Password</h1>

//       {/* Render your reset password form here */}
//       <form onSubmit={handleSubmit}>
//         <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New Password" />
//         <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
//         <button onClick={handleSubmit} type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Container, Typography, TextField, Box, Alert, IconButton, InputAdornment, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GLOBAL_CONFIG from '../../constants/global';
 
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Get the 'token' parameter from the URL
  const navigate = useNavigate();

    const hashText = async (text) => {
        const encoder = new TextEncoder(); // Converts the string to a Uint8Array
        const data = encoder.encode(text); // Encode the text
    
        const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Compute the hash
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toString(); // Convert bytes to hex
        return hashHex; // Return the hash as a hex string
    };


    const handleResetPassword = async ()=>{
        const hashedPassword = await hashText(newPassword);
        try {
        // First API call to forgot password
        const response = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/employee/reset-password`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': token
            },
            body: JSON.stringify({empPassword: hashedPassword})
        });
        const data = await response.text();
        if(response.ok){
            // console.log(data);
        }else console.error("Error resetting password.");
        }
        catch(error){
            console.log(error);
        }
    }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
 
    // Simple password validation
    if (!newPassword || !confirmPassword) {
      setError('Both fields are required.');
      setLoading(false);
      return;
    }
 
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
 
    // Simulate a successful password reset (in a real app, make an API call here)
    setTimeout(() => {
        handleResetPassword();
        setSuccess('Your password has been reset successfully.');
        setNewPassword('');
        setConfirmPassword('');
        setLoading(false);

        setTimeout(() => {
            navigate('/');
        },1500);
    }, 1500);
  };
 
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
          padding: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Reset Your Password
        </Typography>
 
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
 
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* New Password Input Field */}
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            margin="normal"
            // type={showNewPassword ? 'text' : 'password'} // Toggle between text and password
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton
            //         onClick={() => setShowNewPassword((prev) => !prev)} // Toggle password visibility
            //         edge="end"
            //       >
            //         {showNewPassword ? <VisibilityOff /> : <Visibility />}
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
          />
 
          {/* Confirm Password Input Field */}
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            // type={showConfirmPassword ? 'text' : 'password'} // Toggle between text and password
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton
            //         onClick={() => setShowConfirmPassword((prev) => !prev)} // Toggle password visibility
            //         edge="end"
            //       >
            //         {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
          />
 
          {/* Button Container */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',  // Centers the button horizontally
              width: '100%',              // Ensures the Box takes up the full width
              marginTop: 2,               // Adds space between the input and button
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: '50%',            // Set the desired width for the button (50% in this case)
              }}
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
 
export default ResetPassword;
