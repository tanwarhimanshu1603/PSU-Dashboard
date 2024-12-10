import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function BasicInfo({props}) {
  const {empEmail,setEmpEmail,empId,setEmpId,empPassword,setEmpPassword,confirmPassword,setConfirmPassword} = props
  
  return (
    <Grid container spacing={3}  style={{"textAlign": "left"}}>
      <FormGrid size={{ xs: 6 }}>
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
          onChange={(e)=>setEmpId(e.target.value)}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
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
          onChange={(e)=>setEmpEmail(e.target.value)}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="password" required>
          Password
        </FormLabel>
        <OutlinedInput
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          required
          size="small"
          value={empPassword}
          onChange={(e)=>setEmpPassword(e.target.value)}
        />
      </FormGrid>
      
      
      <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="password" required>
          Confirm Password
        </FormLabel>
        <OutlinedInput
          id="password"
          name="password"
          type="password"
          autoComplete="password"
          required
          size="small"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
        />
      </FormGrid>
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