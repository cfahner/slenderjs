# CHANGELOG 0.3; 2015-12-16;

## Added

* Added `.sl-floatr` and `.sl-floatl` which float elements right and left
* Added `.sl-tprimary` and `.sl-tsecondary` which apply primary and secondary
  text colors to an element
* Added `.sl-tfat`, `.sl-tskew`, `.sl-tline`, `.sl-tuline` and `.sl-toline`
  which bolden, italicize, line-through, underline and overline text
  respectively (the line styles can be combined in any way)
* Added `.sl-onscroll` which fires the `slscroll` event after the user has
  finished scrolling
* Added the property `Slender.scrolling` (script) which indicates the current
  scroll state, which allows heavy work to be delayed until the user is done
  scrolling (using the `slscroll` event)
* Added `.sl-movable` which fires the `slmove` event when the user tries to
  move the element
* Added `.sl-popyield` which submits popup data to the element that initially
  opened the popup(s)
* Added support for nested widgetgroups (horizontal inside vertical only)

## Deprecated

* Deprecated `.sl-mwidth`

## Fixed

* Updated to latest LessCSS
* Increased default font size to `16px` (from `15px`)
* Increased minimum popup width to `40%` (from `30%`)
* Fixed `.sl-switch` not being accessible by keyboard
