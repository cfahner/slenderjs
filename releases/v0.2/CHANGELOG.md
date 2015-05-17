# CHANGELOG 0.2; YYYY-MM-DD; POPUPDATE

Popups have been given some extra attention.

## Unreleased

* Forms can now submit to a popup.
* A scroll event that automatically defers the real scroll event so it is not spammed
* Added `.sl-smooth-anchor` which scrolls smoothly to the link target
* Fixed textareas only allowing a single line of text in firefox
* Added `.sl-zoomable`, which causes the given element to receive `slzoom`
  events (which are triggered by mousewheel or touch pinching)

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

## Deprecated

* Deprecated the `data-styled` attribute on elements that open a popup

## Fixed

* Fixed a bug where the wrong element would receive focus after a popup was
  closed
