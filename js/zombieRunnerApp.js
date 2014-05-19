var zombieRunnerApp = function(){
	console.log('zombieRunnerApp()');

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

	var context = canvas.getContext("2d"),
		start_time = new Date().getTime(),
		time = getTimer(),
		elapsed = 0,
		frame_count = 0,
		fps = 0,
		runner5 = new Runner({context:context,x:100,y:200});
		//runner6 = new Runner({context:context,x:300,y:200});
		//runner7 = new Runner({context:context,x:500,y:200});
		//runner8 = new Runner({context:context,x:700,y:200});
		//runner10 = new Runner({context:context,x:900,y:200});




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
		//runner6.run(elapsed);
		//runner7.run(elapsed);
		//runner8.run(elapsed);
		//runner10.run(elapsed);
	}

	var render = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillText( ('FPS:    ' + fps), 10,20);
		runner5.draw();
		//runner6.draw();
		//runner7.draw();
		//runner8.draw();
		//runner10.draw();
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













