import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  Settings,
  FileText,
  Bell,
  LogOut,
  Activity,
  ArrowDown,
  ArrowUp,
} from "react-feather";
const SideBar = () => {
  let { url } = useRouteMatch();
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={`${url}`}>- Dashboard</Link>{" "}
        </li>
        <li>
          <Link to={`${url}/deposit`}>
            <ArrowDown size={16} /> Make A Deposit
          </Link>
        </li>
        <li>
          <Link to={`${url}/sell`}>
            <ArrowUp size={16} /> Sell Crypto
          </Link>
        </li>
        <li>
          <Link to={`${url}/offers`}>
            <Activity size={16} /> Buy Crypto <Bell size={8} />
          </Link>
        </li>
        <li>
          <Link to={`${url}/purchase`}>
            <Activity size={16} /> Ledger <Bell size={8} />
          </Link>
        </li>
        <li>
          <Link to={`${url}/history`}>
            <FileText size={16} /> History
          </Link>
        </li>
        <li>
          <Link to={`${url}/settings`}>
            <Settings size={16} /> Settings
          </Link>
        </li>
        <li>
          <a href="#">
            <LogOut size={16} /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
