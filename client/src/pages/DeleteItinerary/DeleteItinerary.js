import axios from "axios";
import React from "react";
import "./DeleteItinerary.scss";

export default function DeleteItinerary(props) {

  const handleClick = () => {
    axios
      .delete(`http://localhost:8080/itinerary/${props.match.params.id}`, {    // referencing the itinerary id
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        props.history.goBack();
      });
  };
  const handleGoBack = () => {
    props.history.goBack();
  };

  return (
    <section className="delete">
      <div className="delete__btnContainer">
        <h2 className="delete__title">
          Are You Sure You Want To Delete This Idea?
        </h2>
        <div>
          <button className="delete__btn" onClick={handleClick}>
            Yes
          </button>
          <button className="delete__btn" onClick={handleGoBack}>
            Take Me Back
          </button>
        </div>
      </div>
    </section>
  );
}
