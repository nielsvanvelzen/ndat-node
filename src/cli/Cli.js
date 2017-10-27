const minimist = require('minimist');
const FastCGI = require('../web/server/FastCGI');
const HTTP = require('../web/server/HTTP');

class Cli {
	constructor(args) {
		this._args = args;

		this._help = `Options:
--port=[port] - Port to bind to

--fastcgi - Use FastCGI server
--http - Use HTTP server (does not even work)
--https - Use HTTPS server (also not working)`;
	}

	start() {
		let args = minimist(this._args);

		let port = args.port || args.p || null;

		if (args.fastcgi) {
			console.log('Starting FastCGI server');

			let server = new FastCGI(port);
			server.start();
		} else if (args.http) {
			let server = new HTTP(port);
			server.start();
		} else if (args.https) {
			console.log('https server is not working');
		} else {
			console.log(this._help);
		}
	}
}

module.exports = Cli;