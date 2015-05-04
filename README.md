node-hangman
=======

Tools like [forever](https://github.com/nodejitsu/forever) and 
[PM2](https://github.com/Unitech/PM2) are great for Node.js stability in
production, but they're only effective at recovering processes that crash. They
can't ensure the application is actually doing what it's supposed to do in a
healthy state.

Hangman monitors a process from the inside and deliberately kills it when an
unhealthy state is detected, letting the process manager kick in and restart
it. Hangman is effective even in cases of a
[blocked event loop](https://github.com/es128/node-hangman/blob/master/examples/ReDoS.js).

Healthy state can be monitored automatically as regular writes to stdout (which
is typically how log files are written), or it can be specified in any
context-specific way that would be appropriate for a particular app.


Usage
-----

To kill a process if it is silent for over 60 seconds, all you need is:
```js
require('hangman')();
```

You can specify a different timer interval:
```js
// this process is expected to log something at least every 10s
require('hangman')(10000);
```

To reset the timer based on actions other than stdout writes, call the function
that is returned when hangman is initiated:
```js
var resetHangman = require('hangman')();

// execute this function whenever the process does what it's supposed to
server.on('request', function() {
	// respond to the request, then
	resetHangman();
});
```

To specify what happens when the timer expires, pass in a callback. Note that
this will not be effective against starved event loop situations. Hangman does
not continue monitoring after the callback has been called; it is up to you to
initiate new instances.
```js
require('hangman')(function() {
	console.log('All quiet on the western front.');
});
```

You can create multiple instances to monitor different things.
```js
var hangman = require('hangman');
var stdoutMonitor = hangman();
var appMonitor = hangman(30000, function() {
	// note that using console.log here would actually trip the stdoutMonitor
	console.log('The app has not checked in for 30 seconds.')
});
```

A hangman monitor instance can be canceled and resumed.
```js
var stdoutMonitor = require('hangman')();
stdoutMonitor.cancel();
stdoutMonitor.resume();
```


License
-------

[ISC](https://raw.github.com/es128/node-hangman/master/LICENSE)
