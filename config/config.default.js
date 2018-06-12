'use strict';

module.exports = appInfo => {
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1528783453418_6228';

	// add your config here
	config.middleware = [];

	exports.mysql = {
		// database configuration
		client : {
			// host
			host : 'tc.bonjs.com',
			// port
			port : '3306',
			// username
			user : 'root',
			// password
			password : '',
			// database
			database : 'test',
		},
		// load into app, default is open
		app : true,
		// load into agent, default is close
		agent : false,
	};

	exports.view = {
		defaultExtension: '.html',
		defaultViewEngine: 'nunjucks',
	};
	exports.nunjucks = {
		// dir: 'path/to/template/dir',  // default to `{app_root}/app/view`
		cache : true, // local env is false
	};
	return config;
};
