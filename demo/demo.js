(function ($) {

    function initialization() {
        var multiSelect = $("#multiSelect").on("change", function() {
			console.log("change detected");
        }).multiSelect();
        $("#multiSelect2").on("change", function () {
            console.log("change detected");
        }).multiSelect({
            enableChangeMode: true,
            emptyOptionLabel: "no value"
        });
        $("#destroyMultiSelect").on("click", function (event) {
            event.preventDefault();
            multiSelect.multiSelect("destroy");
        });
        $("form").on("submit", function (event) {
            event.preventDefault();
            console.log($(this).serialize());
        });
    }

    $(document).ready(initialization);
})(jQuery);