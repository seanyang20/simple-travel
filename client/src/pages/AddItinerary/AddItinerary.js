import React, { Component, useState } from "react";
import axios from "axios";
import "./AddItinerary.scss";


export default function AddItinerary (props) {
  const [formData, setFormData] = useState({
    itinerary: null,
    description: null,
  });
  // state = {
  //   itineraryFormData: null,
  // };
  const handleChange = (event) => {
    console.log(event.target.name); // working 
    console.log(event.target.value); // working

    // setFormData({[event.target.name]: event.target.value})
    setFormData({...formData,
    [event.target.name]: event.target.value});
   
    
    console.log(formData);
    // this.setState({
    //   itineraryFormData: { ...this.state.itineraryFormData, [event.target.name]: event.target.value },
    // });

    // console.log(this.state.itineraryFormData);
  };
  console.log(formData);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(props.match.params.id);
    // console.log(this.props.match.params.id);
    // console.log(this.state.itineraryFormData);   // currently returning null
    axios
      .post(
        `http://localhost:8080/users/${props.match.params.id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        props.history.push(`/users/${response.data.user_id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    props.history.push(`/users/${props.match.params.id}`);
  };
  // render(){
    // console.log(sessionStorage);
  return (
    <section className="add">
       <article className="add__container">
          <h1 className="add__heading">Add Your Itinerary</h1>
          <form
            action=""
            method="POST"
            className="add__form"
            onSubmit={handleSubmit}
          >
            <div className="add__usernameContainer">
              <label>Itinerary:</label>
              <input
                name="itinerary"
                className="add__username"
                onChange={handleChange}
              />
            </div>
            <div className="form__passwordContainer">
              <label>Description:</label>
              <textarea
                name="description"
                className="add__password"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="add__btn">
              Submit
            </button>
          </form>
          <button onClick={handleClick} className="add__btn">
            Back
          </button>
        </article>
    </section>
  );
}
// }