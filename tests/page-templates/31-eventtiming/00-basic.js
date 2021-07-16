/*eslint-env mocha*/
/*global BOOMR_test,assert*/

describe("e2e/31-eventtiming/00-basic", function() {
	var tf = BOOMR.plugins.TestFramework;
	var t = BOOMR_test;

	it("Should have sent a beacon", function() {
		assert.isTrue(tf.fired_onbeacon);
	});

	it("Should have included raw events (et.e) on the beacon", function() {
		if (BOOMR.utils.Compression && BOOMR.utils.Compression.jsUrl) {
			assert.equal(tf.lastBeacon()["et.e"], "~(~(c~0~d~'p0~fi~1~p~'nm~s~'2s)~(c~0~d~'1e~n~'click~p~'1e~s~'rs))");
		}
		else {
			assert.isDefined(tf.lastBeacon()["et.e"]);
		}
	});

	it("Should have included First Input Delay (et.fid) on the beacon", function() {
		assert.equal(tf.lastBeacon()["et.fid"], 50);
	});
});
