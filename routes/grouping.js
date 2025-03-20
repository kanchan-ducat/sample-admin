const express = require("express");
const router = express.Router();
const groupingController = require("../controllers/groupingController");

router.post("/create", groupingController.createGrouping);
router.get("/tenant/:tenantId", groupingController.getGroupingsByTenant);
router.post("/assign-subject", groupingController.assignSubjectToGrouping);
router.delete("/:groupingId", groupingController.deleteGrouping);

module.exports = router;
