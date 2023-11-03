exports.seed = async function (knex) {
  await knex("items").del();

  await knex("items").insert([
    {
      
      user_id: 1,
      title: "Book",
      description: "A good book to read",
      images_url: "https://placehold.co/400"
    },
    {
      
      user_id: 2,
      title: "Shoes",
      description: "Comfortable shoes for everyday use",
      images_url: "https://placehold.co/400"
    },
  ]);

};