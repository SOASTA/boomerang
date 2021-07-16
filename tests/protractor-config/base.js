/*eslint-env node*/
/*global jasmine*/

var config = {
	capabilities: {},
	onPrepare: function() {
		var reporters = require("jasmine-reporters");

		jasmine.getEnv().addReporter(new jasmine.ConsoleReporter({
			print: console.log,
			showColors: true
		}));

		jasmine.getEnv().addReporter(new reporters.JUnitXmlReporter({
			savePath: "tests/results",
			consolidate: true,
			consolidateAll: true,
			useDotNotation: true,
			filePrefix: "e2e" + (process.env.BUILD_FLAVOR ? ("-" + process.env.BUILD_FLAVOR) : "")
		}));
	}
};

console.log(JSON.stringify(process.env));
// webdriver capabilities https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
var capabilities = process.env.CAPABILITIES;
if (capabilities) {
	config.capabilities = JSON.parse(capabilities) || {};
}

config.capabilities["acceptInsecureCerts"] = true;
exports.config = config;
