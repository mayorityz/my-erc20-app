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
        <span className="closeNav">X</span>
        <ul>
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a href="#">MY ACCOUNT</a>
          </li>
          <li>
            <a href="#">DASHBOARD</a>
          </li>
          <li>
            <a href="#">DEPOSIT</a>
          </li>
          <li>
            <a href="#">SELL</a>
          </li>
          <li>
            <a href="#">BUY</a>
          </li>
          <li>
            <a href="#">LEDGER</a>
          </li>
          <li>
            <a href="#">HISTORY</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
