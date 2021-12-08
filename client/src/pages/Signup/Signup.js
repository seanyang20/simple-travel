import axios from "axios";
import React, { Component, useState } from "react";
import "./Signup.scss";

export default function Signup (props) {
  const [signUpFormData, setSignUpFormData] = useState({
    user_name: null,
    password: null,
    errors: false,
  });
  // state = {
  //   signupFormData: null,
  //   errors: false,
  // };
  const handleChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);

    setSignUpFormData({...signUpFormData,
      [event.target.name]: event.target.value});
    // this.setState({
    //   signupFormData: { ...this.state.signupFormData, [event.target.name]: event.target.value },
    // });

    console.log(signUpFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/signup", signUpFormData)
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("token", response.data.token);
        props.history.push("/login");
      })
      .catch((err) => 

      setSignUpFormData({errors: true}));
      // this.setState({
      //   errors: true,
      // }));
  };

  const handleClick = () => {
    props.history.push("/login");
  };

  // render() {
    return (
      <section className="signup">
        <article className="signup__container">
        <h1 className="signup__heading">Sign Up</h1>
          <form
            action=""
            method="POST"
            className="signup__form"
            onSubmit={handleSubmit}
          >
            <div className="signup__usernameContainer">
              <label>Username:</label>
              <input
                className={
                  signUpFormData.errors
                    ? "signup__username signup__errors"
                    : "signup__username"
                }
                name="user_name"
                onChange={handleChange}
              />
            </div>
            <div className="signup__passwordContainer">
              <label>Password:</label>
              <input
                type="password"
                className={
                  signUpFormData.errors
                    ? "signup__password signup__errors"
                    : "signup__password"
                }
                name="password"
                onChange={handleChange}
              />
            </div>
            {/* <div className="signup__passwordContainer">
              <label>Confirm Password:</label>
              <input
                type="password"
                className={
                  signUpFormData.errors
                    ? "signup__password signup__errors"
                    : "signup__password"
                }
                name="password"
                onChange={handleChange}
              />
            </div> */}
            <button type="submit" className="signup__btn">
              Submit
            </button>
          </form>
          <span>Have an account already? Login here:</span>
          <button className="signup__btn" onClick={handleClick}>
            Login
          </button>
        </article>
      </section>
    );
  }
// }