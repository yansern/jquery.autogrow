/**
 * jquery.autogrow
 * v1.0.0 - Thu Oct 29 2015 10:30:23
 *
 * Fast, compact & accurate textarea autogrow plugin.
 *
 * Copyright (c) 2012-2015 Jensen Tonne
 * http://github.com/jstonne/jquery.autogrow
 * http://jstonne.com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
(function(factory){
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else {
		factory(jQuery);
	}
}(function($){

	var AUTOGROW_EVENTS = "input.autogrow";
	var AUTOGROW_TEXTAREA = "textarea[data-autogrow]";
	var toInt = parseInt;

	var grow = function(textarea) {

		var textareaStyle = textarea.style;
		textareaStyle.height = "";

		var computedStyle = getComputedStyle(textarea),
			minHeight = toInt(computedStyle.minHeight) || toInt(computedStyle.height),
			maxHeight = toInt(computedStyle.maxHeight),
			overflow,
			height;

		// Get scrollHeight
		textareaStyle.height = "0";
		var scrollHeight = textarea.scrollHeight;

		if (maxHeight > 0 && scrollHeight > maxHeight) {
			height = maxHeight;
			overflow = "auto";
		} else {
			height = (scrollHeight < minHeight) ? minHeight : scrollHeight;
			overflow = "hidden";
		}

		textareaStyle.height = height + "px";
		textareaStyle.overflow = overflow;

		return height;
	}

	// jQuery plugin
	$.fn.autogrow = function() {
		return this.off(AUTOGROW_EVENTS).on(AUTOGROW_EVENTS, function(){
			$(this).trigger("autogrow", [grow(this)]);
		});
	}

	// When document is ready, initialize autogrow
	// on existing textarea with data-autogrow.
	$(function(){
		$(AUTOGROW_TEXTAREA).autogrow();
	});

	// Lazy-initialize autogrow on first focus
	// for textarea that are added later on.
	$(document).on("focusin.autogrow", AUTOGROW_TEXTAREA, function(){
		$(this).autogrow();
	});

}));