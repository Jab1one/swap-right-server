const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const secret = process.env.JWT_SECRET;

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

const postUser = async (req, res) => {

  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    user_name: req.body.user_name,
    password: req.body.password,
    postal_code: req.body.postal_code,
  };

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    newUser.password = hashedPassword;
  
    const data = await knex("users")
      .insert(newUser);
  
    console.log(data);
    const newUserURL = `/users/${data[0]}`;
    const token = jwt.sign({ id: data[0], first_name: req.body.first_name, last_name: req.body.last_name }, secret);
    res.status(201).location(newUserURL).send({token});
  } catch (err) {
    res.status(400).send(`Error creating user: ${err}`);
  }
};

const authenticateUser = async (req, res, next)=> {
  const {username, password} = req.body;

  const user = await knex("users")
  .select("*")
  .where({user_name: username})
  .first();

  if (!user) {
    return res.status(401).send("Invalid username");
  }
  console.log(user.user_id, user.last_name)
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) {
    return res.status(401).send("Invalid password");
  }

  const token = jwt.sign({id: user.user_id, first_name: user.first_name, last_name: user.last_name}, secret);
  req.userId = user.id;
  console.log(token)

  res.status(200).send({ message: "Login successful", token });

  next();
}




module.exports = {
  getUser,
  postUser,
  getAllUser,
  authenticateUser
};