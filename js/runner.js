var classes = classes || {}; // Giving a namespace to the class we're creating. It keeps things out of global.

Runner = function(settings) {
	console.log("I'm a runner!");
	this.context = settings.context;
	this.x = settings.x;
	this.y = settings.y;
	this.speed = 0;
	this.cycle = 0;
	this.runSettings = {};

	this.segment0 = new Segment(50, 15),
	this.segment1 = new Segment(50, 10),
	this.segment2 = new Segment(50, 15),
	this.segment3 = new Segment(50, 10);

	// Initialization
	this.segment0.x = this.x;
	this.segment0.y = this.y;

	this.segment1.x = this.segment0.getPin().x;
	this.segment1.y = this.segment0.getPin().y;

	//this.segment2.x = this.x;
	//this.segment2.y = this.y;

	//this.segment3.x = this.segment2.getPin().x;
	//this.segment3.y = this.segment2.getPin().y;

}

Runner.prototype.run = function (type, elapsed) {
	//console.log('run(): cycle = ' + this.cycle);
	var self = this;

	if (type === 'run') {
		this.speed = .11;
		this.cycle += this.speed;

		this.runSettings =	{
							thighRange	: 60,
							thighBase	: 90,
							calfRange	: 45,
							calfOffset	: -1.57
						}
		walk(self.segment0, self.segment1, self.cycle, this.runSettings);
		walk(self.segment2, self.segment3, self.cycle + Math.PI, this.runSettings);
	}


	function walk(segA, segB, cyc, set) {

		var angle0 = (Math.sin(cyc) * set.thighRange + set.thighBase) * Math.PI / 180,
			angle1 = (Math.sin(cyc + set.calfOffset) * set.calfRange + set.calfRange) * Math.PI / 180,
			foot = segB.getPin();

		segA.rotation = angle0;
		segB.rotation = segA.rotation + angle1;
		segB.x = segA.getPin().x;
		segB.y = segA.getPin().y;
		segB.vx = segB.getPin().x - foot.x;
		segB.vy = segB.getPin().y - foot.y;
	}

}



Runner.prototype.draw = function (context) {
	this.segment0.draw(this.context);
	this.segment1.draw(this.context);
	//this.segment2.draw(this.context);
	//this.segment3.draw(this.context);
}

