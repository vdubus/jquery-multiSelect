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
		 * The container which will contain the spans.
		 */
		_spanContainer : null,

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
			var selectContainer = $("<span />").addClass("vdubus-multiSelect-selectContainer").append(this._select);
			this._spanContainer = $("<span />").addClass("vdubus-multiSelect-spanContainer");
			this._container = $("<span />").addClass("vdubus-multiSelect").append(selectContainer).append(this._spanContainer);
			this.element.addClass("vdubus-multiSelect-hidden").after(this._container);

			this._on(this._container, {
				"click span.ui-icon.ui-icon-trash" : this._deleteSelectedValue
			});
			if (this.options.enableChangeMode) {
				// We must manage the empty option.
				var emptyOption = $("<option />").addClass("vdubus-multiSelect-emptyOption").attr("value", "").data("index", -1);
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

			// Each option should have an index in function of their position in the select.
			var index = 0;
			var options = this._select.find("option");
			for (; index < options.length; index++) {
				var tmpOpt = $(options[index]);
				tmpOpt.data("index", index);
			}

			// Manage the currents selected values.
			this._manageSelectedValue();

			// Remove unneeded attributes once we have synchronized our component.
			this._select.removeAttr("multiple").removeAttr("name").removeAttr("id");

			if (this.options.enableChangeMode) {
				// For Chrome compatibility, once we have manage the current selected value, we must select the first one.
				this._select.find("option:first").prop("selected", true);
			}
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
			var value = spanValue.data("value");
			var optToInsert = $("<option />").attr("value", value).text(spanValue.find("span.vdubus-multiSelect-value-text").text()).data("index", spanValue.data("index"));
			this._insertElementInOrder(optToInsert, this._select, "option");
			this.element.find("option[value='" + value + "']").prop("selected", false).trigger("change");
			
			// We must remove the element after we getting the data on it because the remove function delete them.
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
			var selectedOptions = this._select.find("option").filter(":selected");
			var index = 0;
			for (; index < selectedOptions.length; index++) {
				var option = $(selectedOptions[index]);
				var indexOpt = option.data("index");
				var button = $("<span />").addClass("vdubus-multiSelect-value-delete ui-icon ui-icon-trash");
				var span = $("<span />").addClass("vdubus-multiSelect-value-text").text(option.text());
				var spanToInsert = $("<span />").addClass("vdubus-multiSelect-value").append(span).append(button).data("index", indexOpt).data("value", option.prop("value"));
				this._insertElementInOrder(spanToInsert, this._spanContainer, "span.vdubus-multiSelect-value");
				this.element.find("option[value='" + option.prop("value") + "']").prop("selected", true);
			}

			// We must remove the element after we getting the data on it because the remove function delete them.
			selectedOptions.remove();
			if (index) {
				this.element.trigger("change");
			}
		},

		/**
		 * Insert an element in the order specified by data("index") into another element.
		 * 
		 * @param {jQuery} elementToInsert : the element to insert.
		 * @param {jQuery} elementForInsert : the element for the insert.
		 * @param {String} selector : the selector to find elements for insertion.
		 */
		_insertElementInOrder : function(elementToInsert, elementForInsert, selector) {
			var elements = elementForInsert.find(selector);
			var indexToInsert = elementToInsert.data("index") * 1;

			// We must find the position in which we must insert our element.
			var index = 0;
			var element = null;
			var inserted = false;
			for (; index < elements.length && !inserted; index++) {
				element = $(elements[index]);
				var elementIndex = element.data("index") * 1;
				if (elementIndex > indexToInsert) {
					element.before(elementToInsert);
					inserted = true;
				}
			}

			// Our element wasn't inserted, so it must be the first or the last.
			if (!inserted) {
				if (element) {
					// Our element was the first.
					element.after(elementToInsert);
				} else {
					// Our element was the last.
					elementToInsert.appendTo(elementForInsert);
				}
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