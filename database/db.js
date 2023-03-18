// creating database 

// importing mongoose 
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected Succesfully");
    } catch (error) {
        console.log("Error connecting to database");
    }
}


module.exports = connDb;
