function Head (radius, neck, color) {
	var self = this;
	this.x = 0;
	this.y = 0;
	this.radius = radius;
	this.neck = neck;
	this.vx = 0;
	this.vy = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
	this.lineradius = 1;
	this.graphics = {
		plain	:	function(context) {
			context.save();
			context.translate(self.x, self.y);
			context.rotate(self.rotation);
			context.scale(self.scaleX, self.scaleY);
			context.lineradius = self.lineradius;
			context.fillStyle = self.color;

			context.beginPath();
			context.arc(self.neck, 0, self.radius, 0, (Math.PI * 2), true);
			context.fill();



			//context.globalCompositeOperation = "destination-out";

			/*
			context.save();
			context.fillStyle = '#ffffff';
			context.beginPath();
			context.arc(self.radius - 10, 10, self.radius/2, 0, (Math.PI * 2), true);
			context.fill();
			context.restore();
			*/

			context.restore();
		}
	}
}

Head.prototype.draw = function (context) {
	this.graphics.plain(context);
};

Head.prototype.getPin = function () {
	return {
		x: this.x + Math.cos(this.rotation) * this.radius,
		y: this.y + Math.sin(this.rotation) * this.radius
	};
};
