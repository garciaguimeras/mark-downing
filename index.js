const fs = require('fs');
const preprocessor = require('./app/preprocessor.js');

var args = process.argv;

if (args.length < 3) {
    console.log('Need a filename');
    process.exit(1);
}

/*
args.forEach(function(item) {
    console.log('>> ' + item);
});
*/

var filename = args[2];
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    var lines = data.split('\n');
    lines.forEach(function(item){
        console.log(item);
    });
    preprocessor.trim(lines);
}); 
