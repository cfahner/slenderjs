# CHANGELOG 0.2.1; 2015-08-16;

This is a minor patch containing some fixes.

## Fixed

* Fixed an error being thrown when a custom `Slender.View` did not define their
  own `onEnhance` and `onRestore` functions
* Fixed `#sl-scroll-` not consistently scrolling to the given position
* Fixed scrolling to the top of the page after closing a popup
* Fixed `.sl-widgetgroup-h` and `.sl-widgetgroup-v` not being vertically
  aligned as `middle`
