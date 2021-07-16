/*eslint-env mocha*/
/*global BOOMR_test,assert*/
BOOMR_test.templates.SPA = BOOMR_test.templates.SPA || {};
BOOMR_test.templates.SPA["23-hard-wait-for-onload"] = function() {
	var tf = BOOMR.plugins.TestFramework;
	var t = BOOMR_test;

	it("Should have only sent one beacon", function(done) {
		this.timeout(10000);
		// only one beacon should've been sent
		t.ensureBeaconCount(done, 1);
	});

	it("Should have been a spa_hard beacon (if MutationObserver and NavigationTiming are supported)", function() {
		assert.equal(tf.beacons[0]["http.initiator"], "spa_hard");
	});

	it("Should have fired after onload (if MutationObserver and NavigationTiming are supported)", function() {
		if (t.isMutationObserverSupported() && typeof BOOMR.plugins.RT.navigationStart() !== "undefined") {
			var b = tf.beacons[0];

			assert.notEqual(b.nt_load_st, 0, "performance.timing.loadEventStart should not be 0");

			assert.operator(b.t_done, ">=", b.nt_load_end - b.nt_nav_st - 1);  // in FF, the timings are rounded (may need to change this to -2)
		}
		else {
			// should be greater than the 5s for the /blackhole request
			assert.operator(b.t_done, ">=", 5000);
		}
	});
};
