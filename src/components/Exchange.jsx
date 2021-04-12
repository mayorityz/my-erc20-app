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
  const ABI = exchangeABI.abi;
  const contractAddress = "0x29412FCD1d55D195c38ecf379c936Ff40c76bD16";

  const [address, setAddress] = useState("");
  const [deposit, setDeposit] = useState("");
  const [forSale, setSale] = useState("");

  const [purchaseAdd, setPurchase] = useState("");
  const [purchaseValue, setPurchaseValue] = useState("");

  let web3 = window.ethereum;
  web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

  //   change account...
  const checkAccountChange = window.ethereum.on("accountsChanged", (res) =>
    setAddress(res[0])
  );

  //   connect metamask
  const connectMetaMask = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  };

  useEffect(() => {
    setAddress(checkAccountChange.selectedAddress);
  }, [checkAccountChange]);

  //   deposits ether to the conttract for sale.
  const submitDeposit = async (e) => {
    e.preventDefault();
    let exchangeContract = new web3.eth.Contract(ABI, contractAddress);
    let ether = web3.utils.toWei(deposit);

    await exchangeContract.methods
      .deposit(ether)
      .send({ value: ether, from: address })
      .then((tx) => {
        console.log(tx);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.reason);
        console.log(err.message);
      });
  };

  const putUpForSale = async (e) => {
    e.preventDefault();
    let exchangeContract = new web3.eth.Contract(ABI, contractAddress);
    let ether = web3.utils.toWei(forSale);
    console.log(forSale);
    console.log(ether);

    await exchangeContract.methods
      .forSale(ether)
      .send({ from: address, value: 0 })
      .then((tx) => {
        console.log(tx);
        // exchangeContract.event.Sale("sale", (err, res) => {
        //   console.log(err);
        //   console.log(res);
        // });
      })
      .catch((er) => {
        console.log(er);
        console.log(er.reason);
        console.log(er.message);
      });
  };

  const buyEth = async (e) => {
    e.preventDefault();
    // !check isAddress with web3js

    let exchangeContract = new web3.eth.Contract(ABI, contractAddress);
    let ether = web3.utils.toWei(purchaseValue);

    await exchangeContract.methods
      .buy(purchaseAdd)
      .send({ from: address, value: ether })
      .then((tx) => {
        console.log(tx);
      })
      .catch((er) => {
        console.log(er);
        console.log(er.reason);
        console.log(er.message);
      });
  };

  const releaseValue = async (e) => {
    let exchangeContract = new web3.eth.Contract(ABI, contractAddress);
    await exchangeContract.methods
      .release("0x4960f29901439cBC368d6080E2C63865511cEeed")
      .send({ from: address, value: 0 })
      .then((tx) => {
        console.log(tx);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/dashboard">
          <Index />
        </Route>
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
