import React from "react";
import Order from "./../dashboard/Order";
import Banner from "./../Index/Banner";

// images
import Ethereum from "./../../img/Ethereum_Monochromatic.svg";
import Ethereum2 from "./../../img/Ethereum_Flatline.svg";
import MetaMask from "./../../img/metamask.svg";
import Payment from "./../../img/payment.svg";
import Piggy from "./../../img/banknote.svg";

const LandingPage = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={Ethereum} alt="" />
          </div>
          <div className="col-md-6">
            <h5 className="text-center headings">ABOUT US</h5>
            <p>
              deXcHANGE is a decentralized exchange built on-chain ethereum
              smart contract. All sale and buy orders are stored securely on the
              blockchain. All value and tokens are stored safely, all trades are
              anonymous, as all transactions are done through users' metamask
              addresses.
            </p>
            <p>
              deXcHANGE allows traders to buy/sell crypto assets in a safe and
              traceable way.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <h4 className="text-center headings">How To Sell Your Ether.</h4>
        <div className="row">
          <div className="col-md-3">
            <h6>1.</h6>
            <p>Login & Connect Your MetaMask</p>
            <img src={MetaMask} alt="" style={{ maxWidth: "70%" }} />
          </div>
          <div className="col-md-3">
            <h6>2.</h6>
            <p>Select Your Currency</p>
            <img src={Ethereum2} alt="" style={{ maxWidth: "100%" }} />
          </div>
          <div className="col-md-3">
            <h6>3.</h6>
            <p>Set Your Rates.</p>
            <img src={Payment} alt="" style={{ maxWidth: "100%" }} />
          </div>
          <div className="col-md-3">
            <h6>4.</h6>
            <p>Deposit value with MetaMask</p>
            <img src={Piggy} alt="" style={{ maxWidth: "100%" }} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h4 className="text-center headings">Recent Buy Orders</h4>
          <table className="table table-stripped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Min. Purchase</th>
                <th>Rate</th>
                <th>TimeStamp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mayorityz</td>
                <td>0x4960f29901439cBC368d6080E2C63865511cEeed</td>
                <td>0.2561ETH</td>
                <td>N45,000</td>
                <td>N245,000/ETH</td>
                <td>23-01-2021</td>
                <td>
                  <button className="btn btn-xs btn-success btn-block">
                    BUY!
                  </button>
                </td>
              </tr>
              <tr>
                <td>Mayorityz</td>
                <td>0x4960f29901439cBC368d6080E2C63865511cEeed</td>
                <td>0.2561ETH</td>
                <td>N45,000</td>
                <td>N245,000/ETH</td>
                <td>23-01-2021</td>
                <td>
                  <button className="btn btn-xs btn-success btn-block">
                    BUY!
                  </button>
                </td>
              </tr>
              <tr>
                <td>Mayorityz</td>
                <td>0x4960f29901439cBC368d6080E2C63865511cEeed</td>
                <td>0.2561ETH</td>
                <td>N45,000</td>
                <td>N245,000/ETH</td>
                <td>23-01-2021</td>
                <td>
                  <button className="btn btn-xs btn-success btn-block">
                    BUY!
                  </button>
                </td>
              </tr>
              <tr>
                <td>Mayorityz</td>
                <td>0x4960f29901439cBC368d6080E2C63865511cEeed</td>
                <td>0.2561ETH</td>
                <td>N45,000</td>
                <td>N245,000/ETH</td>
                <td>23-01-2021</td>
                <td>
                  <button className="btn btn-xs btn-success btn-block">
                    BUY!
                  </button>
                </td>
              </tr>
              <tr>
                <td>Mayorityz</td>
                <td>0x4960f29901439cBC368d6080E2C63865511cEeed</td>
                <td>0.2561ETH</td>
                <td>N45,000</td>
                <td>N245,000/ETH</td>
                <td>23-01-2021</td>
                <td>
                  <button className="btn btn-xs btn-success btn-block">
                    BUY!
                  </button>
                </td>
              </tr>
              <tr>
                <td>Mayorityz</td>
                <td>0x4960f29901439cBC368d6080E2C63865511cEeed</td>
                <td>0.2561ETH</td>
                <td>N45,000</td>
                <td>N245,000/ETH</td>
                <td>23-01-2021</td>
                <td>
                  <button className="btn btn-xs btn-success btn-block">
                    BUY!
                  </button>
                </td>
              </tr>
              <tr>
                <td>Mayorityz</td>
                <td>0x4960f29901439cBC368d6080E2C63865511cEeed</td>
                <td>0.2561ETH</td>
                <td>N45,000</td>
                <td>N245,000/ETH</td>
                <td>23-01-2021</td>
                <td>
                  <button className="btn btn-xs btn-success btn-block">
                    BUY!
                  </button>
                </td>
              </tr>
              <tr>
                <td>Mayorityz</td>
                <td>0x4960f29901439cBC368d6080E2C63865511cEeed</td>
                <td>0.2561ETH</td>
                <td>N45,000</td>
                <td>N245,000/ETH</td>
                <td>23-01-2021</td>
                <td>
                  <button className="btn btn-xs btn-success btn-block">
                    BUY!
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Order />
    </>
  );
};

export default LandingPage;
