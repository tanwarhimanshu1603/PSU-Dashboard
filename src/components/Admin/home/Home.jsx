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
  const [dashboardDomainData,setDashboardDomainData] = useState([])
  const [chunkedDomainInfoArray, setChunkedDomainInfoArray] = useState([]);
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
      // const domains = calculateCounts(allDomains, "functionalKnowledge").sort((a, b) => b.count - a.count);
      const domainData = getTopNSkills(data,1);
      setDashboardDomainData(domainData);
      const splittedArray = splitArrayIntoChunks(domainData,4);
      // const splitArray = splitArrayIntoChunks(domains,4);
      // setChunkedDomainArray(splitArray);
      setChunkedDomainInfoArray(splittedArray)
      // console.log("array: ",splitArray);
      // console.log(splittedArray)
  
      // Calculate skill counts, sort by count, and limit to top 5
      const skills = calculateCounts(allSkills, "primaryTechSkill")
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      setSkillsObject(skills);
      // console.log("Final skills with count: ",skills);
      
    }, [allDomains, allSkills, data]);

    function getTopNSkills(empList, n) {
      // The result array
      const result = [];
  
      // Looping through each domain
      allDomains.forEach((domain) => {
          // Object to count occurrences of skills for the current domain
          const skillCounts = {};
          let employeeCount = 0; // Count of employees in the current domain
  
          // Loop through each employee
          empList.forEach((employee) => {
              // Check if the employee has the domain in their functionalKnowledge
              if (employee.functionalKnowledge && employee.functionalKnowledge.includes(domain)) {
                  employeeCount++; // Increment employee count for this domain
  
                  // Combine primary and secondary tech skills for the employee
                  const allSkills = [...(employee.primaryTechSkill || []), ...(employee.secondaryTechSkill || [])];
  
                  // Count each skill for this domain
                  allSkills.forEach((skill) => {
                      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
                  });
              }
          });
  
          // Sort skills by their count in descending order and take the top n skills
          const sortedSkills = Object.entries(skillCounts)
              .sort((a, b) => b[1] - a[1]) // Sort by count descending
              .slice(0, n) // Take the top n skills
              .map(([skill, count]) => ({ skill, count }));
  
          // Add the domain, employee count, and its top skills to the result
          result.push({
              domain,
              "employeeCount": employeeCount,
              "topSkills": sortedSkills
          });
      });
  
      // Sort the result by employee count in descending order
      result.sort((a, b) => b["employeeCount"] - a["employeeCount"]);
      
      return result;
  }
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
        <h1 style={{ paddingLeft: "15px"}}>Domain</h1>
        {
          chunkedDomainInfoArray.map((domainList, index) => (
            <Box key={index} className="widgets">
              {
                domainList.map((domain, ind) => (
                  domain.employeeCount !== 0 && 
                  <Widget 
                    key={ind} 
                    isDomain={true}
                    domain={domain.domain}
                    skill={null}
                    count={domain.employeeCount} 
                    topSkills={domain.topSkills}
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
                topSkills={null}
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
