const express = require("express");

const router = express.Router();

const webControllers = require("../controllers/webControllers");
// APIS:
router.get("/home-page", webControllers.getDataForHomePage);

router.get("/search-hotel", webControllers.getSearchHotel);

router.get("/get-rooms", webControllers.getRooms);

router.get("/get-transaction", webControllers.getTransaction);

module.exports = router;
