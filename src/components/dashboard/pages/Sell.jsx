import React, { useState, useEffect } from "react";
import Web3 from "web3";
import exchangeABI from "./../../../eth/build/contracts/Exchange.json";
import image from "./../../../img/coins.svg";
import axios from "axios";

const Sell = () => {
  let web3 = window.ethereum;
  web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
  const ABI = exchangeABI.abi;
  const contractAddress = "0x756e5e118DFd1D7D3aC951E52339820F7591B30D";
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState({ balance: "", forSale: "" });

  // form values
  const [forSale, setSale] = useState("0"); // amt from Wei.
  const [minPurchase, setMinPurchase] = useState(""); // set min purchase of eth
  const [fiatValue, setFiat] = useState(""); // fiat value
  const [info, setInfo] = useState(""); // user description

  const exchangeContract = new web3.eth.Contract(ABI, contractAddress);
  //   change account...
  const checkAccountChange = window.ethereum.on("accountsChanged", (res) =>
    setAddress(res[0])
  );

  useEffect(() => {
    setAddress(checkAccountChange.selectedAddress);
  }, [checkAccountChange]);
  //   deposits ether to the conttract for sale.

  const putUpForSale = async (e) => {
    e.preventDefault();

    let ether = web3.utils.toWei(forSale);

    await exchangeContract.methods
      .forSale(ether)
      .send({ from: address, value: ether })
      .then(async (tx) => {
        console.log(tx);
        const saveRecord = await axios.post(
          "http://localhost:4444/sales/newsalesdeposit",
          {
            forSale: ether,
            minPurchase: web3.utils.toWei(minPurchase),
            fiatValue,
            info,
            address,
            transid: tx.transactionHash,
          },
          { withCredentials: true }
        );
        console.log(saveRecord);
      })
      .catch((er) => {
        console.log(er);
        console.log(er.reason);
        console.log(er.message);
      });
  };

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
            <img src={image} alt="side desc" style={{ width: "100%" }} />
          </div>
          <div className="col-md-6">
            <div className="alert alert-secondary text-center">
              You Currently Have {web3.utils.fromWei(details.forSale)} eth For
              Sale
            </div>
            <form action="" onSubmit={putUpForSale}>
              <div className="form-group row">
                <div className="col-md-6">
                  <label htmlFor="sell_field">
                    Put Up Some Ether For Sale.
                  </label>
                  <input
                    type="number"
                    id="sell_field"
                    placeholder="Enter Amount For Sale..."
                    className="form-control"
                    required
                    onChange={({ target }) => setSale(target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="sell_field">Amount In Wei.</label>
                  <input
                    type="text"
                    id="sell_field"
                    placeholder={!forSale ? "0" : Web3.utils.toWei(forSale)}
                    className="form-control"
                    disabled
                  />
                </div>
              </div>
              <hr />
              <div className="form-group row">
                <div className="col-md-6">
                  <label htmlFor="">Min. Purchase Of Eth At Once</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min. Purchase At Once"
                    value={minPurchase}
                    onChange={({ target }) => setMinPurchase(target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="">Amount In Naira/Eth </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 3400000"
                    value={fiatValue}
                    onChange={({ target }) => setFiat(target.value)}
                  />
                </div>
              </div>
              <hr />
              <div className="form-group">
                <label htmlFor="desc">Descripe Your Terms Of Sale:</label>
                <textarea
                  name=""
                  id="desc"
                  rows="5"
                  className="form-control"
                  placeholder="Type Message Here ..."
                  value={info}
                  onChange={({ target }) => setInfo(target.value)}
                ></textarea>
              </div>
              <hr />
              <button className="btn btn-success btn-xs">
                Sell {forSale} Ether
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sell;
