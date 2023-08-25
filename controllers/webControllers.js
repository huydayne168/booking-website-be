const mongoose = require("mongoose");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

// Get data for Home Page:
exports.getDataForHomePage = (req, res, next) => {
    const area = {};
    const hotelTypes = {};
    // const highRateHotels = [];
    Hotel.find()
        .then((hotels) => {
            hotels.forEach((item) => {
                const areaName = item.city.split(" ").join("").toLowerCase();
                if (!area[areaName]) {
                    area[areaName] = 1;
                } else {
                    area[areaName] += 1;
                }

                if (!hotelTypes[item.type]) {
                    hotelTypes[item.type] = 1;
                } else {
                    hotelTypes[item.type] += 1;
                }
            });
            console.log(area, hotelTypes);

            const sortedByRatingHotels = hotels.sort(
                (a, b) => b.rating - a.rating
            );
            const highRateHotels = sortedByRatingHotels.slice(0, 3);
            res.json({
                area: area,
                hotelTypes: hotelTypes,
                highRateHotels: highRateHotels,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// Find search hotels
exports.getSearchHotel = (req, res, next) => {
    const destination = req.query.destination;
    const options = req.query.options;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    Hotel.find()
        .then((hotels) => {
            const searchedHotels = hotels.filter((hotel) => {
                if (maxPrice > 0) {
                    return (
                        hotel.city === destination &&
                        hotel.rooms.length >= options.room &&
                        Number(hotel.cheapestPrice) >= minPrice &&
                        Number(hotel.cheapestPrice) <= maxPrice
                    );
                } else {
                    return (
                        hotel.city === destination &&
                        hotel.rooms.length >= options.room &&
                        Number(hotel.cheapestPrice) >= minPrice
                    );
                }
            });
            res.json(searchedHotels);
        })
        .catch((err) => {
            console.log(err);
        });
};

// Get Rooms:
exports.getRooms = (req, res, next) => {
    const roomsIdArr = req.query.rooms;
    console.log(roomsIdArr);
    const suitableRooms = [];
    Room.find()
        .then((rooms) => {
            const suitableRooms = rooms.filter((room) => {
                if (
                    roomsIdArr.some((roomId) => roomId === room._id.toString())
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            console.log(suitableRooms);
            res.json(suitableRooms);
        })
        .catch((err) => console.log(err));
};

// Get Transaction:
exports.getTransaction = (req, res, next) => {
    const userId = req.query.userId;
    console.log(userId);
    Transaction.find({ userId: userId })
        .then((transaction) => {
            res.json(transaction);
        })
        .catch((err) => {
            console.log(err);
        });
};
