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
		segment0 = new Segment(50, 15),
		segment1 = new Segment(50, 10),
		segment2 = new Segment(50, 15),
		segment3 = new Segment(50, 10),
		speedSlider = new Slider(0, 0.2, 0.11),
		thighRangeSlider = new Slider(0, 90, 45),
		thighBaseSlider = new Slider(0, 180, 90),
		calfRangeSlider = new Slider(0, 90, 45),
		calfOffsetSlider = new Slider(-3.14, 3.14, -1.57),
		gravitySlider = new Slider(0,1,0.2),

		vx = 0,
		vy = 0,

		cycle = 0,
		offset = -Math.PI / 2; //should be between PI and -PI

	// Initialization
	segment0.x = 200;
	segment0.y = 200;

	segment1.x = segment0.getPin().x;
	segment1.y = segment0.getPin().y;

	segment2.x = 200;
	segment2.y = 200;

	segment3.x = segment2.getPin().x;
	segment3.y = segment2.getPin().y;

	speedSlider.x = 10;
	speedSlider.y = 10;
	speedSlider.captureMouse(canvas);

	thighRangeSlider.x = 30;
	thighRangeSlider.y = 10;
	thighRangeSlider.captureMouse(canvas);

	thighBaseSlider.x = 50;
	thighBaseSlider.y = 10;
	thighBaseSlider.captureMouse(canvas);

	calfRangeSlider.x = 70;
	calfRangeSlider.y = 10;
	calfRangeSlider.captureMouse(canvas);

	calfOffsetSlider.x = 90;
	calfOffsetSlider.y = 10;
	calfOffsetSlider.captureMouse(canvas);

	gravitySlider.x = 110;
	gravitySlider.y = 10;
	gravitySlider.captureMouse(canvas);



	function walk(segA, segB, cyc) {
		var angle0 = (Math.sin(cyc) * thighRangeSlider.value + thighBaseSlider.value) * Math.PI / 180,
			angle1 = (Math.sin(cyc + calfOffsetSlider.value) * calfRangeSlider.value + calfRangeSlider.value) * Math.PI / 180,
			foot = segB.getPin();

		//var angle0 = (Math.sin(cyc) * 45 + 80) * Math.PI / 180,
		//	angle1 = (Math.sin(cyc + offset) * 45 + 45) * Math.PI / 180;

		segA.rotation = angle0;
		segB.rotation = segA.rotation + angle1;
		segB.x = segA.getPin().x;
		segB.y = segA.getPin().y;
		segB.vx = segB.getPin().x - foot.x;
		segB.vy = segB.getPin().y - foot.y;
	}
	function setVelocity() {
		vy += gravitySlider.value;
		segment0.x += vx;
		segment0.y += vy;
		segment2.x += vx;
		segment2.y += vy;
	}
	function checkFloor(seg) {
		var yMax = seg.getPin().y + (seg.height / 2);
		if (yMax > canvas.height) {
			// do stuff.
			var dy = yMax - canvas.height;
			segment0.y -= dy;
			segment1.y -= dy;
			segment2.y -= dy;
			segment3.y -= dy;
			vx -= seg.vx;
			vy -= seg.vy;
		}
	}
	function checkWalls() {
		var w = canvas.width + 200;
		if (segment0.x > canvas.width + 100) {
			segment0.x -= w;
			segment1.x -= w;
			segment2.x -= w;
			segment3.x -= w;
		} else if (segment0.x < -100) {
			segment0.x += w;
			segment1.x += w;
			segment2.x += w;
			segment3.x += w;
		}
	}

	function animloop(){
		console.log('animloop()');
		requestAnimFrame(animloop);
		drawFrame();
	}

	// Let's kick off the animation.
	//animloop();

	var drawFrame = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		cycle += speedSlider.value;
		setVelocity();

		cycle += 0.02;
		walk(segment0, segment1, cycle);
		walk(segment2, segment3, cycle + Math.PI);
		checkFloor(segment1);
		checkFloor(segment3);

		segment0.draw(context);
		segment1.draw(context);
		segment2.draw(context);
		segment3.draw(context);
		checkWalls();

		vx = 0;

		speedSlider.draw(context);
		thighRangeSlider.draw(context);
		thighBaseSlider.draw(context);
		calfRangeSlider.draw(context);
		calfOffsetSlider.draw(context);
		gravitySlider.draw(context);

		context.fillText( ('speedSlider:      ' + speedSlider.value), 200,20);
		context.fillText( ('thighRangeSlider: ' + thighRangeSlider.value), 200,35);
		context.fillText( ('thighBaseSlider:  ' + thighBaseSlider.value), 200,50);
		context.fillText( ('calfRangeSlider:  ' + calfRangeSlider.value), 200,65);
		context.fillText( ('calfOffsetSlider: ' + calfOffsetSlider.value), 200,80);
		context.fillText( ('gravitySlider:    ' + gravitySlider.value), 200,95);
	}
	animloop(); // initial display call.

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













