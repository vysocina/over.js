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

			//support variables for events
			contextMenuPreventDefault: setup.contextMenuPreventDefault || setup.rightClickPreventDefault || false,

			// callbacks and tracking
			onEnter: setup.onEnter || function() {},
			onMove: setup.onMove || function() {},
			onOut: setup.onOut || function() {},
			// more callbacks
			onIgnored: setup.onIgnored || function() {},
			//even more callbacks
			onContextMenu: setup.onContextMenu || setup.onRightClick || function() {},
			onClick: setup.onClick || function() {},
			onMouseDown: setup.onMouseDown || function() {},
			onMouseUp: setup.onMouseUp || function() {},
			onRightClickDown: setup.onRightClickDown || function() {},
			onRightClickUp: setup.onRightClickUp || function() {},
			onDrag: setup.onDrag || function()  {},
			onRightDrag: setup.onRightDrag || function() {},
 
			// change class while moving
			whileMoving: setup.whileMoving || ['overjs__cursor-moving'],
			timeoutWhileMoving: setup.timeoutWhileMoving || 400,

			// main css setup, change only if you know what you are doing...
			css: {
				position: 'fixed',
				transform: 'translate(-100%, -100%)'
			},

			// mouseDrag event needs these
			isHoldingLeft: false,
			isHoldingRight: false
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
		this.target.cursor = this.cursor;

		// style functions
		this.target._show = this.__showCursor;
		this.target._hide = this.__hideCursor;

		// actual mouse move
		this.target.onmousemove = function(e) {
			//onDrag, ononRightDrag
			if(e.buttons == 1) { //left button
				if(this.setup.isHoldingLeft == true) {
					let newData = {
						position: {
							x: e.pageX,
							y: e.pageY
						},
						difference: {
							x: e.movementX,
							y: e.movementY
						},
						relativePosition: {
							x: e.layerX,
							y: e.layerY
						}
					}

					this.setup.onDrag(newData, this, e);
				}
			} else if(e.buttons == 2) { //right click
				if(this.setup.isHoldingRight == true) {
					this.setup.onRightDrag(newData);
				}
			}

			// ignored elements
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
				this._show(this, e);
			} else {
				// hide cursor
				this._hide(this, e);
				return this.setup.onIgnored(this, e.target, e);
			}

			// change class while moving
			for(var i = 0; i < this.setup.whileMoving.length; i++) {
				this.cursor.classList.add(this.setup.whileMoving[i]);
			}
			// remove classes
			var self = this;
			window.setTimeout(function() {
				for(var i = 0; i < self.setup.whileMoving.length; i++) {
					self.cursor.classList.remove(self.setup.whileMoving[i]);
				}
			}, this.setup.timeoutWhileMoving);

			// callback
			return this.setup.onMove(this, e);
		}

		// mouse enter the target
		this.target.onmouseenter = function(e) {
			// callback
			return this.setup.onEnter(this, e);
		}

		// mouse move out of taget
		this.target.onmouseout = function(e) {
			this._hide(this, e);

			// callback
			return this.setup.onOut(this, e);
		}

		// right click on the target
		this.target.oncontextmenu = function(e) {
			if(this.setup.contextMenuPreventDefault) {
				e.preventDefault();
			}

			// callback
			return this.setup.onContextMenu(this, e);
		}

		this.target.onclick = function(e) {

			// callback
			return this.setup.onClick(this, e);
		}

		this.target.onmousedown = function(e) {
			//callback
			if(e.button == 0) { //left click
				this.setup.isHoldingLeft = true;
				return this.setup.onMouseDown(this, e);
			} else if(e.button == 2) { //right click
				this.setup.isHoldingRight = true;
				return this.setup.onRightClickDown(this, e);
			}
		}

		this.target.onmouseup = function(e) {
			//callback
			if(e.button == 0) { //left click
				this.setup.isHoldingLeft = false;
				return this.setup.onMouseUp(this, e);
			} else if(e.button == 2) { //right click
				this.setup.isHoldingRight = false;
				return this.setup.onRightClickUp(this, e);
			}
		}
	}

	// show and move cursor
	OverJS.prototype.__showCursor = function(self, e) {
		// get cursor size
		var w = self.cursor.clientWidth / 2;
		var h = self.cursor.clientHeight / 2;

		// move cursor
		self.style.cursor = 'none';
		self.cursor.style.transform = 'translate(' + (e.pageX - w) + 'px, ' + (e.pageY - h) + 'px)';
	}

	// hide cursor
	OverJS.prototype.__hideCursor = function(self, e) {
		self.style.cursor = 'default';
		self.cursor.style.transform = self.setup.css.transform;
	}

	// bind whole function into element prototypes
	if(typeof Element.prototype.over === 'undefined') {
		Element.prototype.over = function(setup) {
			// call this function when calling prototype
			return new OverJS(this, setup);
		};
	}
})(window);
