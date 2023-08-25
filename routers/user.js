const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/userControllers");

router.get("/get-user/:userName", userControllers.getUsers);

router.post("/create-user", userControllers.createUser);

router.post("/save-transaction", userControllers.saveTransaction);
module.exports = router;
