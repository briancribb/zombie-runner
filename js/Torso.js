function Torso (tallness, waist, color, torsoType) {
	this.x = 0;
	this.y = 0;
	this.tallness = tallness;
	this.waist = waist;
	this.vx = 0;
	this.vy = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
	this.lineWidth = 0;
	this.torsoType = torsoType || 'male';
}

Torso.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	//this.graphics[this.torsoType](this, context);
	this.torsoTypes[this.torsoType](self, context);

	context.restore();
};

Torso.prototype.getPin = function () {
	return {
		x: this.x + Math.cos(this.rotation) * this.tallness,
		y: this.y + Math.sin(this.rotation) * this.tallness
	};
};

Torso.prototype.graphics = {
	male : function(self, context) {
		//console.log('male. scaleX = ' + self.scaleX);
		context.lineWidth = self.waist;
		context.strokeStyle = self.color;
		context.lineJoin  = 'round';
		context.lineCap  = 'round';
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(self.tallness,0);
		context.closePath();
		context.stroke();
	},
	female : function(self, context) {
		context.lineWidth = self.waist;
		context.strokeStyle = self.color;
		context.lineJoin  = 'round';
		context.lineCap  = 'round';
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(self.tallness,0);
		context.lineTo(self.tallness*.8, self.waist/2 );
		context.lineTo(self.tallness*.6,0);
		context.closePath();
		context.stroke();
	}
	// Stuff.
}
Torso.prototype.torsoTypes = {
	male : function(self, context) {
		self.graphics.male(self, context);
	},
	female : function(self, context) {
		self.graphics.female(self, context);
	},
	operatorMale : function(self, context) {
		self.graphics.male(self, context);
	},
	operatorFemale : function(self, context) {
		self.graphics.female(self, context);
	},
	zombie : function(self, context) {
		self.graphics.male(self, context);
	}
}