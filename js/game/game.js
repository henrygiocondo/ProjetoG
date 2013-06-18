var Game = Class.create({
    initialize: function (context) {
        this.context = context;    
        this.fixDef = new b2FixtureDef;
        this.bodyDef = new b2BodyDef;
        this.scale = 30;
        this.world = this.createWorld();        
    },
    createWorld: function () {        
        return new b2World(new b2Vec2(0, 10), true);
    },
    createGround: function () {      
        this.fixDef.density = 1.0;
        this.fixDef.friction = 0.5;
        this.fixDef.restitution = 0.2;
        this.bodyDef.type = b2Body.b2_staticBody;
        this.fixDef.shape = new b2PolygonShape;
        this.fixDef.shape.SetAsBox(20, 2);
        this.bodyDef.position.Set(10, 400 / this.scale + 1.8);
        this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
        this.bodyDef.position.Set(10, -1.8);
        this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
        this.fixDef.shape.SetAsBox(2, 14);
        this.bodyDef.position.Set(-1.8, 13);
        this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
        this.bodyDef.position.Set(21.8, 13);
        this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
    },
    createPlayer: function (player) {
               
        this.fixDef.shape = new b2PolygonShape;
        this.fixDef.shape.SetAsBox(player.width / this.scale, player.height / this.scale);
               
        this.bodyDef.type = b2Body.b2_dynamicBody;
        this.bodyDef.position.x = player.x / this.scale;
        this.bodyDef.position.y = player.y / this.scale;
        this.world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

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
    draw: function () {
        this.world.Step(1 / 60, 10, 10);
        this.world.DrawDebugData();
        this.world.ClearForces();
    },
    start: function () {
        var t = this;
        setInterval(function () { t.draw(); }, 1000 / 60);
    }
});