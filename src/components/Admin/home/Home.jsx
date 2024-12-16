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
        </Box>
      </div>
    </div>
  );
};

export default Home;
