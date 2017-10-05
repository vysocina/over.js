// over.js
(function(window){
	'use strict';

	// actual library starts here
	function OverJS(target, setup) {
		// save element object
		this.target = target;

		// check if setup actually exists
		if(typeof setup === 'undefined') {
			setup = {};
		}

		// creating setup
		this.setup = {
			// htlm content of custom cursor
			content: setup.content || '<div class=\'circle-cursor\'></div>',

			// parameters for parent holding cursor
			parameters: {
				id: setup.id || 'custom-cursor',
				classList: setup.classList || ['overjs__cursor', 'overjs__cursor-default']
			},

			// ignore custom cursor
			ignore: setup.ignore || [],

			// callbacks and tracking
			onEnter: setup.onEnter || function(self, position) {},
			onMove: setup.onMove || function(self, position) {},
			onOut: setup.onOut || function(self, position) {}
		}

		// create cursor dom
		return this.__spawn();
	};

	OverJS.prototype.__spawn = function() {
	}

	// bind whole function into element prototypes
	if(typeof Element.prototype.overjs === 'undefined') {
		Element.prototype.overjs = function(setup) {
			// call this function when calling prototype
			return new OverJS(this, setup);
		};
	}
})(window);
