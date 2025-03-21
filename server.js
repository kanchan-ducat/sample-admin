const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, `env/development.env`) });
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db'); //  connection file
const tenantRoutes = require('./routes/tenants');  //  tenant routes
const investorsRoute = require("./routes/investor"); // investor routes
const adminUserRoutes = require("./routes/adminUser"); // Admin User routes
const industriesRoutes = require("./routes/industries");//Industries
const courseRoutes = require("./routes/course");//course

const userRoutes = require("./routes/user");//admin
const gradeSubjectRoutes = require('./routes/gradeSubject');//grade
const app = express();
app.use(express.json());  // Middleware to parse JSON


app.use(cors({
  origin: ['http://localhost:4200', 'https://custom-edyou.netlify.app'], // Use multiple origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

app.options('*', cors());

//  Connect to MongoDB
connectDB();

//  Use the routes
app.use('/api/tenants', tenantRoutes);
app.use("/api/investors", investorsRoute);
app.use("/api/course",courseRoutes);
app.use("/api/admin_users", adminUserRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/industries", industriesRoutes); 
app.use("/api/grade_subject", gradeSubjectRoutes); 
app.use("/", (req, res) => {
  res.send("Hello, World!");
});
app.use((err, req, res, next) => {
    console.error(" ERROR:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });
 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
