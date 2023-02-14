const express = require("express");
const router = require("express").Router();
const itemController = require("../controllers/itemController");



router.get("/", itemController.getAllItem);

router.get("/my-items", itemController.getMyItems);

router.post("/", ...itemController.postItem);

router.delete("/:id", itemController.deleteItem);

module.exports = router;

