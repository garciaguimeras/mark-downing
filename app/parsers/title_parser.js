/*
 * TitleParser module
 */

var md = require('./../md.js');

var MdType = md.MdType;
var Md = md.Md;

var TitleParser = function(md) {
    this.line = '';
    if (md.content.length > 0) {
        this.line = md.content[0];
    }
};

TitleParser.prototype = {

    parse: function() {
        var md = new Md(MdType.Line);
        md.content = [ this.line ];
        return [ md ];
    },

};


// Module exports

module.exports = {
    TitleParser: TitleParser
};
