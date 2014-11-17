(function($) {
	$.widget("vdubus.multiSelect", {

		options : {

			/**
			 * Allow us to enable the update of the component on change in place of the validate button.
			 */
			enableChangeMode : false,

			/**
			 * If enableChangeMode is true, then we must add an empty default option to allow the change event correctly.<br />
			 * This is the label of this empty option.
			 */
			emptyOptionLabel : null,

			/**
			 * If enableChangeMode is false, then we must use a button to add items in the list.<br />
			 * This is the label of this button.
			 */
			addButtonLabel : "Add"
		},

		/**
		 * The container of this multiSelect.
		 */
		_container : null,

		/**
		 * The current name of the select.
		 */
		_elementName : null,

		/**
		 * The select to manipulate.
		 */
		_select : null,

		/**
		 * Create the multiSelect component.
		 */
		_create : function() {
			if (!this.element.length || this.element[0].tagName !== "SELECT" || !this.element.prop("multiple")) {
				// We don't manage this element.
				return;
			}
			this._elementName = this.element.prop("name");
			this._select = this.element.clone();
			this._container = $("<span />").addClass("vdubus-multiSelect").append(this._select);
			this.element.addClass("vdubus-multiSelect-hidden").after(this._container);

			this._on(this._container, {
				"click span.ui-icon.ui-icon-trash" : this._deleteSelectedValue
			});
			if (this.options.enableChangeMode) {
				// We must manage the empty option.
				var emptyOption = $("<option />").addClass("vdubus-multiSelect-emptyOption").attr("value", "");
				if (this.options.emptyOptionLabel) {
					// If a label is available, then we use it.
					emptyOption.text(this.options.emptyOptionLabel);
				}
				emptyOption.prependTo(this._select);
				this._on(this._select, {
					"change" : this._manageSelectedValue
				});
			} else {
				// We must use the button mode.
				var addButton = $("<button />").addClass("vdubus-multiSelect-addButton").text(this.options.addButtonLabel).insertAfter(this._select);
				this._on(this._container, {
					"click button.vdubus-multiSelect-addButton" : this._addButtonClick
				});
			}

			// Manage the currents selected values.
			this._manageSelectedValue();
			
			// Remove unneeded attributes once we have synchronized our component.
			this._select.removeAttr("multiple").removeAttr("name").removeAttr("id");
		},

		/**
		 * Action to do on delete value action.
		 * 
		 * @param {Event} event : event object.
		 */
		_deleteSelectedValue : function(event) {
			event.preventDefault();
			this._moveBackValue($(event.target).parent());
		},

		/**
		 * Move a selected value back to the select.
		 * 
		 * @param {jQuery} spanValue : the value to move back.
		 */
		_moveBackValue : function(spanValue) {
			var inputHidden = spanValue.find("input");
			$("<option />").attr("value", inputHidden.val()).text(spanValue.find("span.vdubus-multiSelect-value-text").text()).appendTo(this._select);
			this.element.find("option[value='" + inputHidden.val() + "']").prop("selected", false).trigger("change");
			spanValue.remove();
		},

		/**
		 * Action executed on the click of the add button.
		 * 
		 * @param {Event} event : the event object.
		 */
		_addButtonClick : function(event) {
			event.preventDefault();
			this._manageSelectedValue();
		},

		/**
		 * Manage the current selected values to display them under the select.
		 */
		_manageSelectedValue : function() {
			var selectedOptions = this._select.find("option").filter(":selected").remove();
			var index = 0;
			for (; index < selectedOptions.length; index++) {
				var option = $(selectedOptions[index]);
				var input = $("<input />").attr("type", "hidden").attr("value", option.prop("value"));
				var button = $("<span />").addClass("vdubus-multiSelect-value-delete ui-icon ui-icon-trash");
				var span = $("<span />").addClass("vdubus-multiSelect-value-text").text(option.text());
				$("<span />").addClass("vdubus-multiSelect-value").append(input).append(span).append(button).appendTo(this._container);
				this.element.find("option[value='" + option.prop("value") + "']").prop("selected", true);
			}
			if (index) {
				this.element.trigger("change");
			}
		},

		/**
		 * Destroy the component.
		 */
		_destroy : function() {
			if (!this._container) {
				return;
			}
			this.element.removeClass("vdubus-multiSelect-hidden");
			this._container.remove();
		}
	});
})(jQuery);