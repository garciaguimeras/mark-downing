/*
 * DocumentConverter module
 */

var md = require('./../../md.js');
var S = require('string');


var MdType = md.MdType;
var Md = md.Md;

// Document

var DocumentConverter = function() {};

DocumentConverter.prototype = {

    htmlStart: '<html><head><title>Mark Downing</title>' +
               '</head><body>',

    htmlEnd: '</body></html>',

    begin: function(md) {
        return this.htmlStart + '\n';
    },

    end: function(md) {
        return this.htmlEnd + '\n';
    },

    leaf: function(md) {},

};

// Paragraph

var ParagraphConverter = function() {};

ParagraphConverter.prototype = {

    htmlStart: '<p>',

    htmlEnd: '</p>',

    begin: function(md) {
        return this.htmlStart + '\n';
    },

    end: function(md) {
        return this.htmlEnd + '\n';
    },

    leaf: function(md) {},

};

// Code

var CodeConverter = function() {};

CodeConverter.prototype = {

    begin: function(md) {},

    end: function(md) {},

    leaf: function(md) {
        var html = '<pre><code>\n';
        for (var i = 0; i < md.content.length; i++) {
            html += S(md.content[i]).escapeHTML().s;
            html += '\n';
        }
        html += '</code></pre>\n';
        return html;
    },

};

// PlainText

var PlainTextConverter = function() {};

PlainTextConverter.prototype = {

    begin: function(md) {},

    end: function(md) {},

    leaf: function(md) {
        var html = '';
        for (var i = 0; i < md.content.length; i++) {
            html += S(md.content[i]).escapeHTML().s;
        }
        html += '\n';
        return html;
    },

};

// Title

var TitleConverter = function(level) {
    this.level = level;
};

TitleConverter.prototype = {

    begin: function(md) {
        return `<h${this.level}>`;
    },

    end: function(md) {
        return `</h${this.level}>\n`;
    },

    leaf: function(md) {},

};

// List

var ListConverter = function() {};

ListConverter.prototype = {

    begin: function(md) {
        return '<ul>\n';
    },

    end: function(md) {
        return '</ul>\n';
    },

    leaf: function(md) {},

};

// ListItem

var ListItemConverter = function() {};

ListItemConverter.prototype = {

    begin: function(md) {
        return '<li>\n';
    },

    end: function(md) {
        return '</li>\n';
    },

    leaf: function(md) {},

};

// Blockquote

var BlockquoteConverter = function() {};

BlockquoteConverter.prototype = {

    begin: function(md) {
        return '<blockquote>\n';
    },

    end: function(md) {
        return '</blockquote>\n';
    },

    leaf: function(md) {},

};


// Module exports

module.exports = {
    DocumentConverter: DocumentConverter,
    ParagraphConverter: ParagraphConverter,
    CodeConverter: CodeConverter,
    PlainTextConverter: PlainTextConverter,
    TitleConverter: TitleConverter,
    ListConverter: ListConverter,
    ListItemConverter: ListItemConverter,
    BlockquoteConverter: BlockquoteConverter,
};
