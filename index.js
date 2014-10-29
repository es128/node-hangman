'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var Stopwatch = require('timer-stopwatch');
var stdout = new (require('fixture-stdout'))();

function Hangman(timeLimit, callback) {
  if (typeof timeLimit === 'function') {
    callback = timeLimit;
    timeLimit = void 0;
  }
  if (!timeLimit) { timeLimit = 60000; }
  var monitor = spawn(path.join(__dirname, 'monitor.js'), [], { stdio: ['pipe', 1, 2] });
  stdout.capture(function() {
    monitor.stdin.write('stdout');
  });
  var timer = new Stopwatch(timeLimit, {
    refreshRate: Math.floor(timeLimit / 10) || 10
  });
  timer.on('done', callback || function() {
    process.exit(1);
  });
  timer.start();
  function heartbeat() {
    timer.reset();
    timer.start();
  }
  heartbeat.cancel = timer.stop;
  return heartbeat;
}

module.exports = Hangman;
