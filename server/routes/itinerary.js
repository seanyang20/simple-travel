const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const knex = require("knex")(require("../knexfile").development);
const Itinerary = require("../models/itinerary");

/* GET home page. */
router.get("/", function (req, res, next) {
    console.log("inside GET router for itinerary");
  Itinerary.fetchAll()
    .then((itineraries) => {
      res.status(200).json(itineraries);
    })
    .catch(() => res.status(400).json({ message: "Error getting itinerary" }));

});



module.exports = router;