const mongoose = require("mongoose");
const { listSchema } = require("./List");
const { Schema, model } = mongoose;

// Board Schema
const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    lists: [{
        type: Schema.Types.ObjectId,
        ref: "List"
    }],
    background: {
        type: String,
        default: "default",
    },
    stared: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Board = model("Board", boardSchema);

module.exports = Board