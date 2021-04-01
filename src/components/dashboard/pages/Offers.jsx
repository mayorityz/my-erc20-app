import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { cleanAddress } from "./../../../utils/cleanAddress";
import { Link, useRouteMatch } from "react-router-dom";

const Offers = () => {
  let { path } = useRouteMatch();

  const [sales, setSales] = useState({ status: true, data: [] });
  useEffect(() => {
    const pull = async () => {
      const apiResponse = await axios.get(
        "http://localhost:4444/sales/get-available-sales",
        { withCredentials: true }
      );

      setSales({ status: false, data: apiResponse.data[0] });
    };
    pull();
  }, []);
  return (
    <div className="container table-responsive container_x">
      <div className="row">
        {/* justify-content-md-center */}
        <div className="col-md-4"></div>
        <div className="col-md-8">
          <h5 className="text-center">Available Ether For Sale</h5>
          <table className="table table-hover table-striped table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Address</th>
                <th scope="col">Amount</th>
                <th scope="col">Min. Purchase</th>
                <th scope="col">Rate</th>
                <th scope="col">TimeStamp</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {sales.data.map((sale) => (
                <tr key={sale.address}>
                  <td>{sale.username}</td>
                  <td>0x0...{cleanAddress(sale.address)}</td>
                  <td>{Web3.utils.fromWei(sale.balance)}eth</td>
                  <td>{Web3.utils.fromWei(sale.minpurchase)}eth</td>
                  <td>{sale.rate}</td>
                  <td>{sale.updated}</td>
                  <td>
                    <Link
                      to={`/dashboard/sale-details/${sale.salesid}`}
                      className="btn btn-secondary"
                    >
                      View & Buy
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Offers;
