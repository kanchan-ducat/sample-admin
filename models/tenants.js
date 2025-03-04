const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");
const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tenantName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  f_name: { type: String },
  l_name: { type: String },
  contact: { type: String },
  address: { type: String },
  industry: { type: String },
  industryName: { type: String },
  id: { type: String, default: uuidv4, unique: true },
  role: { type: String, enum: ['CoTenant', 'Tenant', 'Admin'], required: true },
  school: { type: String },
  grade_subject: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  isVerificationRequired: { type: Boolean, default: false },
  forgot_password: { type: Boolean, default: false },
  creditSystem: { type: Number, default: 0 },
  avatar: { type: String },
  logo: { type: String },
  Voice: { type: String },
  Time_zone: { type: String, default: 'UTC' },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date }
});

module.exports = mongoose.model('AdminUser', TenantSchema, 'admin_user');
