/*
 * LineParser module
 */

var md = require('./../md.js');

var MdType = md.MdType;
var Md = md.Md;

var LineParser = function(md) {
    this.line = '';
    if (md.content.length > 0) {
        this.line = md.content[0];
    }
};

LineParser.prototype = {

    parse: function() {
        var md = new Md(MdType.PlainText);
        md.content = [ this.line ];
        return [ md ];
    },

};


// Module exports

module.exports = {
    LineParser: LineParser
};
