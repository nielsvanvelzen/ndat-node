class Response {
	constructor({socket}) {
		this._socket = socket;
	}

	set status(status) {
		this._socket.statusCode = status;
	}

	get status() {
		return this._socket.statusCode;
	}

	setHeader(header, value) {
		this._socket.setHeader(header, value);
	}

	getHeader(header) {
		return this._socket.getHeader(header);
	}

	getHeaders() {
		return this._socket.getHeaders();
	}

	write(data) {
		this._socket.write(data);
	}

	end(data) {
		this._socket.end(data);
	}

	/* Implement events */
	on(...args) {
		this._socket.on(...args);
	}

	once(...args) {
		this._socket.once(...args);
	}

	emit(...args) {
		this._socket.emit(...args);
	}

	removeListener(...args) {
		this._socket.removeListener(...args);
	}
}

module.exports = Response;