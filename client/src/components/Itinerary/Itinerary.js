import React, { Component } from "react";
import axios from "axios";
import "./Itinerary.scss";

export default class Idea extends Component {
  state = {
    itinerary: [],
  };

  getItinerary = () => {
    axios.get("http://localhost:8080/itinerary").then((res) => {
      this.setState({
        itinerary: res.data,
      });
    });
  };

  componentDidMount() {
    this.getItinerary();
  }
  render() {
    return (
      <section className="itinerary">
        <article className="itinerary__headingContainer">
          <h1 className="itinerary__heading">Itinerary</h1>
        </article>
        <article className="itinerary__container">
          {this.state.itinerary.map((itin) => (
            <div className="itinerary__content">
              <h2 className="itinerary__title">Travel Plans</h2>
              <p className="itinerary__description">{itin.description}</p>
              <button
                className="itinerary__btn"
                // onClick={() => this.handleClick(`${itin.id}`)}
              >
                Check out more
              </button>
            </div>
          ))}
          {/* <article className="itinerary__content">
            <h2 className="itinerary__title">Travel Plan</h2>
            <p className="itinerary__description">
              <span>Description</span>
            </p>
            <article>
              <h3>Anton's Idea</h3>
              <button className="itineraries__btn">Sean's Profile</button>
            </article>
          </article> */}
        </article>
      </section>
    );
  }
}
