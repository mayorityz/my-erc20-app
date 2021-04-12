// sellers view
import React, { useState, useEffect } from "react";
import { MessageSquare } from "react-feather";
import { useParams } from "react-router";
import axios from "axios";
import web3 from "web3";

const NegotiationSeller = () => {
  const { id } = useParams();
  const [data, setData] = useState({ ethvalue: "0" });

  useEffect(() => {
    const url = async () => {
      let query = await axios.get(
        `${process.env.REACT_APP_URL}/sales/seller-negotiation/${id}`,
        { withCredentials: true }
      );
      console.log(query.data.data[0]);
      console.log(typeof query.data.data[0].ethvalue);
      if (query.data.status === "success") setData(query.data.data[0]);
    };
    url();
  }, [id]);

  return (
    <div className="container container_x">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="">Locked Ether Value</label>
              <h4>{web3.utils.fromWei(data.ethvalue)} eth</h4>
            </div>
            <div className="col-md-6">
              <label htmlFor="">Rate</label>
              <h4>N{data.rateatpurchase}/eth</h4>
            </div>

            <div className="col-md-6">
              <label htmlFor="">Status</label>
              <h4>{data.status}</h4>
            </div>
            <div className="col-md-6">
              <label htmlFor="">Expected Sell Value :</label>
              <h4>N{data.fiat}/eth</h4>
            </div>

            <div className="col-md-6">
              <label htmlFor="">Order Date</label>
              <h4>{data.orderdate}</h4>
            </div>
            <div className="col-md-6">
              <label htmlFor="">Seller</label>
              <h4>{data.sellername}</h4>
            </div>
          </div>
          <hr />
          <div className="alert alert-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            eius sed assumenda molestiae fuga quasi accusantium alias
            voluptatem, repellendus illo cupiditate iste molestias distinctio
            commodi ut? Magni in beatae sapiente.
          </div>
          <hr />
        </div>
        <div className="col-md-6">
          <label htmlFor="">
            <MessageSquare size={15} /> Chat
          </label>
          <div className="chat_area"></div>
          <textarea
            placeholder="Drop A Message!"
            className="form-control"
            name=""
            rows="4"
          ></textarea>
          <hr />
          <button className="btn btn-sm btn-primary">Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default NegotiationSeller;
