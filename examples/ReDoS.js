// ReDoS code from https://blog.liftsecurity.io/2014/11/03/regular-expression-dos-and-node.js
require('../hangman')(5000);

console.log('Hangman initiated with a 5s timeout');
console.log('Blocking event loop with ReDoS...');
var i = 0;
setInterval(function(){process.stdout.write(++i + '\r');}, 100);
var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// comment out the following line (or shorten the string), and the process stays alive
emailRegex.test("jjjjjjjjjjjjjjjjjjjjjjjjjjjj@ccccccccccccccccccccccccccccc.555555555555555555555555555555555555555555555555555555555555555555{");

console.log('Regex done');
