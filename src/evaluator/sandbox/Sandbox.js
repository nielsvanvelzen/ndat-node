const path = require('path');
const SandboxedRequire = require('./SandboxedRequire');
const SandboxCache = require('./SandboxCache');

class Sandbox {
	constructor() {
		this._sandbox = {};

		this.global();
	}

	cache(bucket) {
		this._cache = new SandboxCache(bucket);
		this._sandbox['cache'] = this._cache.get();
	}

	// add the global object
	global() {
		this._sandbox['global'] = this._sandbox;
	}

	// add timers, should not be used
	timers() {
		this._sandbox['setImmediate'] = setImmediate;
		this._sandbox['setInterval'] = setInterval;
		this._sandbox['setTimeout'] = setTimeout;

		this._sandbox['clearImmediate'] = clearImmediate;
		this._sandbox['clearInterval'] = clearInterval;
		this._sandbox['clearTimeout'] = clearTimeout;
	}

	// For web requests
	http(request, response) {
		this._sandbox['req'] = this._sandbox['request'] = request;
		this._sandbox['res'] = this._sandbox['response'] = response;
	}

	// node environment (for compatibility with modules)
	env() {
		this._sandbox['Buffer'] = Buffer;

		this._require = new SandboxedRequire();
		this._sandbox['require'] = this._require.get();
	}

	// for files
	file(file) {
		this._sandbox['__dirname'] = path.dirname(file);
		this._sandbox['__filename'] = file;
	}

	get() {
		return this._sandbox;
	}
}

module.exports = Sandbox;