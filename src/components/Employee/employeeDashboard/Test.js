import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Box, Avatar, Typography, Button, Chip, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
}));

export default function Test() {
    return (
        <Box sx={{ p: 3, bgcolor: '#f7f8fc', minHeight: '100vh' }}>
            <Grid container spacing={2} >
                <Grid size={{ xs: 6, md: 4 }}>
                    <Item>
                        <Box>
                            <Avatar
                                src="https://mui.com/static/images/avatar/3.jpg"
                                alt="Ananya Grover"
                                sx={{ width: 120, height: 120, mx: 'auto' }}
                            />
                            <Typography align="center" variant="h6" sx={{ mt: 2 }}>
                                Ananya Grover
                            </Typography>
                            <Typography align="center" color="text.secondary">
                                UI/UX Designer
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Full-stack product designer with hands-on experience in solving problems for clients across various domains. Skilled in communication, collaboration, and user-centered design.
                            </Typography>

                            {/* Skills Section */}
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Skills
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {['UI Design', 'UX', 'Adobe XD', 'Mobile Apps', 'Wireframing', 'User Research', 'Information Architecture'].map((skill) => (
                                        <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                    ))}
                                </Box>
                            </Box>

                            {/* Domain Section */}
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Domain Experience
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {['UI Design', 'UX', 'Adobe XD', 'Mobile Apps', 'Wireframing', 'User Research', 'Information Architecture'].map((skill) => (
                                        <Chip key={skill} label={skill} color="primary" variant="outlined" />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Item>
                </Grid>
                <Grid direction="column" container size={{ xs: 6, md: 8 }}>
                    <Grid>
                        <Item>
                            <Box >
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                    Basic Information
                                </Typography>
                                <Typography variant="body2">Age: 28</Typography>
                                <Typography variant="body2">Years of Experience: 6</Typography>
                                <Typography variant="body2">Location: Ahmedabad, Gujarat</Typography>
                                <Typography variant="body2">Phone: +91 98123 55679</Typography>
                                <Typography variant="body2">Email: ananyasharma@gmail.com</Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                                    Download
                                </Button>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid><Item>
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Experience
                            </Typography>
                            {[
                                { company: 'Infosys', role: 'Product Designer', duration: 'Apr 2018 - Present', location: 'Pune, India' },
                                { company: 'Pixel Studio', role: 'UI/UX Designer', duration: 'Oct 2016 - Jul 2018', location: 'Bengaluru, India' },
                                { company: 'Ramotion Studio', role: 'Web Designer', duration: 'Apr 2015 - Oct 2016', location: 'Bengaluru, India' },
                            ].map((exp, index) => (
                                <Box key={index} sx={{ mb: 2 }}>
                                    <Typography variant="subtitle1" fontWeight={500}>
                                        {exp.company}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {exp.role} | {exp.duration} | {exp.location}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Item></Grid>
                    <Grid> {/* Other Sections */}
        {['Education', 'Accomplishments'].map((section, index) => (
          <Accordion key={index} sx={{mt:1}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{section}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Details about {section} will go here.</Typography>
            </AccordionDetails>
          </Accordion>
        ))}</Grid>
                </Grid>
            </Grid>
        </Box>
    );
}