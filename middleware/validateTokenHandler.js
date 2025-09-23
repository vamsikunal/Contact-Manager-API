const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;   
    if(authHeader && authHeader.startsWith("Bearer")){
        try{
            token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log("Decoded : ", decoded);
            req.user = decoded.user;
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error("Not authorized");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = validateTokenHandler;