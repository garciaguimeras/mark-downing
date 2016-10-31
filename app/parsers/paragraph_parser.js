/*
 * ParagraphParser module
 */

var md = require('./../md.js');

var MdType = md.MdType;
var Md = md.Md;

var ParagraphParser = function(md) {
    this.lines = md.content;
};

ParagraphParser.prototype = {

    parse: function() {
        var mdArr = [];
        for (var i = 0; i < this.lines.length; i++) {
            var md = new Md(MdType.Line);
            md.content = [ this.lines[i] ];
            mdArr[i] = md;
        }
        return mdArr;
    },

};


// Module exports

module.exports = {
    ParagraphParser: ParagraphParser
};
