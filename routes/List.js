const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const { handleCreateList } = require("../controllers/List");

// CRUD of List
router.post("/", isAuthenticated, handleCreateList);

module.exports = router