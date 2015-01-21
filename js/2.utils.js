/* Constant containing all animationstart prefixed event names */
var EVENTS_ANIMATION_START = "animationstart MSAnimationStart webkitAnimationStart oAnimationStart";

$(function () {
	/* Initial remove of all .sl-nojs elements. */
	$(".sl-nojs").remove();
	/* Removes all .sl-nojs elements from the page when DOM insert was detected. */
	$(document).on(EVENTS_ANIMATION_START, ".sl-nojs", function (e) {
		if (e.originalEvent.animationName === "slNodeInserted") { $(this).remove(); }
	});
});

/* See also: css/1.consts.less */
var BREAKPOINT_MEDIUM_EMS = "35em";
var BREAKPOINT_LARGE_EMS = "65em";
