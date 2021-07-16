/*eslint-env mocha*/
/*global BOOMR_test*/

describe("e2e/07-autoxhr/52-img-lazy", function() {
	var tf = BOOMR.plugins.TestFramework;
	var t = BOOMR_test;

	it("Should have sent 2 beacons (XMLHttpRequest !== null)", function(done) {
		this.timeout(10000);
		t.ifAutoXHR(
			done,
			function() {
				t.ensureBeaconCount(done, 2);
			},
			this.skip.bind(this));
	});

	describe("Beacon 2 (xhr)", function() {
		var i = 1;

		it("Should be a xhr beacon", function(done) {
			t.ifAutoXHR(
				done,
				function() {
					assert.equal(tf.beacons[i]["http.initiator"], "xhr");
					done();
				},
				this.skip.bind(this));
		});

		it("Should have a t_done close to 2000ms (if MutationObserver is supported)", function(done) {
			if (!t.isMutationObserverSupported()) {
				return this.skip();
			}
			t.ifAutoXHR(
				done,
				function() {
					assert.operator(tf.beacons[i].t_done, ">=", 2000);
					assert.closeTo(tf.beacons[i].t_done, 200, 2000);
					done();
				},
				this.skip.bind(this));
		});
	});
});
