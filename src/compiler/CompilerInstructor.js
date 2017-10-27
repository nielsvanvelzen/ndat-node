const os = require('os');

class CompilerInstructor {
	constructor() {
		this._source = '';
	}

	clear() {
		this._source = '';
		return this;
	}

	openRoundBracket() {
		return this.put('(');
	}

	closeRoundBracket() {
		return this.put(')');
	}

	keyword(keyword) {
		return this.put(keyword);
	}

	arrow() {
		return this.put('=>');
	}

	arrowFunction() {
		return this.openRoundBracket().closeRoundBracket().arrow();
	}

	openCodeBlock() {
		return this.put('{').eol();
	}

	closeCodeBlock() {
		return this.eol().put('}');
	}

	endLine() {
		return this.put(';');
	}

	eol() {
		return this.put(os.EOL);
	}

	put(src) {
		this._source += src;
		return this;
	}

	get source() {
		return this._source;
	}
}

module.exports = CompilerInstructor;