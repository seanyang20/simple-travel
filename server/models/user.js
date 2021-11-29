const bookshelf = require("../bookshelf");

const User = bookshelf.model("User", {
  tableName: "users",
  itinerary: function () {
    return this.hasMany("Itinerary");
  },
});

module.exports = User;
