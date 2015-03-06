jquery-multiSelect
==================

A jquery plugin to manage multi-select in a more design way.

Example available at : [JSFiddle](http://jsfiddle.net/gh/get/jquery/1.8.3/dependencies/ui/vdubus/jquery-multiSelect/tree/master/demo "jquery-multiSelect demo")

Dependencies :
--------------
* jQuery 1.8+
* jQuery-UI 1.9+

Available Options :
-------------------
* enableChangeMode : {Boolean} `true` to enable item selection on change. `false` To remain on an item selection with a button.
* emptyOptionLabel : {String} the label to show in the empty option added when in `change mode`.
* addButtonLabel : {String} the label to display in the selector button.

Available Functions :
-------------------
* destroy : to undo the multiSelect on an element.
* refresh : to update the multiSelect with the new content from an element.

Usage :
-------
This plugin will only take effect on `select` with `multiple` attribute.

    $("#MyMultiSelect").multiSelect();

We can also use it with options :

    $("#MyMultiSelect").multiSelect({enableChangeMode : true, emptyOptionLabel : "Empty Option"});
    
And to call functions :

    $("#MyMultiSelect").multiSelect("refresh");