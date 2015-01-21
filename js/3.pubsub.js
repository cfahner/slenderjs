
// contains all active subscriptions
var ACTIVE_SUBS = { };

/**
 * Subscribes a given object and callback function to a given subscribable
 * event by name.
 * @since 1.0
 * @param {string} name The name of the subscription to subscribe to
 * @param {object} subscriber The context of callback execution
 * @param {function} callback The callback function to execute when a new event
 *  for the given subscription is published
 */
Slender.subscribe = function (name, subscriber, callback) {
	// create an empty array if no subscriptions have been made yet
	if (!(name in ACTIVE_SUBS)) { ACTIVE_SUBS[name] = [ ]; }
	// add the callback to the named subscription type
	ACTIVE_SUBS[name].push({ subber: subscriber, func: callback });
};

/**
 * Unsubscribes a callback function from a given subscribable event by name.
 * @since 1.0
 * @param {string} name The subscription event name to unsubscribe from
 * @param {function} callback The callback function to ubsubscribe
 */
Slender.unsubscribe = function (name, callback) {
	// no need to search if there are no subs for the given name
	if (!(name in ACTIVE_SUBS) || !ACTIVE_SUBS[name].length) { return; }
	// 
	ACTIVE_SUBS[name] = $.map(ACTIVE_SUBS[name], function (subscription) {
		if (subscription.func === callback) { return undefined; }
		else { return subscription; }
	});
};

/**
 * Publishes an event with optional event data.
 * @since 1.0
 * @param {string} name The name of the event to publish
 * @param {object} origin Reference to the publishing object
 * @param {object} data Optional data to submit with the event
 * @return {array} An array cotaining the return values of each callback
 */
Slender.publish = function (name, origin, data) {
	var results = [];
	// loop over each active sub and invoke it's callback, push the return value
	// to the results array
	$.each(ACTIVE_SUBS[name] || [], function (index, subscription) {
		if (!$.isFunction(subscription.func)) { return; }
		// call each in the context of the subscriber, using the data, origin
		// and event name as arguments
		results.push(subscription.func.apply(
			subscription.subber,
			[ data || { }, origin, name ]
		));
	});
	return results;
};
