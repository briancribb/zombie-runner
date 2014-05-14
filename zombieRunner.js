var classes = classes || {}; // Giving a namespace to the class we're creating. It keeps things out of global.

classes.Runner = function(stage, id, x, y, vx, vy, vr) {
	// Very important. Our constructor passes all of the parameters to the initialize function.
	// Our custom stuff will live in that function.
	this.initialize(stage, id, x, y, vx, vy, vr);
}

/**
 * This next bit is extremely important. Since we're inheriting from createjs.Shape(), we need to make 
 * sure that the initialize function for that is called before our custom stuff comes in. First, we make 
 * our constructor equal Shape's, so we are now inheriting everything. I'm also assigning it to a short 
 * variable name to make the rest of the code more readable. 
 */
var Runner = classes.Runner.prototype = new createjs.Shape(); // inheriting from CreateJS Shape class.

/**
 * Now that we have everything that createjs.Shape() has, we need to save the initialize function to another 
 * name. We'll need to call it in a moment, unchanged and out-of-the-box. So now the original initialize 
 * function will be called Runner.Shape_initialize().
 */
Runner.Shape_initialize = Runner.initialize;



/**
 * Now we're ready to make our own initialize function. First we call the original function, now named 
 * Runner.Shape_initialize(), so we can have all the super powers of createjs.Shape(). Then we have our 
 * custom code. We set some variables which are mostly matched up to the docs for the Shape class. For more 
 * details on that, go here: http://createjs.com/Docs/EaselJS/classes/Shape.html
 * @type {Function}
 */
Runner.initialize = function(stage, id, x, y, vx, vy, vr) {
    this.Shape_initialize();
    // add custom setup logic here.

	this.stage = stage;				// We could just use "stage", but I like writing things in a similar pattern.
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	//this.width = 30;				// All of our squares will be the same size.
	//this.height = 30;
	this.regX = this.width/2;		// Setting the registration point so we can rotate around the center of the square.
	this.regY = this.height/2;
	this.rotation = 0;				// This is the default value anyway, but I wanted to set it here for readability.
	this.vr = vr;
	this.id = id;					// Optional number id for the Shape, not to be confused with the HTML id attribute.
	this.name = "Runner_" + id;		// We can also give it a text name. Remember this from ActionScript?

	/**
	 * Setting the graphics here, but I could have also set it outside of the class and passed the graphics object 
	 * in as a parameter. In this case that would actually be better, since the graphics don't change from square to 
	 * square. I'm just doing it here because this is a demo.
	 */
	this.graphics.beginFill("#bad").drawCircle(0, 0, 20);

	stage.addChild(this);
	
	// Sending the name and id to the console, just as a test.
	console.log("Runner.initialize(): I'm a Runner. My id is " + this.id + " and my name is " + this.name);

}
