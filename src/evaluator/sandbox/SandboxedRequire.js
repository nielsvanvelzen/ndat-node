class SandboxedRequire {
	constructor() {
		this._blacklist = ['process', 'console', 'child_process', 'cluster', 'tty', 'v8'];
		this._cache = null;
	}

	_require(module) {
		if (this._blacklist.includes(module.toLowerCase().trim()))
			throw new Error(`Module ${module} is blacklisted.`);

		// Save cache, apply own cache
		let cache = require.cache;
		require.cache = this._cache;

		// require module
		let exports = require(module);

		// Save own cache, apply old cache
		this._cache = require.cache;
		require.cache = cache;

		return exports;
	}

	get() {
		let require = module => this._require(module);
		require.cache = [];
		require.extensions = {};

		return require;
	}
}

module.exports = SandboxedRequire;