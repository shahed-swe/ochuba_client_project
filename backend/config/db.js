const mongoose = require('mongoose');

const connectToMongo = async () => {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ochuba";

    await mongoose.connect(mongoURI)
        .then(() => {
            console.log(`Connected to MongoDB at ${mongoURI}`);
        })
        .catch((error) => {
            console.error(`Error connecting to MongoDB at ${mongoURI}:`, error);
        });
};

module.exports = connectToMongo;
