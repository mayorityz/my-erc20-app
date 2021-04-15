import React, { useState, useEffect } from "react";
import Web3 from "web3";
import exchangeABI from "../eth/build/contracts/Exchange.json";
import Navigation from "./Navigation";
import Footer from "./Website/Footer";

import "./css/Navigation.css";
import LandingPage from "./Website/Landing";
import { Route, Switch } from "react-router-dom";
import Login from "./Website/Login";
import Register from "./Website/Register";
import Index from "./dashboard/Index";
import ProtectedRoute from "./ProtectedRoute";

const Exchange = () => {
  let web3 = window.ethereum;

  if (window.ethereum) {
    const checkAccountChange = window.ethereum.on("accountsChanged", (res) => {
      return res;
    });
  }

  return (
    <>
      <Navigation />
      <Switch>
        {/* <Route path="/dashboard">
          <Index />
        </Route> */}
        <ProtectedRoute path="/dashboard" component={Index} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {/* <ProtectedRoute exact to="/dashboard" component={Index} /> */}

        <Route path="/contactus">
          <h4>contact us</h4>
        </Route>
        <Route path="/how-it-works">
          <h4>how it works.</h4>
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>

        {/* <ProtectedRoute to="/dashboard">
          <Index />
        </ProtectedRoute> */}
      </Switch>

      {/* exchange demo */}
      {/* <div style={{ width: "20%" }}> */}
      {/* <hr /> */}
      {/* <h3>Buy From!</h3> */}
      {/* <form action="" onSubmit={buyEth}>
          <input
            type="text"
            className="form-control"
            placeholder="Seller Account"
            onChange={({ target }) => {
              setPurchase(target.value);
            }}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Amount"
            onChange={({ target }) => setPurchaseValue(target.value)}
          />
          <br />
          <button className="btn btn-warning btn-xs">Buy Eth!</button>
        </form> */}
      {/* </div> */}

      {/* <button className="btn btn-success btn-xs" onClick={releaseValue}>
        release ether
      </button> */}

      <Footer />
      {/* <Circle /> */}
    </>
  );
};

export default Exchange;
