const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const AsyncHandler = require("express-async-handler");

const AuthMiddleware = AsyncHandler(async (req, res, next) => {
    let token;
    // check id the authorization exists or not
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try { // get the token from the bearer
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decode.id);
            next();
        } catch (error) {res.status(401); throw new Error('User Does not Authorized for this?'); }
    } else {throw new Error("The UserToken Has Not Found?");}
});



module.exports = AuthMiddleware;