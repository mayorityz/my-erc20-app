import React, { useState } from "react";

const Network = () => {
  const id = "0x4";
  const [chainid, setChainID] = useState(window.ethereum.chainId); //rinkeby network...

  window.ethereum.on("chainChanged", (_chainId) => {
    setChainID(_chainId);
  });
  return (
    <div className="alert alert-warning text-center">
      {chainid === id
        ? "You are connected to the Rinkeby Network"
        : "You Need To Be Connected To The Rinkeby Network To Make Deposit!"}
      something - {process.env.REACT_APP_URL}
    </div>
  );
};

export default Network;
