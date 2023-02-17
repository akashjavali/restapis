const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('connected to DB!');
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;
