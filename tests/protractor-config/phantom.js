/*eslint-env node*/

base = require("./base.js");

var config = base.config;

// PhantomJS 1.x
var capabilities = {
	browserName: "phantomjs"
};

try {
	// check if we have phantomjs installed locally
	capabilities["phantomjs.binary.path"] = require("phantomjs").path;
}
catch (e) {
	// ignore
}

// capabilities in this file will take precedence
config.capabilities = Object.assign({}, config.capabilities || {}, capabilities);

exports.config = config;
