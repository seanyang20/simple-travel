import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import "./EditItinerary.scss";
import ImageUpload from 'image-upload-react'
//important for getting nice style.
import 'image-upload-react/dist/index.css'


export default function EditItinerary (props) {
  const [formData, setFormData] = useState(null);
  const [itinerary, setItinerary] = useState([]);

    const [imageSrc, setImageSrc] = useState()
  // state = {
  //   itineraryFormData: null,
  //   itinerary: [],
  // };

  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]))
  }
  const handleChange = (event) => {

    setFormData({[event.target.name]: event.target.value});
    // this.setState({
    //   itineraryFormData: { ...this.state.itineraryFormData, [event.target.name]: event.target.value },
    // });
  };

  const getItinerary = (id) => {
    axios
      .get(`http://localhost:8080/itinerary/${id}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setItinerary([response.data]);
        // this.setState({
        //   itinerary: [response.data],
        // });
      })
      .catch((err) => {
        if (err.response === undefined) {
          console.error({ message: err });
        } else {
          switch (err.response.status) {
            case 403:
              props.history.push("/login");
              break;
            default:
              break;
          }
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/itinerary/${props.match.params.id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        props.history.goBack();
      });
  };

  const handleClick = () => {
    props.history.goBack();
  };

  useEffect(() => {
    getItinerary(props.match.params.id);
  
  }, []
  )
  //   componentDidMount() {
  //   this.getItinerary(this.props.match.params.id);
  // }
  console.log(imageSrc);
  // render () {
  return (
    <section className="edit">
      <article className="edit__container">
          <h2 className="edit__heading">Edit Your Itinerary!</h2>
          <form
            action=""
            method="POST"
            className="edit__form"
            onSubmit={handleSubmit}
          >
            {/* <div className="imageContainer">
             <ImageUpload
             className="uploadedImage"
      handleImageSelect={handleImageSelect}
      imageSrc={imageSrc}
      setImageSrc={setImageSrc}
      style={{
        width: 318,
        height: 271,  
        background: 'gold',
      }}
    />

    </div> */}
            {itinerary.map((itinerary) => (
              <article key={itinerary.id}>
                <div className="edit__content">
                  <label className="edit__username">
                    Your Itinerary:
                    <br /> {itinerary.itinerary}
                  </label>
                </div>
                <div className="">
                  <label className="edit__description-label">Description:</label> <br />
                  <textarea
                    type="text"
                    name="description"
                    onChange={handleChange}
                    // placeholder={itinerary.description}
                    className="edit__description"
                  >{itinerary.description}</textarea>
                </div>
              </article>
            ))}
            <button className="edit__btn" type="submit">
              Submit
            </button>
            <button className="edit__btn" onClick={handleClick}>
            Back
          </button>
          </form>
          {/* <button className="edit__btn" onClick={handleClick}>
            Back
          </button> */}
        </article>
    </section>
  );
}
// }