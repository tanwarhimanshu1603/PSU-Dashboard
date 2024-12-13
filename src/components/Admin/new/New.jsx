import "./new.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GLOBAL_CONFIG from "../../../constants/global";

const New = ({ inputs, title,requestCount,employeeCount }) => {
  const [file, setFile] = useState("");
  const [empName,setEmpName] = useState('');
  const [empEmail,setEmpEmail] = useState('');
  const [empId,setEmpId] = useState();
  const [currentAccount,setCurrentAccount]=useState();
  const [supervisorName,setSupervisorName] = useState();
  const [amdocsExperience,setAmdocsExperience] = useState();
  const [openErrorToast,setOpenErrorToast] = useState(false);
  const [openSuccessToast,setOpenSuccessToast] = useState(false);
  const [openWarningToast,setOpenWarningToast] = useState(false);
  const [errorMessage,setErrorMessage]=useState('');
  const [successMessage,setSuccessMessage] = useState('');
  const [warningMessage,setWarningMessage]= useState('')

  const jwtToken = localStorage.getItem("jwtToken")
  const resetField = ()=>{
    setEmpEmail('');
    setEmpId('');
    setEmpName('');
    setAmdocsExperience(null);
    setCurrentAccount('');
    setSupervisorName('')
  }
  const handleSubmit = async()=>{
    try {
      const response = await fetch("http://localhost:8080/api/v1/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${jwtToken}`
        },
        body: JSON.stringify({
          empEmail,
          empId,
          empName,
          currentAccount,
          supervisorName,
          amdocsExperience,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register employee. Please check the input fields.");
      }
      else if(response.ok){
        setSuccessMessage("Employee added successfully.")
        setOpenSuccessToast(true)
        resetField();
      }
    } catch (err) {
      setErrorMessage("Something went wrong while adding employees")
      setOpenErrorToast(true)
      console.log(err.message)
    }
  }
  const handleCloseSuccessToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  
    setOpenSuccessToast(false);
  };
  const handleCloseErrorToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  
    setOpenErrorToast(false);
  };

  const handleCloseWarningToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  
    setOpenWarningToast(false);
  };
  return (
    <div className="new">
      <Sidebar requestCount={requestCount} employeeCount={employeeCount}/>
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Employee</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <div className="form-div">
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

              {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))} */}
              <div className="formInput" >
                  <label>Name</label>
                  <input id="name" name="name" type="text" placeholder="John Doe" value={empName} onChange={(e)=>setEmpName(e.target.value)} required />
                </div>
                <div className="formInput">
                  <label>Employee ID</label>
                  <input type="number" value={empId} onChange={(e)=>setEmpId(e.target.value)} required/>
                </div>
                <div className="formInput">
                  <label>Amdocs Email</label>
                  <input type="email" value={empEmail} onChange={(e)=>setEmpEmail(e.target.value)} required />
                </div>
                <div className="formInput">
                  <label>Current Account</label>
                  <input type="text" value={currentAccount} onChange={(e)=>setCurrentAccount(e.target.value)} required/>
                </div>
                <div className="formInput">
                  <label>Current Supervisor</label>
                  <input type="text" value={supervisorName} onChange={(e)=>setSupervisorName(e.target.value)} required/>
                </div>
                {/* <div className="formInput">
                  <label>Amdocs Experience(in years)</label>
                  <input type="number"  placeholder="2.3" value={amdocsExperience} onChange={(e)=>setAmdocsExperience(e.target.value)} required/>
                </div> */}
                <div className="formInput">
                <button onClick={handleSubmit}>Add</button>
                </div>
                
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={openErrorToast} autoHideDuration={GLOBAL_CONFIG.ALERT_TIME} onClose={handleCloseErrorToast}  anchorOrigin={{ vertical: GLOBAL_CONFIG.ALERT_VERTICAL_POSITION, horizontal: GLOBAL_CONFIG.ALERT_HORIZONTAL_POSITION }}>
        <Alert
          onClose={handleCloseErrorToast}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={openSuccessToast} autoHideDuration={GLOBAL_CONFIG.ALERT_TIME} 
      onClose={handleCloseSuccessToast} anchorOrigin={{ vertical: GLOBAL_CONFIG.ALERT_VERTICAL_POSITION, horizontal: GLOBAL_CONFIG.ALERT_HORIZONTAL_POSITION }}
      >
        <Alert
          onClose={handleCloseSuccessToast}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openWarningToast} autoHideDuration={GLOBAL_CONFIG.ALERT_TIME} onClose={handleCloseWarningToast} anchorOrigin={{ vertical: GLOBAL_CONFIG.ALERT_VERTICAL_POSITION, horizontal: GLOBAL_CONFIG.ALERT_HORIZONTAL_POSITION }}>
        <Alert
          onClose={handleCloseWarningToast}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {warningMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default New;
