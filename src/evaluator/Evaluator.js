const vm = require('vm');
const Compiler = require('../compiler/Compiler');
const Sandbox = require('./sandbox/Sandbox');

class Evaluator {
	constructor() {
		this._compiler = new Compiler();
	}

	async _execute(source, sandbox = null, file = 'vm') {
		if (!sandbox) {
			sandbox = new Sandbox();
			sandbox.env();
		}

		let options = {};
		options.filename = file;
		options.timeout = 1000 * 60; // 1 minute
		options.lineOffset = -1;
		options.displayErrors = true;

		//todo add own timeout too
		let result = vm.runInNewContext(source, sandbox.get(), options);

		return await result;
	}

	evaluate(source, sandbox = null) {
		source = this._compiler.compile(source);
		return this._execute(source, sandbox);
	}

	async evaluateFile(file, sandbox = null) {
		let source = await this._compiler.compileFile(file);
		return this._execute(source, sandbox, file);
	}
}

module.exports = Evaluator;