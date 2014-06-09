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
	context.rotate( (Math.PI/180)*this.rotation );
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = self.waist;
	context.strokeStyle = self.color;
	context.lineJoin  = 'round';
	context.lineCap  = 'round';
	this.torsoTypes[this.torsoType](this, context);

	context.restore();
};

Torso.prototype.getPin = function () {
	return {
		x: this.x + Math.cos( (Math.PI/180)*this.rotation ) * this.tallness,
		y: this.y + Math.sin( (Math.PI/180)*this.rotation ) * this.tallness
	};
};

Torso.prototype.graphics = {
	male : function(self, context) {
		context.lineWidth = self.waist;
		context.strokeStyle = self.color;
		context.beginPath(); 
		context.moveTo(0, 0);
		context.lineTo(self.tallness,0);
		context.closePath();
		context.stroke();
	},
	female : function(self, context) {
		context.save();
			context.lineWidth = self.waist;
			context.strokeStyle = self.color;
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(self.tallness,0);
			context.lineTo(self.tallness*.8, self.waist/2 );
			context.lineTo(self.tallness*.6,0);
			context.closePath();
			context.stroke();
		context.restore();
	},
	backpack : function(self, context) {
		context.save();
			context.lineWidth = self.waist;
			context.strokeStyle = context.fillStyle = '#000000';
			context.beginPath();
			context.moveTo(self.tallness*.4, 0);
			context.lineTo(self.tallness*.4,-self.waist*1.5);
			context.lineTo(self.tallness*.8,-self.waist*1.5);
			context.lineTo(self.tallness,-self.waist);
			context.closePath();
			context.fill();
			context.stroke();
		context.restore();
	}
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
		self.graphics.backpack(self, context);
		self.graphics.female(self, context);
	},
	zombie : function(self, context) {
		self.graphics.male(self, context);
	}
}