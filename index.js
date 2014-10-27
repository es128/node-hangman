'use strict';

var Stopwatch = require('timer-stopwatch');

function Hangman(timeLimit, callback) {
  if (typeof timeLimit === 'function') {
    callback = timeLimit;
    timeLimit = void 0;
  }
  if (!timeLimit) { timeLimit = 60000; }
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
