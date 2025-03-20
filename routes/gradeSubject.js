const express = require('express');
const router = express.Router();
const gradeSubjectController = require('../controllers/gradeSubjectController');

// Routes
router.post('/', gradeSubjectController.createSubject);
router.get('/', gradeSubjectController.getAllSubjects);
router.get('/subject/:id', gradeSubjectController.getSubjectsByTenant);
router.get('/:id', gradeSubjectController.getSubjectById);
router.put('/:id', gradeSubjectController.updateSubject);
router.put('/:id/deactivate', gradeSubjectController.deactivateSubject);
router.put('/:id/activate', gradeSubjectController.activateSubject);
router.delete('/:id', gradeSubjectController.deleteSubject);

module.exports = router;
