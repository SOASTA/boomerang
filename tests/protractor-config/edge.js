/*eslint-env node*/

base = require("./base.js");
var config = base.config;

// Pre-Chromium Edge
var capabilities = {
	browserName: "MicrosoftEdge"
};

// capabilities in this file will take precedence
config.capabilities = Object.assign({}, config.capabilities || {}, capabilities);

exports.config = config;
