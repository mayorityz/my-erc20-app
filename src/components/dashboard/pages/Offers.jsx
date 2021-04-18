import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { cleanAddress } from "./../../../utils/cleanAddress";
import { Link, useRouteMatch } from "react-router-dom";
import { BookOpen } from "react-feather";
import Network from "./../../Network";

const Offers = () => {
  let { path } = useRouteMatch();

  const [sales, setSales] = useState({ status: true, data: [] });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const pull = async () => {
      const apiResponse = await axios.get(
        `${process.env.REACT_APP_URL}/sales/fetchAvailableSales`,
        { withCredentials: true }
      );

      console.log(apiResponse);
      if (apiResponse.data.status === "success")
        setSales({ status: false, data: apiResponse.data.response });
      else setErrorMsg(apiResponse.data.response);
      setLoading(false);
    };
    pull();
  }, []);

  return (
    <div className="container table-responsive container_x">
      <Network />
      <div className="row  justify-content-md-center">
        {/* */}
        <div className="col-md-8">
          <h5 className="text-center">
            {" "}
            <BookOpen size={23} /> Sales Ledger.
          </h5>
          {loading ? (
            "Fetching Available trades"
          ) : sales.data.length === 0 ? (
            <h4 className="text-center">
              "There are no available trades at the moment... Be the first..."
            </h4>
          ) : (
            <table className="table table-hover table-striped table-sm  text-center">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Amount</th>
                  <th scope="col">Min. Purchase</th>
                  <th scope="col">Rate</th>
                  <th scope="col">TimeStamp</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {sales.data.map((sale) => (
                  <tr key={sale._id}>
                    <td>{Web3.utils.fromWei(sale.upSale.toString())}eth</td>
                    <td>
                      {Web3.utils.fromWei(sale.minPurchase.toString())}
                      eth
                    </td>
                    <td>{sale.fiat}</td>
                    <td>{}</td>
                    <td>
                      <Link to={`/dashboard/sale-details/${sale._id}`}>
                        View & Buy
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offers;
