/*
 * ConverterFactory module
 */

const consoleConverserFactory = require('./console/console_converter_factory.js');
const htmlConverserFactory = require('./html/html_converter_factory.js');


var create = function(name) {
    switch(name) {
        case 'console':
            return consoleConverserFactory;
        case 'html':
            return htmlConverserFactory;
    }
    return null;
};


// Module exports

module.exports.create = create;
