import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import roomsLocales from "../locales/locales.rooms.json";
//import addroomLocales from "../locales/locales.addrooms.json";

class AddRoom extends Component {
  state = {
    name: "",
    district: "select",
    description: "",
    price: "",
    postcode: "",
    address: "",
    phoneNumber: "",
    email: "",
    neighbourhood: "",
    redirect: false,
  };

  setFormState = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addNewRoom = (event) => {
    //console.log("WORKING?");
    event.preventDefault();
    //1. post the data to backend -> routes kitas.js
    axios
      .post("http://localhost:5555/api/addRoom", {
        name: this.state.name,
        district: this.state.district,
        postcode: this.state.postcode,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        description: this.state.description,
        price: this.state.price,
      })
      .then((response) => {
        this.props.history.push("/rooms");
        console.log("this is response", response);
      })
      .catch((err) => {
        this.setState({
          message: err.response.data.message,
        });
      });
  };

  render() {
    //console.log(this.state);
    const lang = localStorage.getItem("lang");
    if (this.state.redirect) {
      return <Redirect to="/rooms" />;
    }

    return (
      <div style={{ height: "60vh" }}>
        <h1>{roomsLocales.add[lang]}</h1>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.setFormState}
        />
        <label htmlFor="district">district:</label>
        <select
          name="district"
          type="select"
          value={this.state.district}
          onChange={this.setFormState}
        >
          <option value="--">select</option>
          <option value="Charlottenburg-Wilmersdorf">
            Charlottenburg-Wilmersdorf
          </option>
          <option value="Friedrichshain-Kreuzberg">
            Friedrichshain-Kreuzberg
          </option>
          <option value="Lichtenberg">Lichtenberg</option>
          <option value="Marzahn-Hellersdorf">Marzahn-Hellersdorf</option>
          <option value="Mitte">Mitte</option>
          <option value="Neukoelln">Neukoelln</option>
          <option value="Pankow">Pankow</option>
          <option value="Reinickendorf">Reinickendorf</option>
          <option value="Spandau">Spandau</option>
          <option value="Steglitz-Zehlendorf">Steglitz-Zehlendorf</option>
          <option value="Tempelhof-Schoeneberg">Tempelhof-Schoeneberg</option>
          <option value="Treptow-Koepenick">Treptow-Koepenick</option>
        </select>
        <label htmlFor="address">address:</label>
        <input
          type="text"
          name="address"
          value={this.state.address}
          onChange={this.setFormState}
        />
        <label htmlFor="postcode">postcode</label>
        <input
          type="text"
          name="postcode"
          value={this.state.postcode}
          onChange={this.setFormState}
        />
        <label htmlFor="phoneNumber">phone number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.setFormState}
        />
        <label htmlFor="email">email:</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.setFormState}
        />
        <label htmlFor="description">description:</label>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.setFormState}
        />
        <label htmlFor="price">price in euros:</label>
        <input
          type="number"
          name="price"
          value={this.state.price}
          onChange={this.setFormState}
        />
        <label htmlFor="uploadphotos">Upload your pictures</label>
        <input type="file" />
        <Link to="/uploadphotos">
          <button>{roomsLocales.images[lang]}</button>
        </Link>
        <button type="submit" onClick={this.addNewRoom}>
          submit
        </button>
        {this.state.message && <p>{this.state.message}</p>}
      </div>
    );
  }
}

export default AddRoom;
