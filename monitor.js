#!/usr/bin/env node
'use strict';

var hangman = require('./hangman');
var split = require('split');
var monitor;

process.stdin.pipe(split()).on('data', function(msg){
	if (!monitor) {
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
