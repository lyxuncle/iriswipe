'use strict';

/**
 * @author ec
 * @date 2016-1-12
 * @desc 虹膜转场
 */

var Iris = {
	canvas: document.getElementById('irisWipe'), 
	ctx: null, 
	radius: 0, 
	start: null, 
	width: 0, 
	height: 0, 
	poses: {
		width: 0, 
		height: 0, 
		steps: [] 	// 虹膜中心位置信息
	}, 
	speed: [12, 20], 

	construct: function(obj){
		var self = this;

		self.extends(obj);
		self.init();
	}, 

	init: function (){
		var self = this,
			varArr = [],
			width, 
			height;

		width = self.width ? self.width : window.document.documentElement.clientWidth;
		height = self.height ? self.height : window.document.documentElement.clientHeight;

		self.canvas.width = self.canvas.style.width = width;
		self.canvas.height = self.canvas.style.height = height;
		self.poses.width = width; 
		self.poses.height = height;

		if(self.poses.steps[0]) self.startIris(self.poses.steps);
	}, 

	startIris: function(arr){
		var self = this, 
			w = self.poses.width, 
			h = self.poses.height, 
			maxRadius = self.radiusCount(arr[0].x * w / 100, arr[0].y * h / 100), 
			maxRadius2 = self.radiusCount(arr[1].x * w / 100, arr[1].y * h / 100), 
			obj;
		self.radius = maxRadius;
		arr[1].r = maxRadius2;
		self.canvas.style.display = 'block';
		self.ctx = self.canvas.getContext('2d');

		obj = {
			w: w, 
			h: h, 
			x: arr[0].x * w / 100, 
			y: arr[0].y * h / 100, 
			maxR: maxRadius
		}
		arr[1].x *= w / 100;
		arr[1].y *= h / 100;

		window.requestAnimationFrame(function(timestamp){
			self.circle(timestamp, obj, 0, arr[1]);
		});

	}, 

	// varObj = {
	// 	w: width, 
	// 	h: height, 
	// 	x: position x, 
	// 	y: position y, 
	// 	maxR: max radius
	// }
	circle: function (timestamp, varObj, limit, pos2){
		var self = Iris, 
			width = varObj.w, 
			height = varObj.h, 
			posX = varObj.x, 
			posY = varObj.y, 
			maxRadius = varObj.maxR, 
			nextObj;

		if (!self.start) self.start = timestamp;
		var progress = timestamp - self.start;
		if(limit === 0){
			self.radius -= maxRadius/self.speed[0];
			if(self.radius < 0){
				self.radius = 0;
			}
		}else{
			self.radius += maxRadius/self.speed[1];
			if(self.radius >= maxRadius){
				self.radius = maxRadius;
			}
		}
		
		self.ctx.clearRect(0, 0, width, height);
		self.ctx.fillStyle = "black";
		self.ctx.fillRect(0, 0, width, height);
		self.ctx.globalCompositeOperation = "destination-out";
		self.ctx.beginPath();
		self.ctx.fillStyle = "red";
		self.ctx.arc(posX,posY,self.radius,0,2*Math.PI);
		self.ctx.fill();
		self.ctx.globalCompositeOperation = "source-over";

		if(limit === 0){
			if(self.radius > 0){
				nextObj = varObj;
			}else{
				nextObj = {
					w: width, 
					h: height, 
					x: pos2.x, 
					y: pos2.y, 
					maxR: pos2.r 
				};
				limit = 1;
			}
			window.requestAnimationFrame(function(timestamp){
				self.circle(timestamp, nextObj, limit, pos2);
			});
		}

		if(limit === 1){
			if(self.radius < maxRadius){
				window.requestAnimationFrame(function(timestamp){
					self.circle(timestamp, varObj, 1);
				});
			}else{
				self.canvas.style.display = 'none';
			}
		}
	}, 

	radiusCount: function(x, y){
		var self = this, 
			w = self.poses.width,
			h = self.poses.height, 
			xGap = Math.max((w-x), x), 
			yGap = Math.max((h-y), y);

		return Math.ceil(Math.sqrt((xGap*xGap) + (yGap * yGap)));
	}, 

	extends: function(obj){
		var self = this;

		if(typeof obj === "object"){
			for (var key in obj) {
				self[key] = obj[key];
			}
		}
	}
}