import React from "react";
import "./Home.scss";
import { Link, useHistory} from "react-router-dom";

export default function Home() {
    const history = useHistory();

    function handleClick() {
      history.push("/itinerary");
    }
  return (
    <header className="home">
      <article className="home__textContainer">
        <h1 className="home__title">SimpleTravel</h1>
        <p className="home__text">Find or create your own ideal travel itinerary</p>
        <article>
          <button className="home__btn" onClick={() => handleClick()}>
            Get Started
          </button>
        </article>
      </article>
    </header>
  );
}
