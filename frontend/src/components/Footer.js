import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-flex">
        <div className="social-icons">
          <span className="Facebook">
            <img src="../image/Facebook_White.png" alt="Facebook"></img>
          </span>
          <span className="Twitter">
            <img src="../image/Twitter_White.png" alt="Twitter"></img>
          </span>
          <span className="Instagram">
            <img src="../image/Instagram_White.png" alt="Instagram"></img>
          </span>
        </div>
      </div>
      <footer>
        <p>© 2020 Grossjungig</p>
      </footer>
    </div>
  );
};

export default Footer;
