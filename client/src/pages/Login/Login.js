import axios from "axios";
import React, { Component, useState } from "react";
import "./Login.scss";


export default function Login (props) {
  const [loginFormData, setLoginFormData] = useState({
    user_name: null,
    password: null,
    errors: false,
  });
  // state = {
  //   loginFormData: null,
  //   errors: false,
  // };

  const handleChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);

    setLoginFormData({...loginFormData,
      [event.target.name]: event.target.value});
    // this.setState({
    //   loginFormData: { ...this.state.loginFormData, [event.target.name]: event.target.value },
    // });

    console.log(loginFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/login", loginFormData)
      .then((response) => {
        console.log(response.data);         

   
        // storage.push(response.data.token);
        // storage.push(response.data.user.user_name);
     
        // sessionStorage.setItem("storage", storage);
        // sessionStorage.setItem("token", response.data.token);         // using sessionStorage here instead of cookie 
        sessionStorage.setItem('user_name', response.data.user.user_name );
        sessionStorage.setItem('id', response.data.user.id)
        sessionStorage.setItem('token', response.data.token)
        props.history.push({ pathname: "/itinerary" });          // directing user to the itinerary page upon login
        // console.log(response.data);
      
      })
      .catch((err) => 
      {
        setLoginFormData({errors: true});
        // this.setState({
        //   errors: true,
        // });
        console.log(err);
      });
  };

  const handleClick = () => {
    props.history.push("/signup");
  };

  // render() {
    return (
      <section className="login">
       <article className="login__container">
          <h1 className="login__heading">Login</h1>
          <form
            action=""
            method="POST"
            className="login__form"
            onSubmit={handleSubmit}
          >
            <div className="login__usernameContainer">
              <label>Username:</label>
              <input
                name="user_name"
                className={
                  loginFormData.errors
                    ? "login__username login__errors"
                    : "login__username"
                }
                onChange={handleChange}
              />
            </div>
            <div className="login__passwordContainer">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className={
                  loginFormData.errors
                    ? "login__password login__errors"
                    : "login__password"
                }
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login__btn">
              Login
            </button>
          </form>
          <span>Don't have an account? Register today!</span>
          <button onClick={handleClick} className="login__btn">
            Register
          </button>
        </article>
        </section>
    );
  }
// }