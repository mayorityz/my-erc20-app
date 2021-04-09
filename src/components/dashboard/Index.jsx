import React, { useContext } from "react";
import authContext from "./../../utils/Context";
import SideBar from "./Sidebar";
import "./css/dashboard.css";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Deposit from "./pages/Deposit";
import Sell from "./pages/Sell";
import Offers from "./pages/Offers";
import Buy from "./pages/Buy";
import Transaction from "./pages/Transaction";
import SalesDetails from "./pages/sales-details";
import NegotiationSeller from "./pages/Negotiation";
import CryptoSeller from "./pages/CryptoSeller";

const Index = () => {
  const auth = useContext(authContext);
  console.log(auth.status);

  let { path } = useRouteMatch();

  return (
    <div className="container-fluid dashboard">
      <SideBar />
      <div className="content">
        <Switch>
          <Route path={`${path}/deposit`}>
            <Deposit />
          </Route>
          <Route path={`${path}/sell`}>
            <Sell />
          </Route>
          <Route path={`${path}/offers`}>
            <Offers />
          </Route>
          <Route path={`${path}/sale-details/:id`}>
            <SalesDetails />
          </Route>
          <Route path={`${path}/negotiation-buyer/:id`}>
            <NegotiationSeller />
          </Route>
          <Route path={`${path}/negotiation-seller/:id`}>
            <CryptoSeller />
          </Route>
          <Route path={`${path}/history`}>
            <Transaction />
          </Route>
          <Route path={`${path}/purchase`}>
            <Buy />
          </Route>
          <Route path={`${path}/settings`}>
            <h4>My Settings</h4>
          </Route>

          <Route path={`${path}`}>
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Index;
