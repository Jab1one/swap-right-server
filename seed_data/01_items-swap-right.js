exports.seed = async function (knex) {
  await knex("items").del();

  await knex("items").insert([
    {
      item_id: 1,
      user_id: 1,
      title: "Book",
      description: "A good book to read",
      images_url: "not workingUrl,url2"
    },
    {
      item_id: 2,
      user_id: 2,
      title: "Shoes",
      description: "Comfortable shoes for everyday use",
      images_url: "not workingUrl,url2"
    },
  ]);

};