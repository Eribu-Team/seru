"use strict";

exports.up = function (knex) {
  return knex.schema.createTable("framework_category", function (table) {
    table.increments("id");
    table.integer('framework_id').references('framework.id');
    table.integer('category_id').references('category.id');
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("framework_category");
};