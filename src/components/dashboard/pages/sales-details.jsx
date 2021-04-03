import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Web3 from "web3";
import axios from "axios";

const SalesDetails = () => {
  const { id } = useParams();
  const [value, setValue] = useState([]);
  const [fiat, setFiat] = useState(0);
  const [coloring, setColoring] = useState(true);

  //   manage error.
  const [data, setData] = useState({});

  useEffect(() => {
    const getDetails = async () => {
      // fetch records from the db for the sales details by the id.
      const fetch = await axios.get(
        `http://localhost:4444/sales/details/${id}`,
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
    if (value < Web3.utils.fromWei(data.data[0].minpurchase))
      setColoring(false);
    else setColoring(true);

    setFiat(value * data.data[0].rate);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const order = await axios.post(
      "http://localhost:4444/sales/placeorder",
      {
        value: Web3.utils.toWei(value),
        salesid: id,
        fiat,
        sellerid: data.data[0].userid,
        rates: data.data[0].rate,
      },
      { withCredentials: true }
    );
    console.log(order);
  };

  return (
    <>
      {data.status === "success" && (
        <div className="row  justify-content-md-center">
          <div className="col-md-4">
            <div className="form-group row">
              <div className="col-md-4">
                <label>Seller : </label>
              </div>
              <div className="col-md-8">{data.data[0].username}</div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label>For Sale : </label>
              </div>
              <div className="col-md-8">
                {Web3.utils.fromWei(data.data[0].balance)}eth.
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label>Min Purchase : </label>
              </div>
              <div className="col-md-8">
                {Web3.utils.fromWei(data.data[0].minpurchase)}eth.
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label>Rate : </label>
              </div>
              <div className="col-md-8">N{data.data[0].rate}</div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label>User Address: </label>
              </div>
              <div className="col-md-8">{data.data[0].address}</div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <label>Upload Date : </label>
              </div>
              <div className="col-md-8">{data.data[0].updated}</div>
            </div>
            <hr />
            <form action="" onSubmit={submitForm}>
              <div className="form-group">
                <label htmlFor="">i want to buy ...</label>
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
                <label htmlFor="">I want to buy ...</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={fiat}
                />
              </div>
              <hr />
              <button className="btn btn-success" disabled={!coloring}>
                Place Order!
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesDetails;
