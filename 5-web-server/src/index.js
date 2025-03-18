//web server code lives here

//for commonjs
//const express = require('express');
//const fs = require('fs').promises;

//for es6--this requires type="module" in package.json
import express from "express"; // external module that will allow us to build a web server
import fsPromises from "fs/promises"; // file system module that will allow us to read and write files

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
async function getAllBooks() {
  //getting all of the book data
  const books = await fsPromises.readFile("../data.json", "utf8");
  let parsedBooks = JSON.parse(books);
  console.log(parsedBooks);
  return parsedBooks;
}

async function getOneBook(id) {
  const books = await fsPromises.readFile("../data.json", "utf8");
  let parsedBook = JSON.parse(books);
  console.log(parsedBook);
  return parsedBook[id];
}

async function deleteBook(id) {
  const books = await fsPromises.readFile("../data.json", "utf8");
  let parsedBooks = JSON.parse(books);
  parsedBooks.splice(id, 1);
  const stringBooks = JSON.stringify(parsedBooks);
  await fsPromises.writeFile("../data.json", stringBooks, "utf8");
}

// 5-web-server/data.json

//API Endpoints

//The client has requested all of the books-- async before (req, res) says waitf for this whole function to finish before sending a response)
app.get("/get-all-books", async (req, res) => {
  const books = await getAllBooks();
  res.send(JSON.stringify(books));
});

app.get("/get-one-book/:id", async (req, res) => {
  const book = await getOneBook(req.params.id);
  res.send(JSON.stringify(book));
});

app.get("/delete-book/:id", async (req, res) => {
  await deleteBook(req.params.id);
  res.send("You deleteed the book!");
});

// best practices to declare functions that will be used in other functions first...........

//if you do the flag --watch (node --watch index.js) it will automatically restart the server when you make changes to the file
//if you do the flag --inspect (node --inspect index.js) it will allow you to use the chrome dev tools to debug your code

//NOTES FOR CREATE AND INITIALIZE AN EXPRES NODE.JST
//1.  Create a new directory for your project
//2.  Navigate to the directory in the terminal
//3.  Run npm init -y to create a package.json file
//4.  Run npm install express to install the express module
// 6. A a .gitignore file and add node_modules to it
//7. Create a new directory called src
//8.  Create a new file called index.js to store all of web server code.
//9. Add all of your import statements (3rd party modules, node modules, your customer modules)
//10. Add all of your boilerplate code (express, port, instance, app.listen)
//11. Add the API endpoints
