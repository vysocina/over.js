# Contributions

* please every pull request must be added to this file with sample usage
* to see how to structure usage, please check wiki page of this project or scroll down to see example

***

# Don't know how to start?

* fork this repository
* clone your fork into localhost
```
git clone https://github.com/{your_name}/over.js.git
```
* create your branch
```
git checkout -b name-of-branch
```
* make changes
* commit and push
```
git add .
git commit -m 'message with changes'
git push origin name-of-branch
```
* create a pull request from forked repository
* wait until approval

***

# Example of contribution:

### onClick
* [github](http://github.com/vysocina)
* call custom function when clicked on target element
```
document.querySelector('.test').over({
	onClick: function(self, event) {
		.....
	}
})
```
* `function`, default value: `function() {}`

***

# Approved contributions

### onContextMenu || onRightClick
* [github](http://github.com/meldiron)
* call custom function when right clicking on target element
```
document.querySelector('.test').over({
	onRightClick: function(self, event) {
		.....
	}
})
```
* `function`, default value: `function() {}`

### contextMenuPreventDefault || rightClickPreventDefault
* [github](http://github.com/meldiron)
* addition to onContextMenu action, enabling or disabling default action on right click
```
document.querySelector('.test').over({
    rightClickPreventDefault: false
})
```
* `boolean`, default value: `false`

### onClick
* [github](http://github.com/meldiron)
* event which execute callback when user clicks target
```
document.querySelector('.test').over({
    onClick: function(self, event) {
		console.log("Clicked!");
	}
})
```
* `function`, default value: `function() {}`

### onMouseDown
* [github](http://github.com/meldiron)
* event which execute callback when user start holding left button
```
document.querySelector('.test').over({
    onMouseDown: function(self, event) {
		console.log("User started holding left button!");
	}
})
```
* `function`, default value: `function() {}`

### onMouseUp
* [github](http://github.com/meldiron)
* event which execute callback when user release left button
```
document.querySelector('.test').over({
    onMouseUp: function(self, event) {
		console.log("User released left button!");
	}
})
```
* `function`, default value: `function() {}`

### onRightClickDown
* [github](http://github.com/meldiron)
* event which execute callback when user start holding right button
```
document.querySelector('.test').over({
    onRightClickDown: function(self, event) {
		console.log("User started holding right button!");
	}
})
```
* `function`, default value: `function() {}`

### onRightClickUp
* [github](http://github.com/meldiron)
* event which execute callback when user release right button
```
document.querySelector('.test').over({
    onRightClickUp: function(self, event) {
		console.log("User released right button!");
	}
})
```
* `function`, default value: `function() {}`

***
