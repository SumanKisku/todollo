const Board = require("../models/Board");
const cli = require("cli-color");

// CRUD Operations for Boards
async function handleCreateBoard(req, res) {
    const { title, background } = req.body;

    if (!title) {
        return res.status(422).json({
            "message": "Please enter a valid title. Title can't be empty.",
        })
    }

    try {
        const createdBoard = await Board.create({
            title: title,
            background: background ? background : "default",
            createdBy: req.session.user.email,
        })

        return res.status(200).json({
            "message": "Board created successfully",
            "data": createdBoard,
        })
    } catch (err) {
        console.error(cli.red.bold("Error in creating a board:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

async function handleReadBoard(req, res) {
    const boardId = req.params.id;

    try {
        const board = await Board.findOne({ _id: boardId });

        if (board.createdBy == req.session.user.email) {
            return res.status(200).json({
                "message": "Board fetched successfully",
                "data": board,
            })
        } else {
            return res.status(401).json({
                "message": "You are not authorized to access this board",
            })
        }

    } catch (err) {
        console.error(cli.red.bold("Error in reading a board:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

async function handleReadAllBoards(req, res) {

    try {
        const boards = await Board.find({ createdBy: req.session.user.email });

        return res.status(200).json({
            "message": "Boards fetched successfully",
            "data": boards,
        })
    } catch (err) {
        console.error(cli.red.bold("Error in reading all boards:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

async function handleUpdateBoard(req, res) {
    const { boardId, newTitle, newBackground } = req.body;

    if (!boardId) {
        return res.status(400).json({
            "message": "Please enter a boardId.",
        })
    }

    try {
        const { title, background } = await Board.findOne({ _id: boardId })

        const updatedBoard = await Board.findByIdAndUpdate(
            { _id: boardId },
            {
                title: newTitle ? newTitle : title,
                background: newBackground ? newBackground : background,
            },
            { new: true }
        );

        return res.status(200).json({
            "message": "Board updated successfully",
            "data": updatedBoard,
        })
    } catch (err) {
        console.error(cli.red.bold("Error in updating a board:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

async function handleDeleteBoard(req, res) {
    const { boardId } = req.body;

    if (!boardId) {
        return res.status(400).json({
            "message": "Please enter a boardId.",
        })
    }

    try {

        const deletedBoard = await Board.findByIdAndDelete(
            { _id: boardId }
        );

        return res.status(200).json({
            "message": "Board deleted successfully",
            "data": deletedBoard,
        })
    } catch (err) {
        console.error(cli.red.bold("Error in deleting a board:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

// Add and remove star for Boards
async function handleAddStarBoard(req, res) {
    const { boardId } = req.body;

    if (!boardId) {
        return res.status(400).json({
            "message": "Please enter a boardId.",
        })
    }

    try {
        const updatedBoard = await Board.findByIdAndUpdate(
            { _id: boardId },
            {
                stared: true
            },
            { new: true }
        );

        return res.status(200).json({
            "message": "Added star to board successfully",
            "data": updatedBoard,
        })
    } catch (err) {
        console.error(cli.red.bold("Error in adding star in a board:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

async function handleRemoveStarBoard(req, res) {
    const { boardId } = req.body;

    if (!boardId) {
        return res.status(400).json({
            "message": "Please enter a boardId.",
        })
    }

    try {
        const updatedBoard = await Board.findByIdAndUpdate(
            { _id: boardId },
            {
                stared: false
            },
            { new: true }
        );

        return res.status(200).json({
            "message": "Removed star from board successfully",
            "data": updatedBoard,
        })
    } catch (err) {
        console.error(cli.red.bold("Error in removing a start from a board", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })
    }
}

module.exports = { handleCreateBoard, handleReadBoard, handleReadAllBoards, handleUpdateBoard, handleDeleteBoard, handleAddStartBoard, handleRemoveStartBoard }

// TODO:
// [x] Create borad
// [x] Read - Board
// [x] Update - Board
// [x] Delete - Board
//
