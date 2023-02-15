const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "public/images/" });
const secret = process.env.JWT_SECRET;

const getAllItem = async (req, res) => {
  try {
    const decodedToken = jwt.verify(
      req.headers.authorization.split(" ")[1],
      secret
    );
    const userId = decodedToken.id;

    const rows = await knex
      .select("items.*", "images.image_url as image")
      .from("items")
      .leftJoin("item_images as images", "items.item_id", "images.item_id")
      .where("items.user_id", "!=", userId);

    const itemsMap = new Map();
    for (const row of rows) {
      if (!itemsMap.has(row.item_id)) {
        itemsMap.set(row.item_id, { ...row, images: [row.image] });
      } else {
        itemsMap.get(row.item_id).images.push(row.image);
      }
    }

    const items = Array.from(itemsMap.values());

    res.json(items);
  } catch (err) {
    res
      .status(400)
      .send({ message: "An error occurred while fetching items." });
  }
};

const getMyItems = async (req, res) => {
  try {
    const decodedToken = jwt.verify(
      req.headers.authorization.split(" ")[1],
      secret
    );
    const userId = decodedToken.id;

    const rows = await knex
      .select("items.*", "images.image_url as image")
      .from("items")
      .leftJoin("item_images as images", "items.item_id", "images.item_id")
      .where("items.user_id", "=", userId);

    const itemsMap = new Map();
    for (const row of rows) {
      if (!itemsMap.has(row.item_id)) {
        itemsMap.set(row.item_id, { ...row, images: [row.image] });
      } else {
        itemsMap.get(row.item_id).images.push(row.image);
      }
    }

    const items = Array.from(itemsMap.values());

    res.json(items);
  } catch (err) {
    res
      .status(400)
      .send({ message: "An error occurred while fetching items." });
  }
};

const postItem = [
  upload.array("photos"),
  (req, res) => {
    try {
      const decodedToken = jwt.verify(
        req.headers.authorization.split(" ")[1],
        secret
      );
      const userId = decodedToken.id;
      const title = req.body.title;
      const description = req.body.description;

      const filePaths = req.files.map((file) => {
        const newFileName = `${file.filename}.jpg`;
        const newFilePath = path.join(file.destination, newFileName);
        fs.renameSync(file.path, newFilePath);
        return newFilePath;
      });

      knex("items")
        .insert({
          title,
          description,
          user_id: userId,
          images_url: JSON.stringify(filePaths),
        })
        .then(() => {
          res.status(201).send();
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .send({ message: "An error occurred while creating item." });
        });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .send({ message: "An error occurred while creating item." });
    }
  },
];

const deleteItem = (req, res) => {
  knex("items")
    .where({ item_id: req.params.id })
    .del()
    .then((rowsDeleted) => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

module.exports = {
  deleteItem,
  postItem,
  getAllItem,
  getMyItems,
};
