import React, { useState, useEffect } from "react";
import { CheckCircle, ArrowDownRight, XOctagon } from "react-feather";
import axios from "axios";
import web3 from "web3";
import { Link } from "react-router-dom";

const Buy = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const record = await axios.get(
        "http://localhost:4444/sales/orderhistory",
        { withCredentials: true }
      );
      if (record.data.status === "success") setData(record.data.data);
      else setData([]);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 bg-primary" style={style}>
            <h2>Canceled Orders.</h2>
            <h3>0</h3>
          </div>
          <div className="col-md-4 bg-danger" style={style}>
            <h2>Ongoing Orders.</h2>
            <h3>0</h3>
          </div>
          <div className="col-md-4 bg-secondary" style={style}>
            <h2>Completed Orders.</h2>
            <h3>0</h3>
          </div>
        </div>
      </div>
      <div className="container container_x">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-center">My Incoming Order History.</h5>
            <hr />
            {data.length === 0 ? (
              "not data found"
            ) : (
              <table className="table table-borderless table-hover table-striped custom-table align-top text-center">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Expected Amount(N)</th>
                    <th scope="col2">Eth Value</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Order Date</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => (
                    <tr
                      key={order.orderid}
                      className={
                        order.status === "completed"
                          ? "table-success"
                          : "table-secondary"
                      }
                    >
                      <td>
                        {order.status === "ongoing" && (
                          <span>
                            <ArrowDownRight
                              size={26}
                              style={{ color: "#1861e0" }}
                            />
                          </span>
                        )}
                        {order.status === "completed" && (
                          <CheckCircle size={26} style={{ color: "#3aa23a" }} />
                        )}
                        {order.status === "canceled" && (
                          <XOctagon size={26} style={{ color: "#ff003d" }} />
                        )}{" "}
                        {order.status}
                      </td>
                      <td>{order.fiat}</td>
                      <td>{web3.utils.fromWei(order.ethvalue)}</td>
                      <td>{order.rateatpurchase}</td>
                      <td>{order.orderdate}</td>
                      <td>
                        {" "}
                        <Link to="">VIEW ORDER.</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-md-6">
            <h5 className="text-center">Outgoing Orders.</h5>
            <hr />
            {data.length === 0 ? (
              "not data found"
            ) : (
              <table className="table table-borderless table-hover table-striped custom-table align-vertical text-center">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Expected Amount(N)</th>
                    <th scope="col2">Eth Value</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Order Date</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => (
                    <tr
                      key={order.orderid}
                      className={
                        order.status === "completed"
                          ? "table-success"
                          : "table-secondary"
                      }
                    >
                      <td>
                        {order.status === "ongoing" && (
                          <span>
                            <ArrowDownRight
                              size={26}
                              style={{ color: "#1861e0" }}
                            />
                          </span>
                        )}
                        {order.status === "completed" && (
                          <CheckCircle size={26} style={{ color: "#3aa23a" }} />
                        )}
                        {order.status === "canceled" && (
                          <XOctagon size={26} style={{ color: "#ff003d" }} />
                        )}{" "}
                        {order.status}
                      </td>
                      <td className="align-vertical">{order.fiat}</td>
                      <td>{web3.utils.fromWei(order.ethvalue)}</td>
                      <td>{order.rateatpurchase}</td>
                      <td>{order.orderdate}</td>
                      <td>
                        {" "}
                        <Link to="">VIEW ORDER.</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
//  justify-content-center
const style = {
  height: 150,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "#fff",
  fontFamily: "Rokkitt",
};
export default Buy;
