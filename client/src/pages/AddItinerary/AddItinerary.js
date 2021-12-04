import React, { Component } from "react";
import axios from "axios";
import "./AddItinerary.scss";


export default class AddItinerary extends Component {
  state = {
    itineraryFormData: null,
  };
  handleChange = (event) => {
    console.log(event.target.name); // working 
    console.log(event.target.value); // working
    
    this.setState({
      itineraryFormData: { ...this.state.itineraryFormData, [event.target.name]: event.target.value },
    });

    console.log(this.state.itineraryFormData);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.props.match.params.id);
    console.log(this.state.itineraryFormData);   // currently returning null
    axios
      .post(
        `http://localhost:8080/users/${this.props.match.params.id}`,
        this.state.itineraryFormData,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.props.history.push(`/users/${response.data.user_id}`);
      })
      .catch((err) => console.log(err));
  };

  handleClick = () => {
    this.props.history.push(`/users/${this.props.match.params.id}`);
  };
  render(){
  return (
    <section className="add">
       <article className="add__container">
          <h1 className="add__heading">Add Your Itinerary</h1>
          <form
            action=""
            method="POST"
            className="add__form"
            onSubmit={this.handleSubmit}
          >
            <div className="add__usernameContainer">
              <label>Itinerary:</label>
              <input
                name="itinerary"
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
