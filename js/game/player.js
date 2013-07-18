var Player = Class.create({
    initialize: function (name, x, y) {
        this.name = name;
        this.width = 30;
        this.height = 30;
        this.y = y;
        this.x = x;
        this.hp = 0;
        this.stam = 0;
        this.body = null;
        this.isAttacking = false;
        this.isMoving = false;
        this.attack = new PlayerAttack();
    },
    say: function (message) {
        return this.name + ': ' + message;
    },
    move: function (direction) {
        console.log(direction);
        var vel = this.body.GetLinearVelocity();
        switch ( direction )
        {
            case 'Left': vel.x = -1; break;
            case 'Right': vel.x = 1; break;
            default: vel.x = 0; break;
        }

        if (vel.x != 0) {
            this.body.SetAwake(true);
        }

        this.body.SetLinearVelocity(vel);
    },
    attack: function (attackForce, x, y, angle) {

    }
});