/* API ideas
 *  - Two types: Popup and Modal
 *  - Inserting HTML directly into a popup
 *  - Modal popups use a stack (that can be navigated backwards in)
 */

// The contents of the popup used while still loading
var $popLoading = $("<div class=\"sl-tmid sl-block-styled\">").append(
	$("<span class=\"sl-ind sl-ind-load\">")
);

// The contents of the popup used when an error occurs
var $popError = $("<div class=\"sl-tmid sl-block-styled\">").append(
	$("<span class=\"sl-ind sl-ind-error\">")
);

// A reference to the last focused element before a popup opened
var $lastFocus;

/**
 * Opens a central overlay popup.
 * @todo Investigate effectiveness of translateZ(0) on popups
 * @param {string} [opts.contentUrl] The URL to load inside the popup
 * @param {string} [opts.method='GET'] The HTTP method to use
 * @param {boolean} [opts.cache=false] Cache the contents of the popup
 * @param {boolean} [opts.styled=false] Style the contents of the popup
 */
var openPopup = function (opts) {
	if (typeof opts !== "object") { opts = { }; }
	// Remove any previously active popup
	closePopup();
	// Change the URL hash so the back button can be used to exit popups
	if (!location.href.endsWith("#sl-pop")) { location.hash = "#sl-pop"; }
	// If popup is in need of styling, add the '.sl-popstyled' class as a default styleable popup class
	var $content = $("<div>").append($popLoading);
	if (opts.styled) { $content.addClass("sl-popstyled"); }
	// Start an async request for the content of the popup
	$.ajax(opts.contentUrl, {
		type: opts.method || "GET",
		cache: !!opts.cache,
		success: function (data) {
			$content.html(data);
			$content.find("details summary").trigger("slinitdetailssummary");
			Slender.enhanceViews($content);
		},
		error: function () { $content.html($popError); }
	});
	// Add the new popup elements to the document
	$("body").append(
		$("<div class=sl-popbg>"), // the popup backdrop
		$("<div class=sl-popwrap>").append( // screen overlay container
			$("<div class=sl-popcontain>").append( // clickable screen overlay
				$("<div class=sl-pop tabindex=0>").html($content) // actual popup box
			).click(function (e) { if (e.target === this) { closePopup(); } })
		)
	);
	setTimeout(function () { $content.parent().focus(); }, 0);
}

/** Closes any currently active popup. */
var closePopup = function () {
	if (location.href.endsWith("#sl-pop")) { location.hash = "_"; }
	var $oldPopup = $("body").find(".sl-popwrap, .sl-popbg");
	Slender.restoreViews($oldPopup);
	$oldPopup.remove();
	if ($lastFocus) { $lastFocus.focus(); }
};

var getScreenWidthEms = function () {
	return $(window).width() / parseFloat($("body").css("font-size"));
}

// Regex for parsing any screen widths passed to popup functions
var POPUP_SCREENWIDTH_REGEX = /^([0-9]*(\.[0-9]+)?){1}(em|px)?$/;

/**
 * Checks if a popup should be opened based on the given value.
 * <p>The given value can be a number (or a string in px or em), or can be the
 * keywords "medium" or "large".</p>
 * @param {string} require The required screen width before the popup is opened
 * @return {boolean} TRUE if the popup should be opened based on the given
 *  required screen width value, FALSE otherwise. Defaults to TRUE when the
 *  given value cannot be parsed.
 */
var shouldOpenPopup = function (require) {
	if (POPUP_SCREENWIDTH_REGEX.test(require) || require === "medium" || require === "large") {
		// Check for the keywords medium and large, replace with their "em" definitions
		if (require === "medium") { require = BREAKPOINT_MEDIUM_EMS; }
		else if (require === "large") { require = BREAKPOINT_LARGE_EMS; }
		// parse the given screen width value
		var matches = POPUP_SCREENWIDTH_REGEX.exec(require);
		var minWidth = parseFloat(matches[1]);
		var unit = matches[3];
		// if suggested width does not exceed actual width, popup should not be
		// opened (default action should be followed instead)
		if ((unit === 'em' && getScreenWidthEms() < minWidth)
			|| (unit === 'px' && $(window).width() < minWidth)
		) { return false; }
	}
	return true;
};

/**
 * Returns the openPopup() options given by the data- attributes on the given
 * element.
 * @param {jQuery} $e The jQuery object of the element to check
 * @return {object} An object with popup options
 */
var popup_getOptsFromElement = function ($e) {
	var data = { };
	if ($e.is("form")) {
		var form = $e.serializeArray();
		for (var i in form) { data[form[i].name] = data[form[i].value]; }
	}
	return {
		// The DATA-POPHREF attribute is preferred when opening the popup, this
		// attribute allows specifying a popup-only URL for the link clicked
		// In case the element is a form, @action is also allowed
		contentUrl: $e.attr("data-pophref") || $e.attr("href")
			|| $e.attr("action") ||  "",
		
		// DATA-POPMETHOD specifies the HTTP method to use, falls back to
		// @method in case of a form, otherwise simply uses GET
		method: $e.attr("data-popmethod") || $e.attr("method") || "GET",
		
		// Any additional data to send with the XHR
		data: data,
		
		// Determines if the popup should be styled or not
		// @data-styled is deprecated since 0.2
		styled: $e.attr("data-styled") === "true" || $e.attr("data-popstyled") === "true",
		
		// Determines if the popup should be opened
		open: shouldOpenPopup($e.attr("data-screen-width")),
		
		// only here to prevent any trailing comma errors
		dummy: 0
	};
};

/*
 * All elements with the ".sl-popopen" class attached will open a popup when
 * clicked. The contents of the popup are determined by the "href" attribute
 * if set.
 * <p>The "data-screen-width" attribute can be added to the ".sl-popopen" element
 * to set a required minimum screen width for opening a popup. If this
 * requirement is not met, the link will be followed instead.</p>
 * <p>An alternative popup URL can be set using the "data-pophref" attribute.
 * This URL will be used for the popup instead (compared to the 'normal' URL
 * when the link is followed).</p>
 */
$(document).on("click", ".sl-popopen:not(form)", function (e) {
	var popupOpts = popup_getOptsFromElement($(this));
	// check if a popup should even be opened before continuing
	if (!popupOpts.open) { return; } // follow link or other click action
	// Prevent following the link (if this is an A HREF element)
	e.preventDefault();
	// Mark the currently clicked element as the element that should regain
	// focus when the popup is closed
	$lastFocus = $(this);
	// Open a popup (closes any previous popups)
	openPopup(popupOpts);
});

$(document).on("submit", "form.sl-popopen", function (e) {
	var popupOpts = popup_getOptsFromElement($(this));
	// check if the popup should even be opened before continuing
	if (!popupOpts.open) { return; } // submit the form
	// prevent submitting the form otherwise
	e.preventDefault();
	// The first available :submit is focused after the popup is closed
	$lastFocus = $($(this).find(":submit")[0]);
	// Open a popup (closes any previous popups)
	openPopup(popupOpts);
});

// prevent following the .sl-popclose links when placed inside a popup
$(document).on("click", ".sl-popclose", function (e) {
	if ($(this).closest(".sl-pop").length > 0) {
		e.preventDefault();
		closePopup();
	}
});

$(document).keydown(function (e) {
	if (e.which === 27) { closePopup(); } // ESC key
});

$(window).on("hashchange", function (e) {
	if (e.originalEvent.oldURL.endsWith("#sl-pop")
		&& !e.originalEvent.newURL.endsWith("#sl-pop")
	) { closePopup(); }
});
