const mongoose = require('mongoose');
const AdminUser = require("../models/adminUser");

// @desc Add a new Admin User
// @route POST /api/admin_users
// @access Public (should be restricted later)
const addAdminUser = async (req, res) => {
  try {
    const {
      email,
      avatar,
      contact,
      creditSystem,
      description,
      f_name,
      l_name,
      password, // Stored as plain text (not recommended)
      role,
      tenantEmail,
      tenantName,
      timeout,
    } = req.body;

    // Check if the user already exists
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new admin user
    const newUser = new AdminUser({
      email,
      avatar,
      contact,
      creditSystem,
      description,
      f_name,
      l_name,
      name: `${f_name} ${l_name}`,
      password,
      role,
      tenantEmail,
      tenantName,
      timeout,
      timeout_id: new mongoose.Types.ObjectId(), // Generate unique ID
    });

    // Save to database
    await newUser.save();

    res.status(201).json({ message: "Admin User Created Successfully", user: newUser });
  } catch (error) {
    console.error("Error adding admin user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Get all Admin Users
// @route GET /api/admin_users
// @access Public (should be restricted later)
const getAllAdminUsers = async (req, res) => {
    try {

      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 20; // Default to 10 users per page
      const skip = (page - 1) * limit;
      
  
      const user = await AdminUser.find().skip(skip).limit(limit).sort({ created_at: -1 });
      const totalUsers = await AdminUser.countDocuments();
  
      res.status(200).json({
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        user,
      });
    } catch (error) {
      console.error("Error fetching admin users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// @desc Delete an Admin User
// @route DELETE /api/admin_users/:id
// @access Public (should be restricted later)
const deleteAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await AdminUser.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addAdminUser,
  getAllAdminUsers,
  deleteAdminUser,
};
