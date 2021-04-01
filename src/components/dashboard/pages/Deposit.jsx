import React, { useState, useEffect } from "react";
import Web3 from "web3";
import image from "./../../../img/wallet.svg";
import exchangeABI from "./../../../eth/build/contracts/Exchange.json";
import { Link } from "react-router-dom";
import axios from "axios";

const Deposit = () => {
  const ABI = exchangeABI.abi;
  const contractAddress = "0x756e5e118DFd1D7D3aC951E52339820F7591B30D";
  const [deposit, setDeposit] = useState("0");
  const [details, setDetails] = useState({ balance: "", forSale: "" });
  const [address, setAddress] = useState("");

  //   change account...
  const checkAccountChange = window.ethereum.on("accountsChanged", (res) =>
    setAddress(res[0])
  );

  useEffect(() => {
    setAddress(checkAccountChange.selectedAddress);
  }, [checkAccountChange]);
  //   deposits ether to the contract for sale.

  let web3 = window.ethereum;
  web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

  const submitDeposit = async (e) => {
    e.preventDefault();
    let exchangeContract = new web3.eth.Contract(ABI, contractAddress);
    let ether = web3.utils.toWei(deposit);

    await exchangeContract.methods
      .deposit(ether)
      .send({ value: ether, from: address })
      .then((tx) => {
        // sent the tx to backend for sorting
        axios
          .post(
            "http://localhost:4444/transactions/save-new-tx",
            { ...tx, value: ether },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((er) => {
            console.log(er);
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.reason);
        console.log(err.message);
      });
  };

  let exchangeContract = new web3.eth.Contract(ABI, contractAddress);
  // get the balances
  useEffect(() => {
    if (!address) return false;
    const query = async () => {
      await exchangeContract.methods
        .myBalance(address)
        .call({ from: address })
        .then((tx) => {
          setDetails({ balance: tx[0], forSale: tx[1] });
        })
        .catch((err) => {
          console.log(err);
          console.log(err.reason);
          console.log(err.message);
        });
    };
    query();
  }, [address]);

  return (
    <>
      <div className="container container_x">
        <div className="row">
          <div className="col-md-6">
            <img
              src={image}
              alt="side desc"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <div className="alert alert-success">
              <p>
                To begin to trade your ethereum, you need to send the value to
                our smart contract. Your ethereum is saved on the blockchain,
                thereby making the transaction transparent.
              </p>
            </div>

            <div className="alert alert-secondary">
              You Currently Have {web3.utils.fromWei(details.balance)}eth
              Deposited In Your Wallet.
            </div>
            <hr />
            <form action="" onSubmit={submitDeposit}>
              <div className="form-group row">
                <div className="col-md-6">
                  <h5>Deposit Your Ether :</h5>
                  <input
                    type="number"
                    placeholder="Enter Amount Of Ether"
                    className="form-control"
                    onChange={({ target }) => setDeposit(target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <h5>Amount In Wei. : </h5>
                  <input
                    type="number"
                    placeholder={!deposit ? "0" : Web3.utils.toWei(deposit)}
                    className="form-control"
                    disabled
                  />
                </div>
              </div>
              <hr />
              <button className="btn btn-primary btn-xs">Deposit.</button>
              <Link to="#" className="float-end">
                Got Eth? Put it up for sale
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
