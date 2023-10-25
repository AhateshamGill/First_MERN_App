const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please Enter the UserName"],
        // unique: true,
    },
    email: {
        type: String,
        require: [true, "Please Enter the UserEmail"],
    },
    password: {
        type: String,
        require: [true, "Please Enter the UserPassword"],
    },
});

module.exports = mongoose.model("User", userSchema);