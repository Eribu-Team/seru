const faker = require("faker");

exports.seed = (manager) => manager("products__product")
  .del()
  .then(() => manager("products__product").insert(
    Array.from({ length: 10 }, () => {
      const productName = faker.commerce.productName();
      return {
        name: productName,
        slug: faker.helpers.slugify(productName),
        description: faker.lorem.sentence(),
        thumb: faker.image.imageUrl(),
      };
    }),
  ));
