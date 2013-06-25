var Game = Class.create({
    initialize: function (context, config) {
        this.context = context;    
        this.fixDef = new b2FixtureDef;
        this.bodyDef = new b2BodyDef;
        this.scale = 30;
        this.world = this.createWorld();
        this.players = [];
		this.width = ("width" in config)?(config.width):(1400);
		this.height = ("height" in config)?(config.height):(600);
		
		this.rotation = 0;
		this.objectOfInterest = null;
    },
    createWorld: function () {        
        return new b2World(new b2Vec2(0, 10), true);
    },
    createGround: function () {

        this.fixDef.density = 1.0;
        this.fixDef.friction = 0.5;
        this.fixDef.restitution = 0.2;

        this.fixDef.filter.categoryBits = 0x0004;
        this.fixDef.filter.maskBits = 0x0002;

        this.bodyDef.type = b2Body.b2_staticBody;
        this.fixDef.shape = new b2PolygonShape;
        this.fixDef.shape.SetAsBox((this.width - 900) / this.scale, 0.1);
        this.bodyDef.position.Set(600 / this.scale, (this.height - 100) / this.scale);
        this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
        //this.bodyDef.position.Set(10, -1.8);
        //this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
        //this.fixDef.shape.SetAsBox(2, 14);
        //this.bodyDef.position.Set(-1.8, 13);
        //this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
        //this.bodyDef.position.Set(21.8, 13);
        //this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
    },
    createPlayer: function (player) {
               
        this.fixDef.shape = new b2PolygonShape;
        this.fixDef.shape.SetAsBox(player.width / this.scale, player.height / this.scale);
        this.fixDef.density = 1;

        this.fixDef.filter.categoryBits = 0x0002;
        this.fixDef.filter.maskBits = 0x0004;

        this.bodyDef.type = b2Body.b2_dynamicBody;
        this.bodyDef.isBullet = true;
        this.bodyDef.position.x = player.x / this.scale;
        this.bodyDef.position.y = player.y / this.scale;
        
        var body = this.world.CreateBody(this.bodyDef);
        body.CreateFixture(this.fixDef);

        player.body = body;
        this.players.push(body);

    },
    debugDraw: function () {
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(this.context);
        debugDraw.SetDrawScale(this.scale);
        debugDraw.SetFillAlpha(1);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
    },
	setInterest: function (obj) {
		this.objectOfInterest = obj;
	},
    draw: function () {
		this.context.clearRect ( -game.offsetX , -game.offsetY , this.width + game.offsetX , this.height + game.offsetY);
		//this.context.clearRect ( 0 , 0 , this.width + game.offsetX , this.height + game.offsetY);
		
        this.world.Step(1 / 60, 10, 10);
        this.world.DrawDebugData();

		var x = 0;
		var y = 0;

		if (this.objectOfInterest != null) {
			x = this.objectOfInterest.body.GetLocalCenter().x - this.offsetX;
			y = this.objectOfInterest.body.GetLocalCenter().y - this.offsetY;
			this.offsetX = this.objectOfInterest.body.GetLocalCenter().x;
			this.offsetY = this.objectOfInterest.body.GetLocalCenter().y;
		}
		// Implementar centralização da tela
		//this.context.save();
		//this.context.translate(x, y);
		//this.context.rotate(this.rotation);
		//this.context.drawImage()
		//this.context.restore();
		
		EventManager.fire(this.draw);
        this.world.ClearForces();
    },
    start: function () {
        var t = this;
        setInterval(function () { t.draw(); }, 1000 / 60);
    }
});