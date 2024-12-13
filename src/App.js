import SignInSide from './components/Login/sign-in-side/SignInSide';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Admin/home/Home'
import List from './components/Admin/list/List'
import Single from './components/Admin/single/Single'
import New from './components/Admin/new/New'
import Signup from './components/Register/Signup'
import { userInputs } from './components/Admin/formSource';
import EmployeeDashboard from './components/Employee/employeeDashboard/EmployeeDashboard';
import AdminEmployeeDashboard from './components/Admin/view/AdminEmployeeDashboard';
import ApprovalList from './components/Admin/list/ApprovalList';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { useEffect, useState } from 'react';
// import Test from './components/Employee/employeeDashboard/Test';


function App() {

  const [requestCount,setRequestCount] = useState(0);
  const [data, setData] = useState([]);
  const [errorMessage,setErrorMessage]=useState('');
  const [allSkills,setAllSkills]=useState([]);
  const [allDomains,setAllDomains] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken');


  const getApprovalRequests = async()=>{
    try {
      
      const response = await fetch('http://localhost:8080/api/v1/admin/getApprovals', {
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
        // setErrorMessage("Something went wrong!!")
        // setOpenErrorToast(true);
        console.log("Error while fetching approvals!!");
        
    }
  }

  const getAllEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/admin/getAllEmp', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${jwtToken}`
        },
      });
      if (response.ok) {
        const employeeData = JSON.parse(await response.text())

        setData(employeeData)
        return;
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  const getAllSkills = async()=>{
    try {
      // First API call to admin login
      const skillResponse = await fetch('http://localhost:8080/api/v1/employee/getSkills', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = JSON.parse(await skillResponse.text());
      setAllSkills(data)
      // console.log(data)
      }
      catch(error){

      }
  }
  const getAllDomains = async()=>{
    try {
      // First API call to admin login
      const domainResponse = await fetch('http://localhost:8080/api/v1/employee/getDomain', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = JSON.parse(await domainResponse.text());
      setAllDomains(data)
      // console.log(data)
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
  }, []);
  
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
