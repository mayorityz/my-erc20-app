import React, { useState } from "react";
import loginImg from "./img/user.svg";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUN] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  let history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    setAlert("Logging you in! Please, wait!!");
    axios
      .post(
        "http://localhost:4444/userlogin",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // save to local storage
        const {
          data: { success, msg },
        } = res;
        if (!success) setAlert(msg);
        else {
          setAlert("Login Successful!");
          history.push("/");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const check = async (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:4444/cook", { withCredentials: true })
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
            <h4 className="text-center">LOGIN</h4>
            <form action="" className="" onSubmit={submit}>
              <hr />
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="e.g. mayor"
                  onChange={(e) => setUN(e.target.value)}
                />
                <label for="floatingInput">Username *:</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label for="floatingPassword">Password *:</label>
              </div>
              <hr />
              <button className="btn btn-success">Login</button>

              <Link to="/register" className="btn btn-link float-end">
                Don't Have An Account?
              </Link>
              <button className="btn btn-success btn-xs" onClick={check}>
                check token
              </button>
              {alert && (
                <>
                  <hr />
                  <div className="alert alert-secondary text-center">
                    {alert}
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
