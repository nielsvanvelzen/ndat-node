const os = require('os');
const path = require('path');
const fs = require('fs');

class SandboxCache {
	constructor(bucket) {
		this._location = path.join(os.tmpdir(), bucket);
		this._data = {};
		this._load();
	}

	_proxy(target) {
		return new Proxy(target, {
			get: (target, property) => {
				if (typeof target[property] === 'object')
					return this._proxy(target[property]);

				return target[property];
			},
			set: (target, property, value) => {
				target[property] = value;
				this._save();
			}
		});
	}

	_save() {
		try {
			let json = JSON.stringify(this._data);
			fs.writeFile(this._location, json);
		} catch (err) {
			this._data = {};
		}
	}

	_load() {
		try {
			let txt = fs.readFileSync(this._location);
			this._data = JSON.parse(txt);

			if (typeof this._data !== 'object') // saved data is corrupted
				this._data = {};

			return true;
		} catch (err) {
			return false;
		}
	}

	get() {
		return this._proxy(this._data);
	}
}

module.exports = SandboxCache;
