"use strict";

exports.up = function (knex) {
  return knex.schema.createTable("framework", function (table) {
    table.increments("id");
    table.json("category", 255).nullable();
    table.json("lang", 255).nullable();
    table.string("name", 255).notNullable();
    table.string("slug", 255).notNullable();
    table.text("description").nullable();
    table.string("thumb", 255).nullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("framework");
};