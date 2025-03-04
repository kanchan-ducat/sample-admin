const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deactivateUser,
    deleteUser,
    activateUser
  } = require('../controllers/userController');


// Define routes
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.put('/:id/deactivate', deactivateUser); // Deactivate user
router.put('/:id/activate',activateUser); // Deactivate user
router.delete('/:id', deleteUser);

module.exports = router;
