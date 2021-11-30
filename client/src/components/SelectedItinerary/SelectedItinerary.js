import React, { Component } from "react";
import axios from "axios";
import "./SelectedItinerary.scss";
import { Link } from "react-router-dom";

export default class SelectedItinerary extends Component {
  state = {
    itinerary: [],
  };

  getItinerary = (id) => {
    axios.get(`http://localhost:8080/itinerary/${id}`).then((res) => {
        console.log(res.data);
      this.setState({
        itinerary: [res.data],
      });
    });
  };

  componentDidMount() {
    this.getItinerary(this.props.match.params.id);
  }

  render() {
    return (
      <section>
        <article>
          <h1>Itinerary</h1>
        </article>
        <article>
          {this.state.itinerary.map((itinerary) => (
            <article key={itinerary.id}>
              <h2>{itinerary.itinerary}</h2>
              <p>{itinerary.description}</p>
              <article>
                <h3>{itinerary.user.user_name}</h3>
                <Link to={`/users/${itinerary.user.id}`}>
                  <span>{itinerary.user.user_name}'s Profile</span>
                </Link>
              </article>
            </article>
          ))}
        </article>
      </section>
    );
  }
}

