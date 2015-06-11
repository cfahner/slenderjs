// Calculates the distance between two points
// coords should be an array with two objects containing an x and y value
var zoomable_touch_dist = function (coords) {
	var x2 = Math.pow(coords[0].x - coords[1].x, 2);
	var y2 = Math.pow(coords[0].y - coords[1].y, 2);
	return Math.sqrt(x2 + y2);
};

// Calculates the point in the center of the given (two) points
// coords should be an array with two objects containing an x and y value
var zoomable_touch_origin = function (coords) {
	return {
		x: (coords[0].x + coords[1].x) / 2,
		y: (coords[0].y + coords[1].y) / 2
	};
};

// Zoom implementation for mouse(wheel) users
// Obtaining a consistent scroll speed cross-browser is very difficult,
// therefore steps of 2% are used instead (depending on the scroll direction)
$(document).on("wheel mousewheel DOMMouseScroll", ".sl-zoomable", function (e) {
	e = e.originalEvent;
	var direction = (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;
	$(this).trigger({
		type: "slzoom",
		zoomFactor: direction > 0 ? 1.02 : 1/1.02, // 2% per step
		zoomOriginX: e.pageX,
		zoomOriginY: e.pageY
	});
	// prevent scrolling the page (or any containing elements)
	e.stopPropagation();
	e.preventDefault();
});

// Zoom implementation for users on a touch device
$(document).on("touchstart", ".sl-zoomable", function (e) {
	var touches = e.originalEvent.touches;
	if (!touches || touches.length !== 2) { return; }
	e.preventDefault();
	var coords = [
		{ x: touches[0].pageX, y: touches[0].pageY },
		{ x: touches[1].pageX, y: touches[1].pageY }
	];
	$(this).data("sl-zoompinching", true);
	$(this).data("sl-zoomdist", zoomable_touch_dist(coords));
	$(this).data("sl-zoomorig", zoomable_touch_origin(coords));
}).on("touchmove", ".sl-zoomable", function (e) {
	var touches = e.originalEvent.touches;
	if (!touches || touches.length !== 2 || !$(this).data("sl-zoompinching")) { return; }
	e.preventDefault();
	e.stopPropagation();
	var coords = [
		{ x: touches[0].pageX, y: touches[1].pageY },
		{ x: touches[1].pageX, y: touches[1].pageY }
	];
	var dist = zoomable_touch_dist(coords);
	var prevDist = $(this).data("sl-zoomdist");
	var scale = dist / prevDist;
	$(this).data("sl-zoomdist", dist); // update the zoom distance
	if (scale < .5 || scale > 2) { return; }
	$(this).trigger({
		type: "slzoom",
		zoomFactor: scale,
		zoomOriginX: $(this).data("sl-zoomorig").x,
		zoomOriginY: $(this).data("sl-zoomorig").y
	});
}).on("touchend", ".sl-zoomable", function (e) {
	var touches = e.originalEvent.touches;
	if (touches && touches.length < 2) { $(this).data("sl-zoompinching", false); }
});
