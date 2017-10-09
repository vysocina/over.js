# Contributions

* please every pull request must be added to this file with sample usage
* to see how to structure usage, please check wiki page of this project
* here is an example of what to do:

* side note: please include minified versions of code, thanks!

### added .....
* [github](http://github.com/yourusername)
* description:
.....
* usage:
```
	.....
```
* additional info .....

***

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
* `boolean`, default value: `function() {}`

***

### contextMenuPreventDefault || rightClickPreventDefault
* [github](http://github.com/meldiron)
* addition to onContextMenu action, enabling or disabling default action on right click
```
document.querySelector('.test').over({
    rightClickPreventDefault: false
})
```
* `boolean`, default value: `true`

***
