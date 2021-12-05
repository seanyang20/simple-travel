require("dotenv").config();
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("knex")(require("../knexfile").development);
const Itinerary = require("../models/itinerary");
const authorize = require("../middleware/authorize");

router.get("/itinerary", authorize, function (req, res, next) {         // rmb to put authorize here
  console.log("inside GET router for itinerary");
  Itinerary.fetchAll({ debug: true })
    .then((itinerary) => {
      // console.log(itineraries);
      res.status(200).json(itinerary);
    })
    .catch(() => res.status(400).json({ message: "Error getting itinerary" }));
});

router.get("/itinerary/:id", authorize, (req, res) => {
  console.log("Inside GET route for a specific itinerary");
  console.log(req.params.id);

  Itinerary.where({ id: req.params.id })
    .fetch({ debug: true, withRelated: ["user"] })
    .then((itinerary) => {
      // return  console.log(itinerary);
     res.status(200).json(itinerary);
    })
    .catch(() =>
      res
        .status(400)
        .json({ message: `Error getting itinerary ${req.params.id}` })
    );
});

router.post("/users/:id", authorize,  (req, res) => {
  console.log("Inside back end POST for new itinerary");
  // console.log(req.params.id);
  new Itinerary({
    itinerary: req.body.itinerary,
    description: req.body.description,
    // user_id: req.body.user_id,
    user_id: req.params.id,
  })
    .save()
    .then((itinerary) => {
      console.log(itinerary, "test");
      res.status(201).json(itinerary);
    })
    .catch((err) => 
      // console.log( new Itinerary({
      //   itinerary: req.body.itinerary,
      //   description: req.body.description,
      //   // user_id: req.params.id,
      // }))
      // console.log(err)
      res.status(400).json({ message: `Error creating user ${req.body.itinerary}` })
    );
});

router.put("/itinerary/:id", authorize,  (req, res) => {
  Itinerary.where({ id: req.params.id })
    .fetch()
    .then((itinerary) => {
      itinerary
        .save({
          itinerary: req.body.itinerary,
          description: req.body.description,
        })
        .then((updatedItinerary) => {
          res.status(200).json(updatedItinerary);
        });
    })
    .catch(() =>
      res.status(400).json({ message: `Error updating idea ${req.params.id}` })
    );
});

router.delete("/itinerary/:id", authorize, (req, res) => {
  Itinerary.where({ id: req.params.id })
    .destroy()
    .then(() => {
      res.status(200).json({ message: `Deleted Itinerary ${req.params.id}` });
    })
    .catch(() =>
      res.status(400).json({ message: `Error deleting Itinerary ${req.params.id}` })
    );
});


module.exports = router;
