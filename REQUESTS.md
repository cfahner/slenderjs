# Feature requests

Using the `.sl-popopen` class on forms should submit the form and open the
results in a new popup. An optional attribute `data-popaction` can be used to
use a different form action when submitting to a popup.

Elements using `.sl-popclose` should be able to specify a `data-popreturn`
attribute. The value of this attribute is posted to the element that opened the
popup once the popup is closed.

A popup stack that enables support for multiple popups on top of each other.

Non-modal popups.

Media / flag objects from css.

Fallback / shims for the HTML5 History API.

Official support + fallback for the HTML5 `details` and `summary` elements.

The following additional CSS classes:
* `.sl-jsonly`, the opposite of `.sl-nojs` (visible only with javascript)
* `.sl-landscape`, only visible in landscape mode
* `.sl-portrait`, only visible in portrait mode
* `.sl-screenw-medium`, only visible on medium-width screens
* `.sl-screenw-large`, only visible on large-width screens (any above medium)
* `.sl-screenw-small`, only visible on small-width screens (any below medium)

Use a default value of `medium` for the screenwidth attribute on `.sl-popopen`.

Better theming support (this includes the option to darken the default buttons),
options to change button text colors, options to change hover/border colors
(that default to darken/lighten).

A `.sl-zoomable` class, which will cause custom "zoomed" events to be triggered
on the element it is applied to (using mousewheels or pinching). The zoom event
object will contain a single relative zoom speed/direction property.

A `.sl-movable` class, which will trigger custom "moved" events to be triggered
on the element it is applied to (using mouse drag or touch). The moved event
object will contain the amount moved (relative to element size, percentage).
