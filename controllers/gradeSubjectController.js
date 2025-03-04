const express = require('express');
const { GradeSubject, Counter } = require('../models/gradeSubject');

// Create a new subject
exports.createSubject = async (req, res) => {
  try {
    const { tenantName, Grade,tenantEmail, Subject, course_credit, quiz_credit, updated_by } = req.body;

 

    // Get the next counter value
    const counter = await Counter.findOneAndUpdate(
      { name: 'subject_id' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Generate subject_id
    const paddedSeq = String(counter.seq).padStart(3, '0'); // Format: 001, 002, etc.
    const subject_id = Subject.toLowerCase().replace(/\s+/g, '-') + '-' + paddedSeq;

    // Create new subject
    const newSubject = new GradeSubject({
      subject_id,
      tenantName,
      Grade,
      Subject,
      course_credit,
      quiz_credit,
      updated_by
    });

    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
    try {
      const subjects = await GradeSubject.find().sort({ created_at: -1 }); // LIFO ordering
      res.status(200).json(subjects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Get a single subject by subject_id
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await GradeSubject.findOne({ subject_id: req.params.id });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found!" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subject
exports.updateSubject = async (req, res) => {
  try {
    const subject = await GradeSubject.findOneAndUpdate(
      { subject_id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found!" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deactivate a subject (Soft Delete)
exports.activateSubject = async (req, res) => {
    try {
      const subject = await GradeSubject.findOneAndUpdate(
        { subject_id: req.params.id },
        { status: "Active" },
        { new: true }
      );
  
      if (!subject) {
        return res.status(404).json({ message: "Subject not found!" });
      }
      res.status(200).json({ message: "Subject deactivated successfully!", subject });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Deactivate a subject (Soft Delete)
exports.deactivateSubject = async (req, res) => {
  try {
    const subject = await GradeSubject.findOneAndUpdate(
      { subject_id: req.params.id },
      { status: "Inactive" },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found!" });
    }
    res.status(200).json({ message: "Subject deactivated successfully!", subject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a subject (Permanent Delete)
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await GradeSubject.findOneAndDelete({ subject_id: req.params.id });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found!" });
    }
    res.status(200).json({ message: "Subject deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
