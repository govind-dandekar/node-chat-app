const moment = require('moment');



// new Date().getTime();
//
// var date = new Date();
// var months = ['Jan', 'Feb'];
//
// console.log(date.getMonth());

// var date = moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

//output:
//10:35 am
//Print format like this
//5:03 pm
//have to print hours and minutes; padded or unpadded; use padded for minutes and unpadded for hours
//for hours use 12 hours

//new Date().getTime();

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234
var date = moment(createdAt);
console.log(date.format('h:mm a'));
