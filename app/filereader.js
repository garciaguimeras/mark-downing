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
    }

};
