import React, { useState } from "react";

const Network = () => {
  const id = process.env.REACT_APP_CHAINID;
  const [chainid, setChainID] = useState(window.ethereum.chainId); //rinkeby network...

  window.ethereum.on("chainChanged", (_chainId) => {
    setChainID(_chainId);
  });
  return (
    <div className="alert alert-warning text-center">
      {chainid === id
        ? "You are connected to the Rinkeby Network"
        : "You Need To Be Connected To The Rinkeby Network To Make Deposit!"}
    </div>
  );
};

export default Network;
