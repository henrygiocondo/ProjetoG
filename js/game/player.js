var Player = Class.create({
    initialize: function (name, x, y) {

        this.name = name;
        this.width = 30;
        this.height = 30;
        this.y = y;
        this.x = x;

    },
    say: function (message) {
        return this.name + ': ' + message;
    },   
});