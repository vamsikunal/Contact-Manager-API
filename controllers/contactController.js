const asyncHandler = require("express-async-handler"); //USED TO CAPTURE ERROR USING TRY CATCH INTERNALLY
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) =>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json({ contacts });
});

//@desc create new contacts
//@route POST /api/contacts
//@access private
const createContacts = asyncHandler(async (req, res) =>{
    console.log("The request body is : ", req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    };
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});

//@desc get contact by id
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc update contact by id
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user's contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

//@desc Delete contact by id
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user's contact");
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = { 
    getContacts, 
    createContacts, 
    getContact, 
    updateContact, 
    deleteContact,
};