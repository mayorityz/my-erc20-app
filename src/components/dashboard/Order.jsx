import React from "react";

const Order = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-center headings">Deposit</h4>
            <form action="">
              <div className="form-group row">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Amount Of Eth"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Min. Purchase Amount"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price Per Eth."
                  />
                </div>
              </div>
              <textarea
                name=""
                className="form-control"
                rows="10"
                placeholder="Let the buyer know a few of your terms of purchase!"
              ></textarea>
              <button className="btn btn-xs btn-success">Deposit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
