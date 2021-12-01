import React, { Component } from "react";
import axios from "axios";
import "./EditItinerary.scss";


export default class EditItinerary extends Component {
  state = {
    itineraryFormData: null,
    itinerary: [],
  };
  handleChange = (event) => {
    this.setState({
      itineraryFormData: { ...this.state.itineraryFormData, [event.target.name]: event.target.value },
    });
  };

  getItinerary = (id) => {
    axios
      .get(`http://localhost:8080/itinerary/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.setState({
          itinerary: [response.data],
        });
      })
      .catch((err) => {
        if (err.response === undefined) {
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

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/itinerary/${this.props.match.params.id}`,
        this.state.itineraryFormData,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        this.props.history.goBack();
      });
  };

  handleClick = () => {
    this.props.history.goBack();
  };

    componentDidMount() {
    this.getItinerary(this.props.match.params.id);
  }
  
  render () {
  return (
    <section className="add">
      <article className="edit__container">
          <h2 className="edit__heading">Edit Your Itinerary!</h2>
          <form
            action=""
            method="POST"
            className="edit__form"
            onSubmit={this.handleSubmit}
          >
            {this.state.itinerary.map((itinerary) => (
              <article key={itinerary.id}>
                <div className="edit__content">
                  <label className="edit__username">
                    Your Itinerary:
                    <br /> {itinerary.itinerary}
                  </label>
                </div>
                <div className="">
                  <label>Description:</label> <br />
                  <textarea
                    type="text"
                    name="description"
                    onChange={this.handleChange}
                    placeholder={itinerary.description}
                    className="edit__description"
                  />
                </div>
              </article>
            ))}
            <button className="edit__btn" type="submit">
              Submit
            </button>
          </form>
          <button className="edit__btn" onClick={this.handleClick}>
            Back
          </button>
        </article>
    </section>
  );
}
}
