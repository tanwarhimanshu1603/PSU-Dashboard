import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IconButton } from "@mui/material";
import {Box }from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function BasicInfo({ props }) {
  const {empImage,setEmpImage, empEmail, setEmpEmail, empId, setEmpId, empPassword, setEmpPassword, confirmPassword, setConfirmPassword,emailValidated,setEmailValidated } = props
  //const [empId, setEmpId] = useState(""); // Employee ID state
 
  // Handle file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadToCloudinary(file);
      setEmpImage(uploadedUrl); // Store the Cloudinary URL
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const uploadToCloudinary = async (file) => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dczif4pj4/image/upload";
    const CLOUDINARY_UPLOAD_PRESET = "coe_dashboard";
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  
    try {
      // Make the POST request with fetch
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }
  
      const data = await response.json(); // Parse JSON response
      console.log("Uploaded Image URL:", data.secure_url);
  
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };
  
  const triggerFileInput = () => {
    document.getElementById("imageUpload").click();
  };
  return (
    <Grid container spacing={3} style={{ "textAlign": "left" }}>
      <Box sx={{ position: "relative", width: 150, height: 150,marginRight:25,marginLeft:25 }}>
  <Avatar
    alt="Remy Sharp"
    src={empImage} // Uploaded image
    sx={{ width: 150, height: 150 }}
  />
  {/* IconButton as an overlay */}
  <IconButton
    color="primary"
    onClick={triggerFileInput}
    sx={{
      position: "absolute",
      bottom: 14,
      right: 14,
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
  />
</Box>

<FormGrid size={{ xs: 12, md: 6 }} sx={{position:'relative'}}>
      {emailValidated?<TaskAltIcon sx={{ color: 'green',position:"absolute",left:"90px",top:"4px" }} fontSize="x-small"/>:""}
       <FormLabel htmlFor="empId" required>
          Employee Id
        </FormLabel>
        <OutlinedInput
          id="empId"
          name="empId"
          type="empId"
          placeholder="12345"
          autoComplete="empId"
          required
          size="small"
          value={empId}
          onChange={(e) => {setEmailValidated(false);setEmpId(e.target.value)}}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }} sx={{position:'relative'}}>
      {emailValidated?<TaskAltIcon sx={{ color: 'green',position:"absolute",left:"50px",top:"4px" }} fontSize="x-small"/>:""}
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="your@amdocs.com"
          autoComplete="email"
          required
          size="small"
          value={empEmail}
          onChange={(e) =>{setEmailValidated(false); setEmpEmail(e.target.value)}}
        />
      </FormGrid>
      {emailValidated && <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="password" required>
          Password
        </FormLabel>
        <OutlinedInput
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          disabled={!emailValidated}
          required
          size="small"
          value={empPassword}
          onChange={(e) => setEmpPassword(e.target.value)}
        />
      </FormGrid>}


      {emailValidated && <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="password" required>
          Confirm Password
        </FormLabel>
        <OutlinedInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="password"
          disabled={!emailValidated}
          required
          size="small"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormGrid>}
      {/* <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          size="small"
        />
      </FormGrid> */}
      {/* <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="address2"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line2"
          required
          size="small"
        />
      </FormGrid> */}
      {/* <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="New York"
          autoComplete="City"
          required
          size="small"
        />
      </FormGrid> */}
      {/* <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="NY"
          autoComplete="State"
          required
          size="small"
        />
      </FormGrid> */}
      {/* <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
          size="small"
        />
      </FormGrid> */}
      {/* <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="United States"
          autoComplete="shipping country"
          required
          size="small"
        />
      </FormGrid> */}

    </Grid>
  );
}