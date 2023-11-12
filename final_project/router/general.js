const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register the username and the password

// This is Task 6 *****

public_users.post("/register", (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.json({message: `User ${username} has been successfully registered. Now you can log in!`});
    }
    return res.status(400).json({message: `User ${username} already exists!`});
  }
  return res.status(400).json({message: "Unable to register user!"});
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

// This is Task 3 *****

public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let getBookDetailsAuthor = new Promise((resolve, reject) => {
    if (author) {
      resolve(author)
    } else {
      reject(`Error author!`)
    }
  })

  getBookDetailsAuthor.then(
    (author) => {
      let existedBooks = Object.entries(books).filter(([isbn, details]) => details.author === author)
      if (existedBooks.length > 0) {
        existedBooks = Object.fromEntries(existedBooks);
        return res.json(existedBooks);
      }
      return res.status(404).json({message: `Book with author ${author} not found!`});
    },
    (msg) => {
      res.status(404).json({message: msg})
    }
  )
});

// Get all books based on title

// This is Task 4 *****

public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let getBookDetailsTitle = new Promise((resolve, reject) => {
    if (title) {
      resolve(title)
    } else {
      reject(`Error book title!`)
    }
  })

  getBookDetailsTitle.then(
    (title) => {
      let existedBooks = Object.entries(books).filter(([isbn, details]) => details.title === title)
      if (existedBooks.length > 0) {
        existedBooks = Object.fromEntries(existedBooks);
        return res.json(existedBooks);
      }
      return res.status(404).json({message: `Book with title ${title} not found!`});
    },
    (msg) => {
      res.status(404).json({message: msg})
    }
  )
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
