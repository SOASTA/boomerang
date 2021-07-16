BOOMR_configt=new Date().getTime();
BOOMR.addVar({"h.t":{{H_T}},"h.cr":"{{H_CR}}"});
BOOMR.init({
	"autorun": false,
	"instrument_xhr": false,
	"History": {
		"enabled": true
	},
	"Early": {
		"enabled": true
	},
	"ResourceTiming": {
		"enabled": true,
		"splitAtPath": true
	},
	"Errors": {
		"enabled": true,
		"monitorTimeout": true,
		"monitorEvents": true,
		"maxErrors": 25,
		"sendAfterOnload": true,
		"sendInterval": 1000
	},
	"Continuity": {
		"enabled": true
	},
	"PageParams": {
		"xhr": "none"
	}
});
