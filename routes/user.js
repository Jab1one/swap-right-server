const express = require("express");
const router = require("express").Router();
const userController = require("../controllers/userController");

router.route("/:id").get(userController.getUser);

router.get("/", userController.getAllUser);

router.post("/", userController.postUser);

module.exports = router;