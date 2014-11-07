require('../hangman')(3000);

console.log('Hangman initiated with a 3s timeout');
console.log('Writing to stdout resets hangman\'s timer');
setTimeout(function() {
	console.log('Initiating unlimited silent work, will be killed in 3s...');
	var i = 0;
	setInterval(function(){i++;}, 100);
}, 1000);
