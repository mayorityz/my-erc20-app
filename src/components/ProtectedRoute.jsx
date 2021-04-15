import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import IsEthereum from "./IsEthereum";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let AUTH = true; //use cookie...
  // check that the token is active.
  // check for web3 ...
  const [isEthereumEnabled, setAvailabilty] = useState(false);

  useEffect(() => {
    let isEth = window.ethereum;
    if (isEth) setAvailabilty(true);
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (AUTH) {
          if (isEthereumEnabled) return <Component {...props} />;
          else return <IsEthereum />;
        } else {
          return <Redirect to={{ pathname: "/login" }} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
