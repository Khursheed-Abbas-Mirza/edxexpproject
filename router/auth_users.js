const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
regd_users.use(express.json())
let users = [{username:"admin",password:"admin123"},{username:"user",password:"user123"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
console.log(username)
const finduser=users.find(user=>user.username===username)
if(finduser){
  return false
}
else{
  return true
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const finduser=users.find(user=>user.username===username && user.password===password)
if(finduser){
  
  return true
}
else{
  return false
}
}

//only registered users can login
regd_users.post("/login", async(req,res) => {
  //Write your code here
  const {username,password}=req.body
  if(authenticatedUser(username,password)){
    req.session.token=await jwt.sign({username}, "secretkey")
    return res.status(200).json({message: "login successful"});
  }
  else{
    return res.status(300).json({message: "Invalid credentials"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn=req.params.isbn
  console.log(isbn)
  if(isbn<1 || isbn>10){
    return res.status(404).send("No Such book Found on this isbn")
  }
  const body=req.body
  console.log(body)
  books[isbn].review=body
  return res.status(200).json({msg:"your review is posted to books",review:books[isbn].review});
});
regd_users.delete("/auth/delete/:isbn", (req, res) => {
  
  const isbn=req.params.isbn
  console.log(isbn)
  if(isbn<1 || isbn>10){
    return res.status(404).send("No Such book Found on this isbn")
  }
  books[isbn].review={}
  return res.status(200).json({msg:"your review is deleted from books",books:books[isbn]});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
