const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

const postLike = (req, res) => {
  const newLK = {
    ...req.body,
    id: uuid(),
  };
  
  knex("likes")
    .insert(newLK)
    .then((data) => {
      console.log(data);
      const newUserURL = `/users/${newLK.id}`;
      res.status(201).location(newUserURL).send(newUserURL);
    })
    .catch((err) => {
      res.status(400).send(`Error creating user: ${err}`);
    });
};

module.exports = {
  postLike
};