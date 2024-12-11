import "./list.scss"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"
import Table from '../components/table/Table'
import Badge from "@mui/material/Badge";
import Approvaltable from "../components/datatable/Approvaltable";
import { useState } from "react";
const ApprovalList = ({requestCount,setRequestCount}) => {

  return (
    <div className="list">
      <Sidebar requestCount={requestCount}/>
      <div className="listContainer">
        {/* <Navbar/> */}
        <div name="approvals" className="listContainer" style={{margin:"15px"}}>
          <Approvaltable requestCount={requestCount} setRequestCount={setRequestCount}/>
          {/* <Table /> */}
        </div>
        {/* <Datatable/> */}
      </div>
    </div>
  )
}

export default ApprovalList;