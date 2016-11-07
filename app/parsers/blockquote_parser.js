/*
 * BlockquoteParser module
 */

var md = require('./../md.js');

var MdType = md.MdType;
var Md = md.Md;

var BlockquoteParser = function(md) {
    this.lines = md.content;
};

BlockquoteParser.prototype = {

    parse: function() {
        var mdArr = [];
        for (var i = 0; i < this.lines.length; i++) {
            var line = this.lines[i].substring(1).trim();
            var md = new Md(MdType.Line);
            md.content = [ line ];
            mdArr[i] = md;
        }
        return mdArr;
    },

};


// Module exports

module.exports = {
    BlockquoteParser: BlockquoteParser
};
