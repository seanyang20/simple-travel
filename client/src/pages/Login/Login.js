import axios from "axios";
import React, { Component } from "react";
import "./Login.scss";


export default class Login extends Component {
  state = {
    loginFormData: null,
    errors: false,
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
      .catch((err) => 
      {
        this.setState({
          errors: true,
        });
        console.log(err);
      });
  };

  handleClick = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <section className="login">
       <article className="form__container">
          <h1 className="form__heading">Login</h1>
          <form
            action=""
            method="POST"
            className="form"
            onSubmit={this.handleSubmit}
          >
            <div className="form__usernameContainer">
              <label>Username:</label>
              <input
                name="user_name"
                className={
                  this.state.errors
                    ? "form__username form__errors"
                    : "form__username"
                }
                onChange={this.handleChange}
              />
            </div>
            <div className="form__passwordContainer">
              <label>Password:</label>
              <input
                name="password"
                className={
                  this.state.errors
                    ? "form__password form__errors"
                    : "form__password"
                }
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="form__btn">
              Login
            </button>
          </form>
          <span>Don't have an account? Regsiter here:</span>
          <button onClick={this.handleClick} className="form__btn">
            Register
          </button>
        </article>
      </section>
    );
  }
}