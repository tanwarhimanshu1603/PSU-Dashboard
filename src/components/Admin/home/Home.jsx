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
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const Home = ({ requestCount, data, allDomains, allSkills,employeeCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const jwtToken = localStorage.getItem('jwtToken');
  const {jwtToken} = useContext(AuthContext);
  const [chunkedDomainArray, setChunkedDomainArray] = useState([]);
  const [skillsObject, setSkillsObject] = useState([]);

  const splitArrayIntoChunks = (array, chunkSize) => {
    
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

    // Helper function to calculate counts and return an array of objects
    const calculateCounts = (items, field) => {
      const counts = items.reduce((acc, item) => {
        acc[item] = 0;
        return acc;
      }, {});
  
      data?.forEach((employee) => {
        employee[field]?.forEach((item) => {
          if (counts.hasOwnProperty(item)) {
            counts[item]++;
          }
        });
      });
  
      return Object.entries(counts)
        .filter(([, count]) => count >= 0)
        .map(([key, count]) => ({ [field === "functionalKnowledge" ? "domain" : "skill"]: key, count }));
    };

    useEffect(() => {
      // Calculate domain counts and sort by count
      const domains = calculateCounts(allDomains, "functionalKnowledge").sort((a, b) => b.count - a.count);
      const splitArray = splitArrayIntoChunks(domains,4);
      setChunkedDomainArray(splitArray);
      // console.log("array: ",splitArray);
      
  
      // Calculate skill counts, sort by count, and limit to top 5
      const skills = calculateCounts(allSkills, "primaryTechSkill")
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      setSkillsObject(skills);
      // console.log("Final skills with count: ",skills);
      
    }, [allDomains, allSkills, data]);

  // const calculateSkillsCounts = () => {
  //   const counts = {};
  //   allSkills?.forEach((skill) => {
  //     counts[skill] = 0;
  //   });

  //   data?.forEach((employee) => {
  //     employee.primaryTechSkill?.forEach((skill) => {
  //       if (counts.hasOwnProperty(skill)) {
  //         counts[skill]++;
  //       }
  //     });
  //   });

  //   return counts;
  // };

  // useEffect(() => {
  //   const counts = calculateSkillsCounts();
  //   setSkillsCounts(counts);
  // }, [allSkills, data]);

  // const calculateDomainCounts = () => {
  //   const counts = {};
  //   allDomains?.forEach((domain) => {
  //     counts[domain] = 0;
  //   });

  //   data?.forEach((employee) => {
  //     employee.functionalKnowledge?.forEach((domain) => {
  //       if (counts.hasOwnProperty(domain)) {
  //         counts[domain]++;
  //       }
  //     });
  //   });

  //   return counts;
  // };

  // useEffect(() => {
  //   const chunkedArray = splitArrayIntoChunks(allDomains, 5);
  //   setChunkedDomainArray(chunkedArray);
  //   const counts = calculateDomainCounts();
  //   setDomainCounts(counts);
  // }, [allDomains, data]);

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
                  domain.count !== 0 && 
                  <Widget 
                    key={ind} 
                    isDomain={true}
                    domain={domain.domain}
                    skill={null}
                    count={domain.count} 
                  />
                ))
              }
            </Box>
          ))
        }
        <h1 style={{ paddingLeft: "15px" }}>Skills</h1>

        <Box className="widgets">
          {
            skillsObject.map((skill, ind) => (
              skill.count !== 0 && 
              <Widget 
                key={ind} 
                isDomain={false}
                domain={null}
                skill={skill.skill}
                count={skill.count} 
              />
            ))
          }
          {/* <Widget count={2} isDomain={false} domain={null} skill="java" />
          <Widget count={2} isDomain={false} domain={null} skill={"python"} />
          <Widget count={2} isDomain={false} domain={null} skill={"jenkins"} />
          <Widget count={2} isDomain={false} domain={null} skill={"reactjs"} />
          <Widget count={2} isDomain={false} domain={null} skill={"js"} /> */}
        </Box>
      </div>
    </div>
  );
};

export default Home;
