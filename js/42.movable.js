// Implements the slmove event on elements that have the ".sl-movable" class
// The slmove event is triggered whenever the element is dragged (either by
// mouse or by touch)

// mouse implementation for the slmove event on ".sl-movable" elements
$(document).on("mousedown", ".sl-movable", function (e) {
	// if the user is touching the current element, ignore movable events by mouse
	if ($(this).data("sl-movable-touching")) { return; }
	$(this).data("sl-moving", true);
	$(this).data("sl-move-origin", { x: e.screenX, y: e.screenY });
	e.stopPropagation();
	e.preventDefault();
}).on("mousemove", ".sl-movable", function (e) {
	// if the user is touching the current element, ignore movable events by mouse
	if ($(this).data("sl-movable-touching") || !($(this).data("sl-moving"))) { return; }
	var origin = $(this).data("sl-move-origin");
	var previous = $(this).data("sl-move-previous");
	$(this).trigger({
		type: "slmove",
		moveOriginX: origin.x,
		moveOriginY: origin.y,
		moveDiffX: event.screenX - origin.x,
		moveDiffY: event.screenY - origin.y,
		moveX: event.screenX - (previous ? previous.x : origin.x),
		moveY: event.screenY - (previous ? previous.y : origin.y)
	});
	$(this).data("sl-move-previous", { x: e.screenX, y: e.screenY });
	e.stopPropagation();
	e.preventDefault();
}).on("mouseup", ".sl-movable", function (e) {
	// if the user is touching the current element, ignore movable events by mouse
	if ($(this).data("sl-movable-touching")) { return; }
	$(this).data("sl-moving", false);
	e.stopPropagation();
	e.preventDefault();
});

// touch implementation for the slmove event on ".sl-movable" elements
$(document).on("touchstart", ".sl-movable", function (e) {
	var touches = e.originalEvent.touches;
	if (!touches || touches.length !== 1) { return; }
	$(this).data("sl-movable-touching", true);
	$(this).data("sl-moving", true);
	$(this).data("sl-move-origin", { x: touches[0].screenX, y: touches[0].screenY });
	e.stopPropagation();
	e.preventDefault();
}).on("touchmove", ".sl-movable", function (e) {
	var touches = e.originalEvent.touches;
	if (!touches || touches.length !== 1 || !($(this).data("sl-moving"))) { return; }
	var origin = $(this).data("sl-move-origin");
	$(this).trigger({
		type: "slmove",
		moveOriginX: origin.x,
		moveOriginY: origin.y,
		moveDiffX: touches[0].screenX - origin.x,
		moveDiffY: touches[0].screenY - origin.y
	});
	e.stopPropagation();
	e.preventDefault();
}).on("touchend", ".sl-movable", function (e) {
	var touches = e.originalEvent.touches;
	if (!touches || touches.length > 0) { return; }
	$(this).data("sl-movable-touching", false);
	$(this).data("sl-moving", false);
	e.stopPropagation();
	e.preventDefault();
});
