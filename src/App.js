import SignInSide from './components/Login/sign-in-side/SignInSide';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Admin/home/Home'
import List from './components/Admin/list/List'
import Single from './components/Admin/single/Single'
import New from './components/Admin/new/New'
import Signup from './components/Register/Signup'
import { userInputs } from './components/Admin/formSource';
import EmployeeDashboard from './components/Employee/employeeDashboard/EmployeeDashboard';
import ApprovalList from './components/Admin/list/ApprovalList';
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
            <Route path=":userId" element={<EmployeeDashboard />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route>
        </Route>
        
        {/* ---------------------------- */}
                  {/* Employee */}
        {/* ---------------------------- */}
        <Route path='/dashboard'>
          <Route index element={<EmployeeDashboard />} />
        </Route>
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
