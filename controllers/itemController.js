const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");

const getItem = (req, res) => {
  knex
    .select("*")
    .from("items")
    .where({ id: req.params.id })
    .then((items) => {
      res.json(items[0]);
    })
    .catch((error) =>
      res.status(400).send(`Error finding item ${error}`)
    );
};

const getAllItem = (_req, res) => {
  knex
    .select("*")
    .from("items")
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const postItem = (req, res) => {
  const newIT = {
    ...req.body,
    id: uuid(),
  };
  
  knex("items")
    .insert(newIT)
    .then((data) => {
      console.log(data);
      const newItemURL = `/items/${newIT.id}`;
      res.status(201).location(newItemURL).send(newItemURL);
    })
    .catch((err) => {
      res.status(400).send(`Error creating item ${err}`);
    });
};

const deleteItem = (req,res) => {

  knex("items")
 .where({id: req.params.id})
 .del()
 .then((rowsDeleted) => {
    res.status(204).send();
 })
 .catch((err) => {
   res.status(404).send(err);
 });
};

module.exports = {
  getItem,
  postItem,
  getAllItem,
  deleteItem,
};