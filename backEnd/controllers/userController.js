const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const AsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const registerUser = AsyncHandler(async (req, res) => {
    // get the user data
    const{name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter the All Required Fields");
    }
    // check if  user already exists
    const checkUser = await User.findOne({email})
    if(checkUser){
        throw new Error("User HAS Already Exists")
    }else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await User.create({ name, email, password:hashedPassword});
        res.send({
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            password:newUser.password,
            token:generateToken(newUser._id),
        });
    }
});

const loginUser = AsyncHandler(async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        throw new Error('Please Input UserEmail & UserPassword');
    }

    const checkUser = await User.findOne({email});
    if(!checkUser){
        throw new Error('User Data Not Found?');
    }
    const compare = await bcrypt.compare(password,checkUser.password);
    if(checkUser && compare){
        res.send({
            id:checkUser._id,
            name:checkUser.name,
            email:checkUser.email,
            password:checkUser.password,
            token:generateToken(checkUser._id)});
    }else{
        res.status(404);
        throw new Error("User Does Not Exists Here?");
    }
});

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h",});
};

module.exports = {
    registerUser,
    loginUser,
};