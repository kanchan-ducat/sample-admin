const express = require("express");
const router = express.Router();
const Investor = require("../models/investor"); //  Mongoose model for investor_table

/**
 * @route GET /api/investors
 * @desc Get paginated investors
 * @queryParams page (default: 1), limit (default: 10)
 */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const investors = await Investor.find().skip(skip).limit(limit);
    const total = await Investor.countDocuments();

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: investors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
