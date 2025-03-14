// Create a Node app that determines the birthstone based on a month inputted by the user. Refer to the README instructions.

const fs = require("fs");

let month = process.argv[2];
let foundBirthstone;

function findBirthstone(month) {
  fs.readFile("./data.json", "utf8", (err, data) => {
    //turning a JSON object into JavaScript
    let birthstones = JSON.parse(data);
    console.log(birthstones);

    // Capitalize first letter to match format in JSON
    const formattedMonth =
      month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    // Get birthstone directly from the object
    const stone = birthstones[formattedMonth];

    // Output the result
    console.log(
      `The birthstone for the month of ${formattedMonth} is ${stone}.`
    );
  });
}

// call the function

findBirthstone(month);
