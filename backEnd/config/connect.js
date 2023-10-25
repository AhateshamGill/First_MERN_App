const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`DataBase Hosted on:${mongoose.connection.host.yellow}`)
}






module.exports = connectDB;