const express = require("express"); //external module that will allow us to build a web server
const fs = require("fs");

const app = express(); // Creating an instance of the express module so that we can use all the methods/functions and properties of express in our web server
const port = 3000; // Telling express which port to listen to to receive requests

app.use(express.json()); // This server will be receiving and responding in JSON

// Create the function that will turn on the server and listen for requests on this port
app.listen(port, () => {
    console.log(`My server is listening on port:${port}`);
});

//Sending a string
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

//Sending data
// app.get("/", (req, res) => {
//     const myData = {
//         id : 47,
//         email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

//Specify a route
// app.get("/user", (req, res) => {
//     const myData = {
//         id : 47,
//         email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });

// Specify a route with a parameter
// app.get("/users/:user", (req, res) => {
//     const myData = {
//         id : req.params.user,
//         email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myJSONData);
// });


// Helper Functions
async function getAllBooks () {
    //Getting all of the book data
    const books = await fs.readFile("../data.json", "utf8", (err, data) => {
        return JSON.parse(data);
    });
    console.log(books);
}


// API Endpoints

//The client has requested all of the books 
app.get("/get-all-books", async (req, res) => {
    const books = await getAllBooks();
    res.send(JSON.stringify(books));
});

app.get("/get-one-book/:id", async (req, res) => {
    const book = await getOneBook(req.params.id);
    res.send(JSON.stringify(book));
});