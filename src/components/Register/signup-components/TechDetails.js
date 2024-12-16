import * as React from 'react';
import {useState,useEffect} from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Select, MenuItem,Chip,InputLabel,TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import{ FormControl }from '@mui/material';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function TechDetails({props}) {
  const {
    empName,setEmpName,supervisorName,setSupervisorName,currentAccount,setCurrentAccount,devOpsKnowledge,setDevOpsKnowledge,functionalKnowledge, setFunctionalKnowledge,
    primaryTechSkill,setPrimaryTechSkill,secondaryTechSkill,setSecondaryTechSkill,amdocsExperience,setAmdocsExperience,
    totalExperience,setTotalExperience,skillOptions,domainList} = props
   
  const functionalKnowledgeHandleChange = (event, newValue) => {
    setFunctionalKnowledge(newValue);
  };

  const functionalKnowledgeHandleDelete = (domainToDelete) => {
    setFunctionalKnowledge(functionalKnowledge.filter(domain => domain !== domainToDelete));
  };
  
  const primarySkillsHandleChange = (event, newValue) => {
    const uniqueSkills = [...new Set(newValue)]; // Ensure unique selections
    setPrimaryTechSkill(uniqueSkills);
  };

  const primarySkillsHandleDelete = (skillToDelete) => {
    setPrimaryTechSkill(primaryTechSkill.filter(skill => skill !== skillToDelete));
  };

  const secondarySkillsHandleChange = (event, newValue) => {
    const uniqueSkills = [...new Set(newValue)]; 
    setSecondaryTechSkill(uniqueSkills);
  };

  const secondarySkillsHandleDelete = (skillToDelete) => {
    setSecondaryTechSkill(secondaryTechSkill.filter(skill => skill !== skillToDelete));
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
          value={empName}
          onChange={(e)=>{setEmpName(e.target.value)}}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="supervisor" required>
          Current Supervisor
        </FormLabel>
        <OutlinedInput
          id="supervisor"
          name="supervisor"
          type="text"
          placeholder="Jane Doe"
          required
          size="small"
          value={supervisorName}
          onChange={(e)=>setSupervisorName(e.target.value)}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="current-account" required>
          Current Account
        </FormLabel>
        <OutlinedInput
          id="current-account"
          name="current-account"
          type="text"
          placeholder="TMO-Canada"
          required
          size="small"
          value={currentAccount}
          onChange={(e)=>setCurrentAccount(e.target.value)}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }} >
        <FormLabel htmlFor="devOps-knowledge" required>
          DevOps Knowledge
        </FormLabel>
        <OutlinedInput
          id="devOps-knowledge"
          name="devOps-knowledge"
          type="text"
          placeholder="Jenkins, CI/CD"
          required
          size="small"
          value={devOpsKnowledge}
          onChange={(e)=>setDevOpsKnowledge(e.target.value)}
        />
      </FormGrid>
      {/* <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor="domain" required>
        Current Domain
      </FormLabel>
      <FormControl fullWidth required size="small">
        <Select
          labelId="domain-label"
          id="domain"
          name="domain"
          value={selectedDomain}
          onChange={handleDomainChange}
          label="Select Domain"
        >
          {domainList.map((domain)=>{
            return <MenuItem value={domain}>{domain}</MenuItem>
          })}
          
        </Select>
      </FormControl>
    </FormGrid> */}
    <FormGrid size={{ xs: 12 }}>
      <FormLabel htmlFor="functional-knowledge" required>
        Functional Knowledge
      </FormLabel>
      <Autocomplete
        multiple
        id="functional-knowledge"
        options={domainList}
        value={functionalKnowledge}
        onChange={functionalKnowledgeHandleChange}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Select Skills"
            placeholder="Search & select domains"
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
              onDelete={() => functionalKnowledgeHandleDelete(option)}
              key={index}
            />
          ))
        }
        freeSolo
        getOptionLabel={(option) => option}
      />
    </FormGrid>
      <FormGrid size={{ xs: 12 }}>
      <FormLabel htmlFor="primary-skills" required>
        Primary Tech Skills
      </FormLabel>
      <Autocomplete
        multiple
        id="primary-skills"
        options={[...new Set(skillOptions)]}
        value={primaryTechSkill}
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
              key={option}
            />
          ))
        }
        freeSolo
        getOptionLabel={(option) => option}
      />
    </FormGrid>
    <FormGrid size={{ xs: 12 }}>
      <FormLabel htmlFor="primary-skills" required>
        Secondary Tech Skills
      </FormLabel>
      <Autocomplete
        multiple
        id="secondary-skills"
        options={[...new Set(skillOptions)]}
        value={secondaryTechSkill}
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
              key={option}
            />
          ))
        }
        freeSolo
        getOptionLabel={(option) => option}
      />
    </FormGrid>
    {/* <FormGrid size={{ xs: 12, md: 12 }} >
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
          value={secondaryTechSkill}
          onChange={(e)=>setSecondaryTechSkill(e.target.value)}
        />
      </FormGrid> */}
      
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
          value={amdocsExperience}
          onChange={(e) => {
            const value = e.target.value;
            if (parseFloat(value) >= 0) {
              setAmdocsExperience(value);
            }
            // else{
            //   setAmdocsExperience("0")
            // }
          }}
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
          value={totalExperience}
          onChange={(e) => {
            const value = e.target.value;
            if (parseFloat(value) >= 0) {
              setTotalExperience(value);
            }
            // else{
            //   setTotalExperience("0")
            // }
          }}
        />
      </FormGrid>
      {/* <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="amdocs-journey" required>
          Amdocs Journey
        </FormLabel>
        <OutlinedInput
          id="amdocs-journey"
          name="amdocs-journey"
          type="text"
          required
          size="small"
          value={amdocsJourney}
          onChange={(e)=>setAmdocsJourney(e.target.value)}
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