import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from "react-router-dom";
import { Badge, Chip, Tooltip } from "@mui/material";

const Widget = ({ count,isDomain,domain,skill,topSkills }) => {
  let data;
  if(isDomain){
    const tempData = {
      title: domain,
      value: count,
      link: `employees/?domain=${domain}`,
      icon: (
        <GroupsIcon
          className="icon"
          style={{
          backgroundColor: "#E0EDFA",
          color: "#1976d2",
          }}
        />
      )
    }
    data = tempData;
  }else{
    const tempData = {
      title: skill,
      value: count,
      link: `employees/?skill=${skill}`,
      icon: (
        <GroupsIcon
          className="icon"
          style={{
            backgroundColor: "#E0EDFA",
            color: "#1976d2",
          }}
        />
      )
    }
    data = tempData;
  }



  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
           {data.value}
        </span>
        <Link to={data.link} style={{textDecoration:"none",color:"gray"}}>
    <span className="link" >See details</span>
        </Link>
      </div>
      <div className="right" >
        {
          isDomain ? 
          topSkills?.map((skillInfo,index)=>(
            <div key={index} className="percentage positive">
              <Tooltip title={skillInfo.skill}>
              <Chip label={`${skillInfo.skill}`} color="primary" variant="outlined" sx={{width:"70px",cursor:"pointer"}}></Chip>
              </Tooltip>
            </div>
          ))
         :
        <div className="percentage positive"></div>
        }
        
        
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
