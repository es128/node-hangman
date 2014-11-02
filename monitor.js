#!/usr/bin/env node
'use strict';

var hangman = require('./hangman');
var monitor;

process.stdin.on('data', function(msg){
	if (!hangman) {
		var msgObj;
		try {
			msgObj = JSON.parse(msg);
		} catch (_e) { return; }
		monitor = hangman(
			msgObj.timeLimit,
			process.kill.bind(process, msgObj.pid)
		);
	} else if (msg === 'reset') {
		monitor();
	} else if (msg === 'stop') {
		monitor.cancel();
	}
});
