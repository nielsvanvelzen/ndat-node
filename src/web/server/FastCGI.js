const querystring = require('querystring');
const nodeFastCGI = require('node-fastcgi');
const Server = require('./Server');
const Request = require('../api/Request');
const Response = require('../api/Response');

class FastCGI extends Server {
	constructor(port) {
		super();

		this._port = port;

		this._server = nodeFastCGI.createServer();
		this._server.on('request', (req, res) => this._onRequest(req, res));
	}

	_onRequest(req, res) {
		// DOCUMENT_ROOT = max node_modules search
		//  root should be passed to evaluate
		// SCRIPT_NAME + QUERY_STRING

		let request = new Request({
			headers: req.headers,
			protocol: req.cgiParams['SERVER_PROTOCOL'],
			method: req.cgiParams['REQUEST_METHOD'],
			path: req.cgiParams['SCRIPT_NAME'],
			query: querystring.parse(req.cgiParams['QUERY_STRING']),
			remoteAddress: req.cgiParams['REMOTE_ADDR']

			// SERVER_ADDR, SERVER_PORT, SERVER_HOST
		});

		let response = new Response({socket: res});

		this.handleResponse(request, response, req.cgiParams['SCRIPT_FILENAME']);
	}

	start() {
		this._server.listen(this._port === null ? undefined : this._port);
	}
}

module.exports = FastCGI;