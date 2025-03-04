const express = require("express");
const router = express.Router();
const {
  addAdminUser,
  getAllAdminUsers,
  deleteAdminUser,
} = require("../controllers/adminUserController");

// Define routes using controller functions
router.post("/", addAdminUser); // Add new admin user
router.get("/", getAllAdminUsers); // Get all admin users
router.delete("/:id", deleteAdminUser); // Delete an admin user by ID

module.exports = router;
