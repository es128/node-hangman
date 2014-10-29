'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var Stopwatch = require('timer-stopwatch');
var stdout = new (require('fixture-stdout'))();

var monitor;
function getMonitor() {
  return monitor = monitor ||
    spawn(path.join(__dirname, 'monitor.js'), [], { stdio: ['pipe', 1, 2] });
}

function Hangman(timeLimit, callback) {
  if (typeof timeLimit === 'function') {
    callback = timeLimit;
    timeLimit = void 0;
  }
  if (!timeLimit) { timeLimit = 60000; }
  var timer;
  if (callback) {
    timer = new Stopwatch(timeLimit, {
      refreshRate: Math.floor(timeLimit / 10) || 10
    });
    timer.on('done', callback || function() {
      process.exit(1);
    });
    timer.start();
  } else {
    getMonitor();
    var stdin = monitor.stdin;
    timer = {
      start: Function.prototype,
      stop: stdin.write.bind(stdin, {stop: true}),
      reset: stdin.write.bind(stdin, {reset: true})
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
  stay.cancel = heartbeat.cancel = timer.stop;
  return stay;
}

module.exports = Hangman;
