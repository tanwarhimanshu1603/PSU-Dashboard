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

  useEffect(() => {
    getApprovalRequests();
  },[])
  
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
          <Route index element={<Home requestCount={requestCount} />} />
          <Route path='approval-requests' element={<ApprovalList requestCount={requestCount} setRequestCount={setRequestCount} />} />
          <Route path="employees">
            <Route index element={<List requestCount={requestCount}/>} />
            {/* <Route path=":userId" element={<Single />} /> */}
            <Route path=":empId" element={<AdminEmployeeDashboard />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" requestCount={requestCount} />}
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
