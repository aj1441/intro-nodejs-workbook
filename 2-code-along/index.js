// Here is where you will write your bill splitter code

//REQUEST: Received the request from the fronend to creat our bill and calculate the amount that needs to be paid per quest
// this is hardcoded
// let bill = 100;
// let tipPercentage = 0.2;
// let numGuests = 4;

// this is dynamic or user generated
let bill = Number(process.argv[2]);
let tipPercentage = Number(process.argv[3]) / 100;
let numGuests = Number(process.argv[4]);


//Business Logic
let tipAmount = bill * tipPercentage;
let total = bill + tipAmount;
let amountOwedPerGuest = total / numGuests;

console.log(`Each guest owes $${amountOwedPerGuest}`);
// console.log(process.argv);


//STORE: Send the amountPeGuest, bill, tip , numOfGuests to the database.
// Run a query to INSERT the data into the data table.

// //RESPONSE: Send the response back to the frontend so that it can be displayed to the user