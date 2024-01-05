const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { handleCreateCard, handleReadAllCards, handleUpdateCard, handleDeleteCard } = require("../controllers/Card");

const router = express.Router();

router.post("/", isAuthenticated, handleCreateCard);
router.get("/", isAuthenticated, handleReadAllCards);
router.put("/", isAuthenticated, handleUpdateCard);
router.delete("/", isAuthenticated, handleDeleteCard);

module.exports = router
