function Head (width, height, color) {
	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = width;
	this.vx = 0;
	this.vy = 0;
	this.rotation = -(Math.PI/180)*70;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
	this.lineWidth = 1;
}

Head.prototype.draw = function (context) {

	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;

	context.beginPath();
	context.arc(this.width, 0, this.width, 0, (Math.PI * 2), true);
	context.closePath();
	context.stroke();

	context.restore();
};

Head.prototype.getPin = function () {
	return {
		x: this.x + Math.cos(this.rotation) * this.width,
		y: this.y + Math.sin(this.rotation) * this.width
	};
};
