window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.rotate = 0;
		this.flyAudio = document.getElementById('fly');
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		/*if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}*/
		this.pos.y += delta * (SPEED - 10);
		if (Controls.keys.space || Controls.mouse.mouseclick) {
			this.flyAudio.pause();
			this.flyAudio.play();
			if(this.rotate > -20) {
				this.rotate -= 10;
			}
			if(this.pos.y <= 0) {
				this.pos.y += delta * 10;
			}else {
				this.pos.y -= delta * SPEED * 2;
			}
		}
		if(this.rotate < 90) {
			this.rotate += 2;
		}
		
		this.checkCollisionWithBounds();
		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate('+ this.rotate +'deg)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
		this.game.pillar.checkCollision();
		this.game.pillar1.checkCollision();
		this.game.pillar2.checkCollision();
	};

	return Player;

})();
