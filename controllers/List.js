const Board = require("../models/Board");
const List = require("../models/List");
const cli = require("cli-color");


async function handleCreateList(req, res) {
    const { title, boardId } = req.body;
    try {

        // Create a List
        const list = await List.create({
            title: title,
            createdBy: req.session.user.email,
        })

        // Find the board where you want to add your new list, and push the new list to the board
        await Board.findOneAndUpdate(
            { _id: boardId },
            {$push: {lists: list._id}},
            { new: true });

        return res.status(200).json({
            "message": "List created successfully",
            "data": list,
        })
    } catch (err) {
        console.error(cli.red.bold("Error in creating a list:", err));
        return res.status(500).json({
            "message": "Something error occured in the server",
            "data": err,
        })

    }
}

module.exports = { handleCreateList }

// TODO:
// [x] - Create - List
// [] - Read - List
// [] - Update - List
// [] - Delete - List
