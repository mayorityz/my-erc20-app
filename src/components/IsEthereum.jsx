// check that the browser has web3 injected.
// check that wallet is connected.

import React from "react";

const IsEthereum = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>Ooooops! Seems Like You Don't An Eth Powered Browser!</h2>
          <h5>No Worries! Let Fix You Up!!</h5>
          <h6>Chrome Users!</h6>
          <ul>
            <li>Visit your chrome store.</li>
            <li>Download the Metamask browser wallet.</li>
            <li>Create An Account.</li>
          </ul>
          And you are all set.
          <h6>Brave Browser.</h6>
          <p>Quick SideNote : This is our first choice.</p>
          <p>Comes in two options.</p>
          <ul>
            <li>Follow the same steps as above.</li>
            <li>
              Use the inBuilt Wallet System (Built on the metamask
              infrastructure as well)
              <ul>
                <li>Go To Settings.</li>
                <li>Select the cryptowallet option.</li>
                <li>Follow the instrcutions and you are good to go!</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IsEthereum;
