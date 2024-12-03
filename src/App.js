import logo from './logo.svg';
import './App.css';
import SignInSide from './components/Login/sign-in-side/SignInSide';
import Signup from './components/Register/Signup';

function App() {
  console.log("hello");
  
  return (
    <div className="App">
      {/* <SignInSide/> */}
      <Signup/>
    </div>
  );
}

export default App;
