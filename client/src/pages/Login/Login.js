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

   
        // storage.push(response.data.token);
        // storage.push(response.data.user.user_name);
     
        // sessionStorage.setItem("storage", storage);
        // sessionStorage.setItem("token", response.data.token);         // using sessionStorage here instead of cookie 
        sessionStorage.setItem('user_name', response.data.user.user_name );
        sessionStorage.setItem('id', response.data.user.id)
        sessionStorage.setItem('token', response.data.token)
        this.props.history.push({ pathname: "/itinerary" });          // directing user to the itinerary page upon login
        // console.log(response.data);
      
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
    this.props.history.push("/signup");
  };

  render() {
    return (
      <section className="login">
       <article className="login__container">
          <h1 className="login__heading">Login</h1>
          <form
            action=""
            method="POST"
            className="login__form"
            onSubmit={this.handleSubmit}
          >
            <div className="login__usernameContainer">
              <label>Username:</label>
              <input
                name="user_name"
                className={
                  this.state.errors
                    ? "login__username login__errors"
                    : "login__username"
                }
                onChange={this.handleChange}
              />
            </div>
            <div className="login__passwordContainer">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className={
                  this.state.errors
                    ? "login__password login__errors"
                    : "login__password"
                }
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="login__btn">
              Login
            </button>
          </form>
          <span>Don't have an account? Register today!</span>
          <button onClick={this.handleClick} className="login__btn">
            Register
          </button>
        </article>
        </section>
    );
  }
}