const Card = require("../models/Card");
const cli = require("cli-color");

async function handleCreateCard(req, res) {
  const { title, cover } = req.body;

  if (!title) {
    return res.status(402).json({
      "message": "Please enter a valid title. Title can't be empty.",
    })
  }

  try {
    const createdCard = await Card.create({
      title: title,
      cover: cover ? cover : "default",
      createdBy: req.session.user.email,
    })

    return res.status(200).json({
      "message": "Board created successfully",
      "data": createdCard,
    })
  } catch (err) {
    console.error(cli.red.bold("Error in creating a card.", err));
    return res.status(500).json({
      "message": "Something error occured in the server",
      "data": err,
    })
  }
}

async function handleReadAllCards(req, res) {
  try {
    const cards = await Card.find({ createdBy: req.session.user.email });

    return res.status(200).json({
      "message": "Cards fetched successfully",
      "data": cards,
    })
  } catch (err) {
    console.error(cli.red.bold("Error in reading all cards.", err));
    return res.status(500).json({
      "message": "Something error occured in the server",
      "data": err,
    })
  }
}

async function handleUpdateCard(req, res) {
  const { cardId, newTitle, newDescription, newCover, newLabels, } = req.body;

  if (!cardId) {
    return res.status(400).json({
      "message": "Please enter a cardId.",
    })
  }
  try {
    const { title, description, cover, labels } = await Card.findOne({ _id: cardId })
    const updatedCard = await Board.findByIdAndUpdate(

      { _id: cardId },
      {
        title: newTitle ? newTitle : title,
        description: newDescription ? newDescription : description,
        cover: newCover ? newCover : cover,
        labels: newLabels ? newLabels : labels,
      },
      { new: true }
    );

    return res.status(200).json({
      "message": "Card updated successfully",
      "data": updatedCard,
    })
  } catch (err) {
    console.error(cli.red.bold("Error in updating a card", err));
    return res.status(500).json({
      "message": "Something error occured in the server",
      "data": err,
    })
  }
}

async function handleDeleteCard(req, res) {
  const { cardId } = req.body;

  if (!cardId) {
    return res.status(400).json({
      "message": "Please enter a cardId.",
    })
  }

  try {

    const deletedCard = await Card.findByIdAndDelete(
      { _id: cardId }
    );

    return res.status(200).json({
      "message": "Card deleted successfully",
      "data": deletedCard,
    })
  } catch (err) {
    console.error(cli.red.bold("Error in deleting a card.", err));
    return res.status(500).json({
      "message": "Something error occured in the server",
      "data": err,
    })
  }
}


module.exports = { handleCreateCard, handleReadAllCards, handleUpdateCard, handleDeleteCard }

// TODO:
// [x] Create - Card
// [x] Read - Card
// [x] Update - Card
// [x] Delete - Card
//
