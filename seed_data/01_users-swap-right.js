exports.seed = async function (knex) {
  
  await knex("users").del();
  await knex("users").insert([
    {
      user_id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      user_name: "johndoe",
      password: "$2a$10$LxBAkKjNzEgMvhNUyzjKU.e6U4F6bvDR6yjxkA0jmSbCi1gKfkmLK",
      postal_code: "90210",
    },
    {
      user_id: 2,
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@example.com",
      user_name: "janedoe",
      password: "$2a$10$LxBAkKjNzEgMvhNUyzjKU.e6U4F6bvDR6yjxkA0jmSbCi1gKfkmLK",
      postal_code: "12345",
    },
  ]);
};