//web server code lives here

//for commonjs
//const express = require('express');
//const fs = require('fs');

//for es6
import express from "express"; // external module that will allow us to build a web server
import fs from "fs"; // file system module that will allow us to read and write files

const app = express(); // create an instance of the express module so that we can use all the  methods/functions and properties of express in our web server

const port = 3000; // port number that the web server will listen to

app.use(express.json()); // This sererr will be receiving and responding in JSON--(middleware that allows us to parse JSON data from the request body)

// Create the function that will turn on the server and listen for  requests on this port
app.listen(port, () => {
  console.log(`My server is listening on port: ${port}`);
});

// Create a rouute that takes in an endpoint and a callback function with two parameters: request and response

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//sending data as JSON
// app.get("/", (req, res) => {
//   const myData = {
//     id: 47,
//     email: 'test@test.com'
//   }
//   const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

//Specify a route
// app.get("/user", (req, res) => {
//     const myData = {
//       id: 47,
//       email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//       res.send(myJSONData);
//   });

//Specify a route that will take in a parameter and return a response based on that parameter
// app.get("/user/:user", (req, res) => {
//     const myData = {
//       id: req.params.user,
//       email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//       res.send(myJSONData);
//   });
// _________________________________________________________________--------------------
// boilerplate code will come first----then helper code block---then route or custom code block

//Helper functions
function getAllBooks() {
  //getting all of the book data
  const books = fs.readFile("./data.json", "utf8", (err, data) => {
    return data;
  });
  return books;
}
// 5-web-server/data.json

//API Endpoints

//The client has requested all of the books-- async before (req, res) says waitf for this whole function to finish before sending a response)
app.get("/get-all-books", async (req, res) => {
  const books = getAllBooks();
  res.send(JSON.stringify(books));
});

app.get("/get-one-books/:id", async (req, res) => {
  const book = getOneBook(req.params.id);
  res.send(JSON.stringify(book));
});

// best practices to declare functions that will be used in other functions first...........
