/**
 * The EventTiming plugin collects paint metrics exposed by the WICG
 * [Event Timing]{@link https://github.com/WICG/event-timing/} proposal.
 *
 * For information on how to include this plugin, see the {@tutorial building} tutorial.
 *
 * ## Beacon Parameters
 *
 * All beacon parameters are prefixed with `et.`.
 *
 * This plugin adds the following parameters to the beacon:
 *
 * * `et.e`: Compressed EventTiming events
 * * `et.fid`: Observed First Input Delay
 *
 * @see {@link https://github.com/WICG/event-timing/}
 * @class BOOMR.plugins.EventTiming
 */
(function() {
	BOOMR = window.BOOMR || {};
	BOOMR.plugins = BOOMR.plugins || {};

	if (BOOMR.plugins.EventTiming) {
		return;
	}

	/**
	 * Event names
	 */
	var EVENT_TYPES = {
		"click": 0,
		"dblclick": 1,
		"mousedown": 2,
		"mouseup": 3,
		"mousemove": 4,
		"touchstart": 5,
		"touchend": 6,
		"touchmove": 7,
		"keydown": 8,
		"keyup": 9,
		"keypress": 10,
		"wheel": 11,
		"pointerdown": 12,
		"pointerup": 13,
		"pointermove": 14,
		"compositionstart": 17,
		"compositionupdate": 18,
		"compositionend": 19,
		"contextmenu": 20
	};

	/**
	 * Private implementation
	 */
	var impl = {
		/**
		 * Whether or not we've initialized yet
		 */
		initialized: false,

		/**
		 * Whether or not the browser supports EventTiming (cached value)
		 */
		supported: null,

		/**
		 * The PerformanceObserver for 'event'
		 */
		observerEvent: null,

		/**
		 * The PerformanceObserver for 'firstInput'
		 */
		observerFirstInput: null,

		/**
		 * List of EventTiming entries
		 */
		entries: [],

		/**
		 * First Input Delay (calculated)
		 */
		firstInputDelay: null,

		/**
		 * Time to First Interaction
		 */
		timeToFirstInteraction: null,

		/**
		 * Executed on `before_beacon`
		 */
		onBeforeBeacon: function() {
			var i;

			if (impl.entries && impl.entries.length) {
				var compressed = [];

				for (i = 0; i < impl.entries.length; i++) {
					compressed.push({
						n: EVENT_TYPES[impl.entries[i].name] ?
						   EVENT_TYPES[impl.entries[i].name] : impl.entries[i].name,
						s: Math.round(impl.entries[i].startTime).toString(36),
						d: Math.round(impl.entries[i].duration).toString(36),
						p: Math.round(impl.entries[i].processingEnd -
						   impl.entries[i].processingStart).toString(36),
						c: impl.entries[i].cancelable ? 1 : 0,
						fi: impl.entries[i].entryType === "first-input" ? 1 : undefined
					});
				}

				BOOMR.addVar("et.e", BOOMR.utils.serializeForUrl(compressed), true);
			}

			// clear until the next beacon
			impl.entries = [];

			// First Input Delay
			if (impl.firstInputDelay !== null) {
				BOOMR.addVar("et.fid", Math.ceil(impl.firstInputDelay), true);

				// should only go out on one beacon
				impl.firstInputDelay = null;
			}
		},

		/**
		 * Fired on each EventTiming event
		 *
		 * @param {object[]} list List of EventTimings
		 */
		onEventTiming: function(list) {
			impl.entries = impl.entries.concat(list.getEntries());
		},

		/**
		 * Fired on each FirstInput event
		 *
		 * @param {object[]} list List of EventTimings
		 */
		onFirstInput: function(list) {
			var i, newEntries = list.getEntries();

			impl.entries = impl.entries.concat(newEntries);

			impl.firstInputDelay = newEntries[0].processingStart - newEntries[0].startTime;
			impl.timeToFirstInteraction = newEntries[0].startTime;
		}
	};

	//
	// Exports
	//
	BOOMR.plugins.EventTiming = {
		/**
		 * Initializes the plugin.
		 *
		 * This plugin does not have any configuration.
		 *
		 * @returns {@link BOOMR.plugins.EventTiming} The EventTiming plugin for chaining
		 * @memberof BOOMR.plugins.EventTiming
		 */
		init: function() {
			// skip initialization if not supported
			if (!this.is_supported()) {
				impl.initialized = true;
			}

			if (!impl.initialized) {
				BOOMR.subscribe("before_beacon", impl.onBeforeBeacon, null, impl);

				try {
					var w = BOOMR.window;

					impl.observerEvent = new w.PerformanceObserver(impl.onEventTiming);
					impl.observerEvent.observe({
						type: ["event"],
						buffered: true
					});

					impl.observerFirstInput = new w.PerformanceObserver(impl.onFirstInput);
					impl.observerFirstInput.observe({
						type: ["first-input"],
						buffered: true
					});
				}
				catch (e) {
					impl.supported = false;
				}

				impl.initialized = true;
			}

			return this;
		},

		/**
		 * Whether or not this plugin is complete
		 *
		 * @returns {boolean} `true` if the plugin is complete
		 * @memberof BOOMR.plugins.EventTiming
		 */
		is_complete: function() {
			return true;
		},

		/**
		 * Whether or not this plugin is enabled and EventTiming is supported.
		 *
		 * @returns {boolean} `true` if EventTiming plugin is enabled and supported.
		 * @memberof BOOMR.plugins.EventTiming
		 */
		is_enabled: function() {
			return impl.initialized && this.is_supported();
		},

		/**
		 * Whether or not EventTiming is supported in this browser.
		 *
		 * @returns {boolean} `true` if EventTiming is supported.
		 * @memberof BOOMR.plugins.EventTiming
		 */
		is_supported: function() {
			var p;

			if (impl.supported !== null) {
				return impl.supported;
			}

			var w = BOOMR.window;

			// check for getEntriesByType and the entry type existing
			var p = BOOMR.getPerformance();
			impl.supported = p &&
				typeof w.PerformanceEventTiming !== "undefined" &&
				typeof w.PerformanceObserver === "function";

			if (impl.supported) {
				BOOMR.info("This user agent supports EventTiming", "et");
			}

			return impl.supported;
		},

		/**
		 * Stops observing
		 *
		 * @memberof BOOMR.plugins.EventTiming
		 */
		stop: function() {
			if (impl.observerEvent) {
				impl.observerEvent.disconnect();
				impl.observerEvent = null;
			}

			if (impl.observerFirstInput) {
				impl.observerFirstInput.disconnect();
				impl.observerFirstInput = null;
			}
		},

		/**
		 * Exported metrics
		 *
		 * @memberof BOOMR.plugins.EventTiming
		 */
		metrics: {
			/**
			 * Calculates the EventTiming count
			 */
			count: function() {
				return impl.entries.length;
			},

			/**
			 * Calculates the average EventTiming duration
			 */
			averageDuration: function() {
				if (impl.entries.length === 0) {
					return 0;
				}

				var sum = 0;

				for (var i = 0; i < impl.entries.length; i++) {
					sum += impl.entries[i].duration;
				}

				return sum / impl.entries.length;
			},

			/**
			 * Returns the observed First Input Delay
			 */
			firstInputDelay: function() {
				return impl.firstInputDelay;
			},

			/**
			 * Returns the observed Time to First Interaction
			 */
			timeToFirstInteraction: function() {
				return impl.timeToFirstInteraction;
			}
		}
	};

}());
