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
// import Test from './components/Employee/employeeDashboard/Test';


function App() {
  
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
          <Route index element={<Home />} />
          <Route path='approval-requests' element={<ApprovalList />} />
          <Route path="employees">
            <Route index element={<List />} />
            {/* <Route path=":userId" element={<Single />} /> */}
            <Route path=":empId" element={<AdminEmployeeDashboard />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New Employee" />}
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
