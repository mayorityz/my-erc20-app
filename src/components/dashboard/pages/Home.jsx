import React from "react";

const Home = () => {
  return (
    <>
      <h2 className="title">Welcome Back!!!</h2>
      <div className="stats">
        <div>
          <div>
            <h3>Connected Address:</h3>
            <h6>0X...1797EE</h6>
          </div>
          <div>
            <h3>Incoming Requests:</h3>
            <h6>10.</h6>
          </div>
        </div>
        <div>
          <div>
            <h3>Up For Trade:</h3>
            <h6>0.05343435</h6>
          </div>
          <div>
            <h3>Total Sales:</h3>
            <h6>50.</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
