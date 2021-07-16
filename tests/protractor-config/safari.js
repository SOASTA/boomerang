/*eslint-env node*/

base = require("./base.js");
var config = base.config;

var capabilities = {
	// technologyPreview: true,  // uncomment to use Safari Technology Preview
	browserName: "safari"
};

// capabilities in this file will take precedence
config.capabilities = Object.assign({}, config.capabilities || {}, capabilities);

exports.config = config;
