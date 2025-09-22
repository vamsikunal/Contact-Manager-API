// console.log("Server is running...");
const express = require('express');
const { connect } = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnection');

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(require("./middleware/errorHandler").errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});