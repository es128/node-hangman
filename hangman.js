'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var Stopwatch = require('timer-stopwatch');
var fixtureStdout = require('fixture-stdout');

var monitor;
function getMonitor(timeLimit) {
	if (monitor) { return monitor; }
	var monitorPath = path.join(__dirname, 'monitor.js');
	monitor = spawn(monitorPath, [], { stdio: ['pipe', 1, 2] });
	monitor.stdin.write(JSON.stringify({
		timeLimit: timeLimit,
		pid: process.pid
	}) + '\n');
	return monitor;
}

function Hangman(timeLimit, callback) {
	if (typeof timeLimit === 'function') {
		callback = timeLimit;
		timeLimit = void 0;
	}
	if (!timeLimit) { timeLimit = 60000; }
	var stdout = new fixtureStdout();
	var timer;
	if (callback) {
		timer = new Stopwatch(timeLimit, {
			refreshRate: Math.floor(timeLimit / 10) || 10
		}).on('done', stdout.release).on('done', callback);
		timer.start();
	} else {
		getMonitor(timeLimit);
		var stdin = monitor.stdin;
		timer = {
			start: Function.prototype,
			stop: stdin.write.bind(stdin, 'stop\n'),
			reset: stdin.write.bind(stdin, 'reset\n')
		};
	}
	function heartbeat() {
		timer.reset();
		timer.start();
	}
	stdout.capture(heartbeat);
	var stay = function () {
		stdout.release();
		heartbeat();
		stay = heartbeat;
	};
	stay.cancel = timer.stop.bind(timer);
	stay.resume = heartbeat;
	return stay;
}

module.exports = Hangman;
