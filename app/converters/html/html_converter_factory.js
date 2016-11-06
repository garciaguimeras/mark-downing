/*
 * HtmlConverterFactory module
 */

var md = require('./../../md.js');
var documentConverterModule = require('./document_converter.js');

var MdType = md.MdType;
var Md = md.Md;

var DocumentConverter = documentConverterModule.DocumentConverter;
var ParagraphConverter = documentConverterModule.ParagraphConverter;
var CodeConverter = documentConverterModule.CodeConverter;
var LineConverter = documentConverterModule.LineConverter;
var PlainTextConverter = documentConverterModule.PlainTextConverter;
var TitleConverter = documentConverterModule.TitleConverter;
var ListConverter = documentConverterModule.ListConverter;
var ListItemConverter = documentConverterModule.ListItemConverter;

var createConverterFor = function(md) {

    switch(md.type) {

        case MdType.Document:
            return new DocumentConverter();
        case MdType.Paragraph:
            return new ParagraphConverter();
        case MdType.Code:
            return new CodeConverter();
        case MdType.Title1:
            return new TitleConverter(1);
        case MdType.Title2:
            return new TitleConverter(2);
        case MdType.Title3:
            return new TitleConverter(3);
        case MdType.Title4:
            return new TitleConverter(4);
        case MdType.Title5:
            return new TitleConverter(5);
        case MdType.Title6:
            return new TitleConverter(6);
        case MdType.PlainText:
            return new PlainTextConverter();
        case MdType.List:
            return new ListConverter();
        case MdType.ListItem:
            return new ListItemConverter();

    }

    return null;
};


// Module exports

module.exports.createConverterFor = createConverterFor;
