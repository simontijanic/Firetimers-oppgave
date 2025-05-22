const mongoose = require('mongoose');

exports.connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1); 
    }
}