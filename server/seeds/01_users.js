const bcrypt = require("bcryptjs");

const userData = [
  {
    id: 1,
    user_name: "Sean",
    password:  bcrypt.hashSync("capstone", 8).toString(),
  },
  {
    id: 2,
    user_name: "Richard",
    password: bcrypt.hashSync("capstone", 8).toString(),
  },
  {
    id: 3,
    user_name: "Edward",
    password: bcrypt.hashSync("capstone", 8).toString(),
  },
];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(userData);
    });
};