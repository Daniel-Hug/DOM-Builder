var Snoopy = (function() {
	function Snoopy(obj) {
		if (!(this instanceof Snoopy)) return new Snoopy(obj);
		// don't overwrite this.snoopers!
		this.snoopers = {};
		Object.keys(obj).forEach(function(key) {
			this[key] = obj[key];
		}, this);
	}

	var changed = Snoopy.prototype.changed = function(prop) {
		var newVal = this[prop];
		(this.snoopers[prop] || []).forEach(function(snooper) {
			snooper.call(this, newVal);
		}, this);
	};

	Snoopy.prototype.get = function(prop, val) {
		return this[prop];
	};

	Snoopy.prototype.set = function(prop, val) {
		this[prop] = val;
		changed.call(this, prop);
	};

	Snoopy.prototype.snoop = function(props, map) {
		if (map) {
			var snooper;
			var mapOutput;
			var propToVal = this.get.bind(this);
			var propsArr = props.split(' ');

			// caller calls map with the values of the passed props
			// then, if there is a snooper, calls that passing the value returned from the map 
			var caller = function caller() {
				var propVals = propsArr.map(propToVal);
				mapOutput = map.apply(null, propVals);
				if (snooper) snooper(mapOutput);
			};

			caller();

			// push caller to snooper list
			var t = this;
			propsArr.forEach(function(prop) {
				if (!t.snoopers[prop]) t.snoopers[prop] = [];
				t.snoopers[prop].push(caller);
			});

			return function mappedSnoop(newSnooper) {
				snooper = newSnooper;
				snooper(mapOutput);
			};
		} else {
			// snoopable
			return this.snoop.bind(this, props);
		}
	};

	return Snoopy;
})();