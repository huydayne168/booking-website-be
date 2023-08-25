const User = require("../models/user");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

// Route to get admin account:
exports.loginAdmin = (req, res, next) => {
    const userName = req.query.userName;
    const password = req.query.password;

    User.findOne({ userName: userName })
        .then((user) => {
            if (user.password !== password) {
                res.json({ message: "Password is wrong", status: 401 });
            } else if (!user.isAdmin) {
                res.json({ message: "You are not an Admin", status: 401 });
            } else {
                res.json({ message: "Hi Admin!", status: 200 });
            }
        })
        .catch((err) => {
            res.json({ message: "Wrong username!", status: 401 });
        });
};

// Route to get transaction :
exports.getTransaction = (req, res) => {
    const typePage = req.params.typePage;
    Transaction.find()
        .then((transactions) => {
            if (typePage === "dashboard") {
                res.json(transactions.splice(0, 8));
            } else if (typePage === "transactionsPage") {
                res.json(transactions);
            }
        })
        .catch((err) => {
            res.json({ message: "No transaction" });
            console.log(err);
        });
};

exports.getHotel = (req, res) => {
    Hotel.find()
        .then((hotels) => {
            res.json(hotels);
        })
        .catch((err) => {
            res.json({ message: "Fail to get hotels", status: 400 });
            console.log(err);
        });
};

exports.getRoom = (req, res) => {
    Room.find()
        .then((rooms) => {
            res.json(rooms);
        })
        .catch((err) => {
            res.json({ message: "Fail to get rooms", status: 400 });
            console.log(err);
        });
};

exports.deleteRoom = (req, res) => {
    const roomId = req.body._id;
    Transaction.find()
        .then((trans) => {
            if (trans.some((tran) => tran.room.roomId.indexOf(roomId) >= 0)) {
                res.json({
                    message:
                        "This room is in an Transaction so you can not delete it",
                    status: 405,
                });
            } else {
                Room.findOneAndDelete({ _id: roomId })
                    .then((result) => {
                        res.json({ message: "Deleted!", status: 405 });
                    })
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));
};

exports.deleteHotel = (req, res) => {
    const hotelId = req.body._id;
    Transaction.find()
        .then((trans) => {
            if (
                trans.some((tran) => tran.hotel.hotelId.toString() === hotelId)
            ) {
                res.json({
                    message:
                        "This hotel is in an Transaction so you can not delete it",
                    status: 405,
                });
            } else {
                Hotel.findOneAndDelete({ _id: hotelId })
                    .then((result) => {
                        res.json({ message: "Deleted!", status: 405 });
                    })
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));
};

exports.addHotel = (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const cheapestPrice = req.body.cheapestPrice;
    const city = req.body.city;
    const address = req.body.address;
    const distance = req.body.distance;
    const photos = req.body.photos;
    const rating = req.body.rating;
    const featured = req.body.featured;
    const rooms = req.body.rooms;

    const newHotel = new Hotel({
        name: name,
        type: type,
        cheapestPrice: cheapestPrice,
        city: city,
        address: address,
        distance: distance,
        photos: photos,
        rating: rating,
        featured: featured,
        rooms: rooms,
    });

    newHotel
        .save()
        .then((result) => res.json({ message: "Created", status: 200 }))
        .catch((err) => console.log(err));
};

exports.addRoom = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const maxPeople = req.body.maxPeople;
    const desc = req.body.desc;
    const roomNumbers = req.body.roomNumbers;
    const hotel = req.body.hotel;

    const newRoom = new Room({
        title: title,
        price: price,
        maxPeople: maxPeople,
        desc: desc,
        roomNumbers: roomNumbers,
    });

    newRoom
        .save()
        .then((result) => {
            console.log(hotel._id);
            Hotel.findById(hotel._id)
                .then((thisHotel) => {
                    console.log(thisHotel);
                    return thisHotel.addRoomToHotel(newRoom._id);
                })
                .then((result) => {
                    console.log(result);
                    res.json({ message: "Created!", status: 200 });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};
