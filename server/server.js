const express = require("express");
const app = express();
// const PORT = 8080;
const fs = require("fs");
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");
const knex = require('knex')(require('./knexfile').development); // import knex with db config

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
// Routes
// const videosJS = require("./routes/videos.js");
// const commentsJS = require("./routes/comments.js");
const itineraryRouter = require("./routes/itinerary");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");

// Configuration
require('dotenv').config();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));



// Routes
app.use("/itinerary", itineraryRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);

app.listen(port, () => {
    console.log(`Express server is up and running on Port ${port}!`);
  });