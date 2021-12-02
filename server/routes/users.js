const express = require("express");
const router = express.Router();
// const knexfile = require("../knexfile");
const knex = require("knex")(require("../knexfile").development);
const User = require("../models/user");
const authorize = require("../middleware/authorize");

router.get("/", authorize, function (req, res, next) {
  console.log("inside GET for user");
  User.fetchAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => res.status(400).json({ message: "Error getting users" }));

});

router.get("/:id",  (req, res) => {
  console.log("testtesttest");
  console.log(req.params.id);
  console.log(req);
  User.where({ id: req.params.id })
    .fetch({ withRelated: ["itinerary"] })
    .then((user) => {
      // console.log(user);
      console.log(user.attributes.user_name, "username");
      // const token = jwt.sign(
      //   { username: user.attributes.user_name },
      //   process.env.JWT_SECRET,
      //   { expiresIn: "48h" }
      // );
      // console.log(token, "token test");
      // console.log(process.env.JWT_SECRET);
      // console.log(res.status(200).json({ user, token }));
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: `Error getting user ${req.params.id}` })
    });
});

// router.get("/singleuser/:id", authorize, (req, res) => {
//   console.log("inside singleuser");
//   const tokenId = req.decoded;
//   // console.log(tokenId);
//   console.log(req,  "hello");
//   User.where({ user_name: tokenId.username })
//     .fetch({ withRelated: ["itinerary"] })
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ message: `Error getting user ${req.params.id}` })
//      } );


// });

// router.get("/token/:id", authorize, (req, res) => {
//   const tokenId = req.decoded;
//   User.where({ id: req.params.id })
//     .fetch({ withRelated: ["idea"] })
//     .then((user) => {
//       console.log(req.user.id);
//       res.status(200).json({ user, tokenId });
//     })
//     .catch(() =>
//       res.status(400).json({ message: `Error getting user ${req.params.id}` })
//     );
// });

module.exports = router;
