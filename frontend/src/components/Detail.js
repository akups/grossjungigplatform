import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import detailsLocales from "../locales/locales.details.json";

class Detail extends Component {
  state = {
    rooms: false,
  };

  componentDidMount() {
    const kitaId = this.props.match.params.id;
    axios.get("/api/berlin/:id").then((response) => {
      //console.log(response.data.kitas);

      let found = response.data.rooms.find((room) => {
        return room._id === roomId;
      });
      //console.log(found);
      this.setState({
        rooms: found,
      });
    });
  }

  //delete kita
  deleteRoom = (event) => {
    event.preventDefault();
    const deleteRoomId = this.props.match.params.id;
    //console.log("deleteRoom?", deleteRoomId);
    axios.delete(`/api/berlin/${deleteRoomId}/delete`).then((response) => {
      this.props.history.push("/berlin");
      //console.log("DETAIL?", response);
    });
  };

  render() {
    //console.log("FOUND?", this.state.kitas);
    const lang = localStorage.getItem("lang");

    if (!this.state.rooms) {
      return <h1></h1>;
    }

    if (this.props.user.role === "senior") {
      return (
        <div className="detail-container">
          <img
            height="200px"
            width="200px"
            src="/image/kindergarten.png"
            alt=""
          />
          <div className="detail-container-text">
            <h1>{this.state.rooms.name}</h1>
            <h3>{detailsLocales.address[lang]}</h3>
            <p>{this.state.roomss.adresse}</p>
            <h3>{detailsLocales.postcode[lang]}:</h3>
            <p>{this.state.rooms.postleitzahl}</p>
            <h3>{detailsLocales.city[lang]}</h3>
            <p>{this.state.rooms.stadt}</p>
            <h3>{detailsLocales.phone[lang]}</h3>
            <p>
              <a href={"tel:" + this.state.rooms.telefon}>
                {this.state.rooms.telefon}
              </a>
            </p>
            <h3>{detailsLocales.email[lang]}</h3>
            <p>
              <a href={"mailto:" + this.state.rooms.email}>
                {this.state.rooms.email}
              </a>
            </p>
          </div>
          <button onClick={this.deleteRoom}>delete room</button>
          <Link to="/berlin">
            <button>{detailsLocales.return[lang]}</button>
          </Link>
        </div>
      );
    }

    //console.log("DETAILS?", this.props.user.role);
    return (
      <div className="detail-container">
        <h1>{this.state.kitas.name}</h1>
        <div className="markus-container">
          <div className="detail-image-container">
            <img
              height="200px"
              width="200px"
              src="/image/kitaimage.png"
              alt=""
            />
          </div>
          <div className="detail-container-text">
            <h3>{detailsLocales.address[lang]}</h3>
            <p>{this.state.rooms.adresse}</p>
            <h3>{detailsLocales.postcode[lang]}:</h3>
            <p>{this.state.rooms.postleitzahl}</p>
            <h3>{detailsLocales.city[lang]}</h3>
            <p>{this.state.rooms.stadt}</p>
            <h3>{detailsLocales.phone[lang]}</h3>
            <p>
              <a href={"tel:" + this.state.rooms.telefon}>
                {this.state.rooms.telefon}
              </a>
            </p>
            <h3>{detailsLocales.email[lang]}</h3>
            <p>
              <a href={"mailto:" + this.state.rooms.email}>
                {this.state.rooms.email}
              </a>
            </p>
          </div>
        </div>

        <Link to="/berlin">
          <button>{detailsLocales.return[lang]}</button>
        </Link>
      </div>
    );
  }
}

export default Detail;
