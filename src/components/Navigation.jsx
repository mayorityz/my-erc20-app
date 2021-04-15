import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./css/Navigation.css";
import metalogo from "../img/metamask.svg";
import { cleanAddress } from "./../utils/cleanAddress";
import { Link } from "react-router-dom";
import { Menu } from "react-feather";

const Navigation = () => {
  const [hide, setHide] = useState(true);

  const toggleMobileSideBar = () => setHide(!hide);

  return (
    <>
      <nav class="navbar navbar-dark bg-dark navigation">
        <Link class="navbar-brand" href="0#">
          Logo here!{" "}
          <span className="float-end">
            <Menu onClick={toggleMobileSideBar} />
          </span>
        </Link>

        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link class="nav-link" to="/login">
              My Account
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mobileSideBar">
        <h3>Close</h3>
        <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
          <li>d</li>
          <li>e</li>
          <li>f</li>
          <li>g</li>
          <li>h</li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
