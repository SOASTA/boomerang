/*eslint-env node*/

base = require("./base.js");
var config = base.config;

// List of Firefox capabilities https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities/firefoxOptions
var capabilities = {
	browserName: "firefox"
	// ,"moz:firefoxOptions": {
	// 		args: [ ]
	// 	}
};

// capabilities in this file will take precedence
config.capabilities = Object.assign({}, config.capabilities || {}, capabilities);

exports.config = config;
