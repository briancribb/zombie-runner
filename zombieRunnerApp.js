var zombieRunnerApp = function(){
	console.log('zombieRunnerApp()');
	var theCanvas = document.getElementById("zombieRunner");
	var context = theCanvas.getContext("2d"),
	segment0 = new Segment(100, 20),
	segment1 = new Segment(200, 10),
	segment2 = new Segment(80, 40);
	 
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

	//var i = 0;
	function animloop(){
		requestAnimFrame(animloop);
		//if ( canvasParent.is(':visible') ) {
		//	drawCanvas();
			//console.log('animloop(): Doing the loop.');
		//} //else{
			//console.log('animloop(): Stopping the loop.');
		//}
		//console.log('Animation frame: ' + i);
		//i++;
	}

	// Let's kick off the animation.
	animloop();


	segment0.x = 100;
	segment0.y = 50;
	segment0.draw(context);
	segment1.x = 100;
	segment1.y = 80;
	segment1.draw(context);
	segment2.x = 100;
	segment2.y = 120;
	segment2.draw(context);

	//animloop();
	//var drawCanvas = function() {
		
	//}

}; zombieRunnerApp();




	// ====================
	// SEGMENT CLASS
	// ====================
