const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Card Schema
const cardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Card = model("Card", cardSchema);

module.exports = { cardSchema }
module.exports = Card