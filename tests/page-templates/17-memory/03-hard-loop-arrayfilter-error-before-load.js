/*eslint-env mocha*/
/*global BOOMR_test,assert*/

describe("e2e/17-memory/03-hard-loop-arrayfilter-error-before-load", function() {
	beforeEach(function() {
		if (!BOOMR.plugins.Errors) {
			return this.skip();
		}
	});

	var t = BOOMR_test;

	it("Should have sent 2 beacons", function(done) {
		this.timeout(10000);
		t.ensureBeaconCount(done, 2);
	});

});
