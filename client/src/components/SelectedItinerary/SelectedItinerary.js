import React, { Component } from "react";
import axios from "axios";
import "./SelectedItinerary.scss";
import { Link } from "react-router-dom";

export default class SelectedItinerary extends Component {
  state = {
    itinerary: [],
  };

  getIdea = (id) => {
    axios.get(`http://localhost:8080/itinerary/${id}`).then((res) => {
        console.log(res);
    //   this.setState({
    //     idea: [res.data],
    //   });
    });
  };

  componentDidMount() {
    // this.getIdea(this.props.match.params.id);
  }

  render() {
    return (
      <section>
        {/* <article>
          <h1>Idea</h1>
        </article>
        <article>
          {this.state.idea.map((idea) => (
            <article key={idea.id}>
              <h2>{idea.idea}</h2>
              <p>{idea.description}</p>
              <article>
                <h3>{idea.user.user_name}</h3>
                <Link to={`/profile/${idea.user.id}`}>
                  <span>{idea.user.user_name}'s Profile</span>
                </Link>
              </article>
            </article>
          ))}
        </article> */}
        Test
      </section>
    );
  }
}
