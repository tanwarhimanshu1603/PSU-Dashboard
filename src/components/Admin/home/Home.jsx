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
        <div className="widgets">
          <Widget type="employeeCount" />
          <Widget type="C1-stats" />
          <Widget type="D1-stats" />
          <Widget type="RTB-stats" />
        </div>
        
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="widgets">
          
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
