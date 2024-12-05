import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import "./home.scss";
import Widget from "../components/widget/Widget";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { useEffect } from "react";

const Home = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        duration: 1000,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [location]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div name="approvals" className="listContainer">
          <div className="listTitle">Approval Requests</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
