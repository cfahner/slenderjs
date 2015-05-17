
var $LOADING = $("<div class=sl-tmid><div class='sl-ind sl-ind-load'></div></div>");
var $ERROR = $("<div class=sl-tmid><div class='sl-ind sl-ind-error'></div></div>");

// A reference to the currently active popup (there can only be one)
var $activePopup;

// A reference to the last focused element before a popup opened
var $lastFocus;

// @todo investigate effectiveness of translateZ(0px) on popups
var openPopup = function (contentUrl, opts) {
	if (typeof opts !== "object") { opts = { }; }
	// Remove any previously active popup
	closePopup();
	// Change the URL hash so the back button can be used to exit popups
	location.hash = "#sl-pop";
	// Define popup wrappers and other objects
	var $popBg = $("<div class=sl-popbg>");
	var $popWrap = $("<div class=sl-popwrap>");
	var $popContain = $("<div class=sl-popcontain>")
		.click(function (e) { if (e.target === this) { closePopup(); } });
	var $popContent = $("<div class=sl-pop tabindex=0>");
	var $popContentInner = $("<div>").html($LOADING);
	// If popup is in need of styling, add the '.sl-popstyled' class as a default styleable popup class
	if (opts.styled) { $popContent.addClass("sl-popstyled"); }
	$popContent.append($popContentInner);
	// Start an async request for the content of the popup
	$.ajax(contentUrl, {
		cache: false,
		success: function (data) {
			$popContentInner.html(data);
			Slender.enhanceViews($popContentInner);
		},
		error: function () { $popContentInner.html($ERROR); }
	});
	// Add the new popup elements to the document
	$("body").append($popBg);
	$("body").append($popWrap.html($popContain.html($popContent)));
	setTimeout(function () { $popContent.focus(); }, 0);
	// Replace the "active-popup" set with the current popup elements
	$activePopup = $popBg.add($popWrap);
}

/** Closes any currently active popup. */
var closePopup = function () {
	if (location.href.endsWith("#sl-pop")) { location.hash = ""; }
	$("body").find(".sl-popwrap, .sl-popbg").remove();
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
$(document).on("click", "a.sl-popclose", function (e) {
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
