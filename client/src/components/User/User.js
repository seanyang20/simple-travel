import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class User extends Component {
  state = {
    user: [],
  };

  getProfile = (id) => {
    axios.get(`http://localhost:8080/users/${id}`).then((res) => {
      this.setState({
        user: [res.data],
      });
    });
  };
  
  componentDidMount() {
    this.getProfile(this.props.match.params.id);
  }

  render() {
    console.log(this.state.user);
    return (
      <section>
        <article>
          <h1>Inside User Profile</h1>
        </article>
      </section>
    );
  }
}

