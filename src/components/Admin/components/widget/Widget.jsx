import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from "react-router-dom";

const Widget = ({ type,count,isDomain,domain,skill }) => {
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
          backgroundColor: "rgba(128, 0, 128, 0.2)",
          color: "purple",
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
          backgroundColor: "rgba(128, 0, 128, 0.2)",
          color: "purple",
          }}
        />
      )
    }
    data = tempData;
  }

  // switch (type) {
  //     case "C1-stats":
  //       data = {
  //         title: "C1",
  //         value:count,
  //         link: "employees/?domain=C1",
  //         icon: (
  //           <GroupsIcon
  //             className="icon"
  //             style={{
  //             backgroundColor: "rgba(128, 0, 128, 0.2)",
  //             color: "purple",
  //             }}
  //           />
  //         ),
  //       };
  //       break;
  //       case "D1-stats":
  //     data = {
  //       title: "D1",
  //       value:count,
  //       link: "employees/?domain=D1",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "R1-stats":
  //     data = {
  //       title: "R1",
  //       value:count,
  //       link: "employees/?domain=R1",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "PSU-stats":
  //     data = {
  //       title: "PSU",
  //       value:count,
  //       link: "employees/?domain=PSU",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "OC-stats":
  //     data = {
  //       title: "OC",
  //       value:count,
  //       link: "employees/?domain=OC",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "OH-stats":
  //     data = {
  //       title: "OH",
  //       value:count,
  //       link: "employees/?domain=OH",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "RTB-stats":
  //     data = {
  //       title: "RTB",
  //       value:count,
  //       link: "employees/?domain=RTB",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "CARE-stats":
  //     data = {
  //       title: "CARE",
  //       value:count,
  //       link: "employees/?domain=CARE",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "LCEP-stats":
  //     data = {
  //       title: "LCEP",
  //       value:count,
  //       link: "employees/?domain=LCEP",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "CPQ-stats":
  //     data = {
  //       title: "CPQ",
  //       value:count,
  //       link: "employees/?domain=CPQ",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "MEC-stats":
  //     data = {
  //       title: "MEC",
  //       value:count,
  //       link: "employees/?domain=MEC",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "OMS-stats":
  //     data = {
  //       title: "OMS",
  //       value:count,
  //       link: "employees/?domain=OMS",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //     case "CRM-stats":
  //     data = {
  //       title: "CRM",
  //       value:count,
  //       link: "employees/?domain=CRM",
  //       icon: (
  //         <GroupsIcon
  //           className="icon"
  //           style={{
  //           backgroundColor: "rgba(128, 0, 128, 0.2)",
  //           color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //       case "java-stats":
  //         data = {
  //           title: "Java",
  //           value:14,
  //           link: "employees/?skill=Java",
  //           icon: (
  //             <GroupsIcon
  //               className="icon"
  //               style={{
  //               backgroundColor: "rgba(128, 0, 128, 0.2)",
  //               color: "purple",
  //               }}
  //             />
  //           ),
  //         };
  //         break;
  //         case "reactJs-stats":
  //           data = {
  //             title: "ReactJs",
  //             value:21,
  //             link: "employees/?skill=ReactJs",
  //             icon: (
  //               <GroupsIcon
  //                 className="icon"
  //                 style={{
  //                 backgroundColor: "rgba(128, 0, 128, 0.2)",
  //                 color: "purple",
  //                 }}
  //               />
  //             ),
  //           };
  //           break;

  //           case "python-stats":
  //             data = {
  //               title: "Python",
  //               value:15,
  //               link: "employees/?skill=Python",
  //               icon: (
  //                 <GroupsIcon
  //                   className="icon"
  //                   style={{
  //                   backgroundColor: "rgba(128, 0, 128, 0.2)",
  //                   color: "purple",
  //                   }}
  //                 />
  //               ),
  //             };
  //             break;

  //             case "jenkins-stats":
  //               data = {
  //                 title: "Jenkins",
  //                 value:44,
  //                 link: "employees/?skill=jenkins",
  //                 icon: (
  //                   <GroupsIcon
  //                     className="icon"
  //                     style={{
  //                     backgroundColor: "rgba(128, 0, 128, 0.2)",
  //                     color: "purple",
  //                     }}
  //                   />
  //                 ),
  //               };
  //               break;
  //               case "js-stats":
  //               data = {
  //                 title: "Javascript",
  //                 value:25,
  //                 link: "employees/?skill=javascript",
  //                 icon: (
  //                   <GroupsIcon
  //                     className="icon"
  //                     style={{
  //                     backgroundColor: "rgba(128, 0, 128, 0.2)",
  //                     color: "purple",
  //                     }}
  //                   />
  //                 ),
  //               };
  //               break;
  //   default:
  //     break;
  // }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
           {data.value}
        </span>
        <Link to={data.link} style={{textDecoration:"none",color:"gray"}}>
        <span className="link">See details</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon />
          {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
