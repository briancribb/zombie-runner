function Torso (width, height, color) {
	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.vx = 0;
	this.vy = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
	this.lineWidth = 0;
}

Torso.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.height;
	context.strokeStyle = this.color;
	context.lineJoin  = 'round';
	context.lineCap  = 'round';

	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(this.width,0);
	context.closePath();
	context.stroke();
	context.restore();
};

Torso.prototype.getPin = function () {
	return {
		x: this.x + Math.cos(this.rotation) * this.width,
		y: this.y + Math.sin(this.rotation) * this.width
	};
};
