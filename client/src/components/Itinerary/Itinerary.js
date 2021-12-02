import React, { Component } from "react";
import axios from "axios";
import "./Itinerary.scss";

export default class Itinerary extends Component {
  state = {
    itineraries: [],
  };

  getItinerary = () => {
    axios
      .get("http://localhost:8080/itinerary", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.setState({
          itineraries: res.data,
        });
      })
      .catch((err) => {
        switch (err.response.status) {
          case 403:
            this.props.history.push("/login");
            break;
          default:
            break;
        }
      });
  };
  handleClick = (id) => {
    this.props.history.push(`/itinerary/${id}`);
  };

  componentDidMount() {
    this.getItinerary();
  }
  render() {
    return (
      <section className="itinerary">
        <h1 className="itinerary__heading">ITINERARY</h1>
        <section>
          <article className="itinerary__container">
            {this.state.itineraries.map((itinerary) => (
              <div className="itinerary__content" key={itinerary.id}>
                <h2 className="itinerary__title">
                  {itinerary.itinerary.toUpperCase()}
                </h2>
                <p className="itinerary__description">
                  {itinerary.description}
                </p>
                <button
                  className="itinerary__btn"
                  onClick={() => this.handleClick(`${itinerary.id}`)}
                >
                  More Details
                </button>
              </div>
            ))}
          </article>
        </section>

        <article></article>
      </section>
    );
  }
}
