import "./list.scss"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"
import Table from '../components/table/Table'
import Badge from "@mui/material/Badge";
import Approvaltable from "../components/datatable/Approvaltable";
const ApprovalList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        {/* <Navbar/> */}
        <div name="approvals" className="listContainer" style={{margin:"15px"}}>
          <Approvaltable/>
          {/* <Table /> */}
        </div>
        {/* <Datatable/> */}
      </div>
    </div>
  )
}

export default ApprovalList;