
// TODO: Switches with "width:auto;" should have the same size for both the on-
// and off label (pre calculate width of other state and apply to element)

/**
 * Template object for all flipswitches.
 */
var $switchTemplate = $("<span class='sl-flat sl-switch-enh' tabindex=0>").append(
	$("<span class=sl-switch-flip>"), $("<span class=sl-switch-space>"),
	$("<span class=sl-switch-text>")
);

/**
 * This method is called when a "visual" switch needs to be flipped and the
 * hidden associated SELECT element needs to toggle it's value.
 * @param {jQuery} $switchSelect The SELECT tag to update the actual value for
 * @param {jQuery} $switchVisual The switch that visually represents the value
 */
var switchFlip = function ($switchSelect, $switchVisual) {
	var valueCurrent = $switchSelect.val();
	var valueOn = $switchVisual.data("valueOn");
	var valueOff = $switchVisual.data("valueOff");
	var nextValue = valueOff;
	var nextLabel = $switchVisual.data("labelOff");
	var $flip = $switchVisual.find(".sl-switch-flip").removeClass("sl-switch-flip-on");
	if (valueCurrent === valueOff) {
		// needs on-switching
		nextValue = valueOn;
		nextLabel = $switchVisual.data("labelOn");
		$flip.addClass("sl-switch-flip-on");
	} // otherwise needs off-switching (which is default for unknown values too)
	$switchSelect.val(nextValue);
	$switchVisual.find(".sl-switch-text").text(nextLabel);
};

/**
 * Enhances a switch element.
 * @param {jQuery} $switchSelect The switch element (SELECT tag) to enhance
 */
var switchEnhance = function ($switchSelect) {
	// Clone the switch template
	var $switchVisual = $switchTemplate.clone().addClass($switchSelect.attr("class"));
	// add the visual switch right after the SELECT in the DOM
	// The original SELECT element will be hidden, but still in the DOM
	$switchSelect.after($switchVisual).hide();
	// Detect the $on and $off elements (automatically create when not specified)
	var $on = $switchSelect.find(".sl-switch-on");
	if ($on.length <= 0) { $on = $($switchSelect.find("option")[0]); }
	if ($on.length <= 0) { $on = $("<option value=1>").text("✓"); }
	var $off = $switchSelect.find(".sl-switch-off");
	if ($off.length <= 0) { $off = $($switchSelect.find("option")[1]); }
	if ($off.length <= 0) { $off = $("<option value=0>").text("×"); }
	// The switch needs the following information whenever it is flipped
	// The on/off-value (to apply to the original SELECT tag)
	// The on/off-text (to display next to the flipswitch)
	// The current value and label (to check whenever the switch is flipped)
	$switchVisual.data({
		valueOn: $on.val(), valueOff: $off.val(),
		labelOn: $on.text(), labelOff: $off.text()
	})
	// Flip the switch when it is clicked
	.click(function () {
		if ($switchSelect.is(":enabled")) { switchFlip($switchSelect, $switchVisual); }
	})
	// Flip the switch when it is focused and SPACE or ENTER is pressed (has @tabindex)
	.keyup(function (e) {
		if (e.keyCode === 32 || e.keyCode === 13) {
			e.preventDefault();
			if ($switchSelect.is(":enabled")) { switchFlip($switchSelect, $switchVisual); }
		}
	});
	// Flip the switch twice to make it display it's initial state
	for (var i = 0; i < 2; i += 1) { switchFlip($switchSelect, $switchVisual); }
};

$(function () {
	/* This method detects the initial DOM insert and later dynamic DOM inserts for
	 * any .sl-switch element.
	 * (This means switches are not enhanced in browsers without animationStart
	 * support, which is okay. The fallback is a select element.)
	 */
	$(document).on(EVENTS_ANIMATION_START, ".sl-switch", function (e) {
		if (e.originalEvent.animationName === "slNodeInserted") { switchEnhance($(e.target)); }
	});
});
