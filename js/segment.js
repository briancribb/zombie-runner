function Segment (lineLength, lineThickness, color) {
	this.x = 0;
	this.y = 0;
	this.lineLength = lineLength;
	this.lineThickness = lineThickness;
	this.vx = 0;
	this.vy = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
	this.lineWidth = 0;
}

Segment.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.lineThickness;
	context.strokeStyle = this.color;
	context.lineJoin  = 'round';
	context.lineCap  = 'round';

	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(this.lineLength,0);
	context.closePath();
	context.stroke();

	/*
	context.beginPath();
	context.moveTo(0, -cr);
	context.lineTo(d-2*cr, -cr);
	context.quadraticCurveTo(-cr+d, -cr, -cr+d, 0);
	context.lineTo(-cr+d, h-2*cr);
	context.quadraticCurveTo(-cr+d, -cr+h, d-2*cr, -cr+h);
	context.lineTo(0, -cr+h);
	context.quadraticCurveTo(-cr, -cr+h, -cr, h-2*cr);
	context.lineTo(-cr, 0);
	context.quadraticCurveTo(-cr, -cr, 0, -cr);
	context.closePath();
	context.fill();
	*/
	/*
	context.beginPath();
	context.moveTo(0, -cr);
	context.lineTo(d-h, -cr);
	context.lineTo(d-h, cr);
	context.lineTo(0, cr);
	context.lineTo(0, -cr);
	context.closePath();
	context.fill();


	if (this.lineWidth > 0) {
		context.stroke();
	}

	//draw the 2 "pins"

	context.beginPath();
	context.arc(0, 0, cr, 0, (Math.PI * 2), true);
	context.closePath();
	context.fill();

	context.beginPath();
	context.arc(this.lineLength, 0, cr, 0, (Math.PI * 2), true);
	context.closePath();
	context.fill();

	*/
	context.restore();
};

Segment.prototype.getPin = function () {
	return {
		x: this.x + Math.cos(this.rotation) * this.lineLength,
		y: this.y + Math.sin(this.rotation) * this.lineLength
	};
};
