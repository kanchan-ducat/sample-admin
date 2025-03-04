const Industry = require('../models/industries');
const Tenant = require('../models/tenants');
const { v4: uuidv4 } = require("uuid");

//create 
const createTenant = async (req, res) => {
  try {
    let {
      name,
      email,
      password = "12345",
      f_name,
      l_name,
      contact,
      address,
      industry,
      industryName,
      role,
      school,
      grade_subject,
      status,
      isVerificationRequired,
      forgot_password,
      creditSystem,
      avatar,
      logo,
      Voice,
      Time_zone
    } = req.body;

    

    // Check if email or TenantName already exists
    const existingTenant = await Tenant.findOne({ $or: [{ email }] });
    if (existingTenant) {
      return res.status(400).json({ message: 'Email or Tenant Name already exists' });
    }
    
    // Find industry by ID and get its name
    if (industry) {
      const industryRecord = await Industry.findById(industry);
      if (industryRecord) {
        tenantName = industryRecord.name; // Assign from industry name
        industryName = industryRecord.name;
      } else {
        return res.status(404).json({ message: "Industry not found" });
      }
    }
  
   
    // Create new tenant
    const newTenant = new Tenant({
      name,
      tenantName ,
      email,
       password : '12345', // Ensure password is hashed before saving (use bcrypt) // Ensure password is hashed before saving (use bcrypt)
      f_name,
      l_name,
      contact,
      address,
      industry,
      industryName,
      role,
      school,
      grade_subject,
      status,
      isVerificationRequired,
      forgot_password,
      creditSystem,
      avatar,
      logo,
      Voice,
      Time_zone
    });

    // Save the tenant to the database
    await newTenant.save();
    return res.status(201).json({ statusCode:200, message: 'Tenant created successfully', body: newTenant });

  } catch (error) {
    console.error('Error creating tenant:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all tenants
const getAllTenants = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const tenants = await Tenant.find()
      .sort({ _id: -1 }) // LIFO order
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Tenant.countDocuments();

    res.status(200).json({
      statusCode:200,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      statusCode:200,
      body:tenants,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



// Get a single tenant by ID
const getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ _id: req.params.id });
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json({body:tenant,statusCode :200});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a tenant by ID
const updateTenant = async (req, res) => {
  try {
    const updatedTenant = await Tenant.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json({ statusCode:200, message: 'Tenant updated successfully', body: updatedTenant });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a tenant by ID
const deleteTenant = async (req, res) => {
  try {
    const deletedTenant = await Tenant.findOneAndDelete({ _id: req.params.id });
    if (!deletedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json({ statusCode:200,message: 'Tenant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// Deactivate a tenant by setting status to 'inactive'
const deactivateTenant = async (req, res) => {
  try {
    const tenantId = req.params.id;
    const updatedTenant = await Tenant.findByIdAndUpdate(
      { _id: req.params.id },
      { status: "Inactive" },
      { new: true }
    );

    if (!updatedTenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    res.status(200).json({
      statusCode:200,
      message: "Tenant deactivated successfully",
      tenant: updatedTenant,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deactivating tenant", error });
  }
};

module.exports = {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
  deactivateTenant
};
