# CHANGELOG 0.3; YYYY-MM-DD; UPDATE FRIENDLY NAME

Section for the most notable changes.

## Unreleased

* Added the `.sl-popreturn` class that can be added to elements inside a popup
  that will return the (string) data in `@data-popreturn` to the element from
  which the popup was opened. If the current popup was opened from another
  popup, the data is returned to the element that opened the initial popup.
  The `.sl-popreturn` class can also set an `@data-popreturn-type` attribute to
  hint the type of data returned. The initial element will receive the data
  from the popup using the `slpopreturn` event.
* Added `slscroll` event for `.sl-onscroll` elements (which fires after a delay)
* Added support for 2000+ px wide screens
* Changed default font-size to 16px
* CSS has been updated to work with ems (which allows scaling by font-size)

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

