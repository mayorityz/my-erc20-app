import React, { useState } from "react";
import loginImg from "./img/user.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUN] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    console.log("called");
    axios
      .post("http://localhost:4444/newuser", {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={loginImg}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <div className=" custom-form-area">
            <h4 className="text-center">Create Account.</h4>
            <form action="" className="" onSubmit={register}>
              <hr />
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  required
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setUN(e.target.value);
                  }}
                />
                <label for="floatingInput">Username *:</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  required
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label for="floatingInput">Email *:</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  required
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label for="floatingPassword">Password *:</label>
              </div>
              <hr />
              <button className="btn btn-success">Join Us</button>

              <Link to="/login" className="btn btn-link float-end">
                Or Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
