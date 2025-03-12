// Create a module that accesses the file system and uses ES modules

import { readFile } from "fs";




function printAllBooks() {
    readFile("./books.json", "utf8", (err, data) => {
        if (err) {
        console.error(err);
        return;
        }
    
        const books = JSON.parse(data);
        books.forEach((book) => {
        console.log(book.title);
        });
    });
}