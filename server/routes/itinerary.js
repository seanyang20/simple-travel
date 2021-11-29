const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("knex")(require("../knexfile").development);
const Itinerary = require("../models/itinerary");

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log("inside GET router for itinerary");
  Itinerary.fetchAll({debug: true})
    .then((itineraries) => {
        // console.log(itineraries);
      res.status(200).json(itineraries);
    })
    .catch(() => res.status(400).json({ message: "Error getting itinerary" }));


});

router.get("/:id", (req, res) => {
    console.log("Inside GET route for a specific itinerary");
    console.log(req.params.id);
    
    Itinerary.where({ id: req.params.id }   )
      .fetch({debug: true, withRelated: ["user"] })
      .then((itinerary) => {
        // return  console.log(itinerary);
        return res.status(200).json(itinerary);
      })
      .catch(() =>
        res.status(400).json({ message: `Error getting itinerary ${req.params.id}` })
      );
  });



module.exports = router;