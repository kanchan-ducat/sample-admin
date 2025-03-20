const Grouping = require("../models/grouping");
const Tenant = require("../models/Tenant");

// Create Grouping (Auto-assign General Grouping if has_grouping = false)
exports.createGrouping = async (req, res) => {
  try {
    const { tenantId, name } = req.body;

    // Check if Tenant exists
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    let groupingName = name || "General Grouping";

    // Check if General Grouping already exists
    let existingGrouping = await Grouping.findOne({ tenant: tenantId, name: "General Grouping" });

    if (!existingGrouping && tenant.has_grouping === false) {
      // Create General Grouping if it doesn't exist for tenant
      existingGrouping = await Grouping.create({
        name: "General Grouping",
        tenant: tenantId,
        industry: tenant.industry,
      });
    }

    res.status(201).json({ message: "Grouping created", grouping: existingGrouping });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get All Groupings for a Tenant
exports.getGroupingsByTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const groupings = await Grouping.find({ tenant: tenantId }).populate("subjects");
    res.status(200).json(groupings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Assign Subject to a Grouping (Default Grouping if has_grouping = false)
exports.assignSubjectToGrouping = async (req, res) => {
  try {
    const { tenantId, subjectId, groupingId } = req.body;

    // Check if Tenant exists
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    // Find the target grouping
    let grouping;
    if (groupingId) {
      grouping = await Grouping.findById(groupingId);
    } else {
      // Use General Grouping if has_grouping = false
      grouping = await Grouping.findOne({ tenant: tenantId, name: "General Grouping" });
    }

    if (!grouping) return res.status(400).json({ message: "Grouping not found" });

    // Add Subject to Grouping
    if (!grouping.subjects.includes(subjectId)) {
      grouping.subjects.push(subjectId);
      await grouping.save();
    }

    res.status(200).json({ message: "Subject assigned to grouping", grouping });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete Grouping
exports.deleteGrouping = async (req, res) => {
  try {
    const { groupingId } = req.params;

    const grouping = await Grouping.findByIdAndDelete(groupingId);
    if (!grouping) return res.status(404).json({ message: "Grouping not found" });

    res.status(200).json({ message: "Grouping deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
