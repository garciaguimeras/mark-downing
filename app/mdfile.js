/*
 * FileReader module
 */

const fs = require('fs');

// Module exports

module.exports = {

    readFile: function(filename, fnResult) {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) throw err;

            var lines = data.split('\n');

            if (fnResult != null)
                fnResult(lines);
        });
    },

    writeFile: function(filename, data) {
        fs.writeFile(filename, data, 'utf8', (err) => {
            if (err) throw err;
        });
    },

};
