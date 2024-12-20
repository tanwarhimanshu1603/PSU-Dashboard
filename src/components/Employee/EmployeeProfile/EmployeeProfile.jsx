import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Box, Avatar, Typography, Chip } from '@mui/material';
import { useLocation } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
}));

export default function EmployeeProfile() {
    const location = useLocation();
    const { employee } = location.state || {}; // Get the employee data from state
    const amdocsJourney = [];
    try{
        amdocsJourney = JSON.parse(employee.amdocsJourney);
    }catch(error){
        
    }
  if (!employee) {
    return <div>No employee data provided</div>;
  }
    return (
        <Box sx={{ p: 3, bgcolor: '#f7f8fc', minHeight: '100vh' }}>
            <Grid container spacing={2} sx={{marginTop:8}}>
                <Grid size={{ xs: 6, md: 4 }}>
                    <Item sx={{position: 'relative'}}>
                        
                        <Box sx={{position:"relative"}}>
                            <Avatar
                                src={employee.empImage}
                                alt={employee.empName}
                                sx={{ width: 120, height: 120,m:2, mx: 'auto' }}
                            />
                            
                            <Typography align="center" variant="h6" sx={{ mt: 2,fontWeight: 700,color: '#1e88e5' }}>
                                {employee.empName}
                            </Typography>
                            <Typography align="center" color="text.secondary" sx={{fontWeight: 500}}>
                                {employee.empRole}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{textAlign: 'center',m:2}}>
                                {employee.empDesc}
                            </Typography>

                            {/* Skills Section */}
                            <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Skills
                                </Typography>
                                {<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2,mt: 1 }}>
                                    {employee.primaryTechSkill.map((skill) => (
                                        <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                    ))}
                                </Box>}
                            </Box>

                            {/* Domain Section */}
                            <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Domain Knowledge
                                </Typography>
                                {<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2,mt: 1 }}>
                                    {employee.functionalKnowledge.map((skill) => (
                                        <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                    ))}
                                </Box>}
                            </Box>

                            {/* Secondary Skills Section */}
                            <Box sx={{m:2}}>
                                <Typography sx={{fontWeight:600, color: '#263238'}} variant="h6">
                                    Secondary Skills
                                </Typography>
                                <Typography sx={{display: 'flex',flexWrap: 'wrap', gap: 1}}>
                                
                                {<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2,mt: 1 }}>
                                    {employee.secondaryTechSkill?.map((skill,index) => (
                                        <Chip key={index} label={skill} color="success" variant="outlined" />
                                    ))}
                                </Box>
                                }
                            </Typography>
                            </Box>
                            {/* Functional Knowledge */}
                        </Box>
                    </Item>
                </Grid>
                <Grid direction="column" container size={{ xs: 6, md: 8 }}>
                    <Grid>
                        <Item>
                            {/* Basic Information */}
                            <Box sx={{m:0.5,position: 'relative'}}>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Basic Information
                                    
                                </Typography>
                                <Box sx={{m:1}}>
                                    <Grid container spacing={{xs:2, md:3}} columns={{xs:4,sm:8,md:12}}>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Employee ID</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {employee.empId}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Experience in Amdocs</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {`${employee.amdocsExperience} `}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Current Account</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {employee.currentAccount && employee.currentAccount}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Email ID</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>{employee.empEmail}</Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Total Experience</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {`${employee.totalExperience} `}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs:4,sm:4,md:4}}>
                                            <Typography variant="body2" sx={{fontWeight: 500,textTransform: 'uppercase'}}>Supervisor</Typography>
                                            <Typography sx={{fontWeight: 'bold',color: '#333333'}}>
                                                {`${employee.supervisorName}`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    
                                </Box>
                                
                            </Box>
                            
                        </Item>
                    </Grid>
                        <Grid>
                            <Item sx={{position:"relative"}}>
                                {/* Amdocs Journey Section */}
                            <Box sx={{m:0.5}}>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Amdocs Journey
                                    
                                </Typography>
                                {amdocsJourney?.map((exp,index)=>(
                                    <Box key={index} sx={{ m: 1 }}>
                                    <Typography variant="subtitle1" fontWeight={600} sx={{color: '#1e88e5'}}>
                                        {exp.account}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {exp.description} | {exp.startDate} - {exp.isPresent?"Present": exp.endDate}
                                    </Typography>
                                </Box>
                                ))}
                            </Box>
                            </Item>
                        </Grid>
                    <Grid> 
                        <Grid>
                            <Item>
                                <Box sx={{m:0.5}}>
                                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        More Info    
                                    </Typography>
                                    <Box sx={{m:1, display: "flex", flexDirection: "column", gap: 2}}>
                                        <Typography sx={{display: 'flex',flexWrap: 'wrap', gap: 1}}>
                                            {/* Details about {section} will go here. */}
                                            {
                                                
                                                [{data: employee.engagementActivityContribution, label:"Contributed to Engagement Acitivities",name: "engagementActivityContribution"},
                                                {data: employee.explorationInterest, label:"Exploration Interest",name: "explorationInterest"},
                                                {data: employee.contributedToDesign, label:"Contributed to Design",name: "contributedToDesign"},
                                                {data: employee.mentoringAbility, label:"Mentoring Ability",name: "mentoringAbility"}]
                                                .map(({data,label,name},index) => (
                                                    data && <Chip key={index} label={label} name={name} color="success" variant="outlined" />
                                                ))
                                            }
                                        </Typography>
                                        <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                           {employee.devOpsKnowledge && "Devops Knowledge: " } 
                                           <span style={{color: 'gray'}}>{employee.devOpsKnowledge}</span>
                                        </Typography>
                                        {employee.areaOfCriticalIssue && <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                            Area of critical issues:
                                            <span style={{color: 'gray'}}>{employee.areaOfCriticalIssue}</span>
                                        </Typography>}
                                        {employee.productionSupport && <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                            Production Support:
                                            <span style={{color: 'gray'}}>{employee.productionSupport}</span>
                                        </Typography>}
                                        
                                        {employee.presentationSkills &&<Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                            
                                            Presentation Skills: 
                                            <span style={{color: 'gray'}}>{employee.presentationSkills}/5</span>
                                         
                                        </Typography> }
                                        
                                        {employee.hobbiesSports && <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                            Hobbies: 
                                            <span style={{color: 'gray'}}>{employee.hobbiesSports}</span>
                                        </Typography>}
                                        
                                        {employee.additionalInfo && <Typography variant="body2" sx={{fontWeight: 700,display: 'flex', alignItems: 'center',gap: 1}}>
                                            Additional Info:
                                            <span style={{color: 'gray'}}>{employee.additionalInfo}</span>
                                        </Typography>}
                                        
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
         
        </Box>
    );
}