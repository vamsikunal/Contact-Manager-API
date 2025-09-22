# Contact Manager Backend (Node.js & Express)

This is a backend project for a Contact Manager application built using Node.js and Express. The project demonstrates practical implementation of RESTful APIs with user authentication and database integration.

---

## About the Project

The Contact Manager backend provides:

- RESTful API design using Express
- CRUD operations for managing contacts (Create, Read, Update, Delete)
- User registration and authentication using JWT (JSON Web Tokens)
- MongoDB database integration with Mongoose schemas
- Middleware for error handling, authentication verification, and async operations

This project serves as a solid foundation for building scalable and secure backend services using Node.js.

---

## Features

- Create, read, update, and delete contacts associated with authenticated users
- Secure user registration with password hashing
- User login with JWT-based authentication
- Middleware to protect routes and verify tokens
- Relational handling between users and contacts through Mongoose schemas

---

## Installation & Usage

1. Clone the repository:  
   `git clone https://github.com/shreedhar19oct/Contact-Manager-NodeJS.git`

2. Navigate to the project directory:  
   `cd Contact-Manager-NodeJS`

3. Install dependencies:  
   `npm install`

4. Create a `.env` file with the following environment variables:  
   - `MONGO_URI` (Your MongoDB connection string)  
   - `JWT_SECRET` (A secret key for JWT signing)

5. Start the development server:  
   `npm run dev` or `node server.js`

6. Use a REST client like Postman or Thunder Client to test API endpoints.

---

## Steps to connect to MONGODB

-  Go to Mongo-db -> overview -> connect -> compass -> copy the url
-  for example- mongodb+srv://admin:<db_password>@shreecluster.or53xpc.mongodb.net/ -> replace password with admin and then 
   add your database to connect to like myContact-Backend

## API Endpoints Overview

- `/api/contacts` - Manage contacts (GET, POST, PUT, DELETE)
- `/api/users` - User registration, login, and profile retrieval

---

## License

This project is open source and available for modification and use.

---

## Acknowledgements

This project was built to enhance practical knowledge of Node.js, Express, MongoDB, and JSON Web Token authentication.
