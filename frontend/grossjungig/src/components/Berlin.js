import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import roomsLocales from "../locales/locales.rooms.json";

class Berlin extends Component {
  state = {
    rooms: [],
    search: "",
    select: "--",
    searchedRoom: [],
    photos: [], //[urls pointing to the images]
  };
  //1. from frontend, axios request a room data-> route rooms.js
  componentDidMount() {
    axios.get("/api/rooms").then((response) => {
      console.log(response.data.rooms);
      this.setState({
        rooms: response.data.rooms,
      });
    });
  }
  searchedName = (event) => {
    this.setState({
      [event.target.name]:
        event.target.type === "select"
          ? event.target.selected
          : event.target.value,
    });
  };

  handleSelect = (event) => {
    this.setState({ select: event.target.value });
  };

  render() {
    const filteredRoomsBySelect = this.state.rooms.filter((room) => {
      if (this.state.select === "--") {
        return true;
      }
      return room.district === this.state.select;
    });

    // const filteredRooms = filteredRoomsBySelect.filter((room) => {
    //   return room.postcode.includes(this.state.search);
    // });

    const filteredRooms = filteredRoomsBySelect.filter((room) => {
      if (this.state.search === "") {
        return true;
      }
      return room.postcode === this.state.search;
    });

    const lang = localStorage.getItem("lang");

    const room = filteredRooms.map((el) => {
      return (
        <tbody className="table" key={el._id}>
          <tr>
            <Link className="room-container" to={`/berlin/${el._id}`}>
              <td>{el.name}</td>
            </Link>
            <td>{el.district}</td>
          </tr>
        </tbody>
      );
    });
    return (
      <div style={{ height: "60vh" }}>
        <h1>{roomsLocales.title[lang]}</h1>
        <label htmlFor="searchbypostcode">{roomsLocales.search[lang]}: </label>
        <input
          type="search"
          name="search"
          value={this.state.search}
          onChange={this.searchedName}
          placeholder={roomsLocales.placeholder[lang]}
        />
        <label htmlFor="filterbydistrict">Select: </label>
        <select
          name="select"
          type="select"
          value={this.state.select}
          onChange={this.searchedName}
          // selected={this.state.select}
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
        <table className="table-container">
          <thead>
            <tr>
              <th width="20%">Room Name</th>
              <th width="20%">{roomsLocales.neighborhood[lang]}</th>
            </tr>
          </thead>
          {room}
        </table>
      </div>
    );
  }
}
export default Berlin;
