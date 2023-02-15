const knex = require("knex")(require("../knexfile"));
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const getMyMatches = async (req, res) => {
  try {
    const decodedToken = jwt.verify(
      req.headers.authorization.split(" ")[1],
      secret
    );
    const userId = decodedToken.id;

    const rows = await knex("matches")
      .select("*")
      .where("user1_id", "=", userId)
      .orWhere("user2_id", "=", userId);

    const otherUserIds = rows.map((row) =>
      row.user1_id !== userId ? row.user1_id : row.user2_id
    );
    const otherUsernames = await knex("users")
      .select("user_name", "email")
      .whereIn("user_id", otherUserIds);

    const matches = rows.map((row, i) => ({
      ...row,
      other_user_name: otherUsernames[i].user_name,
      other_user_email: otherUsernames[i].email,
    }));

    res.json(matches);
  } catch (err) {
    res
      .status(400)
      .send({ message: "An error occurred while fetching matches." });
  }
};

const deletematch = (req, res) => {
  knex("matches")
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
  deletematch,
  getMyMatches,
};
