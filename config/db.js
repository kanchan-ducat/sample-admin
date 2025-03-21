require('dotenv').config({ path: `env/${process.env.NODE_ENV}.env` });
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;



if (!mongoURI) {
    console.error(" Check  environment file.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(" Connected Successfully");
    } catch (error) {
        console.error("Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
