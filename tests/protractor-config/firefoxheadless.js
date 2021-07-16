/*eslint-env node*/

base = require("./base.js");
var config = base.config;

var capabilities = {
	browserName: "firefox",
	"moz:firefoxOptions": {
		args: [ "--headless" ]
	}
};

// capabilities in this file will take precedence
config.capabilities = Object.assign({}, config.capabilities || {}, capabilities);

exports.config = config;
