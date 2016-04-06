
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */

	//var Controls = window.Controls;
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pillar = new window.Pillar(this.el.find('.Pillar1'), this, 1);
		this.pillar1 = new window.Pillar(this.el.find('.Pillar2'), this, 2);
		this.pillar2 = new window.Pillar(this.el.find('.Pillar3'), this, 3);
		this.audio = document.getElementById('themeSong');
		this.deadAudio = document.getElementById('dead');
		this.highScore = 0;
		this.score = 0;
		this.isPlaying = false;
		var fontSize = Math.min(
			window.innerWidth / 102.4,
			window.innerHeight / 57.6
		);
		el.css('fontSize', fontSize + 'px');
		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.

		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		
		this.pillar.onFrame(delta);
		this.pillar1.onFrame(delta);
		this.pillar2.onFrame(delta);
		this.player.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);

	};


	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
			this.audio.play();
			this.reset();
			// Restart the onFrame loop
			this.lastFrame = +new Date() / 1000;
			window.requestAnimationFrame(this.onFrame);
			this.isPlaying = true;
		};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.deadAudio.pause();
		this.deadAudio.currentTime = 0;
		this.score = 0;
		$('#score').text(this.score);
		this.player.reset();
		this.pillar.reset();
		this.pillar1.reset();
		this.pillar2.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		this.audio.pause();
		this.deadAudio.play();
		if(this.score > this.highScore) {
			this.highScore = this.score;
			$('#highScore').text('High Score: ' + this.highScore);
		}
		// Should be refactored into a Scoreboard class.
		$('#scoreOnBoard').text('Score: ' + this.score);

		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


