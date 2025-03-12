// Create a module that accesses the file system and uses Common JS modules

// Allowing my file to access the file system Node module (this is built into Node)
const fs = require("fs");

// We want the user to be able to pass a value into the file when we run the file with Node. This takes the third item in the array (the first two are built into the array by default)
const action = process.argv[2];

module.exports = function printBooks (books) {
    for (let i = 0; i < books.length; i++) {
        console.log(books[i].title + "\n");
        console.log(books[i].text + "\n");
      }
}

// We want Node to read the data.json file, and get all of the books listed
function printAllBooks() {
    // The readFile method is part of the fs object. It takes in three parameters: The file we want to read, the way the file is encoded, and the function we want to run once we have read the file.
    fs.readFile("./data.json", "utf8", (err, data) => {
        // Turning a JSON object into JavaScript
        const books = JSON.parse(data);
        // A loop that prints to the console the individual text and summary of each of the books.
        for (let i = 0; i < books.length; i++) {
            console.log(books[i].title + "\n");
            console.log(books[i].text + "\n");
          }
    })
}

function printOneBook (num) {
    fs.readFile("./data.json", "utf8", (err, data) => {
        // Turning a JSON object into JavaScript
        const books = JSON.parse(data);
        // A loop that prints to the console the individual text and summary of each of the books.
        for (let i = 0; i < books.length; i++) {
            if (i == Number(num)) {
                console.log(books[i].title + "\n");
                console.log(books[i].text + "\n");
            }
          }
    })
}

if (action === 'getAll') {
    printAllBooks()
} else if (action === 'getOne') {
    printOneBook(process.argv[3])
} else {
    console.log("There was an error!")
}