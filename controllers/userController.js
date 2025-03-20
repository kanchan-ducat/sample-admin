// Import the User model
const User = require("../models/user"); 
const Tenant = require('../models/tenants');
// Create a new user
exports.createUser = async (req, res) => {
  try {
    // Destructure required fields from request body
    const { f_name, l_name, email, password, phone, status, expire_time, emailbyUser, timeZone, tenantId,lastlogin } = req.body;

    // Validation to check required fields
    if (!f_name || !email ) {
      return res.status(400).json({ success: false, message: "First name, last name, email, and password are required." });
    }
 // Find industry by tenantEmail instead of industry ID
if (tenantId) {
  
  const tenantRecord = await Tenant.findOne({ _id: tenantId });
  if (tenantRecord) {
    
    tenantName = tenantRecord.name; // Assign from industry name
    avatarName = tenantRecord.avatar;
    tenantEmail = tenantRecord.email
  } else {
    return res.status(404).json({ message: "Industry not found for the given tenantEmail" });
  }
}
// Assign `link` based on `avatar` or `tenantEmail`
let link = null;
if (avatarName) {
  if (avatarName === "Nova") {
    link = `https://nova-app.edyou.com/?q=...&email=${email}&password=${password}&rq=...___Hellothere`;
  } else if (avatarName === "Eddie") {
    link = `https://eddie-app.edyou.com/?q=...&email=${email}&password=${password}&rq=...___Hellothere`;
  }
} else if (tenantEmail === "ascp@demo.com") {
  link = `https://ascp-app.edyou.com/?q=...&email=${email}&password=${password}&rq=...___Hellothere`;
}else{

}


    // Construct user data object
    const userData = {
      f_name,
      l_name,
      name: `${f_name} ${l_name}`,
      email,
      password,
      phone,
      status,
      expire_time,
      emailbyUser,
      timeZone,
      tenantEmail,
      link,
      tenantName,
      lastlogin,
    };

    // Create and save user in the database
    const user = new User(userData);
    await user.save();

    res.status(201).json({
      statusCode: 200,
      success: true,
      message: 'User created successfully',
      body: user
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Get (newest first) and pagination
exports.getAllUsers = async (req, res) => {
    try {
      let { page = 1, limit = 10 } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
  
      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;
  
      const totalUsers = await User.countDocuments();
      const totalPages = Math.ceil(totalUsers / limit);
      const users = await User.find()
        .sort({ created_at: -1 }) // LIFO ordering (newest users first)
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.status(200).json({
        success: true,
        statusCode:200,
        currentPage: page,
        totalPages,
        
        totalUsers,
        pageSize: limit,
        body: users,
      });
    } catch (error) {
      res.status(500).json({statusCode:200, success: false, message: error.message });
    }
  };
  

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ statusCode:200,success: true, body: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true,statusCode:200, message: 'User updated successfully', body: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// activate user by ID (Set status to 'Active')
exports.activateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { status: 'Active' }, { new: true });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      res.status(200).json({statusCode:200, success: true, message: 'User activated successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
// Deactivate user by ID (Set status to 'Inactive')
exports.deactivateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { status: 'Inactive' }, { new: true });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      res.status(200).json({statusCode:200, success: true, message: 'User deactivated successfully', data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
