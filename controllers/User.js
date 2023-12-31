const cli = require("cli-color");
const validator = require('validator');
const User = require("../models/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function handleCreateUser(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (validator.isEmpty(name)) {
        return res.status(403).json({
            "message": "Name can't be an empty string",
        })
    }
    if (!validator.isEmail(email)) {
        return res.status(403).json({
            "message": "Send an valid email please",
        })
    }
    if (password !== confirmPassword) {
        return res.status(403).json({
            "message": "Password doesn't match",
        })
    }

    try {
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            name: name,
            email: email,
            password: hashPassword,
        })

        return res.status(200).json({
            "message": "User created successfully.",
            "data": {
                "_id": user._id,
                "name": user.name,
                "email": user.email,
            },
        })
    } catch (err) {
        console.log(cli.red.bold(`Error in creating a user`, err))
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

async function handleReadUser(req, res) {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        return res.status(200).json({
            "message": "User fetched successfully.",
            "data": {
                "_id": user._id,
                "name": user.name,
                "email": user.email,
            },
        })
    } catch (err) {
        console.log(cli.red.bold(`Error is reading a user:`, err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

async function handleUpdateUser(req, res) {
    const id = req.params.id;
    const { name, email } = req.body;

    try {
        const user = await User.findById(id);

        // Update user properties
        user.name = name || user.name;
        user.email = email || user.email;

        // Save the updated user
        const updatedUser = await user.save();

        return res.status(200).json({
            "message": "User updated successfully.",
            "data": {
                "_id": updatedUser._id,
                "name": updatedUser.name,
                "email": updatedUser.email,
            },
        });
    } catch (err) {
        console.error(cli.red.bold("Error in updating user:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }

}

async function handleDeleteUser(req, res) {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        return res.status(200).json({
            "message": "User deleted successfully.",
            "data": {
                "_id": deletedUser._id,
                "name": deletedUser.name,
                "email": deletedUser.email,
            },
        });
    } catch (err) {
        console.error(cli.red.bold("Error in deleting user:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

// Login logic
async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    // find user with email id - done
    // then check if password matches - done
    // if password matches then generate a session id
    // store the session id in the database
    // and send the session id to ther user in cookies
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                "message": "Please enter a valid email or sign up.",
            })
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(403).json({
                "message": "Password doesn't match",
            })
        }

        req.session.user = {
            "name": user.name,
            "email": user.email,
        }

        return res.status(200).json({
            "message": "Logged in successful",
            "data": {
                "name": user.name,
                "email": user.email
            }
        })
    } catch (err) {
        console.error(cli.red.bold("Error in login:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }

}

// Logout - logic
async function handleLogoutUser(req, res) {
    try {
        req.session.destroy();
        return res.status(200).json({
            "message": "User logged out successfully"
        })
    } catch (err) {
        console.error(cli.red.bold("Error in logout:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

module.exports = { handleCreateUser, handleReadUser, handleUpdateUser, handleDeleteUser, handleLoginUser, handleLogoutUser };

// TODO:
// [x] Create - User
// [x] Update - User
// [x] Read - User
// [x] Delete - User
