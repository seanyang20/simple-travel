import axios from "axios";
import React, { Component } from "react";


export default class Login extends Component {
  state = {
    loginFormData: null,
  };

  handleChange = (event) => {
    this.setState({
      loginFormData: { ...this.state.loginFormData, [event.target.name]: event.target.value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/login", this.state.loginFormData)
      .then((response) => {
        console.log(response.data);         
        sessionStorage.setItem("token", response.data.token);         // using sessionStorage here instead of cookie 
        this.props.history.push({ pathname: "/itinerary" });          // directing user to the itinerary page upon login
      })
      .catch((err) => console.error("Error", err));
  };

  render() {
    return (
      <section className="login">
       <h1>Login</h1>
        <article className="login__container">
          <form
            action=""
            method="POST"
            className="login__form"
            onSubmit={this.handleSubmit}
          >
            <div className="login__usernameContainer">
              <label>Username:</label>
              <input name="user_name" onChange={this.handleChange} />
            </div>
            <div className="login__passwordContainer">
              <label>Password:</label>
              <input name="password" onChange={this.handleChange} />
            </div>
            <button type="submit" className="login__btn">
              Login
            </button>
          </form>
        </article>
      </section>
    );
  }
}