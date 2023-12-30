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
      { $push: { lists: list._id } },
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

async function handleReadList(req, res) {
  const listId = req.params.id;
  try {
    const list = await List.findOne({ _id: listId });

    // checks if list is being tried to fetched by the original user
    if (list.createdBy == req.session.user.email) {
      return res.status(200).json({
        "message": "List fetched successfully",
        "data": list,
      })
    } else {
      return res.status(401).json({
        "message": "You are not authorized to access this board",
      })
    }
  } catch (err) {
    console.error(cli.red.bold("Error in reading a list:", err));
    return res.status(500).json({
      "message": "Something error occured in the server",
      "data": err,
    })
  }
}

async function handleReadAllLists(req, res) {

  try {
    const lists = await List.find({ createdBy: req.session.user.email });

    return res.status(200).json({
      "message": "All Lists fetched successfully",
      "data": lists,
    })
  } catch (err) {
    console.error(cli.red.bold("Error in reading all lists:", err));
    return res.status(500).json({
      "message": "Something error occured in the server",
      "data": err,
    })
  }
}

async function handleUpdateList(req, res) {
  const { listId, newTitle } = req.body;

  if (!listId) {
    return res.status(400).json({
      "message": "Please enter a listId.",
    })
  }

  try {
    const { title } = await List.findOne({ _id: listId })

    const updatedList = await List.findByIdAndUpdate(
      { _id: listId },
      {
        title: newTitle ? newTitle : title,
      },
      { new: true }
    );

    return res.status(200).json({
      "message": "List updated successfully",
      "data": updatedList,
    })
  } catch (err) {
    console.error(cli.red.bold("Error in updating a list:", err));
    return res.status(500).json({
      "message": "Something error occured in the server",
      "data": err,
    })
  }
}

async function handleDeleteList(req, res) {
  const { listId } = req.body;

  if (!listId) {
    return res.status(400).json({
      "message": "Please enter a listId.",
    })
  }

  try {

    const deletedList = await List.findByIdAndDelete(
      { _id: listId }
    );

    return res.status(200).json({
      "message": "List deleted successfully",
      "data": deletedList,
    })
  } catch (err) {
    console.error(cli.red.bold("Error in deleting a list:", err));
    return res.status(500).json({
      "message": "Something error occured in the server",
      "data": err,
    })
  }
}

module.exports = { handleCreateList, handleReadList, handleReadAllLists, handleUpdateList, handleDeleteList }

// TODO:
// [x] - Create - List
// [x] - Read - List
// [x] - Update - List
// [x] - Delete - List
