const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Board Schema
const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    lists: [],
    stared: {
        type: Boolean,
        required: true,
    }
});

const Board = model("Board", boardSchema);

module.exports = { boardSchema }
module.exports = Board