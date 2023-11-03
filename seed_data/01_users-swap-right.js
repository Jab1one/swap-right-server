exports.seed = async function (knex) {
  
  await knex("users").del();
  await knex("users").insert([
    {
      
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@example.com",
      user_name: "johndoe",
      password: "1234",
      postal_code: "90210",
    },
    {
      
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@example.com",
      user_name: "janedoe",
      password: "1234",
      postal_code: "12345",
    },
  ]);
};