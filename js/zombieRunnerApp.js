var zombieRunnerApp = function(){
	console.log('zombieRunnerApp()');
	var self = this;
	// Setting up rAF. Thank you Paul Irish.
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame	|| 
		window.webkitRequestAnimationFrame		|| 
		window.mozRequestAnimationFrame			|| 
		window.oRequestAnimationFrame			|| 
		window.msRequestAnimationFrame			|| 
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
	})();
	function getTimer () {
		return (new Date().getTime() - start_time); //milliseconds
	}

	// Variables
	var canvas = document.getElementById("zombieRunner");
	self.props = {
		floor : canvas.height,
		gravity :5
	};

	var context = canvas.getContext("2d"),
		bottomLimit = canvas.height - 30,
		start_time = new Date().getTime(),
		time = getTimer(),
		elapsed = 0,
		frame_count = 0,
		fps = 0,
		runner5 = new Runner({
			color: 'rgb(180,180,180)',
			x:100,
			y:self.props.floor,
			headSize : 15,
			neck : 25,
			torsoLength : 55,
			torsoWidth : 20,
			armLength : 25,
			armWidth : 15,
			legLength : 40,
			legWidth : 20,
			gravity : self.props.gravity,
			cycle : 2,
			speed : 6,
			moveType : 'zombie'
		});
		runner6 = new Runner({
			color: 'rgb(209,90,90)',
			x:300,
			y: self.props.floor,
			gravity : self.props.gravity,
			moveType : 'run',
			speed:8
		});
		runner7 = new Runner({
			color: 'rgb(100,173,245)',
			x:500,
			y:self.props.floor,
			moveType : 'run2',
			speed: 7
		});


	function animloop(){
		//console.log('animloop()');
		requestAnimFrame(animloop);
		update();
		render();
	}

	var update = function() {
		elapsed = getTimer() - time;
		time = getTimer();
		frame_count += elapsed;
		if (frame_count > 1000) {
			frame_count -= 1000;
			fps = parseInt(1000 / elapsed);
		}
		runner5.run(elapsed);
		//runner5.x++;
		runner6.run(elapsed);
		runner7.run(elapsed);
	}

	var render = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillText( ('FPS:    ' + fps), 10,20);
		runner5.draw(context);
		runner6.draw(context);
		runner7.draw(context);

	}
	render(); // initial display call.

	// Let's kick off the animation.
	animloop();




}; zombieRunnerApp();




// ====================
// RUNNING SETTINGS
// ====================

//  FAST JOG
//	speedSlider:		.11
//	thighRangeSlider:	45
//	thighBaseSlider:	90
//	calfRangeSlider:	45
//	calfOffsetSlider:	-1.57
//	gravitySlider:   	.2


//  WALK
//	speedSlider:		.6
//	thighRangeSlider:	23
//	thighBaseSlider:	90
//	calfRangeSlider:	17
//	calfOffsetSlider:	-1.57
//	gravitySlider:   	.2













