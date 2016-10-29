const fr = require('./app/filereader.js');
const mdParser = require('./app/parser.js');

var args = process.argv;
var parser = new mdParser.Parser();

if (args.length < 3) {
    console.log('Need a markdown filename');
    process.exit(0);
}

var filename = args[2];
fr.readFile(filename, (lines) => {

    parser.parse(lines);

}); 
