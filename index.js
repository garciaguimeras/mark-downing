const mdFile = require('./app/mdfile.js');
const mdParser = require('./app/parser.js');
const mdTraverser = require('./app/traverser.js');
const converterFactory = require('./app/converters/converter_factory.js');

var args = process.argv;

console.log('app = {');
console.log('  name: "mark-downing",');
console.log('  version: 1.0,');
console.log('  description: "a simple markdown parser and converter",');
console.log('}');
console.log('');

if (args.length < 3) {
    console.log('error = { msg: "Need a markdown filename" }');
    console.log('');
    process.exit(0);
}

var param1 = args[2];

if (param1 == 'credits') {
    console.log('credits = {');
    console.log('  author: "Noel",');
    console.log('  email: "garcia.guimeras@gmail.com",');
    console.log('  year: 2016,');
    console.log('  license: "GPL v3.0",');
    console.log('}');
    console.log('');
    process.exit(0);
}

mdFile.readFile(param1, (lines) => {

    var parser = new mdParser.Parser();
    var mdDocument = parser.parse(lines);

    var traverser = new mdTraverser.MdTraverser(mdDocument);
    var htmlData = traverser.execute(converterFactory.create('html'));
    mdFile.writeFile(param1 + '.html', htmlData)

}); 
