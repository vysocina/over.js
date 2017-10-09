# over.js
over.js is a cursor changing library

added:
    - new events:
        1. onContextMenu
            - alias: onRightClick
            - value: function
            - default value: function() {}
            - description: Event which runs when user right click

            - example: 
                document.querySelector('.content').over({
                    onRightClick: function(self, event) {
                        console.log("Right clicked!");
                    }
                });
    - new options:
        1. contextMenuPreventDefault
            - alias: rightClickPreventDefault
            - value: true / false (boolean)
            - default value: true
            - description: Prevent default on right click (open context menu)

            - example:
                document.querySelector('.content').over({
                    rightClickPreventDefault: false,

                    onRightClick: function(self, event) {
                        console.log("Right clicked!");
                    }
                });