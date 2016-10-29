/*
 * Parser module
 */

var md = require('./md.js');
var mdDocumentParser = require('./parsers/document_parser.js');

var MdType = md.MdType;
var Md = md.Md;
var MdFactory = md.MdFactory;
var DocumentParser = mdDocumentParser.DocumentParser;


// Parser object

var Parser = function() {
    this.mdDocument = null;
    this.lines = null;
};

Parser.prototype = {

    trim: function(arr) {
        var i = 0;
        var f = arr.length - 1;

        while (i < arr.length && arr[i].trim() == '')
            i++;
        while (f >= 0 && arr[f].trim() == '')
            f--;

        var result = arr.slice(i, f + 1);
        return result;
    },

    processMdNode: function(md) {
        var newNodes = 0;

        if (md.visits == 0) {
            md.visits++;
            var p = null;

            // Huge switch
            switch (md.type) {
                case MdType.Document:
                    p = new DocumentParser(md);
                    break;
            }

            // If p == null the md node is in a final state
            if (p != null) {
                var children = p.parse();
                md.addChildren(children);
                newNodes += children.length;
            }
        }

        // Do the same for each child
        md.children.forEach((child) => {
            newNodes += this.processMdNode(child);
        });

        return newNodes;
    },

    parse: function(lines) {
        this.lines = this.trim(lines);
        this.mdDocument = MdFactory.newDocument;
        this.mdDocument.content = this.lines;

        var newNodes = 1;
        while (newNodes > 0)
            newNodes = this.processMdNode(this.mdDocument);

        return this.mdDocument;
    },

};


// Module exports

module.exports = {
    Parser: Parser
};
