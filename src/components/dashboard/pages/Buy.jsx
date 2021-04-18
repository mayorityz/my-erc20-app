import React, { useState, useEffect } from "react";
import { CheckCircle, ArrowDownRight, XOctagon } from "react-feather";
import axios from "axios";
import web3 from "web3";
import { Link } from "react-router-dom";

const Buy = () => {
  const [data, setData] = useState([]); // incoming
  const [myOrder, setOrder] = useState([]); // outgoing

  const [requests, setRequests] = useState([]); // handles requests from other users
  useEffect(() => {
    const fetchData = async () => {
      const record = await axios.get(
        `${process.env.REACT_APP_URL}/sales/orderhistory`,
        { withCredentials: true }
      );

      if (record.data.status === "success") setOrder(record.data.data);
      else setData([]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const record = await axios.get(
        `${process.env.REACT_APP_URL}/sales/myOrder`,
        {
          withCredentials: true,
        }
      );
      if (record.data.status === "success") setRequests(record.data.data);
      else setRequests([]);
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
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Sell Orders
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Buy Orders
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="table-responsive p-1 mt-3 bg-white border border-primary">
                  {myOrder.length === 0 ? (
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
                        {myOrder.map((order) => (
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
                                <CheckCircle
                                  size={26}
                                  style={{ color: "#3aa23a" }}
                                />
                              )}
                              {order.status === "canceled" && (
                                <XOctagon
                                  size={26}
                                  style={{ color: "#ff003d" }}
                                />
                              )}{" "}
                              {order.status}
                            </td>
                            <td>{order.fiat} </td>
                            <td>
                              {web3.utils.fromWei(order.eth.toString())} eth.
                            </td>
                            <td>{order.saleRate}</td>
                            <td>{order.pairDate}</td>
                            <td>
                              {" "}
                              <Link
                                to={`/dashboard/negotiation-seller/${order.pairId}`}
                              >
                                VIEW ORDER.
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                ...
              </div>
            </div>
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
