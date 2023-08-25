const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    photos: {
        type: Array,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        required: true,
    },
    rooms: {
        type: Array,
        required: true,
    },
});

hotelSchema.methods.addRoomToHotel = function (roomId) {
    const updatedRooms = [...this.rooms];
    updatedRooms.push(roomId);
    this.rooms = updatedRooms;
    return this.save();
};
module.exports = mongoose.model("Hotel", hotelSchema);
