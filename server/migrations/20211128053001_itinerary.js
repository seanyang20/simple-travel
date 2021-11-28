exports.up = function (knex) {
    return knex.schema.createTable("itineraries", function (table) {
      table.increments("id");
      table.string("itinerary").notNullable();
      table.string("description").notNullable();
      table
        .integer("user_id").unsigned().notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("itineraries");
  };
  