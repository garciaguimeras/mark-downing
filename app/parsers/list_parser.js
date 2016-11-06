/*
 * UListParser module
 */

var md = require('./../md.js');

var MdType = md.MdType;
var Md = md.Md;

var ListParser = function(md) {
    this.lines = md.content;
};

ListParser.prototype = {

    getMasterIndentation: function() {
        if (this.lines.length == 0)
            return 0;
        return this.getIndentation(0);
    },

    getIndentation: function(pos) {
        var line = this.lines[pos];
        var indentation = 0;
        while (indentation < line.length && line.charAt(indentation) == ' ')
            indentation++;
        return indentation;
    },

    parse: function() {
        var mdArr = [];
        var masterIndentation = this.getMasterIndentation();
        for (var i = 0; i < this.lines.length; i++) {
            var indentation = this.getIndentation(i);
            var md = null;

            if (indentation == masterIndentation) {
                var line = this.lines[i].substring(indentation + 1).trim();
                md = new Md(MdType.ListItem);
                md.content = [ line ];
            }
            else {

            }

            if (md != null)
                mdArr[i] = md;
        }
        return mdArr;
    },

};


// Module exports

module.exports = {
    ListParser: ListParser
};
