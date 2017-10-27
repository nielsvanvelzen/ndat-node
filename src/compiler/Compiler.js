const fs = require('fs');
const util = require('util');
const CompilerInstructor = require('./CompilerInstructor');

class Compiler {
	constructor(async = true) {
		this._async = async;
		this._instructor = new CompilerInstructor();
	}

	compile(source) {
		let instruction = this._instructor.clear();
		instruction.openRoundBracket();

		if (this._async)
			instruction.keyword('async');

		instruction.arrowFunction();
		instruction.openCodeBlock().put(source).closeCodeBlock();
		instruction.closeRoundBracket();

		instruction.openRoundBracket().closeRoundBracket();
		instruction.endLine();

		return instruction.source;
	}

	async compileFile(file) {
		let source = await util.promisify(fs.readFile)(file);
		return this.compile(source);
	}
}

module.exports = Compiler;