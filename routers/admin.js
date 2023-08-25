const express = require("express");
const adminControllers = require("../controllers/adminControllers");
const router = express.Router();

router.get("/login-admin", adminControllers.loginAdmin);

router.get("/get-transaction/:typePage", adminControllers.getTransaction);

router.get("/get-hotel", adminControllers.getHotel);

router.get("/get-room", adminControllers.getRoom);

router.post("/delete-room", adminControllers.deleteRoom);

router.post("/delete-hotel", adminControllers.deleteHotel);

router.post("/add-hotel", adminControllers.addHotel);

router.post("/add-room", adminControllers.addRoom);

module.exports = router;
