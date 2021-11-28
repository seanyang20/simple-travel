
const itineraryData = [
  {
    id: 1,
    itinerary: "Day in Vancouver",
    description: "asdfsadfsdbadfgafgasdgasdf",
    user_id: 2,
  },
  {
    id: 2,
    itinerary: "2 Days in Hong Kong",
    description: "sagasdfgdsafasdfasdfadsf",
    user_id: 3,
  },
  {
    id: 3,
    itinerary: "2 Days in New York",
    description: "asefasfasdfasgasdgsgd",
    user_id: 1,
  },
];


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('itineraries').del()
    .then(function () {
      // Inserts seed entries
      return knex('itineraries').insert(itineraryData);
    });
};
