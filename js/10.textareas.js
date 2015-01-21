/* Autogrow textareas, inspired by jQuery Mobile. Modified so the area shrinks/expands on focus change. */


var textAreaAutogrow = function ($area) {
	var scrollTop = $(window).scrollTop();
	// Set all heights to zero
	$area.css({ height: 0, "min-height": 0, "max-height": 0 });
	// Calculate border and scrollbar heights of the textarea and assign to the
	// 'height' var (which will eventually contain the new preferred height)
	var height = $area[0].scrollHeight
		+ parseFloat($area.css("border-top-width"))
		+ parseFloat($area.css("border-bottom-width"));
	// textareas use border-box box-sizing, so the new height should include padding
	// FF does not include padding in scrollHeight and clientHeight when no scrollbar visible
	// Since heights are set to 0 (see above), clientHeight will also be 0 if
	// padding is somehow not included, therefore padding-top and -bottom can
	// safely be added to the calculated height
	if ($area[0].clientHeight === 0) {
		height += parseFloat($area.css("padding-top"))
			+ parseFloat($area.css("padding-bottom"));
	}
	// Set the new height (no min/max height), add 15 to prevent scrollbars
	$area.css({ height: height + 15, "min-height": "", "max-height": "" });
	$(window).scrollTop(scrollTop);
};

var textAreaAutoShrink = function ($area) {
	$area.css({ height: "", "min-height": "", "max-height": "" });
}

$(document).on("keyup focus", "textarea", function () {
	// Unset any previously set shrink timeouts
	clearTimeout($(this).data("shrinkTimeout"));
	textAreaAutogrow($(this));
});
$(document).on("blur", "textarea", function () {
	var that = this;
	// Because of the shrinking of the textarea, some elements may come into
	// view where the blur event originated (a click), causing an unintended
	// click event to trigger on that element that just came in to view
	// Thats why there is a short delay
	$(this).data("shrinkTimeout", setTimeout(function () {
		textAreaAutoShrink($(that));
	}, 500));
});

