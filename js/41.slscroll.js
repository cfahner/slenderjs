$(function () {

	var scrollDelay;

	var scrolling = false;

	Object.defineProperty(Slender, "scrolling", {
		get: function () { return scrolling; }
	});

	// collects scroll events and fires a single delayed slscroll event
	$(window).scroll(function () {
		scrolling = true;
		clearTimeout(scrollDelay);
		scrollDelay = setTimeout(function () {
			scrolling = false;
			$(".sl-onscroll").trigger({ type: "slscroll" });
		}, 350);
	});

});
