const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

const getUser = (req, res) => {
  knex
    .select("*")
    .from("users")
    .where({ id: req.params.id })
    .then((users) => {
      res.json(users[0]);
    })
    .catch((error) =>
      res.status(400).send(`Error finding users ${error}`)
    );
};

const getAllUser = (_req, res) => {
  knex
    .select("*")
    .from("users")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const postUser = (req, res) => {
  const newU = {
    ...req.body,
    id: uuid(),
  };
  
  knex("users")
    .insert(newU)
    .then((data) => {
      console.log(data);
      const newUserURL = `/users/${newU.id}`;
      res.status(201).location(newUserURL).send(newUserURL);
    })
    .catch((err) => {
      res.status(400).send(`Error creating user: ${err}`);
    });
};


module.exports = {
  getUser,
  postUser,
  getAllUser,
};