import "./list.scss"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"
import Datatable from "../components/datatable/Datatable"
import { useState } from "react"
const List = ({requestCount,employeeCount}) => {
  const [searchTerm,setSearchTerm]=useState('');
  const [filteredData, setFilteredData] = useState([])
  return (
    <div className="list">
      <Sidebar requestCount={requestCount} employeeCount={employeeCount}/>
      <div className="listContainer">
        <Navbar  setSearchTerm={setSearchTerm} filteredData={filteredData}/>
        <Datatable searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredData={filteredData} setFilteredData={setFilteredData}/>
      </div>
    </div>
  )
}

export default List