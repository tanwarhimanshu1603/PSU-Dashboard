// import Sidebar from "../components/sidebar/Sidebar";
// // import Navbar from "../components/navbar/Navbar";
// import "./home.scss";
// import Widget from "../components/widget/Widget";
// import Featured from "../components/featured/Featured";
// import Chart from "../components/chart/Chart";
// // import Table from "../components/table/Table";
// import { useLocation } from "react-router-dom";
// import { scroller } from "react-scroll";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Card, Typography } from "@mui/material";
// import { AspectRatio } from "@mui/icons-material";
// const Home = ({requestCount,data,allDomains,allSkills}) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const jwtToken = localStorage.getItem('jwtToken');
//   const [chunkedDomainArray,setChunkedDomainArray] = useState([]);
//   // console.log(data);
//   console.log(allDomains,allSkills);

//   const splitArrayIntoChunks = (array, chunkSize) => {
//     const result = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       result.push(array.slice(i, i + chunkSize));
//     }
//     return result;
//   };

//   useEffect(() => {
//     const chunkedArray = splitArrayIntoChunks(allDomains,5);
//     setChunkedDomainArray(chunkedArray);
//   },[])
  
//   useEffect(() => {
//     if(!jwtToken){
//       navigate('/')
//     }
//     if (location.state?.scrollTo) {
//       scroller.scrollTo(location.state.scrollTo, {
//         duration: 1000,
//         delay: 0,
//         smooth: "easeInOutQuart",
//       });
//     }
//   }, [location,jwtToken,navigate]);

//   return (
//     <div className="home">
//       <Sidebar requestCount={requestCount}/>
//       <div className="homeContainer">
//         {/* <Navbar /> */}
//         <h1 style={{paddingLeft:"15px"}}>Domain</h1>
//         {
//           chunkedDomainArray.map((domainList,index) => (
//             <Box key={index} className="widgets"> 
//               {
//                 domainList.map((domain,ind) => (
//                   <Widget key={ind} type={`${domain}-stats`} />
//                 ))
//               }
//             </Box>
//           ))
//         }
//         <h1 style={{paddingLeft:"15px"}}>Skills</h1>
          
//         <Box className="widgets">
          
//           <Widget type="java-stats" />
//           <Widget type="python-stats" />
//           <Widget type="jenkins-stats" />
//           <Widget type="reactJs-stats" />
//           <Widget type="js-stats" />
//         </Box>       
        
//       </div>
      
//     </div>
//   );
// };

// export default Home;

import Sidebar from "../components/sidebar/Sidebar";
// import Navbar from "../components/navbar/Navbar";
import "./home.scss";
import Widget from "../components/widget/Widget";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Home = ({ requestCount, data, allDomains, allSkills,employeeCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const jwtToken = localStorage.getItem('jwtToken');
  const [chunkedDomainArray, setChunkedDomainArray] = useState([]);
  const [domainCounts, setDomainCounts] = useState({});

  const splitArrayIntoChunks = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const calculateDomainCounts = () => {
    const counts = {};
    allDomains?.forEach((domain) => {
      counts[domain] = 0;
    });

    data?.forEach((employee) => {
      employee.functionalKnowledge?.forEach((domain) => {
        if (counts.hasOwnProperty(domain)) {
          counts[domain]++;
        }
      });
    });

    return counts;
  };

  useEffect(() => {
    const chunkedArray = splitArrayIntoChunks(allDomains, 5);
    setChunkedDomainArray(chunkedArray);
    const counts = calculateDomainCounts();
    setDomainCounts(counts);
  }, [allDomains, data]);

  useEffect(() => {
    if (!jwtToken) {
      navigate('/');
    }
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [location, jwtToken, navigate]);

  return (
    <div className="home">
      <Sidebar requestCount={requestCount} employeeCount={employeeCount}/>
      <div className="homeContainer">
        {/* <Navbar /> */}
        <h1 style={{ paddingLeft: "15px" }}>Domain</h1>
        {
          chunkedDomainArray.map((domainList, index) => (
            <Box key={index} className="widgets">
              {
                domainList.map((domain, ind) => (
                  domainCounts[domain] !== 0 && 
                  <Widget 
                    key={ind} 
                    type={`${domain}-stats`} 
                    count={domainCounts[domain]} 
                  />
                ))
              }
            </Box>
          ))
        }
        <h1 style={{ paddingLeft: "15px" }}>Skills</h1>

        <Box className="widgets">
          <Widget type="java-stats" />
          <Widget type="python-stats" />
          <Widget type="jenkins-stats" />
          <Widget type="reactJs-stats" />
          <Widget type="js-stats" />
        </Box>
      </div>
    </div>
  );
};

export default Home;
