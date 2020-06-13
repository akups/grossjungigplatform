import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import signupLocales from "../locales/locales.signup.json";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    role: "senior",
    redirect: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5555/api/auth/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
      })
      .then((response) => {
        console.log("RSPONSE", response);

        // this.props.history.push("/");

        // this.props.setUser(this.response.data);
        // this.setState({
        //   redirect: true,
        // });
        this.props.setUser(response.data);
        this.props.history.push("/userportal");
      })
      .catch((err) => {
        console.log("this is the error", err);
        /*  this.setState({
          message: err.response.data.message,
        }); */
      });
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onChange = (event) => {
    let role = event.target.value;
    if (role === "Senioren") {
      role = "senior";
    }
    if (role === "Jungend") {
      role = "youth";
    }
    this.setState({ role });
  };

  render() {
    const lang = localStorage.getItem("lang");

    if (this.state.redirect) {
      return <Redirect to="/userportal" />;
    }
    return (
      <div className="signup-component">
        <h1>{signupLocales.title[lang]}</h1>
        <h3>{signupLocales.welcome[lang]}</h3>
        <div className="signup-container">
          <form>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.setFormState}
              type="text"
            />
            <label htmlFor="email">{signupLocales.email[lang]}</label>
            <input
              name="email"
              id="email"
              type="text"
              value={this.state.email}
              onChange={this.setFormState}
            />
            <label htmlFor="password">{signupLocales.password[lang]}</label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.setFormState}
            />
            <label htmlFor="role">{signupLocales.role[lang]}</label>
            <select
              name="role"
              id="role"
              value={this.state.role}
              onChange={this.onChange}
            >
              <option>{signupLocales.senior[lang]}</option>
              <option>{signupLocales.youth[lang]}</option>
            </select>
            <br />
            <button onClick={this.handleSubmit} type="submit">
              {signupLocales.submit[lang]}
            </button>
          </form>
        </div>
        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }
}

export default Signup;
