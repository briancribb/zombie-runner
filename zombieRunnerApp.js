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


	// Variables
	var canvas = document.getElementById("zombieRunner");
	var context = canvas.getContext("2d"),
	segment0 = new Segment(100, 20),
	segment1 = new Segment(100, 20);
	slider0 = new Slider(-90,90,0),
	slider1 = new Slider(-90,90,0),

	// Initialization
	segment0.x = 100;
	segment0.y = 100;

	slider0.x = 320;
	slider0.y = 20;
	slider0.captureMouse(canvas);
	slider0.onchange = animloop; // Only changing when the slider changes.

	slider1.x = 340;
	slider1.y = 20;
	slider1.captureMouse(canvas);
	slider1.onchange = animloop; // Only changing when the slider changes.


	function animloop(){
		console.log('animloop()');
		requestAnimFrame(animloop);
		drawFrame();
	}

	// Let's kick off the animation.
	//animloop();

	var drawFrame = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		segment0.rotation = slider0.value * Math.PI / 180;
		segment1.rotation = slider1.value * Math.PI / 180;
		segment1.x = segment0.getPin().x;
		segment1.y = segment0.getPin().y;

		segment0.draw(context);
		segment1.draw(context);
		slider0.draw(context);
		slider1.draw(context);
	}
	drawFrame(); // initial display call.

}; zombieRunnerApp();




	// ====================
	// SEGMENT CLASS
	// ====================
