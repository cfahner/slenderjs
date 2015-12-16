# CHANGELOG 0.4; YYYY-MM-DD; UPDATE FRIENDLY NAME

Section for the most notable changes.

## Unreleased

* Added support for a generic list of actions (custom action colors)
* Added `.sl-tcolor.sl-action-*`, `.sl-tcolor-contrast.sl-action-*`,
  `.sl-bgcolor.sl-action-*`, `.sl-bordercolor.sl-action-*` and
  `.sl-bgcolor-contrast.sl-action-*` (which apply the given action color or a
  contrasted version of the action color to either text, background or borders).
* Added auto enhanced `title` attributes
* Remove `html { height: 100%; }`, it causes android browser to not allow scroll
* Using the `.sl-popopen` class on forms should submit the form and open the
  results in a new popup. An optional attribute `data-popaction` can be used to
  use a different form action when submitting to a popup.
* Fallback / shims for the HTML5 History API.
* `.sl-jsonly`, the opposite of `.sl-nojs` (visible only with javascript)
* `.sl-landscape`, only visible in landscape mode
* `.sl-portrait`, only visible in portrait mode
* `.sl-screenw-medium`, only visible on medium-width screens
* `.sl-screenw-large`, only visible on large-width screens (any above medium)
* `.sl-screenw-small`, only visible on small-width screens (any below medium)
* Use a default value of `medium` for the screenwidth attribute on `.sl-popopen`

## Added

* Summation of additions

## Deprecated

* Summation of deprecations

## Removed

* Summation of removals

## Fixed

* Summation of fixes

## Security

* Summation of security related changes

