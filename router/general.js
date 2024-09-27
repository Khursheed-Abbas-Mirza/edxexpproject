const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.use(express.json())
public_users.post("/register", (req,res) => {
  //Write your code here
  const {username,password}=req.body
  if(!isValid(username)){
    return res.status(300).json({message: "username  already exists"});
  }
  users.push({"username":username,"password":password})
  console.log(users)
  return res.status(300).json({message: "Registered Successfully"});
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
  
//   return res.status(300).json({books});
// });
//async call back
public_users.get('/',async(req, res) =>{
  //Write your code here
  
  return res.status(300).json({books,"methood":"get using async callback"});
});

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   const isbn=req.params.isbn;
//   if(isbn in books){
//     return res.status(200).json({book:books[isbn]});
//   }
//   else{
//     return res.status(404).json({message: "Book not found"});
//   }
// });
public_users.get('/isbn/:isbn',async(req, res) =>{
  //Write your code here
  const isbn=req.params.isbn;
  if(isbn in books){
    return res.status(200).json({book:books[isbn],"methood":"get by isbn using async callback"});
  }
  else{
    return res.status(404).json({message: "Book not found"});
  }
});
 
  
// Get book details based on author
//using async call back
public_users.get('/author/:author',async(req, res)=> {
  //Write your code here
  const author=req.params.author;
  let count=0;
  let awbooks=[];
  for(let i in books){
    if(books[i].author===author){
      count++;
      awbooks.push(books[i]);
    }
  }
  if(count>0){
    return res.status(200).json({books:awbooks,"methood":"get by author using async callback"});
  }
  else{
    return res.status(404).json({message: "Book not found"});
  }

});
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   const author=req.params.author;
//   let count=0;
//   let awbooks=[];
//   for(let i in books){
//     if(books[i].author===author){
//       count++;
//       awbooks.push(books[i]);
//     }
//   }
//   if(count>0){
//     return res.status(200).json({books:awbooks});
//   }
//   else{
//     return res.status(404).json({message: "Book not found"});
//   }

// });

// Get all books based on title by async call back
public_users.get('/title/:title',async(req, res) =>{
  //Write your code here
  const title=req.params.title;
  let count=0;
  let awbooks=[];
  for(let i in books){
    if(books[i].title===title){
      count++;
      awbooks.push(books[i]);
    }
  }
  if(count>0){
    return res.status(200).json({books:awbooks,"methood":"get using async callback"});
  }
  else{
    return res.status(404).json({message: "Book not found"});
  }
});
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const title=req.params.title;
//   let count=0;
//   let awbooks=[];
//   for(let i in books){
//     if(books[i].title===title){
//       count++;
//       awbooks.push(books[i]);
//     }
//   }
//   if(count>0){
//     return res.status(200).json({books:awbooks});
//   }
//   else{
//     return res.status(404).json({message: "Book not found"});
//   }
// });


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
