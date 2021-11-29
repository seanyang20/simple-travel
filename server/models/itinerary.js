const bookshelf = require("../bookshelf");

const Itinerary = bookshelf.model("Itinerary", {
  tableName: "itineraries",
  user: function () {
    return this.belongsTo("User");
  },
});

module.exports = Itinerary;
