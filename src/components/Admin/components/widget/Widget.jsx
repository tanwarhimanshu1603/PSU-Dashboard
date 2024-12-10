import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "employeeCount":
      data = {
        title: "TOTAL EMPLOYEES",
        value:652,
        link: "employees",
        icon: (
          <GroupsIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "C1-stats":
      data = {
        title: "C1",
          value:91,
          link: "employees/c1",
          icon: (
            <GroupsIcon
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;
    case "D1-stats":
      data = {
        title: "D1",
        value:82,
        link: "employees/?domain=D1",
        icon: (
          <GroupsIcon
            className="icon"
            style={{
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            color: "purple",
            }}
          />
        ),
      };
      break;
      case "RTB-stats":
      data = {
        title: "RTB",
        value:74,
        link: "employees/RTB",
        icon: (
          <GroupsIcon
            className="icon"
            style={{
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            color: "purple",
            }}
          />
        ),
      };
      break;
      case "LCEP-stats":
        data = {
          title: "LCEP",
          value:44,
          link: "employees/LCEP",
          icon: (
            <GroupsIcon
              className="icon"
              style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
              }}
            />
          ),
        };
        break;
        case "java-stats":
          data = {
            title: "Java",
            value:14,
            link: "employees/?skill=Java",
            icon: (
              <GroupsIcon
                className="icon"
                style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
                }}
              />
            ),
          };
          break;
          case "reactJs-stats":
            data = {
              title: "ReactJs",
              value:21,
              link: "employees/?skill=ReactJs",
              icon: (
                <GroupsIcon
                  className="icon"
                  style={{
                  backgroundColor: "rgba(128, 0, 128, 0.2)",
                  color: "purple",
                  }}
                />
              ),
            };
            break;

            case "python-stats":
              data = {
                title: "Python",
                value:15,
                link: "employees/?skill=Python",
                icon: (
                  <GroupsIcon
                    className="icon"
                    style={{
                    backgroundColor: "rgba(128, 0, 128, 0.2)",
                    color: "purple",
                    }}
                  />
                ),
              };
              break;

              case "jenkins-stats":
                data = {
                  title: "Jenkins",
                  value:44,
                  link: "employees/?skill=jenkins",
                  icon: (
                    <GroupsIcon
                      className="icon"
                      style={{
                      backgroundColor: "rgba(128, 0, 128, 0.2)",
                      color: "purple",
                      }}
                    />
                  ),
                };
                break;
                case "js-stats":
                data = {
                  title: "Javascript",
                  value:25,
                  link: "employees/?skill=javascript",
                  icon: (
                    <GroupsIcon
                      className="icon"
                      style={{
                      backgroundColor: "rgba(128, 0, 128, 0.2)",
                      color: "purple",
                      }}
                    />
                  ),
                };
                break;
    default:
      break;
  }

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
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
