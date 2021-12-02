import React, { Component } from "react";
import axios from "axios";
import "./User.scss";

export default class User extends Component {
  state = {
    user: [],
    token: [],
    noItinerary: false,
  };

  // handleClick = (id) => {
  //   this.props.history.push(`/itinerary/${id}`);
  // };
  // handleClickEdit = (id) => {
  //   this.props.history.push(`/editItinerary/${id}`);
  // };
  // handleClickDelete = (id) => {
  //   this.props.history.push(`/deleteItinerary/${id}`);
  // };

  getUser = (id) => {
    axios
      .get(`http://localhost:8080/users/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(sessionStorage.token);
        this.setState({
          user: [res.data],
          token: sessionStorage.token,
        });
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

  // handleClickAdd = () => {
  //   this.props.history.push(`/addItinerary/${this.props.match.params.id}`);
  // };

  componentDidMount() {
    this.getUser(this.props.match.params.id);
    // return axios
    //   .get(`http://localhost:8080/users/singleuser/1`, {
    //     headers: {
    //       authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({
    //       token: [res.data],
    //     });
    //     this.getUser(this.props.match.params.id);
    //   })
    //   .catch((err) => console.error({ message: err }));
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getUser(this.props.match.params.id);
    }
  }

  render() {
    console.log(this.state.user);
    console.log(sessionStorage);
    return (
      <section className="user">
        <article>
          
          {this.state.user.map((user) => (
            <article key={user.id}>
              <article className="user__headingContainer">
                <h2 className="user__username">
                  {/* {user.user_name}'s User */}
                  {/* {console.log(user.id, sessionStorage.id)} */}
                  {user && 

                  user.id == sessionStorage.id 
                  ? "My Profile"
                  : `${user.user_name}'s Profile`
                  }
                  {/* {this.state.token[0].user_name &&
                  user.user_name === this.state.token[0].user_name
                    ? "My User"
                    : `${user.user_name}'s User`} */}
                </h2>
                <h2 className="user__title">Itineraries</h2>
              </article>
              </article>

              /* {user.user_name === this.state.token[0].user_name ? (
                <div className="user__btnContainer">
                  <button
                    onClick={this.handleClickAdd}
                    className="user__btn--add"
                  >
                    Add An Itinerary
                  </button>
                </div>
              ) : (
                <></>
              )}

              <article className="user__container">
                {user.itinerary.map((itinerary) => (
                  <article key={itinerary.id}>
                    <>
                      <article key={itinerary.id} className="user__content">
                        {itinerary.itinerary === true ? (
                          <h2>{itinerary.description}</h2>
                        ) : (
                          <>
                            <div>
                              <h2>{itinerary.itinerary.toUpperCase()}</h2>
                              <p className="user__description">
                                {itinerary.description}
                              </p>
                            </div>
                            <article key={user.id}>
                              <button
                                className="user__btn"
                                onClick={() => this.handleClick(`${itinerary.id}`)}
                              >
                                Check Out My Itinerary
                              </button>
                              <span>
                                {this.state.token.map((user) =>
                                  user.user_name === user.user_name ? (
                                    <div key={itinerary.id}>
                                      <button
                                        className="user__btn"
                                        onClick={() =>
                                          this.handleClickEdit(`${itinerary.id}`)
                                        }
                                      >
                                        Edit My Itinerary
                                      </button>
                                      <button
                                        className="user__btn"
                                        onClick={() =>
                                          this.handleClickDelete(`${itinerary.id}`)
                                        }
                                      >
                                        Delete My Itinerary
                                      </button>
                                    </div>
                                  ) : (
                                    <span key={itinerary.id}></span>
                                  )
                                )}
                              </span>
                            </article>
                          </>
                        )}
                      </article>
                    </>
                  </article>
                ))}
              </article>
              </article> */
          ))} 
        </article>
      </section>
    );
  }
}


