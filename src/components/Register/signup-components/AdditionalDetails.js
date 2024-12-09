import * as React from 'react';
import { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { RadioGroup, Radio } from '@mui/material';

import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AdditionalDetails({props}) {
  // const [presentationSkill,setPresentationSkill]= useState(null);
  // const [hobby,setHobby] = useState(null);
  // const [mentoringAbility, setMentoringAbility] = useState(null);
  // const [contributedToDesign, setContributedToDesign] = useState(null);
  // const [explorationInterest, setExplorationInterest] = useState(null);
  // const [engagementActivity, setEngagementActivity] = useState(null);
 const {
  presentationSkills,setPresentationSkills,hobbiesSports,setHobbiesSports,mentoringAbility,setMentoringAbility,
  contributedToDesign,setContributedToDesign,explorationInterest,setExplorationInterest,engagementActivityContribution,setEngagementActivityContribution
} = props
  const handlePresentationSkillChange = (event) => {
    setPresentationSkills(event.target.value);
  };

  const handleHobbyChange = (event) => {
    setHobbiesSports(event.target.value);
  };

  const handleMentoringChange = (event) => {
    setMentoringAbility(event.target.value);
  };

  const handleContributedToDesignChange = (event) => {
    setContributedToDesign(event.target.value);
  };

  const handleExplorationInterestChange = (event) => {
    setExplorationInterest(event.target.value);
  };

  const handleEngagementActivityChange = (event) => {
    setEngagementActivityContribution(event.target.value);
  };

  return (
    <Grid container spacing={3} style={{ textAlign: "left" }}>
      {/* Presentation Skill */}
      <FormGrid item xs={12} sm={6}>
        <FormLabel htmlFor="presentation-skill" >
          Presentation Skill (out of 5)
        </FormLabel>
        <OutlinedInput
          id="presentation-skill"
          name="presentation-skill"
          type="number"
          placeholder="4"
          value={presentationSkills}
          onChange={handlePresentationSkillChange}
          // required
          size="small"
        />
      </FormGrid>

      {/* Hobbies and Sports */}
      <FormGrid item xs={12} sm={6}>
        <FormLabel htmlFor="hobby" >
          Hobbies and Sports
        </FormLabel>
        <OutlinedInput
          id="hobby"
          name="hobby"
          type="text"
          size="small"
          value={hobbiesSports}
          onChange={handleHobbyChange}
        />
      </FormGrid>

      {/* Mentoring Ability */}
      <Grid item xs={12} sm={6}>
        <FormLabel htmlFor="mentoring-ability">
          Mentoring Ability
        </FormLabel>
        <RadioGroup
          id="mentoring-ability"
          name="mentoring-ability"
          value={mentoringAbility}
          onChange={handleMentoringChange}
          row
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>

      {/* Contributed to Design */}
      <Grid item xs={12} sm={6}>
        <FormLabel htmlFor="contributed-to-design">
          Contributed to Design
        </FormLabel>
        <RadioGroup
          id="contributed-to-design"
          name="contributed-to-design"
          value={contributedToDesign}
          onChange={handleContributedToDesignChange}
          row
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>

      {/* Exploration Interest */}
      <Grid item xs={12} sm={6}>
        <FormLabel htmlFor="exploration-interest">
          Exploration Interest
        </FormLabel>
        <RadioGroup
          id="exploration-interest"
          name="exploration-interest"
          value={explorationInterest}
          onChange={handleExplorationInterestChange}
          row
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>

      {/* Engagement Activity Contribution */}
      <Grid item xs={12} sm={6}>
        <FormLabel htmlFor="engagement-activity">
          Engagement Activity Contribution
        </FormLabel>
        <RadioGroup
          id="engagement-activity"
          name="engagement-activity"
          value={engagementActivityContribution}
          onChange={handleEngagementActivityChange}
          row
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
    </Grid>
  );
}