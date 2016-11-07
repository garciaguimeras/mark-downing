/*
 * Parser module
 */

var md = require('./md.js');
var mdDocumentParser = require('./parsers/document_parser.js');
var mdRichTextParser = require('./parsers/richtext_parser.js');
var mdParagraphParser = require('./parsers/paragraph_parser.js');
var mdLineParser = require('./parsers/line_parser.js');
var mdTitleParser = require('./parsers/title_parser.js');
var mdListParser = require('./parsers/list_parser.js');
var mdListItemParser = require('./parsers/listitem_parser.js');
var mdBlockquoteParser = require('./parsers/blockquote_parser.js');

var MdType = md.MdType;
var Md = md.Md;
var DocumentParser = mdDocumentParser.DocumentParser;
var RichTextParser = mdRichTextParser.RichTextParser;
var ParagraphParser = mdParagraphParser.ParagraphParser;
var LineParser = mdLineParser.LineParser;
var TitleParser = mdTitleParser.TitleParser;
var ListParser = mdListParser.ListParser;
var ListItemParser = mdListItemParser.ListItemParser;
var BlockquoteParser = mdBlockquoteParser.BlockquoteParser;


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
                case MdType.RichText:
                    p = new RichTextParser(md);
                    break;
                case MdType.Paragraph:
                    p = new ParagraphParser(md);
                    break;
                case MdType.Line:
                    p = new LineParser(md);
                    break;
                case MdType.Title1:
                case MdType.Title2:
                case MdType.Title3:
                case MdType.Title4:
                case MdType.Title5:
                case MdType.Title6:
                    p = new TitleParser(md);
                    break;
                case MdType.List:
                    p = new ListParser(md);
                    break;
                case MdType.ListItem:
                    p = new ListItemParser(md);
                    break;
                case MdType.Blockquote:
                    p = new BlockquoteParser(md);
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
        this.mdDocument = new Md(MdType.Document);
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
