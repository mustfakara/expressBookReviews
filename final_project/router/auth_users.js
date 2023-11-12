const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {"username": "admin", "password": "admin"},
];


// This function returns true or false in case of registering the user or in login function

// This is on Task 6 and 7 *****

const isValid = (username)=>{ 
  let existedUser = users.filter((user) => {
    return user.username === username;
  });
  return existedUser.length > 0;
}

const authenticatedUser = (username,password)=>{ 
  let validUsers = users.filter((user) => user.username === username && user.password === password);
  return validUsers.length > 0;
}

//Here, the login method checks the authentication of the body requems. If they are valid,
//you are in.

// This is in Task 7 *****
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({message: "Error logging in. Please check username and password!"})
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', {expiresIn: 60 * 60});

    req.session.authorization = { accessToken, username }
    return res.json({message: "User successfully logged in!"})
  }
  return res.status(208).json({message: "Invalid Login. Please check username and password!"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
