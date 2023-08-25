const Transaction = require("../models/transaction");
const User = require("../models/user");

// Find user to see if user sign in right:
exports.getUsers = (req, res, next) => {
    const userName = req.params.userName;
    User.findOne({ userName: userName })
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.json({ message: "Can't find user" });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

// Sign up :
exports.createUser = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;

    User.findOne({ userName: userName })
        .then((user) => {
            if (user) {
                res.json({
                    message: "Đã tồn tại tên username này!",
                    status: 401,
                });
            } else {
                const newUser = new User({
                    userName: userName,
                    password: password,
                    fullName: fullName,
                    phoneNumber: phoneNumber,
                    email: email,
                    isAdmin: false,
                });

                newUser
                    .save()
                    .then((result) => {
                        res.status(200).json("Created!");
                    })
                    .catch((err) => {
                        res.json({ message: "Fail!" });
                        console.log("Cant sign up", err);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

// User Save Transaction:
exports.saveTransaction = (req, res, next) => {
    const userName = req.body.userName;
    const userId = req.body.userId;
    const hotel = req.body.hotel;
    const room = req.body.room;
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;
    const price = req.body.price;
    const payment = req.body.payment;
    const status = req.body.status;

    const newTransaction = new Transaction({
        userName: userName,
        userId: userId,
        hotel: hotel,
        room: room,
        dateStart: dateStart,
        dateEnd: dateEnd,
        price: price,
        payment: payment,
        status: status,
    });

    newTransaction
        .save()
        .then((result) => {
            res.json({ message: "thanh cong" });
        })
        .catch((err) => console.log(err));
};
