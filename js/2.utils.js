/* Constant containing all animationstart prefixed event names */
var EVENTS_ANIMATION_START = "animationstart MSAnimationStart webkitAnimationStart oAnimationStart";

$(function () {
	/* Initial remove of all .sl-nojs elements. */
	$(".sl-nojs").hide();
	/* Removes all .sl-nojs elements from the page when DOM insert was detected. */
	$(document).on(EVENTS_ANIMATION_START, ".sl-nojs", function (e) {
		if (e.originalEvent.animationName === "slNodeInserted") { $(this).hide(); }
	});
	
	// Detect if the hash starts with 'sl-scroll-'
	if (window.location.hash.startsWith("#sl-scroll-")) {
		var scrollToY = window.location.hash.substr("#sl-scroll-".length);
		var currentX = window.pageXOffset || window.document.documentElement.scrollLeft;
		if ($.isNumeric(scrollToY)) { window.scrollTo(currentX, scrollToY); }
	}
});

/* See also: css/1.consts.less */
var BREAKPOINT_MEDIUM_EMS = "35em";
var BREAKPOINT_LARGE_EMS = "65em";
