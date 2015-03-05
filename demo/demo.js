(function($) {

	function initialization() {

		var multiSelect = $("#multiSelect").on("change", function() {
			console.log("change detected");
		}).multiSelect();

		var multiSelect2 = $("#multiSelect2").on("change", function() {
			console.log("change detected");
		}).multiSelect({
			enableChangeMode : true,
			emptyOptionLabel : "no value"
		});

		// This button must destroy the first multiselect component.
		$("#destroyMultiSelect").on("click", function(event) {
			event.preventDefault();
			if(multiSelect.data("vdubus-multiSelect")){
				multiSelect.multiSelect("destroy");
			}
			if(multiSelect2.data("vdubus-multiSelect")){
				multiSelect2.multiSelect("destroy");
			}
		});
		$("#createMultiSelect").on("click", function(event) {
			event.preventDefault();
			if(!multiSelect.data("vdubus-multiSelect")){
				multiSelect.multiSelect();
			}
			if(!multiSelect2.data("vdubus-multiSelect")){
				multiSelect2.multiSelect({
					enableChangeMode : true,
					emptyOptionLabel : "no value"
				});
			}
		});
		

		// This button will update the available options in the select.
		$("#addValueInMultiSelect").on("click", function(event) {
			event.preventDefault();
			var newValue = +multiSelect.find("option").last().prop("value") + 1;
			$("<option />").prop("value", newValue).text("Value " + newValue).appendTo(multiSelect);
			if (multiSelect.data("vdubus-multiSelect")) {
				multiSelect.multiSelect("refresh");
			}

			// Add new element in second multiselect.
			newValue = +multiSelect2.find("option").last().prop("value") + 1;
			$("<option />").prop("value", newValue).text("Value " + newValue).appendTo(multiSelect2);
			if (multiSelect2.data("vdubus-multiSelect")) {
				multiSelect2.multiSelect("refresh");
			}
		});

		// This form will verify le selected values.
		$("form").on("submit", function(event) {
			event.preventDefault();
			var message = "MultiSelect 1 = " + multiSelect.val();
			message += "\nMultiSelect 2 = " + multiSelect2.val();
			console.log(message);
			alert(message);
		});
	}

	$(document).ready(initialization);
})(jQuery);