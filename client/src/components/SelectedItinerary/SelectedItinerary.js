import React, { Component } from "react";
import axios from "axios";
import "./SelectedItinerary.scss";

export default class SelectedItinerary extends Component {
  state = {
    itinerary: [],
  };

  handleClick = (id) => {
    this.props.history.push(`/users/${id}`);
  };

  getSelectedItinerary = (id) => {
    axios
      .get(`http://localhost:8080/itinerary/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.setState({
          itinerary: [res.data],
        });
      })
      .catch((err) => {
        if (err.response === undefined) {
          console.error({ message: err });
        } else if (err === "TypeError") {
          console.error({ message: err });
        } else {
          switch (err.response.status) {
            case 403:
              this.props.history.push("/login");
              break;
            default:
              break;
          }
        }
      });
  };

  componentDidMount() {
    this.getSelectedItinerary(this.props.match.params.id);
  }

  render() {
    return (
      <section className="selecteditinerary">
          <h1 className="selecteditinerary__heading">ITINERARY</h1>
        <article className="selecteditinerary__container">
          {this.state.itinerary.map((itinerary) => (
            <article key={itinerary.id} className="selecteditinerary__content">
              <h2 className="selecteditinerary__title">{itinerary.itinerary.toUpperCase()}</h2>
              <p className="selecteditinerary__description">
                <span>{itinerary.description}</span>
              </p>
              <article>
                <h3>{itinerary.user.user_name}'s Itinerary</h3>

                <button
                  className="selecteditinerary__btn"
                  onClick={() => this.handleClick(itinerary.user.id)}
                >
                  {itinerary.user.user_name}'s Profile
                </button>
              </article>
            </article>
          ))}
        </article>
      </section>
    );
  }
}

