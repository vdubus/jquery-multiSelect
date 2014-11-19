jquery-multiSelect
==================

A jquery plugin to manage multi-select in a more design way.

Example available at : http://jsfiddle.net/gh/get/jquery/1.11/vdubus/jquery-multiSelect/tree/master/demo

Available Options :
-------------------
* enableChangeMode : {Boolean} `true` to enable item selection on change. `false` To remain on an item selection with a button.
* emptyOptionLabel : {String} the label to show in the empty option added when in `change mode`.
* addButtonLabel : {String} the label to display in the selector button.

Usage :
-------
This plugin will only take effect on `select` with `multiple` attribute.

    $("#MyMultiSelect").multiSelect();

We can also use it with options :

    $("#MyMultiSelect").multiSelect({enableChangeMode : true, emptyOptionLabel : "Empty Option"});