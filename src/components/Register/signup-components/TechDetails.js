import * as React from 'react';
import {useState} from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Select, MenuItem,Chip,InputLabel,TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function TechDetails() {
  const [selectedPrimarySkills, setSelectedPrimarySkills] = useState([]);
  const [selectedSecondarySkills, setSelectedSecondarySkills] = useState([]);
  
  const skillOptions = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "Go",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "SQL",
    // Add more skills as needed
  ];
  const primarySkillsHandleChange = (event, newValue) => {
    setSelectedPrimarySkills(newValue);
  };

  const primarySkillsHandleDelete = (skillToDelete) => {
    setSelectedPrimarySkills((prevSkills) => prevSkills.filter(skill => skill !== skillToDelete));
  };
  return (
    <Grid container spacing={3} style={{ "textAlign": "left" }}>
      <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="name" required>
          Name
        </FormLabel>
        <OutlinedInput
          id="name"
          name="name"
          type="name"
          placeholder="John Doe"
          autoComplete="name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
      <FormLabel htmlFor="primary-skills" required>
        Primary Tech Skills
      </FormLabel>
      <Autocomplete
        multiple
        id="primary-skills"
        options={skillOptions}
        value={selectedPrimarySkills}
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
      />
    </FormGrid>
    <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="secondary-skill" required>
          Secondary Skills
        </FormLabel>
        <OutlinedInput
          id="secondary-skill"
          name="secondary-skill"
          type="text"
          placeholder="ReactJS"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="supervisor" required>
          Supervisor
        </FormLabel>
        <OutlinedInput
          id="supervisor"
          name="supervisor"
          type="text"
          placeholder="Jane Doe"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="amdocs-experience" required>
          Experience @Amdocs (in years)
        </FormLabel>
        <OutlinedInput
          id="amdocs-experience"
          name="amdocs-experience"
          type="number"
          placeholder="2.5"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="total-experience" required>
          Total Experience (in years)
        </FormLabel>
        <OutlinedInput
          id="total-experience"
          name="total-experience"
          type="number"
          placeholder="4.2"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="amdocs-journey" required>
          Amdocs Journey
        </FormLabel>
        <OutlinedInput
          id="amdocs-journey"
          name="amdocs-journey"
          type="text"
          required
          size="small"
          
        />
      </FormGrid>
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
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
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
      </FormGrid>
      
      <FormGrid size={{ xs: 6 }}>
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