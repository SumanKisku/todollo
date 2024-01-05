const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Card Schema
const cardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createdBy: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: false,
    },
    labels: {
        type: [String],
        required: false,

    }
}, {
    timestamps: true,
});

const Card = model("Card", cardSchema);

module.exports = { cardSchema }
module.exports = Card