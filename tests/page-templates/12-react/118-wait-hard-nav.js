/*eslint-env mocha*/
/*global BOOMR_test,assert*/

describe("e2e/12-react/118-wait-hard-nav", function() {
	var tf = BOOMR.plugins.TestFramework;
	var t = BOOMR_test;

	it("Should pass basic beacon validation", function(done) {
		t.validateBeaconWasSent(done);
	});

	it("Should have sent 1 beacon", function(done) {
		this.timeout(10000);
		t.ensureBeaconCount(done, 1);
	});

	it("Should have sent the first beacon as http.initiator = spa_hard", function() {
		assert.equal(tf.beacons[0]["http.initiator"], "spa_hard");
	});

	it("Should have sent the first beacon with a wait", function() {
		var b = tf.beacons[0];

		assert.isDefined(b.t_done);
		assert.operator(b.t_done, ">=", 5000);
	});
});
