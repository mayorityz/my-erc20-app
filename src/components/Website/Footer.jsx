import React from "react";

const Footer = () => {
  return (
    <>
      <div className="index_footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <ul>
                <li>
                  <a href="#">How It Works</a>
                </li>
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
