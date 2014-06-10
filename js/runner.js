var classes = classes || {}; // Giving a namespace to the class we're creating. It keeps things out of global.

Runner = function(settings) {
	this.counter = 0;
	this.speed = settings.speed || 8;
	this.floor = settings.y; // the y value is where you want the feet to end up.
	this.cycle = settings.cycle || 0;
	this.lastCycle = 0;
	this.sinDirection = true; // True means adding, false means subtracting.
	this.headSize = settings.headSize || 30;
	this.headType = settings.headType || 'plain';
	this.neck = settings.neck || 28;
	this.torsoLength = settings.torsoLength || 55;
	this.torsoWidth = settings.torsoWidth || 20;
	this.torsoType = settings.torsoType || 'male';
	this.armLength = settings.armLength || 35;
	this.armWidth = settings.armWidth || 15;
	this.legLength = settings.legLength || 50;
	this.legWidth = settings.legWidth || 20;
	this.color = settings.color || "rgb(119,119,119)";
	this.reachBack = this.reaching = false;


	// Only works with rgb. Needs adjustment for rgba.
	var colorComponents = this.color.substring(4, this.color.length-1).replace(/ /g, '').split(',');

	this.colorLight = 'rgb(' + (parseInt(colorComponents[0])+30) + ', ' + (parseInt(colorComponents[1])+30) + ', ' + (parseInt(colorComponents[2])+30) + ')' || "rgb(149,149,149)";
	this.colorDark = 'rgb(' + (parseInt(colorComponents[0])-30) + ', ' + (parseInt(colorComponents[1])-30) + ', ' + (parseInt(colorComponents[2])-30) + ')' || "rgb(89,89,89)";

	this.head = new Head(this.neck, this.headSize, this.color, this.headType),
	this.torso = new Torso(this.torsoLength, this.torsoWidth, this.color, this.torsoType),

	this.legBack0 = new Segment(this.legLength, this.legWidth, this.colorDark),
	this.legBack1 = new Segment(this.legLength, this.legWidth, this.colorDark),
	this.legFront0 = new Segment(this.legLength, this.legWidth, this.color),
	this.legFront1 = new Segment(this.legLength, this.legWidth, this.color),

	this.armBack0 = new Segment(this.armLength, this.armWidth, this.colorDark),
	this.armBack1 = new Segment(this.armLength, this.armWidth, this.colorDark),
	this.armFront0 = new Segment(this.armLength, this.armWidth, this.colorLight),
	this.armFront1 = new Segment(this.armLength, this.armWidth, this.colorLight);

	this.moveType = this.moveProps[ settings.moveType ] || this.moveProps['run'];
	this.moveTarget = this.moveType;
	this.moveSet = this.moveType;


	this.x = settings.x;
	this.y = settings.y;

	this.init();
}

Runner.prototype.init = function () {
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
	this.armBack0.x = this.torso.getPin().x + this.shoulderSlide;
	this.armBack0.y = this.torso.getPin().y;
	this.armBack1.x = this.armBack0.getPin().x;
	this.armBack1.y = this.armBack0.getPin().y;

	// Front arm
	this.armFront0.x = this.torso.getPin().x - this.shoulderSlide;
	this.armFront0.y = this.torso.getPin().y;
	this.armFront1.x = this.armFront0.getPin().x - this.shoulderSlide;
	this.armFront1.y = this.armFront0.getPin().y;

}

Runner.prototype.run = function (elapsed) {
	this.lastCycle = this.cycle;
	this.cycle += this.speed * (elapsed/1000);
	this.shoulderSlide = (Math.sin(this.cycle) * (this.moveType.shoulderSlide) );

	this.counter ++;
	if (this.counter < 100) {
		var cycleWave = Math.sin(this.cycle);
		var lastCycleWave = Math.sin(this.lastCycle);

		if (cycleWave > lastCycleWave && this.sinDirection === false) {
			//console.log('Bottom, going UP: lastCycleWave: ' + lastCycleWave + ', cycleWave: ' + cycleWave + ', this.counter: ' + this.counter);
			this.sinDirection = true;
			this.counter ++;
		} else if (cycleWave < lastCycleWave && this.sinDirection === true) {
			//console.log('Top, going DOWN: lastCycleWave: ' + lastCycleWave + ', cycleWave: ' + cycleWave + ', this.counter: ' + this.counter);
			this.sinDirection = false;
			//this.counter ++;
		}
		console.log('updateSet()');
		console.log( updateSet(this.moveType, this.moveTarget) );
		console.log(' ');
	}

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
	this.legBack0.x = this.torso.x;
	this.legBack0.y = this.torso.y;
	moveLeg(this.legBack0, this.legBack1, this.cycle, this.moveType.legProps);

	// Front Leg
	this.legFront0.x = this.torso.x;
	this.legFront0.y = this.torso.y;
	moveLeg(this.legFront0, this.legFront1, this.cycle + Math.PI, this.moveType.legProps);

	// Back arm
	this.armBack0.x = this.torso.getPin().x + this.shoulderSlide;
	this.armBack0.y = this.torso.getPin().y;
	moveArm(this.armBack0, this.armBack1, this.cycle + Math.PI, this.moveType.armProps);

	// Front arm
	this.armFront0.x = this.torso.getPin().x - this.shoulderSlide;
	this.armFront0.y = this.torso.getPin().y;

	//var armSet =  this.moveType.armProps;
	var armSet = (this.reachBack === true ? this.moveProps.reachBack.armProps : this.moveType.armProps);
	//moveArm(this.armFront0, this.armFront1, this.cycle, this.moveProps.reachBack.armProps);
	moveArm(this.armFront0, this.armFront1, this.cycle, armSet);

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

	function updateSet(currentSet, targetSet) {
		/*
		console.log('currentSet:');
		console.log(currentSet);
		console.log(' ');
		console.log('targetSet:');
		console.log(targetSet);
		console.log(' ');
		*/
		return currentSet;
	}
}
 
Runner.prototype.draw = function (context) {
	this.legBack0.draw(context);
	this.legBack1.draw(context);
	this.armBack0.draw(context);
	this.armBack1.draw(context);
	this.head.draw(context);
	this.torso.draw(context);
	this.legFront0.draw(context);
	this.legFront1.draw(context);
	this.armFront0.draw(context);
	this.armFront1.draw(context);
}

Runner.prototype.moveProps = {
	run : {
		torsoAngle		: -70,
		headOffset		: 15,
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
		torsoAngle		: -85,
		headOffset		: 8,
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
		torsoAngle		: -80,
		headOffset		: 15,
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
	},
	reachBack : {
		armProps		: {
			range0		: 80,
			base		: 0,
			range1		: 65,
			offset		: 70
		}
	}
}

