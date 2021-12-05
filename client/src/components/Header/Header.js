import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Header.scss";
import axios from "axios";

export default class Header extends Component {
  state = {
    token: [],
    user: [],
    loggedIn: false,
  };

  getUser = (id) => {
    axios
      .get(`http://localhost:8080/users/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // console.log(sessionStorage.token);
        this.setState({
          user: [res.data],
          token: sessionStorage.token,
          loggedIn: true,
        });
        // console.log(sessionStorage);
        // console.log(this.state);
      })
      .catch((err) => {
        if (err.response === undefined) {
          console.error({ message: err });
        } else if (err === "TypeError") {
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

  handleClick = (id) => {
    // console.log(this.props.history);
    // console.log(id);
    this.props.history.push(`/users/${id}`);
    // console.log(this.props);
  };

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("user_name");
    this.setState({
      loggedIn: false, 
    });
    this.props.history.push(`/`);
  }

  componentDidMount() {
    // console.log(this.props);
    console.log(sessionStorage);
    this.getUser(sessionStorage.id);
   
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props)
    // console.log(prevProps);
    if (this.props.location.key !== prevProps.location.key) {
      this.getUser(sessionStorage.id);
    }
  }

  render() {
   console.log(this.state);
    return (
      <header className="header">
         <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu"/>
        <label for="openSidebarMenu" class="sidebarIconToggle">
          <div className="spinner diagonal part-1"></div>
          <div className="spinner horizontal"></div>
          <div className="spinner diagonal part-2"></div>
        </label>
        <nav className="header__navbar"id="sidebarMenu" >
          <ul className="header__navbarList" >
            <Link to="/" className="header__navbarItem">
              <li>HOME</li>
            </Link>
            <Link to="/itinerary" className="header__navbarItem">
              <li>ITINERARY</li>
            </Link>
       
            {this.state.loggedIn &&
              this.state.user.map((user) => (
                <span
                  onClick={() => this.handleClick(user.id)}
                  key={user.id}
                  to={`/users/${user.id}`}
                  className="header__navbarItem"
                >
                  <li>MY PROFILE</li>
                </span>
              ))}
             {this.state.loggedIn && (
              <span
                onClick={() => this.logout()}
                className="header__navbarItem"
              >
                <li>LOGOUT</li>
              </span>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}
