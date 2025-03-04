const mongoose = require('mongoose');

// Counter Schema to track unique numbering for subjects
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 1 } // Starts from 1
});

// Counter model
const Counter = mongoose.model('Counter', counterSchema);

// GradeSubject Schema
const gradeSubjectSchema = new mongoose.Schema(
  {
    subject_id: { type: String, unique: true }, // Unique ID for each subject
    tenantName: { type: String, required: true },
    Grade: { type: String, required: true },
    Subject: { type: String, required: true }, // Ensures uniqueness
    course_credit: { type: Number, default: 0 },
    quiz_credit: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    updated_by: { type: String }
  },
  { timestamps: true }
);

// Virtual field for name-grade-subject
gradeSubjectSchema.virtual('name_grade_subject').get(function () {
  return `${this.tenantName} - ${this.Grade} - ${this.Subject}`;
});

// Ensure virtuals are included in JSON & Object outputs
gradeSubjectSchema.set('toJSON', { virtuals: true });
gradeSubjectSchema.set('toObject', { virtuals: true });

// Pre-save hook to generate subject_id with counter
gradeSubjectSchema.pre('save', async function (next) {
  if (!this.subject_id) {
    try {
      // Find and increment the counter
      const counter = await Counter.findOneAndUpdate(
        { name: 'subject_id' }, // Counter name
        { $inc: { seq: 1 } }, // Increment sequence
        { new: true, upsert: true } // Create if not exists
      );

      // Generate subject_id using counter
      const paddedSeq = String(counter.seq).padStart(3, '0'); // Convert to 3-digit format
      this.subject_id = this.Subject.toLowerCase().replace(/\s+/g, '-') + '-' + paddedSeq;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const GradeSubject = mongoose.model('GradeSubject', gradeSubjectSchema,'grade_subjects');
module.exports = { GradeSubject, Counter };
