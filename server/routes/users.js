const express = require("express");
const router = express.Router();
// const knexfile = require("../knexfile");
const knex = require("knex")(require("../knexfile").development);
const User = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("inside GET for user");
  User.fetchAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => res.status(400).json({ message: "Error getting users" }));

  // knex
  //   .select("*")
  //   .from("users")
  //   .then((data) => {
  //     res.json(data);
  //   })
  //   .catch((err) => res.send("Error getting users"));
});

router.get("/:id", (req, res) => {
    
  User.where({ id: req.params.id })
    .fetch({ withRelated: ["itinerary"] })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() =>
      res.status(400).json({ message: `Error getting user ${req.params.id}` })
    );
});

module.exports = router;
