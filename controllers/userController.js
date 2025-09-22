const asyncHandler = require("express-async-handler"); 
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
    res.status(200).json({ message: "User logged in successfully" });
});

//@desc About current user
//@route POST /api/user/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Current User Information" });
});

module.exports = { registerUser, loginUser, currentUser };

