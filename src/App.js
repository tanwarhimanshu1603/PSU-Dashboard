import SignInSide from './components/Login/sign-in-side/SignInSide';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Admin/home/Home'
import List from './components/Admin/list/List'
import New from './components/Admin/new/New'
import Signup from './components/Register/Signup'
import { userInputs } from './components/Admin/formSource';
import EmployeeDashboard from './components/Employee/employeeDashboard/EmployeeDashboard';
import AdminEmployeeDashboard from './components/Admin/view/AdminEmployeeDashboard';
import ApprovalList from './components/Admin/list/ApprovalList';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext/AuthContext';
import GLOBAL_CONFIG from './constants/global';


function App() {

  const [requestCount,setRequestCount] = useState(0);
  const [data, setData] = useState([]);
  const [errorMessage,setErrorMessage]=useState('');
  const [allSkills,setAllSkills]=useState([]);
  const [allDomains,setAllDomains] = useState([]);
  const {jwtToken} = useContext(AuthContext);

  const getApprovalRequests = async()=>{
    try {
      
      const response = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/admin/getApprovals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        }
      });
      if (response.ok) {
        const data = JSON.parse(await response.text())
        setRequestCount(data.length)
        return;
      }
    } catch (error) {
        console.log("Error while fetching approvals!!");
        
    }
  }

  const getAllEmployees = async () => {
    try {
      const response = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/admin/getAllEmp`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        },
      });
      if (response.ok) {
        const employeeData = JSON.parse(await response.text())

        const processedData = employeeData.map((employee) => ({
          ...employee,
          currentAccount: employee.currentAccount==="undefined" ? "" : employee.currentAccount
        }));
        setData(processedData)
        // setData(employeeData)
        return;
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  const getAllSkills = async()=>{
    try {
      // First API call to admin login
      const skillResponse = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/employee/getSkills`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = JSON.parse(await skillResponse.text());
      data.sort()
      setAllSkills(data)
      }
      catch(error){

      }
  }
  const getAllDomains = async()=>{
    try {
      // First API call to admin login
      const domainResponse = await fetch(`${GLOBAL_CONFIG.BASE_URL}api/v1/employee/getDomain`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = JSON.parse(await domainResponse.text());
      data.sort();
      setAllDomains(data)
      }
      catch(error){
        console.log(error);
      }
  }

  useEffect(() => {
      if (jwtToken) {
      getApprovalRequests();
      getAllEmployees();
      getAllDomains();
      getAllSkills();
    }
  }, [jwtToken]);
  
  return (
    <Router>
      {/* Login/SignIn Page */}
      <Routes>
        {/* Login */}
        <Route path='/' element={<SignInSide />}/>
        {/* Sign Up */}
        <Route path='register' element={<Signup />}/>

        {/* ---------------------------- */}
                  {/* Admin */}
        {/* ---------------------------- */}
        <Route path="/admin">
          <Route index element={<Home requestCount={requestCount} data={data} allDomains={allDomains} allSkills={allSkills} employeeCount={data.length}/>} />
          <Route path='approval-requests' element={<ApprovalList requestCount={requestCount} setRequestCount={setRequestCount} employeeCount={data.length}/>} />
          <Route path="employees">
            <Route index element={<List requestCount={requestCount} employeeCount={data.length} data={data} setData={setData} allSkills={allSkills} allDomains={allDomains}/> }  />
            {/* <Route path=":userId" element={<Single />} /> */}
            <Route path=":empId" element={<AdminEmployeeDashboard />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" requestCount={requestCount} employeeCount={data.length}/>}
            />
          </Route>
        </Route>
        
        {/* ---------------------------- */}
                  {/* Employee */}
        {/* ---------------------------- */}
        <Route path='/dashboard'>
          <Route index element={<EmployeeDashboard />} />
        </Route>


        {/* Reset Password */}
        <Route path='/reset' element={<ResetPassword />}/>
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
