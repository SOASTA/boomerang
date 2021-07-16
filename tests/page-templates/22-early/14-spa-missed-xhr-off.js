/*eslint-env mocha*/
/*global BOOMR_test, chai*/

describe("e2e/22-early/14-spa-missed-xhr-off", function() {
	var assert = chai.assert;
	var tf = BOOMR.plugins.TestFramework;
	var t = BOOMR_test;

	it("Should have sent four beacons", function(done) {
		this.timeout(10000);
		t.ensureBeaconCount(done,  4);
	});

	it("Should have sent the first two beacons as http.initiator = spa_hard", function() {
		for (var i = 0; i < 2; i++) {
			assert.equal(tf.beacons[0]["http.initiator"], "spa_hard");
		}
	});

	it("Should have sent all subsequent beacons as http.initiator = spa", function() {
		for (var i = 2; i < 4; i++) {
			assert.equal(tf.beacons[i]["http.initiator"], "spa");
		}
	});

	describe("Beacon 1 (spa_hard early)", function() {
		var i = 0;

		it("Should be an early beacon", function() {
			var b = tf.beacons[i];
			assert.isDefined(b.early);
		});
	});

	describe("Beacon 2 (spa_hard)", function() {
		var i = 1;

		it("Should not be an early beacon", function() {
			var b = tf.beacons[i];
			assert.isUndefined(b.early);
		});

		it("Should have end time of mutation", function() {
			var b = tf.beacons[i], r, navStart = BOOMR.plugins.RT.navigationStart();
			if (t.isMutationObserverSupported() && t.isResourceTimingSupported() && typeof navStart !== "undefined") {
				r = t.findFirstResource("/delay?id=mo");
				assert.operator(b["rt.end"], ">=", Math.floor(navStart + r.responseEnd));
				assert.closeTo(b["rt.end"], Math.floor(navStart + r.responseEnd), 200);
			}
		});
	});

	describe("Beacon 3 (spa early)", function() {
		var i = 0;

		it("Should be an early beacon", function() {
			var b = tf.beacons[i];
			assert.isDefined(b.early);
		});
	});

	describe("Beacon 4 (spa)", function() {
		var i = 1;

		it("Should not be an early beacon", function() {
			var b = tf.beacons[i];
			assert.isUndefined(b.early);
		});
	});
});
