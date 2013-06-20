var Player = Class.create({
    initialize: function (name, x, y) {

        this.name = name;
        this.width = 30;
        this.height = 30;
        this.y = y;
        this.x = x;
        this.body = null;

    },
    say: function (message) {
        return this.name + ': ' + message;
    },
    move: function (direction) {

        var vel = this.body.GetLinearVelocity();
        switch ( direction )
        {
            case 'Left': vel.x = -2; break;
            case 'Right': vel.x = 2; break;
            default: vel.x = 0; break;
        }

        if (vel.x != 0) {
            this.body.SetAwake(true);
        }

        this.body.SetLinearVelocity(vel);
    },
});