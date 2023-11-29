const express = require("express");
const router = express.Router();
const { handleCreateUser, handleReadUser, handleUpdateUser, handleDeleteUser, handleLoginUser, handleLogoutUser } = require("../controllers/User");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/", handleCreateUser);
router.get("/:id", isAuthenticated, handleReadUser);
router.put("/:id", isAuthenticated, handleUpdateUser);
router.delete("/:id", isAuthenticated, handleDeleteUser);
router.post("/login", handleLoginUser);
router.post("/logout", isAuthenticated, handleLogoutUser);

module.exports = router