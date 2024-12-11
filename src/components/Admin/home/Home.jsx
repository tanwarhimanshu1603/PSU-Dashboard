import Sidebar from "../components/sidebar/Sidebar";
// import Navbar from "../components/navbar/Navbar";
import "./home.scss";
import Widget from "../components/widget/Widget";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
// import Table from "../components/table/Table";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import { AspectRatio } from "@mui/icons-material";
const Home = ({requestCount}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const jwtToken = localStorage.getItem('jwtToken');
  useEffect(() => {
    if(!jwtToken){
      navigate('/')
    }
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [location,jwtToken,navigate]);

  return (
    <div className="home">
      <Sidebar requestCount={requestCount}/>
      <div className="homeContainer">
        {/* <Navbar /> */}
        <h1 style={{paddingLeft:"15px"}}>Domain</h1>
        <Box className="widgets"> 
          <Widget type="employeeCount" />
          <Widget type="C1-stats" />
          <Widget type="D1-stats" />
          <Widget type="RTB-stats" />
          <Widget type="LCEP-stats" />
        </Box>
        <Box className="widgets"> 
          <Widget type="employeeCount" />
          <Widget type="C1-stats" />
          <Widget type="D1-stats" />
          <Widget type="RTB-stats" />
          <Widget type="LCEP-stats" />
        </Box>
        {/* <Box className="widgets" sx={{
        display: 'flex',
        gap: 1,
        py: 1,
        overflow: 'auto',
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}> 
          {domainData.map((item) => (
        <Card orientation="horizontal" key={item}>
          <Widget type={item} />
        </Card>
      ))}
        </Box> */}

        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        <h1 style={{paddingLeft:"15px"}}>Skills</h1>
          
        <Box className="widgets">
          
          <Widget type="java-stats" />
          <Widget type="python-stats" />
          <Widget type="jenkins-stats" />
          <Widget type="reactJs-stats" />
          <Widget type="js-stats" />
        </Box>
        {/* <div name="approvals" className="listContainer">
          <div className="listTitle">Approval Requests</div>
          <Table />
        </div> */}         
        
      </div>
      
    </div>
  );
};

export default Home;


// import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Box from '@mui/joy/Box';
// import Typography from '@mui/joy/Typography';
// import Card from '@mui/joy/Card';

// const data = [
//   {
//     src: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
//     title: 'Night view',
//     description: '4.21M views',
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
//     title: 'Lake view',
//     description: '4.74M views',
//   },
//   {
//     src: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
//     title: 'Mountain view',
//     description: '3.98M views',
//   },
// ];

// export default function CarouselRatio() {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         gap: 1,
//         py: 1,
//         overflow: 'auto',
//         width: 343,
//         scrollSnapType: 'x mandatory',
//         '& > *': {
//           scrollSnapAlign: 'center',
//         },
//         '::-webkit-scrollbar': { display: 'none' },
//       }}
//     >
//       {data.map((item) => (
//         <Card orientation="horizontal" size="sm" key={item.title} variant="outlined">
//           <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
//             <img
//               srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
//               src={`${item.src}?h=120&fit=crop&auto=format`}
//               alt={item.title}
//             />
//           </AspectRatio>
//           <Box sx={{ whiteSpace: 'nowrap', mx: 1 }}>
//             <Typography level="title-md">{item.title}</Typography>
//             <Typography level="body-sm">{item.description}</Typography>
//           </Box>
//         </Card>
//       ))}
//     </Box>
//   );
// }

