/*eslint-env node*/

base = require("./base.js");
var config = base.config;

// List of Chromium capabilities http://chromedriver.chromium.org/capabilities
// List of Chrome cmd line args https://peter.sh/experiments/chromium-command-line-switches/
var capabilities = {
	browserName: "chrome",
	chromeOptions: {
		args: [ "--headless", "--disable-gpu", "--window-size=1024,768", "--no-sandbox" ]
	}
};

// capabilities in this file will take precedence
config.capabilities = Object.assign({}, config.capabilities || {}, capabilities);

exports.config = config;
