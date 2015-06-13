# CHANGELOG 0.2; YYYY-MM-DD;

## Unreleased

* Forms can now submit to a popup.
* Added `.sl-smooth-anchor` which scrolls smoothly to the link target

## Added

* Added "support" for the following HTML5 elements: `article`, `aside`,
  `header`, `main`, `footer`, `section` and `nav`
* `Slender.defineView()` now also allows constructor functions instead of
  inlined view objects (these constructors must create `Slender.View`s)
* The `Slender.viewConstructors` property that contains a map of all defined
  view constructors
* The `Slender.viewInstances` property that contains a map of all view instances
* The popup state will now be tracked using a url hash. This means the back
  button can be used to close the popup.
* Added `.sl-border-color-*`, `.sl-background-color-*` and `.sl-text-color-*`
  that match action colors ( `@sl-color-`: `divider`, `do`, `danger`, `links` )
* Added `.sl-grid-medium` which (when added to a `.sl-grid`) does not stack
  child elements on medium sized screens
* Added `.sl-zoomable`, which causes the given element to receive `slzoom`
  events (which are triggered by mousewheel or touch events)
* Added the hash `#sl-scroll-` which scrolls the page (when the document is
  ready) to the suffixed numeric Y position

## Deprecated

* Deprecated the `data-styled` attribute on elements that open a popup, use
  `data-popstyled` instead

## Fixed

* Fixed a bug where the wrong element would receive focus after a popup was
  closed
* Fixed `.sl-switch` triggering a form submit onchange
* Fixed `fieldset`s not using the same border color as `hr` elements
* Fixed `textarea.sl-input`s only allowing a single line in some browsers
