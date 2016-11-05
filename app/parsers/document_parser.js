/*
 * DocumentParser module
 */

var md = require('./../md.js');

var MdType = md.MdType;
var Md = md.Md;

var DocumentParser = function(md) {
    this.position = 0;
    this.lines = md.content;
};

DocumentParser.prototype = {

    isCodeSeparator: function(txt) {
        if (txt.startsWith('```'))
            return true;
        return false;
    },

    isTitleSeparator: function(txt) {
        if (txt.startsWith('#'))
            return true;
        return false;
    },

    isListSeparator: function(txt) {
        if (txt.trim().startsWith('* '))
            return true;
        if (txt.trim().startsWith('- '))
            return true;
        return false;
    },

    isSeparator: function(txt) {
        return this.isCodeSeparator(txt) ||
               this.isTitleSeparator(txt) ||
               this.isListSeparator(txt);
    },

    processRichText: function() {
        // pass empty lines
        while (this.position < this.lines.length && this.lines[this.position].trim() == '')
            this.position++;

        // find next separator
        var fPos = this.position;
        while (fPos < this.lines.length && !this.isSeparator(this.lines[fPos]))
            fPos++;

        // slice the text
        var slice = this.lines.slice(this.position, fPos);
        this.position = fPos;

        if (slice.length == 0)
            return null;

        var md = new Md(MdType.RichText);
        md.content = slice;
        return md;
    },

    processCode: function() {
        // find next separator
        this.position++;
        var fPos = this.position;
        while (fPos < this.lines.length && !this.isCodeSeparator(this.lines[fPos]))
            fPos++;

        // slice the text
        var slice = this.lines.slice(this.position, fPos);
        this.position = fPos + 1;

        var md = new Md(MdType.Code);
        md.content = slice;
        return md;
    },

    processTitle: function() {
        var md = null;
        var line = this.lines[this.position];
        this.position++;

        if (line.startsWith('######')) {
            md = new Md(MdType.Title6);
            md.content = [ line.substring(6).trim() ];
        }
        else if (line.startsWith('#####')) {
            md = new Md(MdType.Title5);
            md.content = [ line.substring(5).trim() ];
        }
        else if (line.startsWith('####')) {
            md = new Md(MdType.Title4);
            md.content = [ line.substring(4).trim() ];
        }
        else if (line.startsWith('###')) {
            md = new Md(MdType.Title3);
            md.content = [ line.substring(3).trim() ];
        }
        else if (line.startsWith('##')) {
            md = new Md(MdType.Title2);
            md.content = [ line.substring(2).trim() ];
        }
        else {
            md = new Md(MdType.Title1);
            md.content = [ line.substring(1).trim() ];
        }

        return md;
    },

    processList: function() {
        // find next separator
        var fPos = this.position;
        while (fPos < this.lines.length && this.isListSeparator(this.lines[fPos]))
            fPos++;

        // slice the text
        var slice = this.lines.slice(this.position, fPos);
        this.position = fPos;

        var md = new Md(MdType.UList);
        md.content = slice;
        return md;
    },

    parse: function() {
        var mdArr = [];
        this.position = 0;
        while (this.position < this.lines.length) {
            var line = this.lines[this.position];
            var md = this.processRichText();

            if (md == null) {
                // code
                if (this.isCodeSeparator(line))
                    md = this.processCode();
                // title
                else if (this.isTitleSeparator(line))
                    md = this.processTitle();
                // list
                else if (this.isListSeparator(line))
                    md = this.processList();
            }

            if (md != null)
                mdArr[mdArr.length] = md;
        }
        return mdArr;
    },

};


// Module exports

module.exports = {
    DocumentParser: DocumentParser
};
