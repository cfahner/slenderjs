/** Key used for storing the ViewId in jQuery data. */
var DATA_VIEW_ID = "SlenderViewId";

/** Contains all view constructors, associated by view name. */
var VIEW_CONSTRUCTORS = { };

/** Counter for generating unique ViewIds. */
var VIEW_ID_COUNTER = 1;

/** Contains all view instances, associated by ViewId. */
var VIEWS = { };

try {
	Object.defineProperty(Slender, "viewConstructors", { get: function () { return VIEW_CONSTRUCTORS; } });
	Object.defineProperty(Slender, "viewInstances", { get: function () { return VIEWS; } });
} catch (e) { // IE8
	Slender.viewConstructors = VIEW_CONSTRUCTORS;
	Slender.viewInstances = VIEWS;
}

/**
 * Superclass for all custom enhanced views.
 * @since 1.0
 * @constructor
 * @author C. Fahner
 */
Slender.View = function () { };

/**
 * Enhances the DOM element associated with this view.
 * @since 1.0
 * @param {number} id The ViewId that has been assigned to this view
 * @param {object} element The DOM element to enhance
 */
Slender.View.prototype.enhance = function (id, element) {
	this.viewId = id;
	this.element = element;
	this.onEnhance && this.onEnhance();
};

/**
 * Removes any previous enhancements to the associated DOM element and removes
 * any references to the DOM element and ViewId.
 * @since 1.0
 */
Slender.View.prototype.restore = function () {
	this.onRestore && this.onRestore();
	delete this.viewId;
	delete this.element;
};

/**
 * A view implementation for views that are defined as inline objects.
 * @since 1.0
 * @constructor
 * @param {object} blueprint The view's blueprint
 */
Slender.InlineView = function (blueprint) {
	if (typeof blueprint !== "object") { throw TypeError("InlineView requires object blueprint"); }
	for (var i in blueprint) { this[i] = blueprint[i]; }
	Slender.View.call(this);
};
Slender.InlineView.prototype = Object.create(Slender.View.prototype);
Slender.InlineView.prototype.constructor = Slender.InlineView;

/**
 * Defines a new custom view that enhances it's assigned DOM element.
 * <p>Custom views are invoked using the "data-view" attribute on a DOM element.
 * When naming custom view, use proper namespacing. For example, instead of
 * "MyView" use "slender.MyView" or "my_namespace.MyView".</p>
 * <p>The view prototype must at least define an 'onEnhance' and an 'onRestore'
 * method.</p>
 * @since 1.0
 * @param {string} name The namespaced name of the view
 * @param {function|object} blueprint Either a constructor function for the
 *  view or an object that will be converted into a Slender.InlineView
 */
Slender.defineView = function (name, blueprint) {
	if (typeof blueprint == "object") {
		var inline = function () {
			Slender.InlineView.call(this, blueprint);
		};
		inline.prototype = Object.create(Slender.InlineView.prototype);
		inline.prototype.constructor = inline;
		VIEW_CONSTRUCTORS[name] = inline;
	}
	else if (typeof blueprint == "function") { VIEW_CONSTRUCTORS[name] = blueprint; }
};

/**
 * Enhances all custom views defined in the given root DOM element.
 * <p>Sets a ViewId in the jQuery data for each enhanced element. The ViewId is
 * stored using the key "SlenderViewId".</p>
 * @since 1.0
 * @param {object} root The root DOM element to recursively enhance
 */
Slender.enhanceViews = function (root) {
	$(root).find("[data-view]").each(function () {
		if ($(this).data(DATA_VIEW_ID)) { return; } // already enhanced
		var viewName = $(this).attr("data-view");
		if (!VIEW_CONSTRUCTORS[viewName]) {
			console.log("No constructor for view, ", viewName);
			console.trace && console.trace();
			return;
		}
		var view = new VIEW_CONSTRUCTORS[viewName];
		if (!(view instanceof Slender.View)) {
			console.log("Not a view, ", viewName, ", ", view);
			console.trace && console.trace();
			return;
		}
		var viewId = VIEW_ID_COUNTER;
		VIEW_ID_COUNTER += 1;
		VIEWS[viewId] = view;
		$(this).data(DATA_VIEW_ID, viewId);
		view.enhance(viewId, $(this));
	});
};

/**
 * Removes all enhancements from all custom views defined in the given root
 * DOM element.
 * @since 1.0
 * @param {object} root The root DOM element to recursively remove enhancements
 *  from
 */
Slender.restoreViews = function (root) {
	$(root).find("[data-view]").each(function () {
		var viewId = $(this).data(DATA_VIEW_ID);
		if (!viewId) { return; } // not enhanced
		VIEWS[viewId].restore();
		delete VIEWS[viewId];
		$(this).removeData(DATA_VIEW_ID);
	});
};

/**
 * A view used for testing.
 * @since 1.0
 * @constructor
 */
Slender.TestView = function () { };
Slender.TestView.prototype = Object.create(Slender.View.prototype);
Slender.TestView.prototype.constructor = Slender.TestView;

/** @override Slender.View */
Slender.TestView.prototype.onEnhance = function () {
	this.element.text("Enhanced " + this.viewId);
};

/** @override Slender.View */
Slender.TestView.prototype.onRestore = function () {
	this.element.text("Restored " + this.viewId);
};
// Define a TestView
Slender.defineView("Slender.TestView", Slender.TestView);
Slender.defineView("Slender.TestInlineView", {
	onEnhance: function () { this.element.text("Enhanced " + this.viewId); },
	onRestore: function () { this.element.text("Restored " + this.viewId); }
});

// enhance initial page after document ready
$(function () {
	// Since Slender is not yet a single-page-application, we can just enhance the
	// entire page once on every load. If AJAX navigation is implemented, the
	// enhancement methods need to be called whenever the visitor navigates.
	Slender.enhanceViews($("body"));
});
