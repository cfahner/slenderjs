# CHANGELOG 0.3; YYYY-MM-DD; UPDATE FRIENDLY NAME

Section for the most notable changes.

## Unreleased

* The `.sl-popyield` element is now able to specify `@data-popyield`, which
  returns the attribute value to the element that opened the initial popup when
  it is clicked. An additional `@data-popyield-type` can set a hint about the
  type of data returned. Otherwise plaintext data should be assumed. Can be
  combined with `.sl-popclose` to close the popup immediately.
* Added `slscroll` event for `.sl-onscroll` elements (which fires after a delay)
* Added `.sl-movable` wich adds the `slmove` event to an element which combines
  touch and mouse dragging into a single event
* Added `.sl-tcolor.sl-action-*`, `.sl-tcolor-contrast.sl-action-*`,
  `.sl-bgcolor.sl-action-*`, `.sl-bordercolor.sl-action-*` and
  `.sl-bgcolor-contrast.sl-action-*` (which apply the given action color or a
  contrasted version of the action color to either text, background or borders).
* Added support for nested widgetgroups
* Added auto enhanced `title` attributes
* Flipswitch has no tabindex + does not inherit classes from origin SELECT

## Added

* Added `.sl-floatr` and `.sl-floatl` which float elements right and left
* Added `.sl-tprimary` and `.sl-tsecondary` which apply primary and secondary
  text colors to an element
* Added `.sl-tfat`, `.sl-tskew`, `.sl-tline`, `.sl-tuline` and `.sl-toline`
  which bolden, italicize, line-through, underline and overline text
  respectively (the line styles can be combined in any way)

## Deprecated

* Summation of deprecations

## Removed

* Summation of removals

## Fixed

* Updated to latest LessCSS
* Increased default font size to `16px` (from `15px`)
* Increased minimum popup width to `40%` (from `30%`)

## Security

* Summation of security related changes

