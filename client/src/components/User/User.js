import React, { Component } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import "./User.scss";

export default class User extends Component {
  state = {
    user: [],
    token: [],
    noItinerary: false,
  };

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

  handleClickAdd = () => {
    this.props.history.push(`/addItinerary/${this.props.match.params.id}`);
  };
  handleClick = (id) => {
    this.props.history.push(`/itinerary/${id}`);
  };
  handleClickEdit = (id) => {
    this.props.history.push(`/editItinerary/${id}`);
  };
  handleClickDelete = (id) => {
    this.props.history.push(`/deleteItinerary/${id}`);
  };

  componentDidMount() {
    this.getUser(this.props.match.params.id);
   ;
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
     
        {this.state.user.map((user) => (
          <article key={user.id}>
            <article className="user__headingContainer">
              <h2 className="user__username">
                {user &&
                user.id == sessionStorage.id
                  ? "My Profile"
                  : `${user.user_name}'s Profile`}
              </h2>
              <h2 className="user__title">Itinerary</h2>
            </article>

            {user.id == sessionStorage.id ? (
              <div className="user__btnContainer">
                <AddIcon 
                className="user__btn--add"
                onClick={this.handleClickAdd}
                />
                {/* <button
                  onClick={this.handleClickAdd}
                  className="user__btn--add"
                >
                  Add An Itinerary
                </button> */}
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
                                More Info
                              </button>
                              <span>
                                {this.state.user.map((user) =>
                                  user.id == sessionStorage.id ? (
                                    <div key={itinerary.id}>
                                      <EditIcon
                                      className="user__btn--icon"
                                      onClick={() =>
                                        this.handleClickEdit(`${itinerary.id}`)
                                      } />
                                      {/* <button
                                        className="user__btn"
                                        onClick={() =>
                                          this.handleClickEdit(`${itinerary.id}`)
                                        }
                                      >
                                        Edit My Itinerary
                                      </button> */}
                                      <DeleteIcon
                                      className="user__btn--icon"
                                      onClick={() =>
                                        this.handleClickDelete(`${itinerary.id}`)
                                      } />
                                      {/* <svg
                                      // className="user__btn"
                                      className="user__deleteIcon"
                                      onClick={() =>
                                        this.handleClickDelete(`${itinerary.id}`)
                                      }>
                                      </svg> */}
                                      {/* <button
                                        className="user__btn"
                                        // src={DeleteIcon}
                                        onClick={() =>
                                          this.handleClickDelete(`${itinerary.id}`)
                                        }
                                      >
                                        Delete My Itinerary
                                      </button> */}
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
              </article>
        ))}
     
    </section>
  );
}
}


