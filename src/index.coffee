'use strict'

Stopwatch = require 'timer-stopwatch'

class Hangman
	constructor: (timeLimit=60000) ->
		@timer = new Stopwatch timeLimit

		@timer.on 'done', -> process.exit 1

		return @timer.reset

module.exports = Hangman
