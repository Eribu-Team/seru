"use strict";

exports.up = function (knex) {
  return knex.schema.createTable("framework", function (table) {
    table.increments("id");
    table.boolean("active").defaultTo(false);
    table.string("name", 255).notNullable();
    table.string("slug", 255).notNullable();
    table.text("description").nullable();
    table.string("thumb", 255).nullable();
    table.timestamps();
  }).createTable("category", function (table) {
    table.increments("id");
    table.boolean("active").defaultTo(false);
    table.string("name", 255).notNullable();
    table.string("slug", 255).notNullable();
    table.text("description").nullable();
    table.string("thumb", 255).nullable();
    table.timestamps();
  }).createTable("framework_category", function (table) {
    table.increments("id");
    table.integer("framework_id").references("framework.id");
    table.integer("category_id").references("category.id");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("framework");
};