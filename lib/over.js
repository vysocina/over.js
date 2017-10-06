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

			// attributes for parent element
			attributes: {
				id: setup.id || 'custom-cursor',
				classList: setup.classList || ['overjs__cursor', 'overjs__cursor-default']
			},

			// ignore custom cursor
			ignore: setup.ignore || [],

			// callbacks and tracking
			onEnter: setup.onEnter || function(self, position) {},
			onMove: setup.onMove || function(self, position) {},
			onOut: setup.onOut || function(self, position) {},

			// main css setup, change only if you know what you are doing...
			css: {
				position: 'fixed',
				transform: 'translate(-100%, -100%)'
			}
		}

		// create cursor dom
		return this.__spawn();
	};

	// placing cursor into page
	OverJS.prototype.__spawn = function() {
		this.cursor = document.createElement('div');

		// element attributes
		for(var i = 0; i < this.setup.attributes.classList.length; i++) {
			this.cursor.classList.add(this.setup.attributes.classList[i]);
		}
		this.cursor.id = this.setup.attributes.id;

		// cursor content
		this.cursor.innerHTML = this.setup.content;

		// render to page
		document.body.appendChild(this.cursor);

		// bind mouse over function to target
		return this.__hide();
	}

	OverJS.prototype.__hide = function() {
		// apply needed styles
		for(var i = 0; i < Object.keys(this.setup.css).length; i++) {
			this.cursor.style[Object.keys(this.setup.css)[i]] = this.setup.css[Object.keys(this.setup.css)[i]];
		}
		// disable interaction
		this.cursor.style.pointerEvents = 'none';

		// bind events
		return this.__movement();
	}

	// on mouse move event
	OverJS.prototype.__movement = function() {
		// pass variables into element
		this.target.setup = this.setup;
		this.target.cursor = this.cursor

		// actual mouse move
		this.target.onmousemove = function(e) {
			// get cursor size
			var w = this.cursor.clientWidth / 2;
			var h = this.cursor.clientHeight / 2;

			// ignore part
			var ignore = false;

			// check what is user hovering
			for(var i = 0; i < this.setup.ignore.length; i++) {
				if(e.target === this.setup.ignore[i]) {
					// found child to be ignored
					ignore = true;
				}
			}

			if(ignore === false) {
				// move cursor
				this.style.cursor = 'none';
				this.cursor.style.transform = 'translate(' + (e.pageX - w) + 'px, ' + (e.pageY - h) + 'px)';
			} else {
				// hide cursor
				this.style.cursor = 'default';
				this.cursor.style.transform = this.setup.css.transform;
			}
		}

		// mouse move out of taget
		this.target.onmouseout = function(e) {
			this.style.cursor = 'default';
			this.cursor.style.transform = this.setup.css.transform;
		}
	}

	// bind whole function into element prototypes
	if(typeof Element.prototype.over === 'undefined') {
		Element.prototype.over = function(setup) {
			// call this function when calling prototype
			return new OverJS(this, setup);
		};
	}
})(window);
