/*eslint-env mocha*/
/*global chai*/

describe("e2e/28-rt/01-session-length-not-zero", function() {
	var assert = chai.assert;
	var tf = BOOMR.plugins.TestFramework;
	var t = BOOMR_test;

	it("Should have sent one beacon", function(done) {
		t.ensureBeaconCount(done, 1);
	});

	it("Should not have sent a session length of zero", function() {
		var b = tf.lastBeacon();

		assert.equal(b["rt.sl"], 1);
	});
});
