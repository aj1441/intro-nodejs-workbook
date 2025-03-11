let date = new Date();
let fullString = date.toDateString();
let day = fullString.slice(0,3);
console.log(day);

if (day === "Mon"){
    // Query the database for Monday message
    //Send response to the FE
    console.log(`Date: ${day}, I hope you have a good start to the week.`)
} else if (day === 'Tue') {
    console.log(`Date: ${day}, I hope today is better than Monday.`)
}