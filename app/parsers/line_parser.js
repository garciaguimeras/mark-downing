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

        if (this.line.startsWith('######')) {
            md.type = MdType.Title6;
            md.content = [ this.line.substring(6).trim() ];
        }
        else if (this.line.startsWith('#####')) {
            md.type = MdType.Title5;
            md.content = [ this.line.substring(5).trim() ];
        }
        else if (this.line.startsWith('####')) {
            md.type = MdType.Title4;
            md.content = [ this.line.substring(4).trim() ];
        }
        else if (this.line.startsWith('###')) {
            md.type = MdType.Title3;
            md.content = [ this.line.substring(3).trim() ];
        }
        else if (this.line.startsWith('##')) {
            md.type = MdType.Title2;
            md.content = [ this.line.substring(2).trim() ];
        }
        else if (this.line.startsWith('#')) {
            md.type = MdType.Title1;
            md.content = [ this.line.substring(1).trim() ];
        }

        return [ md ];
    },

};


// Module exports

module.exports = {
    LineParser: LineParser
};
