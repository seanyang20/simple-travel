import React, { Component } from "react";
import axios from "axios";
import "./Itinerary.scss";

export default class Idea extends Component {
  render() {
    return (
      <section className="itinerary">
        <article className="itinerary__headingContainer">
          <h1 className="itinerary__heading">Itinerary</h1>
        </article>
        <article className="itinerary__container">
          <article className="itinerary__content">
            <h2 className="itinerary__title">Travel Plan</h2>
            <p className="itinerary__description">
              <span>Description</span>
            </p>
            <article>
              <h3>Sean's Idea</h3>
              <button className="itineraries__btn">Sean's Profile</button>
            </article>
          </article>
        </article>
      </section>
    );
  }
}
