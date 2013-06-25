var EventManager = Class.create({
	events: new Hash(),
	contexts: new Hash(),
	initialize: function () {
		//this.events = new Array();
	},
	addHandler: function(trigger, listener, context) {
		if (typeof EventManager.events[trigger] == 'undefined') {
			EventManager.events[trigger] = new Array();
		}
		if (typeof context != 'undefined') {
			EventManager.contexts[listener] = context;
		}
		EventManager.events[trigger].push(listener);
	},
	removeHandler: function(trigger, listener) {
		if (EventManager.events[trigger] instanceof Array) {
			var listeners = EventManager.events[trigger];
			for (var i = 0; i < listeners.length; i++) {
				if (listeners[i] === listener) {
					listeners.splice(i, 1);
					break;
				}
			}
		}
	},
	fire: function(trigger /*n1, n2, n3*/) {
		var trigger = arguments[0];
		var args = new Array();
		var context = this || window;
		
		for (var i = 1; i < arguments.length; i++) {
			args[i-1] = arguments[i];
		}
		
		if (EventManager.events[trigger] instanceof Array) {
			for (var i = 0; i < EventManager.events[trigger].length; i++) {
				if (typeof EventManager.contexts[EventManager.events[trigger][i]] != 'undefined') {
					context = EventManager.contexts[EventManager.events[trigger][i]];
				}
				EventManager.events[trigger][i].apply(context,args);
			}
		}
	}
	
});

var EventManager = new EventManager();