const faker = require("faker");

exports.seed = (manager) => manager("framework")
  .del()
  .then(() => {
    const productName = faker.commerce.productName();
    return manager("framework").insert([
      {
        category: "[\"1\", \"2\"]",
        name: productName,
        slug: faker.helpers.slugify(productName),
        description: faker.lorem.sentence(),
        thumb: faker.image.imageUrl(),
      },
    ]);
  });
