var classes = classes || {}; // Giving a namespace to the class we're creating. It keeps things out of global.

Runner = function(settings) {
	console.log("I'm a runner!");
	this.counter = 0;
	this.x = settings.x;
	this.y = settings.y;
	this.speed = 0;
	this.cycle = 0;
	this.movetype = settings.movetype || 'run';
	//this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
	this.legProps = {};

	this.head = new Head(15, 15, '#555555'),
	this.torso = new Torso(55, 25, '#555555'),

	this.legBack0 = new Segment(50, 20, '#333333'),
	this.legBack1 = new Segment(50, 20, '#333333'),
	this.legFront0 = new Segment(50, 20, '#555555'),
	this.legFront1 = new Segment(50, 20, '#555555'),

	this.armBack0 = new Segment(38, 15, '#333333'),
	this.armBack1 = new Segment(38, 15, '#333333'),
	this.armFront0 = new Segment(38, 15, '#777777'),
	this.armFront1 = new Segment(38, 15, '#777777');



	// Initialization
	this.head.x = this.torso.getPin().x + 6;
	this.head.y = this.torso.getPin().y - 18;

	// Torso
	this.torso.x = this.x;
	this.torso.y = this.y;
	this.torso.rotation = -(Math.PI/180)*70;

	// Back Leg
	this.legBack0.x = this.torso.x;
	this.legBack0.y = this.torso.y;
	this.legBack1.x = this.legBack0.getPin().x;
	this.legBack1.y = this.legBack0.getPin().y;

	// Front Leg
	this.legFront0.x = this.torso.x;
	this.legFront0.y = this.torso.y;
	this.legFront1.x = this.legFront0.getPin().x;
	this.legFront1.y = this.legFront0.getPin().y;

	// Back arm
	this.armBack0.x = this.torso.getPin().x;
	this.armBack0.y = this.torso.getPin().y;
	this.armBack1.x = this.armBack0.getPin().x;
	this.armBack1.y = this.armBack0.getPin().y;

	// Front arm
	this.armFront0.x = this.torso.getPin().x;
	this.armFront0.y = this.torso.getPin().y;
	this.armFront1.x = this.armFront0.getPin().x;
	this.armFront1.y = this.armFront0.getPin().y;






	if (this.movetype === 'run') {
		this.speed = 8;
		this.legProps =	{
			range0	: 60,
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




}



Runner.prototype.run = function (elapsed) {
	//console.log('run(): cycle = ' + this.cycle);
	this.counter ++;
	//if (this.counter > 1000) {
	//	return false;
	//}


	var self = this;

	this.cycle += this.speed * (elapsed/1000);


	var shoulderSlide = (Math.sin(this.cycle) * 10);
	var hipSlide = (Math.sin(this.cycle) * 5);


	moveLeg(self.legBack0, self.legBack1, self.cycle, this.legProps);
	moveLeg(self.legFront0, self.legFront1, self.cycle + Math.PI, this.legProps);

	moveArm(self.armBack0, self.armBack1, self.cycle + Math.PI, this.armProps);
	moveArm(self.armFront0, self.armFront1, self.cycle, this.armProps);

	this.head.x = this.torso.getPin().x + 6;
	this.head.y = this.torso.getPin().y - 18;

	// Torso
	this.torso.x = this.x;
	this.torso.y = this.y;
	this.torso.rotation = -(Math.PI/180)*70;


	// Back Leg
	this.legBack0.x = this.torso.x - hipSlide;
	this.legBack0.y = this.torso.y;

	// Front Leg
	this.legFront0.x = this.torso.x + hipSlide;
	this.legFront0.y = this.torso.y;

	// Back arm
	this.armBack0.x = this.torso.getPin().x + shoulderSlide;
	this.armBack0.y = this.torso.getPin().y;

	// Front arm
	this.armFront0.x = this.torso.getPin().x - shoulderSlide;
	this.armFront0.y = this.torso.getPin().y;



	function moveLeg(segA, segB, cyc, set) {
		var angle0 = (Math.sin(cyc) * set.range0 + set.base) * Math.PI / 180,
			angle1 = (Math.sin(cyc + set.offset) * set.range0 + set.range1) * Math.PI / 180,
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

}



Runner.prototype.draw = function (context) {
	//context.save();
	//context.translate(this.x, this.y);
	//context.scale(.5, .5);
	this.legBack0.draw(context);
	this.legBack1.draw(context);
	this.armBack0.draw(context);
	this.armBack1.draw(context);
	this.torso.draw(context);
	this.head.draw(context);
	this.legFront0.draw(context);
	this.legFront1.draw(context);
	this.armFront0.draw(context);
	this.armFront1.draw(context);

}

