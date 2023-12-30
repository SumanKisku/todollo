const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const { handleCreateList, handleReadList, handleReadAllLists, handleUpdateList, handleDeleteList } = require("../controllers/List");

// CRUD of List
router.post("/", isAuthenticated, handleCreateList);
router.get("/:id", isAuthenticated, handleReadList);
router.get("/", isAuthenticated, handleReadAllLists);
router.put("/", isAuthenticated, handleUpdateList);
router.delete("/", isAuthenticated, handleDeleteList);

module.exports = router
