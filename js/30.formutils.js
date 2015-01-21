
var DELAYED_TEXTCHANGE_SELECTOR = "input, select, textarea";

// Set the initial "last-confirm" value when it is first focused
$(document).on("focus", DELAYED_TEXTCHANGE_SELECTOR, function () {
	if (typeof $(this).data("sl-last-confirm") !== "string") {
		$(this).data("sl-last-confirm", $(this).val());
	}
});

// After a delay of 500ms and if the value actually changed, the "delaytextchange" event is fired
$(document).on("change input paste keyup", DELAYED_TEXTCHANGE_SELECTOR, function () {
	var $self = $(this);
	clearTimeout($self.data("sl-current-timeout"));
	$self.data("sl-current-timeout", setTimeout(function () {
		if ($self.val() == $self.data("sl-last-confirm")) { return; }
		$self.data("sl-last-confirm", $self.val());
		$self.trigger("delaytextchange");
		console.log("delaytextchange: " + $self.val());
	}, 500));
});

console.log("defined delaytextchange");

// in case jQuery.val() is called, the last-confirm is updated
$.valHooks.text = { set: function (el, val) { $(el).data("sl-last-confirm", val); } };

// some inputs can be configured to automatically submit the nearest form
var FORM_SUBMIT_CALLBACK = function () { $(this).closest("form").submit(); };
$(document).on("change", ".sl-autosubmit", FORM_SUBMIT_CALLBACK)
	.on("delaytextchange", ".sl-autosubmit-delay", FORM_SUBMIT_CALLBACK);
