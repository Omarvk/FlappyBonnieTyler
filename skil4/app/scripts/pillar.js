window.Pillar = (function() {
	'use strict';


	var pos = 102.5;
	var gap = 15;
	var nextID = 1;

	var Pillar = function(el, game, id) {
		this.el = el;
		this.game = game;
		this.pos = 0;
		this.id = id;
		this.topHeight = 0;
		this.botHeight = 0;

	};


	Pillar.prototype.reset = function() {
		this.randomGap();
		nextID = 1;
		if( this.id === 1) {
			this.pos = this.id * pos;
		}else if(this.id === 2) {
			this.pos = this.id * pos - 75;
		}else {
			this.pos = this.id * pos - 145;
		}
	};


	Pillar.prototype.onFrame = function(delta) {
		this.pos -= delta * 10;
		this.checkOutOfScreen();
		this.el.css('transform', 'translate3d(' + this.pos + 'em, 0em, 0) ');
	};
	
	Pillar.prototype.checkOutOfScreen = function() {
		if(this.pos < 0) {
			this.randomGap();
			this.pos = this.game.WORLD_WIDTH;
		}
	};
	Pillar.prototype.randomGap = function() {
		this.topHeight = Math.floor((Math.random() * (this.game.WORLD_HEIGHT - 10)) - gap);
		if(this.topHeight < 10) {
			this.topHeight = 10;
		}
		this.botHeight = this.game.WORLD_HEIGHT - (this.topHeight + gap);
		$('.upPillar' + this.id).height(this.topHeight + 'em');
		$('.downPillar' + this.id).height(this.botHeight + 'em');
	};

	Pillar.prototype.checkCollision = function() {
	    var curPillar = $('.Pillar' + this.id);
	    var upper = $('.upPillar'+ this.id);
		var down = $('.downPillar' + this.id);
		var player = $('.Player');
		if(curPillar.length > 0) {
			if( ((player.offset().top) <= ( upper.height() + upper.offset().top)) &&
				((player.offset().left + player.width()) >= upper.offset().left) &&
				(player.offset().left <= (upper.offset().left + upper.width())) ) {
				return this.game.gameover();
			}
			if ( (player.offset().top + (player.height())) >= (down.offset().top) &&
				(player.offset().left + player.width() >= down.offset().left) &&
				(player.offset().left <= (down.offset().left + down.width()) ) ) {
				return this.game.gameover();
			}
			if(player.offset().left >= (curPillar.offset().left + curPillar.width()) ) {
				if(nextID === this.id) {
					++this.game.score;
					$('#score').text(this.game.score);
					nextID++;
					if(nextID === 4) {
						nextID = 1;
					}
				}
			}
		}
	};

	return Pillar;

})();
