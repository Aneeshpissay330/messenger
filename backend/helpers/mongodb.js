const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const runDB = async () => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    runDB
}