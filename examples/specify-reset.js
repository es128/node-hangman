var hangmanReset = require('../hangman')(3000);

console.log('Hangman initiated with a 3s timeout');
console.log('Using app-specific timer reset which cancels stdout monitoring');
hangmanReset();
var i = 0;
setInterval(function(){
	if (i === 10) {
		console.log('Resetting one last time, will be killed in 3s');
		hangmanReset();
	}
	process.stdout.write(++i + '\r');
}, 100);
