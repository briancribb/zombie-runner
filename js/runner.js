var classes = classes || {}; // Giving a namespace to the class we're creating. It keeps things out of global.

Runner = function(settings) {
	console.log("I'm a runner!");
	this.appProps = settings.appProps; // There must be an app. We get the floor from the app.
	console.log(this.appProps);
	this.context = settings.context;
	this.x = settings.x;
	this.y = settings.y;
	this.vx = 0;
	this.vy = 0;
	this.speed = 0;
	this.cycle = 0;
	this.headSize = settings.headSize || 15;
	this.neck = settings.neck || 28;
	this.torsoLength = settings.torsoLength || 55;
	this.torsoWidth = settings.torsoWidth || 20;
	this.armLength = settings.armLength || 35;
	this.armWidth = settings.armWidth || 15;
	this.legLength = settings.legLength || 50;
	this.legWidth = settings.legWidth || 20;
	this.shoulderSlide = settings.shoulderSlide || 0;
	this.hipSlide = settings.hipSlide || 0;
	this.movetype = settings.movetype || 'run';
	//this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
	this.legProps = {};

	this.head = new Head(this.neck, this.headSize, '#999999'),
	this.torso = new Torso(this.torsoLength, this.torsoWidth, '#999999'),

	this.legBack0 = new Segment(this.legLength, this.legWidth, '#333333'),
	this.legBack1 = new Segment(this.legLength, this.legWidth, '#333333'),
	this.legFront0 = new Segment(this.legLength, this.legWidth, '#999999'),
	this.legFront1 = new Segment(this.legLength, this.legWidth, '#999999'),

	this.armBack0 = new Segment(this.armLength, this.armWidth, '#333333'),
	this.armBack1 = new Segment(this.armLength, this.armWidth, '#333333'),
	this.armFront0 = new Segment(this.armLength, this.armWidth, '#777777'),
	this.armFront1 = new Segment(this.armLength, this.armWidth, '#777777');


	if (this.movetype === 'run') {
		this.speed = 8;
		this.legProps =	{
			range0	: 55,
			base	: 90,
			range1	: 45,
			offset	: -1.57
		},
		this.armProps =	{
			range0	: 80,
			base	: 90,
			range1	: -90,
			offset	: 1.57
		};
	}

	// Initialization
	this.update();


}
Runner.prototype.updatePositions = function () {

}


Runner.prototype.run = function (elapsed) {
	//console.log('run(): cycle = ' + this.cycle);


	var self = this;

	this.cycle += this.speed * (elapsed/1000);


	this.shoulderSlide = (Math.sin(this.cycle) * (this.speed*1.5) );
	this.hipSlide = (Math.sin(this.cycle) * (this.speed/2) ) * 0;


	moveLeg(self.legBack0, self.legBack1, self.cycle, this.legProps);
	moveLeg(self.legFront0, self.legFront1, self.cycle + Math.PI, this.legProps);

	moveArm(self.armBack0, self.armBack1, self.cycle + Math.PI, this.armProps);
	moveArm(self.armFront0, self.armFront1, self.cycle, this.armProps);

	this.update();


	function moveLeg(segA, segB, cyc, set) {
		var angle0 = (Math.sin(cyc) * set.range0 + set.base) * Math.PI / 180,
			angle1 = (Math.sin(cyc + set.offset) * set.range1 + set.range1) * Math.PI / 180,
			foot = segB.getPin();
		segA.rotation = angle0;
		segB.rotation = segA.rotation + angle1;
		segB.x = segA.getPin().x;
		segB.y = segA.getPin().y;
		segB.vx = segB.getPin().x - foot.x;
		segB.vy = segB.getPin().y - foot.y;
	}

	function moveArm(segA, segB, cyc, set) {
		var angle0 = (Math.sin(cyc) * set.range0 + set.base) * Math.PI / 180,
			//angle1 = (Math.sin(cyc) * set.range0 - set.base) * Math.PI / 180;
			angle1 = (Math.sin(cyc) * 45 - 60) * Math.PI / 180;
			//angle1 = 0;

		segA.rotation = angle0;
		segB.rotation = segA.rotation + angle1;
		segB.x = segA.getPin().x;
		segB.y = segA.getPin().y;
		//console.log('console.log(Math.sin(cyc)) = ' + Math.sin(cyc));
	}
	function checkFloor(seg) {
		console.log('self.appProps = ' + self.appProps);
		var props = self.appProps;
		var yMax = seg.getPin().y + (seg.lineThickness / 2);
		/*
		if (yMax > props.bottomLimit) {
			var dy = yMax – props.bottomLimit;
			segment0.y -= dy;
			segment1.y -= dy;
			segment2.y -= dy;
			segment3.y -= dy;
		}
		*/
	}
	checkFloor(self.legBack1);









}

Runner.prototype.update = function () {
	// Torso
	this.torso.x = this.x;
	this.torso.y = this.y;
	this.torso.rotation = -(Math.PI/180)*70;

	// Head
	this.head.x = this.torso.getPin().x;
	this.head.y = this.torso.getPin().y;
	this.head.offset = (Math.PI/180)*15;
	this.head.rotation = this.torso.rotation + this.head.offset;

	// Back Leg
	this.legBack0.x = this.torso.x - this.hipSlide;
	this.legBack0.y = this.torso.y;

	// Front Leg
	this.legFront0.x = this.torso.x + this.hipSlide;
	this.legFront0.y = this.torso.y;

	// Back arm
	this.armBack0.x = this.torso.getPin().x + this.shoulderSlide;
	this.armBack0.y = this.torso.getPin().y;

	// Front arm
	this.armFront0.x = this.torso.getPin().x - this.shoulderSlide;
	this.armFront0.y = this.torso.getPin().y;

	// React to gravity
	//this.y -= this.app.props.gravity;
}

Runner.prototype.draw = function () {
	//context.save();
	//context.translate(this.x, this.y);
	//context.scale(.5, .5);
	this.legBack0.draw(this.context);
	this.legBack1.draw(this.context);
	this.armBack0.draw(this.context);
	this.armBack1.draw(this.context);
	this.torso.draw(this.context);
	this.head.draw(this.context);
	this.legFront0.draw(this.context);
	this.legFront1.draw(this.context);
	this.armFront0.draw(this.context);
	this.armFront1.draw(this.context);

}

