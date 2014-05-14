var runnerApp = function(canvasId){
	var fpsInfo = this.fpsInfo;
	var stage = this.stage = new createjs.Stage(canvasId);
    var Runners = this.Runners = []; // All of the squares will be kept in this array.
    var tickFlag = 0;

	// Adding the FPS counter. Starts as an empty string, gets filled with words on each Tick().
	fpsInfo = stage.addChild(new createjs.Text("", "14px monospace", "#aaaaaa"));
	fpsInfo.lineHeight = 15;
	fpsInfo.textBaseline = "top";
	fpsInfo.x = 10;
	fpsInfo.y = stage.canvas.height-fpsInfo.lineHeight-10;


	/** 
	 * Adding the Tick listener. We're going to update everything when this event happens.
	 * For details, go here: http://createjs.com/tutorials/easeljs/Animation%20and%20Ticker/
	 */
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.useRAF = true; // Using requestAnimationFrame because it's better.
	createjs.Ticker.setFPS(60); // Setting to a standard 60 fps.

	makeRunners(this); // Setting up the Runners with the app as the context.

	stage.update();



	/**
	 * Sets some random properties so we can have variation in the set of squares. Then we push a brand-new
	 * Runner instance to the Runners array with our random properties. This gives each one a slightly 
	 * different spin and speed. Then, just as a test, we send a list of the vx and vr properties to the 
	 * console. This last loop is't needed to run the app.
	 * @type {Function}
	 **/
	function makeRunners() {
		for(var i=0;i<1;i++) {
			var tempVX = Math.floor((Math.random()*10)+1);
			var tempVR = Math.floor((Math.random()*5)+1);
			// stage, id, x, y, vx, vy, vr
            Runners.push(new classes.Runner(stage, i, 100, 100, tempVX, 100, tempVR));
		}
		
		//for(var i=0;i<Runners.length;i++) {
		//	console.log('makeRunners(): ' + Runners[i].name +  ' Horizontal Speed: vx = ' + Runners[i].vx + ' Rotational Speed: vr = ' + Runners[i].vr);
		//}	
	}


	/**
	 * This is all the stuff we want to do each time the canvas updates. CreateJS sends out a Tick event, 
	 * which we can listen to and act upon. We could also put a tick listener into each square, but that 
	 * seems like a lot of listeners to me. I'd rather just have one and to through the list of objects.
	 * @type {Function}
	 */
	function tick(event) {
		if (tickFlag < 1) {
			//console.log(event);
			tickFlag ++;
		}
		/**
		 * Using time-based animation instead of frame-based. Here's the formula:
		 * move a given number of pixels per second (elapsedTimeInMS / 1000msPerSecond * pixelsPerSecond)
		 * called for 100 pixels per second:  myObject.x += event.delta/1000*100;
		 * Note: the event.delta variable is how CreateJS notes the elapsed time. For more details, go here: 
		 * http://createjs.com/tutorials/easeljs/Animation%20and%20Ticker/
		 * 
		 * We're going to loop through all of the Runners to make our updates. We could save a bit by saving 
		 * Runners[i] to a variable, but I wanted to leave it as-is for readability.
		 */




		//for(var i=0;i<Runners.length;i++) {
			// vx means "horizontal velocity" and vr means "rotational velocity". Adding them to the x and rotation properties.
		//	Runners[i].x += event.delta/1000*Runners[i].vx;
		//	Runners[i].rotation += Runners[i].vr;
			/**
			 * If we go off the side, wrap around to the beginning. Subtracting the canvas width, the current velocity, 
			 * the square's width and another 5 pixels just to be sure.
			 */
		//	if (Runners[i].x > stage.canvas.width + 80) { Runners[i].x -= stage.canvas.width + Runners[i].vx + Runners[i].width + 5; }
			// Runners[i].vx += .1; // Adding a little bit to the velocity to give some accelleration.
		//}
		
		
		// Drawing our FPS text.
		createjs.Ticker.getFPS()
		fpsInfo.text = "createjs.Ticker.getFPS() = " + createjs.Ticker.getFPS();
		stage.update(event); // This is a big deal. It draws all the child objects that have been added to the stage.
	}
}


