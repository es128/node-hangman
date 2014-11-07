require('../hangman')(3000, function() {
	console.log('Time\'s up! Using process.exit() in callback.');
	process.exit();
});

console.log('Hangman initiated with a 3s timeout and custom callback');
console.log('Writing to stdout resets hangman\'s timer');
setTimeout(function() {
	console.log('Initiating unlimited silent work, will exec callback in 3s...');
	var i = 0;
	setInterval(function(){i++;}, 100);
}, 1000);
