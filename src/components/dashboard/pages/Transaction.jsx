import React from "react";
import {
  MessageSquare,
  ArrowRightCircle,
  ArrowDownCircle,
} from "react-feather";

const Transaction = () => {
  return (
    <div className="container container_x">
      <div className="row">
        <div className="col-md-6">
          <p className="text-center buyIcon">0x...8d8df9d</p>
          <p className="text-center buyIcon">
            <ArrowDownCircle size={29} />
          </p>
          <p className="text-center buyIcon">0x...8d8df9d</p>
          <p className="text-center buyIcon">Locked Value : 0.034 eth</p>
          <p className="text-center">
            <button className="btn btn-warning btn-sm">Release Value!</button>
          </p>
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

export default Transaction;
