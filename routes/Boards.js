const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { handleCreateBoard, handleReadBoard, handleReadAllBoards, handleUpdateBoard, handleDeleteBoard, handleAddStarBoard, handleRemoveStarBoard } = require("../controllers/Board");
const router = express.Router();

router.post("/", isAuthenticated, handleCreateBoard);
router.get("/:id", isAuthenticated, handleReadBoard);
router.get("/", isAuthenticated, handleReadAllBoards);
router.put("/", isAuthenticated, handleUpdateBoard);
router.delete("/", isAuthenticated, handleDeleteBoard);
router.post("/add-star", isAuthenticated, handleAddStarBoard);
router.post("/remove-star", isAuthenticated, handleRemoveStarBoard);

module.exports = router
