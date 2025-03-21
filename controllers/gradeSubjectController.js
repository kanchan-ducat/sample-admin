const express = require('express');
const { GradeSubject, Counter } = require('../models/gradeSubject');
const Tenant = require('../models/tenants');

// Create a new subject
exports.createSubject = async (req, res) => {
  
  try {
    const {  Grade,institute_list,gradeSubjectUi, Subject, course_credit, quiz_credit, updated_by } = req.body;

    const tenantIds = institute_list.map(ind => ind._id); // Extract all tenant IDs
    const tenantNames = institute_list.map(ind => ind.name);

    // // Get the next counter value
    // const counter = await Counter.findOneAndUpdate(
    //   { name: 'subject_id' },
    //   { $inc: { seq: 1 } },
    //   { new: true, upsert: true }
    // );

    // // Generate subject_id
    // const paddedSeq = String(counter.seq).padStart(3, '0'); // Format: 001, 002, etc.
    // const subject_id = Subject.toLowerCase().replace(/\s+/g, '-') + '-' + paddedSeq;

    // Create new subject
    const newSubject = new GradeSubject({
      
      tenantIds,
      tenantNames,
      Grade,
      Subject,
      course_credit,
    
      gradeSubjectUi,
      quiz_credit,
      updated_by,
      institute_list

    });

    await newSubject.save();
    res.status(200).json({statusCode:200,body:newSubject});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subjects
exports.getAllSubjects = async (req, res) => {
    try {
      const subjects = await GradeSubject.find().sort({ created_at: -1 }); // LIFO ordering
      res.status(200).json({statusCode:200,body:subjects});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Get a single subject by subject_id
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await GradeSubject.findOne({ _id: req.params.id });
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
      { _id: req.params.id },
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
        { _id: req.params.id },
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
      { _id: req.params.id },
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
    const subject = await GradeSubject.findOneAndDelete({ _id: req.params.id });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found!" });
    }
    res.status(200).json({ message: "Subject deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get subjects based on tenantId

exports.getSubjectsByTenant = async (req, res) => {
  try {
      // const { tenantId } = req.params;
      const { id: tenantId } = req.params; 
      // console.log("Subjects found:", tenantId);
      // Fetch subjects from MongoDB based on tenantId
      const filteredSubjects = await GradeSubject.find({ tenantIds: tenantId })
          .select('_id Subject'); // Selecting only `_id` and `Subject` fields

      // Formatting response with subject names and IDs
      const formattedSubjects = filteredSubjects.map(subject => ({
          _id: subject._id,
          subjectName: subject.Subject
      }));

      res.json({ body: filteredSubjects });

  } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};