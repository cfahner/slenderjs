# How to create a theme

Open `css/0.theme.less` and `css/icons.less`.

The `0.theme.less` file contains all themable properties for SlenderJS. Change
these colors/properties until your theme is satisfactory.

	> When inverting the color scheme (dark regular buttons, light action/danger
	> buttons), make sure you also reverse the backgound images of all icons in
	> `0.icons.less`. Do the same for any custom icons.

	> Add any custom `@font-face` declarations to the `0.theme.less` file as well.

Then build the `.less` files into a single `.css` file, and your theme is ready.
Any custom css can be appended to the file if needed. Keep a copy of your
custom `0.theme.less` (and in the case of custom icons, `0.icons.less`) to
easily change the theme again later.
