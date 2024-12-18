import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Chip,TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function TechDetails({props}) {
  const {
    empName,setEmpName,supervisorName,setSupervisorName,currentAccount,setCurrentAccount,devOpsKnowledge,setDevOpsKnowledge,functionalKnowledge, setFunctionalKnowledge,
    primaryTechSkill,setPrimaryTechSkill,secondaryTechSkill,setSecondaryTechSkill,amdocsExperienceYear,setAmdocsExperienceYear,amdocsExperienceMonths,setAmdocsExperienceMonths,
    totalExperienceYear,setTotalExperienceYear,totalExperienceMonths,setTotalExperienceMonths,skillOptions,domainList} = props
   
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
    
      
      <FormGrid size={{ xs: 6 }}>
  <FormLabel htmlFor="amdocs-experience" required>
    Experience @Amdocs
  </FormLabel>
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    {/* Years Input */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <OutlinedInput
        id="amdocs-experience-years"
        name="amdocs-experience-years"
        type="number"
        placeholder="4"
        required
        size="small"
        value={amdocsExperienceYear}
        onChange={(e) => {
          let value = parseFloat(e.target.value);
           if (value < 0) {
              e.target.value = ''; // Reset to 0 if user enters a negative number
              setAmdocsExperienceYear(0)
            }
          else setAmdocsExperienceYear(value)
        }}
        inputProps={{
          min: 0
        }}
        style={{ width: '60px' }} // Adjust the width to make it smaller
      />
      <span>Years</span>
    </div>

    {/* Months Input */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <OutlinedInput
        id="amdocs-experience-months"
        name="amdocs-experience-months"
        type="number"
        placeholder="0"
         
        size="small"
        value={amdocsExperienceMonths}
        onChange={(e) => {
          let value = parseFloat(e.target.value);
          if (value >= 0 && value <= 11) {
            setAmdocsExperienceMonths(value); 
          } else if (value > 11) {
            e.target.value = 11;  
            setAmdocsExperienceMonths(11);
          } else if (value < 0) {
            e.target.value = 0; // Reset to 0 if user enters a negative number
            setAmdocsExperienceMonths(0);
        }}}
        inputProps={{
          min: 0,
          max: 11,
        }}
        style={{ width: '60px' }} // Adjust the width to make it smaller
      />
      <span>Months</span>
    </div>
  </div>
</FormGrid>

<FormGrid size={{ xs: 6 }}>
  <FormLabel htmlFor="total-experience" required>
    Total Experience
  </FormLabel>
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    {/* Years Input */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <OutlinedInput
        id="total-experience-years"
        name="total-experience-years"
        type="number"
        placeholder="4"
        required
        size="small"
        value={totalExperienceYear}
        onChange={(e) => {
          let value = parseFloat(e.target.value);
           if (value < 0) {
              e.target.value = ''; // Reset to 0 if user enters a negative number
              setTotalExperienceYear(0)
            }
           else setTotalExperienceYear(value)
        }}
        inputProps={{
          min: 0
        }}
        style={{ width: '60px' }} // Adjust the width to make it smaller
      />
      <span>Years</span>
    </div>

    {/* Months Input */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <OutlinedInput
        id="total-experience-months"
        name="total-experience-months"
        type="number"
        placeholder="0"
         
        size="small"
        // value={amdocsExperienceMonths}
        onChange={(e) => {
          let value = parseFloat(e.target.value);
          if (value >= 0 && value <= 11) {
            setTotalExperienceMonths(value); 
          } else if (value > 11) {
            e.target.value = 11;  
            setTotalExperienceMonths(11);
          } else if (value < 0) {
            e.target.value = 0; // Reset to 0 if user enters a negative number
            setTotalExperienceMonths(0);
        }
        }}
        inputProps={{
          min: 0,
          max: 12,
        }}
        style={{ width: '60px' }} // Adjust the width to make it smaller
      />
      <span>Months</span>
    </div>
  </div>
</FormGrid>

    </Grid>
  );
}