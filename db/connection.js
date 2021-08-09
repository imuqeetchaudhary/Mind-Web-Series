const mongoose = require("mongoose");

const DEV_MONGO_URI = "mongodb://localhost:27017/Mind-Web-Series";
const PROD_MONGO_URI = "mongodb+srv://muqeet_chaudhary:Abdul6890060@cluster0.bqu75.mongodb.net/Mind-Web-Series";

const MONGO_URI =
    process.env.NODE_ENV === "production" ? PROD_MONGO_URI : DEV_MONGO_URI;

module.exports = async function () {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Db is connected successfully ...");
    } catch (_) {
        console.log("Some error while connecting to mongodb ....");
    }
};
