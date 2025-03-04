const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const AdminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: null },
  contact: { type: String, default: null },
  creditSystem: { type: Boolean, default: false },
  description: { type: String, default: "" },
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  full_name: { 
    type: String,
    default: function () {
      return `${this.f_name} ${this.l_name}`;
    },
  },
  password: { type: String, required: true }, // Should be hashed before saving
  role: { type: String, required: true, enum: ["CoTenant", "Admin", "User"] },
  tenantEmail: { type: String, required: true },
  tenantName: { type: String, required: true },
  timeout: { type: Date },
  created_at: { type: Date, default: Date.now },
  status: { type: String, enum: ["Active", "Inactive"], default: "Inactive" },
  timeout_id: { type: String, default: uuidv4 },
});



const AdminUser = mongoose.model("adminUser",AdminUserSchema,'admin_user');

module.exports = AdminUser;
