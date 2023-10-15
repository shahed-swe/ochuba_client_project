const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://shahed:srsas1234DFIN@cluster0.vnbi6.mongodb.net/ochuba?retryWrites=true&w=majority';

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
