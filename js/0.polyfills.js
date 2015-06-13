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

// IE8 support for styling HTML5 sectioning elements
(function () {
	var html5 = "article|aside|header|main|footer|section|nav".split("|");
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
