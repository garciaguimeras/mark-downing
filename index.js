const fr = require('./app/filereader.js');
const mdParser = require('./app/parser.js');
const mdTraverser = require('./app/traverser.js');

var args = process.argv;

if (args.length < 3) {
    console.log('Need a markdown filename');
    process.exit(0);
}

var filename = args[2];
fr.readFile(filename, (lines) => {

    var parser = new mdParser.Parser();
    var mdDocument = parser.parse(lines);

    var traverser = new mdTraverser.MdTraverser(mdDocument);
    traverser.execute((md) => {

        console.log(`>>>> ${md.type}`);
        md.content.forEach((line) => {
            console.log(line);
        });

    });

}); 
