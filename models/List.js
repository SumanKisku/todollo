const mongoose = require("mongoose");
const { cardSchema } = require("./Card");
const { Schema, model } = mongoose;

// List Schema
const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    cards: {
        type: [cardSchema],
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board",
    },
    createdBy: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const List = model("List", listSchema);

module.exports = { listSchema }
module.exports = List