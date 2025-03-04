const Industry = require("../models/industries");
const { v4: uuidv4 } = require("uuid");

// Create an Industry
exports.createIndustry = async (req, res) => {
    try {
      console.log("Received request body:", req.body); // Debugging step
  
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ errorMessage: "Request body is empty!" });
      }
  
      const { email, ...eventData } = req.body; // Extract user_id and remaining data
  
      if (!email) {
        return res.status(400).json({ errorMessage: "user_id is required!" });
      }
  
      eventData.email = email;
      eventData.created_at = new Date().toISOString();
  
      const newIndustry = new Industry(eventData);
      await newIndustry.save();
  
      res.status(200).json({ message: "Industry added successfully", data: newIndustry });
    } catch (error) {
      console.error("Error in createIndustry:", error);
      res.status(400).json({ errorMessage: error.message });
    }
  }
  

// Get all Industries
exports.getAllIndustries = async (req, res) => {
    try {
      const industries = await Industry.find();
      res.status(200).json({
        statusCode: 200,
        body: industries, // Wrap industries inside "body"
        message: "Industries fetched successfully"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        statusCode: 500,
        errorMessage: error.message,
        message: "Failed to fetch industries"
      });
    }
  };
  

// Get Industry by ID
exports.getIndustryById = async (req, res) => {
  try {
    const industry = await Industry.findOne({ _id: req.params.id });
    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }
    res.status(200).json({body:industry});
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Industry by ID
exports.updateIndustry = async (req, res) => {
  try {
    const updatedIndustry = await Industry.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedIndustry) {
      return res.status(404).json({ statusCode: 404, message: "Industry not found" });
    }

    res.status(200).json({  statusCode: 200, message: "Industry updated successfully", body: updatedIndustry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500,errorMessage: error.message });
  }
};

// Delete Industry by ID
exports.deleteIndustry = async (req, res) => {
    try {
      const industry = await Industry.findOneAndDelete({ _id: req.params.id });
      
      if (!industry) {
        return res.status(404).json({ statusCode: 404, message: "Industry not found" });
      }
  
      res.status(200).json({ statusCode: 200, message: "Industry deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ statusCode: 500, errorMessage: error.message });
    }
  };
  
