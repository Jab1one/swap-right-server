exports.seed = async function (knex) {
  await knex("items").del();
  await knex("item_images").del();

  await knex("items").insert([
    {
      item_id: 1,
      user_id: 1,
      title: "Book",
      description: "A good book to read",
    },
    {
      item_id: 2,
      user_id: 2,
      title: "Shoes",
      description: "Comfortable shoes for everyday use",
    },
  ]);

  await knex("item_images").insert([
    {
      image_id: 1,
      item_id: 1,
      image_url: "https://example.com/book_1.jpg",
    },
    {
      image_id: 2,
      item_id: 1,
      image_url: "https://example.com/book_2.jpg",
    },
    {
      image_id: 3,
      item_id: 2,
      image_url: "https://example.com/shoes_1.jpg",
    },
    {
      image_id: 4,
      item_id: 2,
      image_url: "https://example.com/shoes_2.jpg",
    },
  ]);
};