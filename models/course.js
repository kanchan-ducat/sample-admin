const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  // id: { type: String, required: true, unique: true },
  chapter: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  data: { type: mongoose.Schema.Types.Mixed },
  description: { type: String },
  grade: { type: String },
  // grade_subject: { type: String, required: true },
  loginToken: { type: String },
  
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'GradeSubject', required: true },
  tenantId: { type: String, required: true, ref: 'Tenant' },
  title: { type: String, required: true },
  total_length: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now },
  uploadType: { type: String, enum: ['PDF', 'Multimedia', 'Text_Highlight', 'audio_Text'], required: true }
});

module.exports = mongoose.model('Course', CourseSchema);