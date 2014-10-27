'use strict';

var Stopwatch = require('timer-stopwatch');

function Hangman(timeLimit) {
  if (!timeLimit) { timeLimit = 60000; }
  var timer = new Stopwatch(timeLimit, {
    refreshRate: ~~(timeLimit / 10) || 10
  });
  timer.on('done', function() {
    process.exit(1);
  });
  timer.start();
  return function() {
    timer.reset(timeLimit);
    timer.start();
  };
}

module.exports = Hangman;
