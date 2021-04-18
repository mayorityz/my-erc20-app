import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Web3 from "web3";
import axios from "axios";
import { Link } from "react-router-dom";

const SalesDetails = () => {
  const { id } = useParams();
  const [value, setValue] = useState([]);
  const [fiat, setFiat] = useState(0);
  const [coloring, setColoring] = useState(true);

  //   manage error.
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Please Wait!!!");

  useEffect(() => {
    const getDetails = async () => {
      // fetch records from the db for the sales details by the id.
      const fetch = await axios.get(
        `${process.env.REACT_APP_URL}/sales/details/${id}`,
        {
          withCredentials: true,
        }
      );
      setData(fetch.data);
    };
    getDetails();
  }, [id]);

  const calcFiat = async ({ target: { value } }) => {
    setValue(value);
    if (
      value < Web3.utils.fromWei(data.data.minPurchase.toString()) ||
      value > Web3.utils.fromWei(data.data.upSale.toString())
    )
      setColoring(false);
    else setColoring(true);
    setFiat(value * data.data.fiat);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const order = await axios.post(
      `${process.env.REACT_APP_URL}/sales/placeorder`,
      {
        value,
        valueInEth: Web3.utils.toWei(value),
        salesid: id,
        fiat,
        rates: data.data.fiat,
      },
      { withCredentials: true }
    );
    setMessage(order.message);
    setLoading(false);
  };

  return (
    <>
      {data.status === "success" && (
        <div className="container">
          <div className="row  justify-content-md-center">
            <div className="col-md-4 bg-white p-3 mt-5 border border-secondary shadow">
              <h3 style={{ fontFamily: "Rokkitt" }}>
                - Seller - <Link to="#">mayorityz</Link>.
              </h3>
              <hr />
              <div className="text-center">
                <span style={style.span}>
                  {Web3.utils.fromWei(data.data.upSale.toString())}eth
                </span>{" "}
                @ <span style={style.span}>N{data.data.fiat}/ETH </span>
              </div>
              <div className="text-center">
                <span style={style.span}> Minimum Purchase</span> ={" "}
                <span style={style.span}>
                  {" "}
                  {Web3.utils.fromWei(data.data.minPurchase.toString())}eth.
                </span>
              </div>
              <hr />
              <form action="" onSubmit={submitForm}>
                <div className="form-group">
                  <label htmlFor="">I Want To Buy : </label>
                  <input
                    type="text"
                    className={`form-control ${
                      coloring ? "is-valid" : "is-invalid"
                    }`}
                    value={value}
                    placeholder=""
                    onChange={calcFiat}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Value In N :</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value={fiat}
                  />
                </div>
                <hr />

                {!loading ? (
                  <button
                    className="btn custom-btn success"
                    disabled={!coloring}
                  >
                    PLACE ORDER
                  </button>
                ) : (
                  <div className="alert alert-secondary">{message}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const style = {
  span: {
    color: "blue",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "'Rokkitt', serif",
  },
};

export default SalesDetails;
