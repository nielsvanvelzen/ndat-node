const Evaluator = require('../../evaluator/Evaluator');
const Sandbox = require('../../evaluator/sandbox/Sandbox');
const crypto = require('crypto');

class Server {
	constructor() {
		this._evaluator = new Evaluator();
	}

	handleResponse(request, response, file) {
		let sandbox = new Sandbox();
		sandbox.env();
		sandbox.http(request, response);
		sandbox.file(file);
		sandbox.cache(crypto.createHash('sha512').update(file).digest('hex'));

		this._evaluator.evaluateFile(file, sandbox).then(() => {
			//todo; do nothing?
			//response.end(); // Make sure we stopped responding
			//todo; might not work smoothly with http server, but it does work with fastcgi
		}).catch(err => {
			response.status = 500;
			response.end(err.stack);
		});
	}
}

module.exports = Server;