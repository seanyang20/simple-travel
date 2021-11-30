require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
    let username = req.body.user_name;
    let password = req.body.password;
    // bcrypt
    //   .hash(password, 8)
    //   .then((hashPassword) => {
    //     new User({ user_name: username, password: hashPassword })
    //       .save()
    //       .then((user) => {
    //           console.log(user);
    //         let token = jwt.sign(
    //           { username: user.username, password: user.password },
    //           process.env.JWT_SECRET,
    //           { expiresIn: "24h" }
    //         );
    //         res.json({ token: token });
    //       })
    //       .catch((err) => {
    //         res.status(400).send({ error: err.message });
    //       });
    //   })
    //   .catch((err) => res.status(400).send({ error: err.message }));
  });


module.exports = router;