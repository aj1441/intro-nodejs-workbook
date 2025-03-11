// Your code will go here!

//RREQUEST: Received a request from the from front end to calculate the age of their dog in dog years based on the input of human yeares
let dogName = process.argv[2];
let dogAgeInHumanYears = Number(process.argv[3]);

//Business Logic
let dogFirstYear = 15;
let dogSecondYear = 9;
let dogRemainingYears = 5;
// let totalDogYears = dogFirstYear + dogSecondYear + (dogRemainingYears * (dogAgeInHumanYears - 2));
let dogTotalYears;
if (dogAgeInHumanYears === 1) {
  dogTotalYears = dogFirstYear;
} else if (dogAgeInHumanYears === 2) {
  dogTotalYears = dogFirstYear + dogSecondYear;
} else {
  dogTotalYears =
    dogFirstYear + dogSecondYear + dogRemainingYears * (dogAgeInHumanYears - 2);
}

//RESPONSE: Send the response back to the frontend so that it can be displayed to the user
console.log(`Your dog ${dogName} is ${dogTotalYears} years old in dog years.`);


// trying to add a few changes to this document to see if I can resolve the issue with the git push, as it continues to ask for my git login credentials.  I have tried to update the git credentials in the terminal, but it still does not work.  I will try to add a few changes to this document and see if that helps.  