const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { boardSchema } = require("./Board")

// User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    boards: {
        type: [boardSchema],
    }
    ,
    avatar: {
        type: String,
    }
}, {
    timestamps: true,
});

const User = model("User", userSchema);

module.exports = User;