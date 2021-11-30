require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const bcrypt = require("bcryptjs");



router.post("/", async (req, res) => {
    console.log("Inside backend post for login");
  let username = req.body.user_name;
  let password = await req.body.password;

//   if (User.password === password) {
//       let token = jwt.sign({username: username}, process.env.JWT_SECRET, {expiresIn: "24h"})
//       res.status(200).json({ token:token})
//   } else {
//       res.status(403).send({token:null})
//   }

// User.where({ user_name: username })
// .fetch()
// .then((user) => {
//   const isMatch = bcrypt.compareSync(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ error: "Invalid credentials" });
//   }
//   const token = jwt.sign(
//     { username: user.user_name },
//     process.env.JWT_SECRET
//   );
//   res.status(200).json({token: token });
// })
// .catch((err) => res.status(400).json({ message: err.message }));
console.log(username, password);

User.where({ user_name: username })
.fetch()
.then((user) => {
  // console.log(user);
  const isMatch = bcrypt.compareSync(password, user.attributes.password);
  if (!isMatch) {
    // console.log(password, user.attributes.password);
    res.status(400).json({ error: "Invalid credentials" });
  }
  // console.log(user);
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign(
    { username: user.attributes.user_name },
    process.env.JWT_SECRET,
    { expiresIn: "48h" }
  );
  res.status(200).json({ user, token });
})
.catch((err) => {
// console.log(err)
// console.log(password, err)
res.status(400).json({ message: err.message })

});



});

module.exports = router;