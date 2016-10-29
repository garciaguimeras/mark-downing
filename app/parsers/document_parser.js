/*
 * DocumentParser module
 */

var md = require('./../md.js');

var MdType = md.MdType;
var Md = md.Md;
var MdFactory = md.MdFactory;

var DocumentParser = function(md) {
    this.position = 0;
    this.lines = md.content;
    this.isCode = false;
};

DocumentParser.prototype = {

    isCodeSeparator: function(txt) {
        if (txt.startsWith('```'))
            return true;
        return false;
    },

    processText: function() {
        // pass empty lines
        while (this.position < this.lines.length && this.lines[this.position].trim() == '')
            this.position++;

        // find next paragraph separator
        var fPos = this.position;
        while (fPos < this.lines.length && !this.isCodeSeparator(this.lines[fPos]))
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

            var md = null;
            if (!this.isCode)
                md = MdFactory.newRichText;
            else
                md = MdFactory.newCode;
            md.content = slice;
            mdArr[mdArr.length] = md;

            this.isCode = !this.isCode;
        }
        return mdArr;
    },

};


// Module exports

module.exports = {
    DocumentParser: DocumentParser
};
