var Camera = Class.create({
	initialize: function (context) {
		this.x = 0;
		this.y = 0;
		this.dx = 0.0000;
		this.dy = 0.0000;
		this.fx = 0;
		this.fy = 0;
		this.world = null;
		this.framesToPoint = 10;
		this.context = context;
	},
	setWorld: function (world) {
		this.world = world;
		EventManager.addHandler(world.draw, this.tick, this);
	},
	setPosition: function (x, y) {
		this.fx = this.fx + x;
		this.fy = this.fy + y;
		this.dx = (this.fx - this.x) / this.framesToPoint;
		this.dy = (this.fy - this.y) / this.framesToPoint;
		
	},
	tick: function() {
		if (Math.abs(this.x - this.fx) > Math.abs(this.dx)) {
			this.x += this.dx;
			this.context.translate(this.dx, 0);
		}
		if (Math.abs(this.y - this.fy) > Math.abs(this.dy)) {
			this.y += this.dy;
			this.context.translate(0, this.dy);
		}
			
		//this.context.translate(this.dx, this.y);
	}
});