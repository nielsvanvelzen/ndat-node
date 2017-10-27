const http = require('http');
const URL = require('url');
const Server = require('./Server');
const Request = require('../api/Request');
const Response = require('../api/Response');

class HTTP extends Server {
	constructor(port) {
		super();

		this._port = port;

		this._server = http.createServer();
		this._server.on('request', (req, res) => this._onRequest(req, res));
	}

	_onRequest(req, res) {
		console.log(req);
		let url = URL.parse(req.url, true);
		// DOCUMENT_ROOT = max node_modules search
		//  root should be passed to evaluate
		// SCRIPT_NAME + QUERY_STRING

		let request = new Request({
			headers: req.headers,
			protocol: 'HTTP',
			method: req.method,
			path: url.pathname.substr(1),
			query: url.query,
			remoteAddress: null
		});

		let response = new Response({socket: res});

		this.handleResponse(request, response, url.pathname.substr(1));
	}

	start() {
		this._server.listen(this._port === null ? undefined : this._port);
	}
}

module.exports = HTTP;