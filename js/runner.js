var classes = classes || {}; // Giving a namespace to the class we're creating. It keeps things out of global.

Runner = function(settings) {
	console.log("I'm a runner!");


	this.moveProps = {
		run : {
			torsoAngle		: -(Math.PI/180)*70,
			headOffset		: (Math.PI/180)*15,
			shoulderSlide	: 8,
			legProps		: {
				range0		: 55,
				base		: 90,
				range1		: 45,
				offset		: -1.57,
				jump		: 15
			},
			armProps		: {
				range0		: 80,
				base		: 90,
				range1		: 35,
				offset		: 60
			}
		},
		run2 : {
			torsoAngle		: -(Math.PI/180)*85,
			headOffset		: (Math.PI/180)*8,
			shoulderSlide	: 4,
			legProps		: {
				range0		: 40,
				base		: 90,
				range1		: 40,
				offset		: -1.57,
				jump		: 10
			},
			armProps		: {
				range0		: 50,
				base		: 90,
				range1		: 35,
				offset		: 70
			}
		},
		zombie : {
			torsoAngle		: -(Math.PI/180)*80,
			headOffset		: (Math.PI/180)*15,
			shoulderSlide	: 1,
			legProps		: {
				range0		: 15,
				base		: 90,
				range1		: 15,
				offset		: -1.57,
				jump		: 0
			},
			armProps		: {
				range0		: 5,
				base		: 0,
				range1		: 10,
				offset		: 15
			}
		}
	}


	this.counter = 0;
	this.speed = settings.speed || 8;
	this.gravity = settings.gravity || 1;
	this.floor = settings.y; // the y value is where you want the feet to end up.
	this.cycle = settings.cycle || 0;
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

	this.moveType = this.moveProps[ settings.moveType ] || this.moveProps['run'];
	this.x = settings.x;
	this.y = settings.y;
}


Runner.prototype.run = function (elapsed) {
	var self = this;
	this.cycle += this.speed * (elapsed/1000);
	this.shoulderSlide = (Math.sin(this.cycle) * (this.moveType.shoulderSlide) );

	//this.y -= (Math.sin(this.cycle*2) * this.speed * this.moveType.legProps.jump);
	//this.y = settings.y - this.height;

	// Torso
	this.torso.x = this.x;
	this.torso.y = this.y - (this.legLength * 2) - (this.legWidth/2) + 2 - ( Math.sin(this.cycle*2) * this.moveType.legProps.jump );
	this.torso.rotation = this.moveType.torsoAngle;

	// Head
	this.head.x = this.torso.getPin().x;
	this.head.y = this.torso.getPin().y;
	this.head.offset = this.moveType.headOffset;
	this.head.rotation = this.torso.rotation + this.head.offset;

	// Back Leg
	this.legBack0.x = this.torso.x - this.hipSlide;
	this.legBack0.y = this.torso.y;
	moveLeg(self.legBack0, self.legBack1, self.cycle, this.moveType.legProps);

	// Front Leg
	this.legFront0.x = this.torso.x + this.hipSlide;
	this.legFront0.y = this.torso.y;
	moveLeg(self.legFront0, self.legFront1, self.cycle + Math.PI, this.moveType.legProps);

	// Back arm
	this.armBack0.x = this.torso.getPin().x + this.shoulderSlide;
	this.armBack0.y = this.torso.getPin().y;
	moveArm(self.armBack0, self.armBack1, self.cycle + Math.PI, this.moveType.armProps);

	// Front arm
	this.armFront0.x = this.torso.getPin().x - this.shoulderSlide;
	this.armFront0.y = this.torso.getPin().y;
	moveArm(self.armFront0, self.armFront1, self.cycle, this.moveType.armProps);

	// React to gravity
	//console.log('this.gravity = ' + ( this.gravity * (elapsed/1000) ) );
	//this.y += ( this.gravity * (elapsed/1000) );
	this.counter ++;




	function moveLeg(segA, segB, cyc, set) {
		var angle0 = (Math.sin(cyc) * set.range0 + set.base) * Math.PI / 180,
			angle1 = (Math.sin(cyc + set.offset) * set.range1 + set.range1) * Math.PI / 180,
			foot = segB.getPin();
		segA.rotation = angle0;
		segB.rotation = segA.rotation + angle1;
		segB.x = segA.getPin().x;
		segB.y = segA.getPin().y;
	}

	function moveArm(segA, segB, cyc, set) {

		var angle0 = (Math.sin(cyc) * set.range0 + set.base) * Math.PI / 180,
			angle1 = ( (Math.sin(cyc) * set.range1) - set.offset) * Math.PI / 180;

		segA.rotation = angle0;
		segB.rotation = segA.rotation + angle1;
		segB.x = segA.getPin().x;
		segB.y = segA.getPin().y;
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

