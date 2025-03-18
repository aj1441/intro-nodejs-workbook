// Create Node.js app that determines the astrological and zodiac signs for the user based on their birthday. Refer to the README instructions.

// import { getSign, getZodiac } from 'horoscope';

var getSign = require("horoscope").getSign;
var getZodiac = require("horoscope").getZodiac;

console.log(getSign({ month: 7, day: 25 }));
// 'Leo'

console.log(getSign({ month: 12, day: 21 }));
// 'Sagittarius'

let month = parseInt(process.argv[2]);
let day = parseInt(process.argv[3]);
let year = parseInt(process.argv[4]);

let sign = getSign({ month, day });
let zodiac = getZodiac(year);

console.log(
  `Your astrological sign is ${sign} and your zodiac sign is ${zodiac}.`
);
