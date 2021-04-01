import React from "react";
import { ArrowRight, ArrowRightCircle } from "react-feather";

const Buy = () => {
  return (
    <div className="container container_x">
      <div className="row justify-content-md-center">
        <div className="col-md-8">
          <h5 className="text-center">Active Ongoing Transactions</h5>
          <hr />
          <table className="table table-borderless table-hover table-striped custom-table">
            <thead>
              <tr>
                <th scope="col">BUYER</th>
                <th scope="col"></th>
                <th scope="col">SELLER</th>
                <th scope="col">INIITAL</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0x0 ... 456466</td>
                <td>
                  <ArrowRightCircle size={13} />
                </td>
                <td>0x0 ... 456466</td>
                <td>4 days AGO</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm">
                    view
                  </button>
                </td>
              </tr>
              <tr>
                <td>0x0 ... 456466</td>
                <td>
                  <ArrowRightCircle size={13} />
                </td>
                <td>0x0 ... 456466</td>
                <td>4 days AGO</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm">
                    view
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Buy;
