const asyncHandler = require("express-async-handler"); //USED TO CAPTURE ERROR USING TRY CATCH INTERNALLY
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Get all contacts" });
});

//@desc create new contacts
//@route POST /api/contacts
//@access public
const createContacts = asyncHandler(async (req, res) =>{
    console.log("The request body is : ", req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    };
    res.status(201).json({ message: "Create Contacts" });
});

//@desc get contact by id
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: `Get Contact for ${req.params.id}` });
});

//@desc update contact by id
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: `Update Contact for ${req.params.id}` });
});

//@desc Delete contact by id
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: `Delete Contact for ${req.params.id}` });
});

module.exports = { 
    getContacts, 
    createContacts, 
    getContact, 
    updateContact, 
    deleteContact,
};