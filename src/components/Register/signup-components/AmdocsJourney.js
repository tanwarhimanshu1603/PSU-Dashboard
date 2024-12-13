import * as React from 'react';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { DateRangeOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AmdocsJourney({ props }) {
  const { amdocsExperience, amdocsJourney, setAmdocsJourney,journeys, setJourneys } = props;

  const [index, setIndex] = useState(journeys.length-1);

  const handleInputChange = (field, value) => {
    const updatedJourneys = [...journeys];
    updatedJourneys[index][field] = value;
    setJourneys(updatedJourneys);
    setAmdocsJourney(updatedJourneys);
  };

  const addJourney = () => {
    console.log("Adding" , journeys[journeys.length-1])
    if(journeys[journeys.length-1]["account"]==='' || journeys[journeys.length-1]["description"]==='' || journeys[journeys.length-1]["startDate"]===''){
        alert("Please fill all details first")
        return;
    }
    const newJourney = { account: '', description: '', startDate: '', endDate: '',isPresent:false    };
    setJourneys([...journeys, newJourney]);
    setIndex(journeys.length);
    console.log(journeys)
  };

  const removeJourney = (currentIndex) => {
    if (journeys.length > 1) {
      const updatedJourneys = journeys.filter((_, i) => i !== currentIndex);
      setJourneys(updatedJourneys);
      setIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
  };

  const goBack = () => {
    setIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goForward = () => {
    setIndex((prevIndex) => Math.min(journeys.length - 1, prevIndex + 1));
  };

  if (amdocsExperience < 1) {
    return (
      <Grid container spacing={3} style={{ textAlign: 'left' }}>
        Since your experience at Amdocs is less than one year, you may skip this section.
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} style={{ textAlign: 'left' }}>
      <FormGrid size={{ xs: 12, md: 6 }}>{index + 1}/{journeys.length}</FormGrid>
      <FormGrid
        size={{ xs: 12, md: 6 }}
        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}
      >
        <Tooltip title="Remove">
          <DeleteIcon onClick={() => removeJourney(index)} 
          style={{
            cursor: 'pointer',
          }}
           />
        </Tooltip>
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor={`account-${index}`} required>
          Account
        </FormLabel>
        <OutlinedInput
          id={`account-${index}`}
          name="account"
          type="text"
          placeholder="Account Name"
          autoComplete="off"
          required
          size="small"
          value={journeys[index].account}
          onChange={(e) => handleInputChange('account', e.target.value)}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor={`description-${index}`} required>
          Description
        </FormLabel>
        <OutlinedInput
          id={`description-${index}`}
          name="description"
          type="text"
          placeholder="Description"
          required
          size="small"
          value={journeys[index].description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor={`startDate-${index}`} required>
          From
        </FormLabel>
        <OutlinedInput
          id={`startDate-${index}`}
          name="startDate"
          type="date"
          required
          size="small"
          value={journeys[index].startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
  <FormLabel htmlFor={`endDate-${index}`} required>
    To
  </FormLabel>
  <OutlinedInput
    id={`endDate-${index}`}
    name="endDate"
    type="date"
    required
    size="small"
    value={journeys[index].endDate}
    onChange={(e) => handleInputChange('endDate', e.target.value)}
    disabled={journeys[index].isPresent} // Disable if "Present" is checked
  />
  <FormControlLabel
    control={
      <Checkbox
        checked={journeys[index].isPresent || false} // Default to false if undefined
        onChange={(e) => {
          const updatedJourneys = [...journeys];
          updatedJourneys[index].isPresent = e.target.checked;

          if (e.target.checked) {
            // Clear the "endDate" field if "Present" is checked
            updatedJourneys[index].endDate = '';
          }

          setJourneys(updatedJourneys);
          setAmdocsJourney(updatedJourneys);
        }}
        name={`isPresent-${index}`}
        color="primary"
      />
    }
    label="Present"
  />
</FormGrid>

<FormGrid size={{ xs: 12, md: 6 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <Tooltip title="Back">
      <ChevronLeftIcon
        onClick={goBack}
        style={{
          cursor: index > 0 ? 'pointer' : 'not-allowed',
          color: index > 0 ? 'inherit' : 'gray',
        }}
      />
    </Tooltip>
    <Tooltip title="Next">
      <ChevronRightIcon
        onClick={goForward}
        style={{
          cursor: index < journeys.length - 1 ? 'pointer' : 'not-allowed',
          color: index < journeys.length - 1 ? 'inherit' : 'gray',
        }}
      />
    </Tooltip>
  </div>
</FormGrid>

      <FormGrid
        size={{ xs: 12, md: 6 }}
        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}
      >
        <Tooltip title="Add new">
          <AddIcon onClick={addJourney}
          style={{
            cursor: 'pointer',
          }}
           />
        </Tooltip>
      </FormGrid>
    </Grid>
  );
}