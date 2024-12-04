import SignInSide from './components/Login/sign-in-side/SignInSide';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Admin/home/Home'
import List from './components/Admin/list/List'
import Single from './components/Admin/single/Single'
import New from './components/Admin/new/New'
import Signup from './components/Register/Signup'
import { userInputs } from './components/Admin/formSource';

function App() {
  
  return (
    <Router>
      {/* Login/SignIn Page */}
      <Routes>
        {/* Login */}
        <Route path='/' element={<SignInSide />}/>
        {/* Sign Up */}
        <Route path='register' element={<Signup />}/>
        {/* Admin */}
        {/* <Route path='/admin/*' element={} /> */}
        <Route path="/admin">
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
          </Route>
      </Routes>
    </Router>
    // </div>
  );
}

export default App;
