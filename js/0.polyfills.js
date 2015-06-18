/** Copyright (c) 2015, Slender JS (slendium.org) */

// Object.create() polyfill
// @since 1.0
// Based on: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
if (typeof Object.create != 'function') {
	Object.create = (function () {
		var f = function () { };
		return function (prototype) {
			if (typeof prototype != 'object') { throw TypeError('prototype must be an object'); }
			f.prototype = prototype;
			var out = new f();
			f.prototype = null;
			return out;
		};
	}());
}

// No-op fallback when no console object is available
if (typeof window.console !== "object") {
	window.console = {
		log: function (msg) { } // @since 1.0
	};
}

// IE8 support for styling HTML5 elements
(function () {
	var html5 = "article|aside|header|main|footer|section|nav|details|summary".split("|");
	for (var i = 0; i < html5.length; i += 1) { document.createElement(html5[i]); }
}());

// String.endsWith
if (typeof String.prototype.endsWith !== 'function') {
	String.prototype.endsWith = function (suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

// String.startsWith
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}

// requestAnimationFrame
(function() {
	var previous = 0;
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var now = new Date().getTime();
			var timeUntilNext = Math.max(0, 16 - (now - previous));
			previous = now + timeUntilNext;
			return window.setTimeout(function() {
				callback(now + timeUntilNext);
			}, timeUntilNext);
		};
	}
	if (!window.cancelAnimationFrame) { window.cancelAnimationFrame = clearTimeout; }
}());

// DETAILS,SUMMARY
// based on information provided here: https://mathiasbynens.be/notes/html5-details-jquery
(function (w) {

var supportDetails = !!("open" in window.document.createElement("details"));

var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';

var initSummary = function ($summary) {
	// do not reinitialize if this data has been set
	if ($summary.data("sl-summaryinit")) { return; }
	
	var $details = $summary.closest("details");
	// Only keep the node in the collection if it’s a text node containing more than only whitespace
	// http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#space-character
	var $contents = $details.contents().filter(function () {
		return this.nodeType == 3 && /[^ \t\n\f\r]/.test(this.data);
	}).wrap("<span>"); // and wrap in SPAN
	// Now all child nodes of the DETAILS element can be selected (except SUMMARY)
	var $togglable = $details.children(":not(summary)");
	// Set the initial state of the 'open' property
	$details.prop("open", typeof $details.attr("open") === "string");
	if ($details.prop("open")) { $togglable.show(); }
	else { $togglable.hide(); }
	// Improve accessibility using tabindex and button role
	$summary.attr("role", "button").prop("tabIndex", 0).click(function () {
		if ($details.prop("open")) {
			$details.prop("open", false).removeAttr("open");
			$togglable.hide();
		} else {
			$details.prop("open", true).attr("open", "");
			$togglable.show();
		}
	}).keyup(function (e) {
		if (e.keyCode == 32 || (e.keyCode == 13 && !isOpera)) {
			e.preventDefault();
			$summary.click();
		}
	});
	
	// prevent re-initialization
	$summary.data("sl-summaryinit", true);
};

$("html").addClass(supportDetails ? "sl-support-details" : "sl-support-nodetails");
if (!supportDetails) {
	$(document).on("slinitdetailssummary", "details summary", function () {
		if (!$(this).data("sl-summaryinit")) { initSummary($(this)); }
	});
	// force an initial details/summary initialization
	$(function () {
		$("details summary").trigger("slinitdetailssummary");
	});
}

}(window));
