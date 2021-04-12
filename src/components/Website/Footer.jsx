import React from "react";

const Footer = () => {
  return (
    <>
      <div className="index_footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>About Us</h3>
              <hr className="underline" />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                aperiam aut ut repellendus nesciunt facilis, explicabo sed
                doloribus sunt vitae earum voluptate inventore quas error
                dolores, sit, nihil modi placeat.
              </p>
            </div>
            <div className="col-md-3">
              <h3>Navigation</h3>
              <hr className="underline" />
              <ul>
                <li>
                  <a href="#">- How It Works</a>
                </li>
                <li>
                  <a href="#">- My Account</a>
                </li>
                <li>
                  <a href="#">- Privacy Policy</a>
                </li>
                <li>
                  <a href="#">- Privacy Policy</a>
                </li>
                <li>
                  <a href="#">- About Us</a>
                </li>
                <li>
                  <a href="#">- Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Social Media</h3>
              <hr className="underline" />
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
