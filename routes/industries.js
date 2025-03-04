const express = require("express");
const router = express.Router();
const industryController = require("../controllers/industriesController");

// Create an industry
router.post("/", industryController.createIndustry);

// Get all industries
router.get("/", industryController.getAllIndustries);

// Get industry by ID
router.get("/:id", industryController.getIndustryById);

// Update industry by ID
router.put("/:id", industryController.updateIndustry);

// Delete industry by ID
router.delete("/:id", industryController.deleteIndustry);

module.exports = router;
