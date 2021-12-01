import React, { Component } from "react";
import axios from "axios";
import "./AddItinerary.scss";


export default class AddItinerary extends Component {
  state = {
    itineraryFormData: null,
  };
  handleChange = (event) => {
    this.setState({
      itineraryFormData: { ...this.state.itineraryFormData, [event.target.name]: event.target.value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `/itinerary/users/${this.props.match.params.id}`,
        this.state.itineraryFormData,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.props.history.push(`/users/${response.data.user_id}`);
      })
      .catch((err) => console.log(err));
  };

  handleClick = () => {
    this.props.history.push(`/users/${this.props.match.params.id}`);
  };
  render(){
  return (
    <section className="add-itinerary">
       <article className="add__container">
          <h1 className="add__heading">Add Your Itinerary</h1>
          <form
            action=""
            method="POST"
            className="add"
            onSubmit={this.handleSubmit}
          >
            <div className="add__usernameContainer">
              <label>Itinerary:</label>
              <input
                name="idea"
                className="add__username"
                onChange={this.handleChange}
              />
            </div>
            <div className="form__passwordContainer">
              <label>Description:</label>
              <textarea
                name="description"
                className="add__password"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="add__btn">
              Submit
            </button>
          </form>
          <button onClick={this.handleClick} className="add__btn">
            Back
          </button>
        </article>
    </section>
  );
}
}
