const express = require('express');

const router = express.Router();

const {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
  deactivateTenant,

} = require('../controllers/tenantController');



router.post('/', createTenant);
router.get('/', getAllTenants);
router.get('/:id', getTenantById);
router.put('/:id', updateTenant);
router.delete('/:id', deleteTenant);
router.put("/deactivate/:id", deactivateTenant);
module.exports = router;
