exports.up = function (manager) {
  return manager.schema.createTable("products__product", (table) => {
    table.increments("id");
    table.json("category", 255).nullable();
    table.string("name", 255).notNullable();
    table.string("slug", 255).notNullable();
    table.text("description").nullable();
    table.string("thumb", 255).nullable();
    table.timestamps();
  });
};

exports.down = function (manager) {
  return manager.schema.dropTable("products__product");
};
