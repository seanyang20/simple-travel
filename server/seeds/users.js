const userData = [
  {
    id: 1,
    user_name: "Sean",
    password: "capstone",
  },
  {
    id: 2,
    user_name: "Richard",
    password: "capstone",
  },
  {
    id: 3,
    user_name: "Edward",
    password: "capstone",
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