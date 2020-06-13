import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import navbarLocales from "../locales/locales.navbar.json";

const Navbar = (props) => {
  const [img, setImage] = useState("/image/germany.png");

  const imageChange = () => {
    //console.log("imagechange", localStorage.getItem("lang"));
    const lang = localStorage.getItem("lang");
    //console.log("LANG", lang);
    if (lang === "en") {
      setImage("/image/uk.png");
      localStorage.setItem("lang", "de");
    } else if (lang === "de") {
      setImage("/image/germany.png");
      localStorage.setItem("lang", "en");
    }
    props.updatePage();
    //This is coming from App.js
  };

  const logout = () => {
    axios.delete("/api/auth/logout").then(() => {
      props.setUser(null);
    });
  };

  const lang = localStorage.getItem("lang");
  console.log(props.user);
  if (props.user) {
    return (
      <nav className="navilink">
        <Link className="logo-link" to="/">
          <img
            src="/image/grossjungig_logo.png"
            alt="Grossjungig Logo"
            height="85px"
          ></img>
        </Link>
        <div className="main-nav">
          <Link to="/berlin">{navbarLocales.berlin[lang]}</Link>
          <Link to="/munich">{navbarLocales.munich[lang]}</Link>
        </div>
        <div className="login-nav">
          <Link onClick={logout} to="/">
            {navbarLocales.logout[lang]}
          </Link>
          <img onClick={imageChange} height="30px" src={img} alt="" />
          <Link to="/userportal">
            <img height="30px" src="/image/user.png" alt="User Portal" />
          </Link>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navilink">
      <Link to="/" className="logo-link">
        <img
          src="/image/grossjungig_logo.png"
          alt="Grossjungig Logo"
          height="65px"
        ></img>
      </Link>
      <div className="main-nav">
        <Link to="/berlin">
          <button className="berlin">{navbarLocales.berlin[lang]}</button>
        </Link>
        <Link to="/munich">
          <button>{navbarLocales.munich[lang]}</button>
        </Link>
      </div>
      <div className="login-nav">
        <Link to="/login">{navbarLocales.login[lang]}</Link>
        <Link to="/signup">{navbarLocales.signup[lang]}</Link>
        <img
          onClick={imageChange}
          height="20px"
          src={img}
          alt="Language Switcher"
        />
      </div>
    </nav>
  );
};

export default Navbar;
