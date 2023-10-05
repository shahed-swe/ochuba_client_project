const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/ochuba';

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log(`Connected to MongoDB at ${mongoURI}`);
        })
        .catch((error) => {
            console.error(`Error connecting to MongoDB at ${mongoURI}:`, error);
        });
};

module.exports = connectToMongo;
