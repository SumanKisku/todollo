const express = require("express");
const router = express.Router();
const { handleCreateUser, handleReadUser, handleUpdateUser, handleDeleteUser } = require("../controllers/User");

router.post("/", handleCreateUser);
router.get("/:id", handleReadUser);
router.put("/:id", handleUpdateUser);
router.delete("/:id", handleDeleteUser);

module.exports = router