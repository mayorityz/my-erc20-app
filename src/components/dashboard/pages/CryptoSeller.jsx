// sellers view
import React, { useState, useEffect } from "react";
import { MessageSquare } from "react-feather";
import { useParams } from "react-router";
import axios from "axios";
import web3 from "web3";
import { io } from "socket.io-client";

const CryptoSeller = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState({ ethvalue: "0" });
  const SERVER = "http://localhost:4444/"; //connection to the socket on the server.

  useEffect(() => {
    setSocket(io(SERVER));
  }, []);

  useEffect(() => {
    const url = async () => {
      let query = await axios.get(
        `http://localhost:4444/sales/buyer-negotiation/${id}`,
        { withCredentials: true }
      );
      if (query.data.status === "success") setData(query.data.data[0]);
    };
    url();
  }, [id]);

  useEffect(() => {
    if (!socket) return;

    // socket.on("connection", () => {
    //   console.log("connected baby!!!");
    socket.on("chat message", (msg) => {
      console.log(msg);
      socket.emit("chat message", { data: "leys fi" });
    });
    // });
    console.log("sol");
  }, [socket]);

  const converse = (e) => {
    e.preventDefault();
    socket.of("/").emit(`chat message:${id}`, msg);
  };

  return (
    <div className="container container_x">
      <div className="row">
        <div className="col-md-6">
          <div className="alert alert-secondary">
            <p>Chat Room Rules : </p>
            <ol>
              <li>Civility is key.</li>
              <li>Quick and no time wasting</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ol>
          </div>
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
          <button className="btn btn-sm btn-warning pull-right">
            Release Value To Buyer
          </button>{" "}
          <button className="btn btn-sm btn-warning pull-right">
            Raise A Dispute Claim!
          </button>
          <br />
          <div className="alert alert-secondary">
            <p>Seller's Message : </p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            eius sed assumenda molestiae fuga quasi accusantium alias
            voluptatem, repellendus illo cupiditate iste molestias distinctio
            commodi ut? Magni in beatae sapiente.
          </div>
          <hr />
        </div>
        <div className="col-md-6">
          <form onSubmit={converse}>
            <label htmlFor="">
              <MessageSquare size={15} /> Chat
            </label>
            <div className="chat_area"></div>
            <textarea
              placeholder="Drop A Message!"
              className="form-control"
              name=""
              rows="4"
              required
              defaultValue={msg}
              onChange={({ target }) => setMsg(target.value)}
            ></textarea>
            <hr />
            <button className="btn btn-sm btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CryptoSeller;
