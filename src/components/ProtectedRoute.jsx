import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ children: Component }) => {
  let AUTH = true;
  // check that the token is active.
  return AUTH ? Component : <Redirect to={{ pathname: "/login" }} />;
};

export default ProtectedRoute;
