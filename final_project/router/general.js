const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop

// This is Task 1 *****

public_users.get('/', function (req, res) {
  let getBookList = new Promise((resolve, reject) => {
    if (books) {
      resolve()
    } else {
      reject("There are no books in the list!")
    }
  })

  getBookList.then(

    () => {
      return res.json(books);
    }
  )

});

// Get book details based on ISBN

// This is Task 2 *****
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn_number = req.params.isbn;
  
  let getBookDetails = new Promise((resolve, reject) => {
    if (books[isbn_number]) {
      resolve(books[isbn_number])
    } else {
      reject(`Book with ISBN ${isbn_number} not found!`)
    }
  })

  getBookDetails.then(
    (details) => {
      return res.json(details)
    },
    (msg) => {
      res.status(404).json({message: msg})
    }
  )
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
