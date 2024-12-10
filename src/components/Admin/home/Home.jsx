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
const Home = () => {
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
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <h1 style={{paddingLeft:"15px"}}>Domain</h1>
        <div className="widgets">
          
          
          <Widget type="employeeCount" />
          <Widget type="C1-stats" />
          <Widget type="D1-stats" />
          <Widget type="RTB-stats" />
          <Widget type="LCEP-stats" />
        </div>
        
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <h1 style={{paddingLeft:"15px"}}>Skills</h1>
          
        <div className="widgets">
          
          <Widget type="java-stats" />
          <Widget type="python-stats" />
          <Widget type="jenkins-stats" />
          <Widget type="reactJs-stats" />
          <Widget type="js-stats" />
        </div>
        {/* <div name="approvals" className="listContainer">
          <div className="listTitle">Approval Requests</div>
          <Table />
        </div> */}
      </div>
      
    </div>
  );
};

export default Home;
