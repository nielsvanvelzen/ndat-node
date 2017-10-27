//todo support request body (formdata etc.)
class Request {
	constructor({headers, protocol, method, path, query, remoteAddress}) {
		this._headers = headers;
		this._protocol = protocol;
		this._method = method;
		this._path = path;
		this._query = query;
		this._remoteAddress = remoteAddress;
	}

	// data access
	get headers() {
		return this._headers;
	}

	get protocol() {
		return this._protocol;
	}

	get method() {
		return this._method;
	}

	get path() {
		return this._path;
	}

	get query() {
		return this._query;
	}

	get remoteAddress() {
		return this._remoteAddress;
	}

	// extra
	get headerMap() {
		let map = new Map();

		for (let header of Object.keys(this.headers))
			map.set(header, this.headers[header]);

		return map;
	}

	get cookies() {
		// todo get cookies
	}
}

module.exports = Request;