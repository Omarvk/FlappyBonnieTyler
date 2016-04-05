'use strict';
var audio = document.getElementById('themeSong');

document.getElementById('mute').addEventListener('click', function (e)	{
	$(this).toggleClass('glyphicon glyphicon-volume-off').toggleClass('glyphicon glyphicon-volume-up');
    e = e || window.event;
    audio.muted = !audio.muted;
    e.preventDefault();
}, false);

