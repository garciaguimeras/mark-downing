/*
 * RichTextParser module
 */

var md = require('./../md.js');

var MdType = md.MdType;
var Md = md.Md;
var MdFactory = md.MdFactory;

var RichTextParser = function(md) {
    this.position = 0;
    this.lines = md.content;
};

RichTextParser.prototype = {

    isParagraphSeparator: function(txt) {
        if (txt.trim() == '')
            return true;
        return false;
    },

    processText: function() {
        // pass empty lines
        while (this.position < this.lines.length && this.lines[this.position].trim() == '')
            this.position++;

        // find next paragraph separator
        var fPos = this.position;
        while (fPos < this.lines.length && !this.isParagraphSeparator(this.lines[fPos]))
            fPos++;

        // slice the text
        var slice = this.lines.slice(this.position, fPos);
        this.position = fPos + 1;

        return slice;
    },

    parse: function() {
        mdArr = [];
        this.position = 0;
        while (this.position < this.lines.length) {
            var slice = this.processText();
            var md = MdFactory.newParagraph;
            md.content = slice;
            mdArr[mdArr.length] = md;
        }
        return mdArr;
    },

};


// Module exports

module.exports = {
    RichTextParser: RichTextParser
};
