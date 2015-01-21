/** Key used for storing the ViewId in jQuery data. */
var DATA_VIEW_ID = "SlenderViewId";

/** Contains all view prototype definitions. */
var VIEW_PROTOTYPES = { };

/** Counter for generating unique ViewIds. */
var VIEW_ID_COUNTER = 1;

/** Contains all view instances, associated by ViewId. */
var VIEWS = { };

/**
 * Superclass for all custom enhanced views.
 * @since 1.0
 * @author C. Fahner
 */
Slender.View = function () { }

/**
 * Enhances the DOM element associated with this view.
 * @since 1.0
 * @param {number} id The ViewId that has been assigned to this view
 * @param {object} element The DOM element to enhance
 */
Slender.View.prototype.enhance = function (id, element) {
	this.viewId = id;
	this.element = element;
	this.onEnhance();
};

/**
 * Removes any previous enhancements to the associated DOM element and removes
 * any references to the DOM element and ViewId.
 * @since 1.0
 */
Slender.View.prototype.restore = function () {
	this.onRestore();
	delete this.viewId;
	delete this.element;
};

/**
 * Defines a new custom view that enhances it's assigned DOM element.
 * <p>Custom views are invoked using the "data-view" attribute on a DOM element.
 * When naming custom view, use proper namespacing. For example, instead of
 * "MyView" use "slender.MyView" or "my_namespace.MyView".</p>
 * <p>The view prototype must at least define an 'onEnhance' and an 'onRestore'
 * method.</p>
 * @since 1.0
 * @param {string} name The namespaced name of the view
 * @param {object} blueprint The blueprint of the custom view
 */
Slender.defineView = function (name, blueprint) {
	VIEW_PROTOTYPES[name] = blueprint;
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
		var blueprint = VIEW_PROTOTYPES[viewName];
		if (!blueprint) { console.log("undefined view: " + viewName); return; }
		var viewId = VIEW_ID_COUNTER;
		VIEW_ID_COUNTER += 1;
		var view = Object.create(Slender.View.prototype);
		for (var i in blueprint) { view[i] = blueprint[i]; }
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

Slender.defineView("Slender.TestView", {

	onEnhance: function () { this.element.text("Enhanced"); },

	onRestore: function () { this.element.text("Restored"); }

});

// enhance initial page after document ready
$(function () {
	// Since Slender is not yet a single-page-application, we can just enhance the
	// entire page once on every load. If AJAX navigation is implemented, the
	// enhancement methods need to be called whenever the visitor navigates.
	Slender.enhanceViews($("body"));
});
