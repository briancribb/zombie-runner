function Torso (width, height, color) {
	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.vx = 0;
	this.vy = 0;
	this.rotation = -(Math.PI/180)*70;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
	this.lineWidth = 0;
}

Torso.prototype.draw = function (context) {
	var h = this.height,
		d = this.width + h, //top-right diagonal
		cr = h / 2;         //corner radius
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(30, -cr);									// Start above zero point.
	context.lineTo(d-2*cr, -cr);								// Straight right.
	context.quadraticCurveTo(-cr+d, -cr, -cr+d, 0);				// Curve down on right.
	context.lineTo(-cr+d, h-2*cr);								// Straignt down.
	context.quadraticCurveTo(-cr+d, -cr+h, d-2*cr, -cr+h);		// Curve down and left.
	context.lineTo(30, -cr+h);									// Straight left.
	context.quadraticCurveTo(-cr+30, -cr+h, -cr+30, h-2*cr);		// Curve left and up.
	context.lineTo(-cr+30, 0);									// Straight up.
	context.quadraticCurveTo(-cr+30, -cr, 30, -cr);				// Curve up and right.
	context.closePath();
	context.fill();
	if (this.lineWidth > 0) {
		context.stroke();
	}
	//draw the 2 "pins"
	context.beginPath();
	context.arc(3, 0, this.height/2, 0, (Math.PI * 2), true);
	context.closePath();
	context.fill();
	//context.stroke();
	/*
	context.beginPath();
	context.arc(this.width, 0, 2, 0, (Math.PI * 2), true);
	context.closePath();
	context.stroke();
	*/

	context.restore();
};

Torso.prototype.getPin = function () {
	return {
		x: this.x + Math.cos(this.rotation) * this.width,
		y: this.y + Math.sin(this.rotation) * this.width
	};
};
