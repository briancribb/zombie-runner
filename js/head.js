function Head (neck, headSize, color, headType) {
	this.x = 0;
	this.y = 0;
	this.radius = headSize/2;
	this.neck = neck;
	this.vx = 0;
	this.vy = 0;
	this.rotation = 0;
	this.tilt = 0;
	this.scaleX = headSize.toFixed(2)/15;
	this.scaleY = headSize.toFixed(2)/15;
	this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
	this.lineradius = 1;
	this.headType = headType || 'operator';
}

Head.prototype.draw = function (context) {
	//this.graphics.plain(context);
	var self = this;

	context.save();

	//Setup
	context.translate(self.x, self.y);
	context.rotate( (Math.PI/180)*this.rotation );
	context.lineradius = self.lineradius;
	context.fillStyle = self.color;
	context.strokeStyle = '#000000';

	//Neck Line
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(self.neck,0);
	context.closePath();
	context.stroke();

		// Head, including extra art.
		context.save();
			context.translate(self.neck, 0);
			context.rotate( -(Math.PI/180)*this.rotation );

			this.headTypes[this.headType](self, context);

		context.restore();
	context.restore();

};

Head.prototype.getPin = function (degrees) {
	var rotation =  degrees * Math.PI / 180;
	return {
		x: this.x + Math.cos(rotation) * this.radius,
		y: this.y + Math.sin(rotation) * this.radius
	};
};

Head.prototype.graphics = {
	headPlain : function(self, context) {
		context.save();
			context.beginPath();
			context.arc(0, 0, self.radius, 0, (Math.PI * 2), true);
			context.closePath();
			context.fill();

			// Horizontal Line
			/*
			context.beginPath();
			context.moveTo(self.radius, 0);
			context.lineTo(-self.radius, 0);
			context.closePath();
			context.stroke();

			// Vertical Line
			context.beginPath();
			context.moveTo(0,self.radius);
			context.lineTo(0,-self.radius);
			context.closePath();
			context.stroke();
			*/
		context.restore();
	},
	headZom : function(self, context) {
		context.beginPath();
		context.arc(0, 0, self.radius, 0, (Math.PI * 2), true);
		context.closePath();
		context.fill();

		context.save();
		context.globalCompositeOperation = "destination-out";
		context.beginPath();
		context.arc(-12, -10, 6, 0, (Math.PI * 2), true);
		context.closePath();
		context.fill();
		context.restore();
	},
	ponytail : function(self, context) {
		context.save();
			//context.fillStyle = '#000000';
			context.lineWidth = 3;
			context.beginPath();
			context.moveTo(-self.radius+2, 0);
			//context.lineTo(-self.radius - 20,0);
			//context.quadraticCurveTo(-self.radius - 10, -5, -self.radius - 20, 0);
			context.bezierCurveTo(-self.radius - 4, -8, -self.radius - 12, -4, -self.radius - 15, 4);
			context.bezierCurveTo(-self.radius - 12, 4, -self.radius - 4, 10, -self.radius+2, 4);
			context.closePath();
			context.fill();
		context.restore();
	},
	headset : function(self, context) {
		context.save();
			context.fillStyle = '#000000';
			context.translate(-3, 0 );
			context.lineWidth = 3;

			// Ear cover
			context.save();
				context.beginPath();
				context.scale(1, 1.2);
				context.arc(0, 0, 6, 0, (Math.PI * 2), true);
				context.closePath();
				context.fill();
			context.restore();

			// Headband and antenna
			context.moveTo(0,-self.radius);
			context.lineTo(0,0);
			context.quadraticCurveTo(-5,-15,-17,-22);
			context.stroke();
		context.restore();
	}
}

Head.prototype.headTypes = {
	plain : function(self, context) {
		self.graphics.headPlain(self, context);
	},
	operator : function(self, context) {
		self.graphics.headPlain(self, context);
		self.graphics.ponytail(self, context);
		self.graphics.headset(self, context);
	},
	zombie : function(self, context) {
		self.graphics.headZom(self, context);
	}
}