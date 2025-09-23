const asyncHandler = require("express-async-handler"); 
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register new user
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password is : ", hashedPassword);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.status(200).json({ message: "User registered successfully" });
});

//@desc login user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){        
        const accessToken = jwt.sign(
            {
                user: { 
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        );
        res.status(200).json({ accessToken });
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

//@desc About current user
//@route POST /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };

