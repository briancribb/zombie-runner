function Head (width, height, color) {
	var self = this;
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
	this.graphics = {
		plain	:	function(context) {
			context.save();
			context.translate(self.x, self.y);
			context.rotate(self.rotation);
			context.scale(self.scaleX, self.scaleY);
			context.lineWidth = self.lineWidth;
			context.fillStyle = self.color;

			context.beginPath();
			context.arc(self.width, 0, self.width, 0, (Math.PI * 2), true);
			//context.arc(self.width, 0, self.width, 0, (Math.PI/180)*60, true);
			//context.arc(self.width, 0, self.width, 0, (Math.PI/180)*30, true);
			//context.arc(self.width, 0, self.width, 0, (Math.PI/180)*300, true);
			//context.closePath();
			context.stroke();
			context.fill();
			context.restore();
		}
	}
}

Head.prototype.draw = function (context) {
	this.graphics.plain(context);
};

Head.prototype.getPin = function () {
	return {
		x: this.x + Math.cos(this.rotation) * this.width,
		y: this.y + Math.sin(this.rotation) * this.width
	};
};
