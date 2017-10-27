const Cli = require('./Cli');
let cli = new Cli(process.argv.slice(2));
cli.start();