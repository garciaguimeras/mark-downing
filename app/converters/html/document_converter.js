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

    htmlStart: '<html><head><title>Mark Downing</title></head><body>',

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

// Line

var LineConverter = function() {};

LineConverter.prototype = {

    htmlEnd: '<br/>',

    begin: function(md) {
        return '';
    },

    end: function(md) {
        return '';
    },

    leaf: function(md) {},

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

    begin: function(md) {},

    end: function(md) {},

    leaf: function(md) {
        var html = `<h${this.level}>`;
        for (var i = 0; i < md.content.length; i++) {
            html += S(md.content[i]).escapeHTML().s;
        }
        html += `</h${this.level}>\n`;
        return html;
    },

};


// Module exports

module.exports = {
    DocumentConverter: DocumentConverter,
    ParagraphConverter: ParagraphConverter,
    CodeConverter: CodeConverter,
    LineConverter: LineConverter,
    PlainTextConverter: PlainTextConverter,
    TitleConverter: TitleConverter,
};
