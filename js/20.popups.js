/* API ideas
 *  - Separate namespace: Slender.popups
 *  - Two classes: Popup and Modal
 *  - The constructor accepts the contents of the popup (HTML elements)
 *  - When a Modal opens, the URL hash changes to support back buttons
 *  - Modals are added to a stack of open popups which close one-by-one
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
 * @param {string|object} [contentUrl] The URL to load inside the popup
 */
var openPopup = function (contentUrl, opts) {
	if (typeof opts !== "object") { opts = { }; }
	// Remove any previously active popup
	closePopup();
	// Change the URL hash so the back button can be used to exit popups
	if (!location.href.endsWith("#sl-pop")) { location.hash = "#sl-pop"; }
	// If popup is in need of styling, add the '.sl-popstyled' class as a default styleable popup class
	var $content = $("<div>").append($popLoading);
	if (opts.styled) { $content.addClass("sl-popstyled"); } // deprecated 0.2
	// Start an async request for the content of the popup
	$.ajax(contentUrl, {
		cache: false,
		success: function (data) {
			//~ $content.html(data);
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
	if (location.href.endsWith("#sl-pop")) { location.hash = ""; }
	var $oldPopup = $("body").find(".sl-popwrap, .sl-popbg");
	Slender.restoreViews($oldPopup);
	$oldPopup.remove();
	if ($lastFocus) { $lastFocus.focus(); }
};

var getScreenWidthEms = function () {
	return $(window).width() / parseFloat($("body").css("font-size"));
}

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
$(document).on("click", ".sl-popopen", function (e) {
	var scrWidthRegex = /^([0-9]*(\.[0-9]+)?){1}(em|px)?$/;
	var dataScreenWidth = $(this).attr("data-screen-width");
	if (scrWidthRegex.test(dataScreenWidth) || dataScreenWidth === "medium" || dataScreenWidth === "large") {
		// Check for the keywords medium and large, replace with their "em" definitions
		if (dataScreenWidth === "medium") { dataScreenWidth = BREAKPOINT_MEDIUM_EMS; }
		else if (dataScreenWidth === "large") { dataScreenWidth = BREAKPOINT_LARGE_EMS; }
		var matches = scrWidthRegex.exec(dataScreenWidth);
		var minWidth = parseFloat(matches[1]);
		var unit = matches[3];
		if ((unit === 'em' && getScreenWidthEms() < minWidth)
			|| (unit === 'px' && $(window).width() < minWidth)
		) { return; } // follow url immediately if screen is not large enough
	}
	// Prevent following the link (if this is an A HREF element)
	e.preventDefault();
	// Mark the currently clicked element as the element that should regain
	// focus when the popup is closed
	$lastFocus = $(this);
	// Open a popup (closes any previous popups)
	openPopup(
		// The DATA-POPHREF attribute is preferred when opening the popup, this
		// attribute allows specifying a popup-only URL for the link clicked
		$(this).attr("data-pophref") || $(this).attr("href") || "", {
			// Check if the popup should be styled or not
			styled: $(this).attr("data-styled") === "true"
		}
	);
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
