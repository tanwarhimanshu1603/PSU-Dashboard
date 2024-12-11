import "./list.scss"
import Sidebar from "../components/sidebar/Sidebar"
import Navbar from "../components/navbar/Navbar"
import Datatable from "../components/datatable/Datatable"
import { useState } from "react"
const List = ({requestCount,employeeCount,data,setData,allSkills,allDomains}) => {
  const [searchTerm,setSearchTerm]=useState('');
  const [filteredData, setFilteredData] = useState([])
  return (
    <div className="list">
      <Sidebar requestCount={requestCount} employeeCount={employeeCount}/>
      <div className="listContainer">
        <Navbar  setSearchTerm={setSearchTerm} filteredData={filteredData}/>
        <Datatable searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredData={filteredData} setFilteredData={setFilteredData} data={data} setData={setData} allSkills={allSkills} allDomains={allDomains}/>
      </div>
    </div>
  )
}

export default List