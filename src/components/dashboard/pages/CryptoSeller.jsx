// sellers view
import React, { useState, useEffect } from "react";
import { MessageSquare } from "react-feather";
import { useParams } from "react-router";
import axios from "axios";
import web3 from "web3";
import { io } from "socket.io-client";

const CryptoSeller = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState({ name: "", txStatus: "seller", message: "" });
  const [conversation, setConversation] = useState([]);
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState({ eth: "0" });
  const SERVER = `${process.env.REACT_APP_URL}/?roomid=${id}`; //connection to the socket on the server.

  // window.scrollTo(0, document.body.scrollHeight);
  useEffect(() => {
    // setSocket(io(SERVER));
    // socket.on("connect", (socket) => {
    //   console.log("connected! : ", socket);
    // });
  }, [SERVER]);

  useEffect(() => {
    const url = async () => {
      let query = await axios.get(
        `${process.env.REACT_APP_URL}/sales/buyer-negotiation/${id}`,
        { withCredentials: true }
      );

      if (query.data.status === "success") setData(query.data.data);
    };
    url();
  }, [id]);

  useEffect(() => {
    if (!socket) return;
    socket.on(id, (msg) => {
      const convo = [...conversation];
      convo.push(msg);
      setConversation(convo);
    });
  }, [socket, id, conversation]);

  const converse = (e) => {
    e.preventDefault();
    setMsg({ name: "", txStatus: "seller", message: "" });
    // socket.emit(id, msg);
  };

  const sellersMessage = ({ target: { value } }) => {
    let body = { ...msg };
    body.message = value;
    body.name = "mayowa";
    setMsg(body);
  };

  return (
    <div className="container container_x">
      <div className="row">
        <div className="col-md-6">
          <div className="row alert alert-secondary">
            <div className="col-md-6">
              <label htmlFor="">Locked Ether Value</label>
              <h4>{web3.utils.fromWei(data.eth.toString())} eth</h4>
            </div>
            <div className="col-md-6">
              <label htmlFor="">Rate</label>
              <h4>N{data.rate}/eth</h4>
            </div>

            <div className="col-md-6">
              <label htmlFor="">Status</label>
              <h4>Connected</h4>
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
            <p>Seller's Message : </p>
            {data.message}
          </div>
          <hr />
          <div className="row mb-5">
            <div className="col-md-6">
              <button className="custom-btn success">RELEASE ETH</button>
            </div>
            <div className="col-md-6">
              <button className="custom-btn danger">DISPUTE</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <label
            htmlFor=""
            style={{
              backgroundColor: "#212529",
              display: "block",
              color: "#fff",
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 9,
              marginBottom: 2,
            }}
          >
            <MessageSquare size={15} /> Chat
          </label>
          <div className="chat_area">
            {conversation.length !== 0 &&
              conversation.map((convo) => (
                <div key={convo.msgid}>
                  <span className="chat_box_username">{convo.name} said:</span>
                  <div className="chat_box_message">{convo.message}</div>
                </div>
              ))}
          </div>
          <form onSubmit={converse}>
            <textarea
              placeholder="Drop A Message!"
              className="form-control"
              name=""
              rows="4"
              required
              value={msg.message}
              onChange={sellersMessage}
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
