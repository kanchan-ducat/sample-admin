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
    tenantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true }],
  
    gradeSubjectUi:{type: String, required: true},
    grade: { type: String },
    Subject: { type: String, required: true }, // Ensures uniqueness
    course_credit: { type: Number, default: 0 },
    quiz_credit: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    updated_by: { type: String },
    tenantNames:[{ type: String,}],
    tenantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }] ,// Supports multiple tenants,
    // industry: { type: mongoose.Schema.Types.ObjectId, ref: "Industry", required: true }, // Industry Reference
    institute_list: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true }, // Institute/Tenant ID
        name: { type: String, required: true } // Institute Name
      }
    ],
    institur_list:[{}],
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // Subjects linked to this grouping
    has_grouping: { type: Boolean, default: false },
  },

  { timestamps: true }
);




const GradeSubject = mongoose.model('GradeSubject', gradeSubjectSchema,'grade_subjects');
module.exports = { GradeSubject, Counter };
