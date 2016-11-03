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

        if (this.line.startsWith('######'))
            md.type = MdType.Title6;
        else if (this.line.startsWith('#####'))
            md.type = MdType.Title5;
        else if (this.line.startsWith('####'))
            md.type = MdType.Title4;
        else if (this.line.startsWith('###'))
            md.type = MdType.Title3;
        else if (this.line.startsWith('##'))
            md.type = MdType.Title2;
        else if (this.line.startsWith('#'))
            md.type = MdType.Title1;

        return [ md ];
    },

};


// Module exports

module.exports = {
    LineParser: LineParser
};
