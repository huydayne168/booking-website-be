const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouters = require("./routers/user");
const webRouters = require("./routers/web");
const adminRouter = require("./routers/admin");
const cors = require("cors");
const compression = require("compression");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// user router:
app.use(userRouters);
app.use(webRouters);
// admin router:
app.use("/admin", adminRouter);

app.get((res, req, next) => {
    res.status(404).json("Page not found!");
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.2nyu2ly.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
    )
    .then((result) => {
        app.listen(PORT, () => {
            console.log("backend is running in " + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
