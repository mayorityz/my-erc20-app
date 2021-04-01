import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./css/Navigation.css";
import metalogo from "../img/metamask.svg";
import { cleanAddress } from "./../utils/cleanAddress";
import { Link, Switch, Route } from "react-router-dom";

const Navigation = () => {
  const [address, setAddress] = useState("");

  let web3 = window.ethereum;
  web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

  //  change account
  const checkAccountChange = window.ethereum.on("accountsChanged", (res) =>
    setAddress(res[0])
  );

  //  update the account state
  useEffect(() => {
    if (!address) return false;
    setAddress(checkAccountChange.selectedAddress);
  }, [address, checkAccountChange]);

  return (
    <nav class="navbar navbar-dark bg-dark navigation">
      <a class="navbar-brand" href="0#">
        Logo here!{" "}
        <span className="nav_address">0x...{cleanAddress(address)}</span>
      </a>

      <ul class="navbar-nav">
        <li class="nav-item active">
          <Link class="nav-link" to="/#">
            <img src={metalogo} className="metalogo" alt="logo" />{" "}
            {address === "Connect MetaMask" ? (
              <span>{address}</span>
            ) : (
              <span className="nav_address">
                Connected as : 0x0...{cleanAddress(address)}
              </span>
            )}
          </Link>
        </li>
        <li class="nav-item">
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
  );
};

export default Navigation;
