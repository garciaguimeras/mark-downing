/*
 * HtmlConverterFactory module
 */

var md = require('./../../md.js');

var MdType = md.MdType;
var Md = md.Md;

var HtmlConverter = function() {};

HtmlConverter.prototype = {

    begin: function(md) {

    },

    end: function(md) {

    },

    leaf: function(md) {

    },

};


var createConverterFor = function(md) {

    switch(md.type) {

        case MdType.Document:
            break;
        case MdType.Paragraph:
            break;
        case MdType.Code:
            break;
        case MdType.Line:
            break;
        case MdType.Title1:
            break;
        case MdType.Title2:
            break;
        case MdType.Title3:
            break;
        case MdType.Title4:
            break;
        case MdType.Title5:
            break;
        case MdType.Title6:
            break;
        case MdType.PlainText:
            break;

    }

};


// Module exports

module.exports.createConverterFor = createConverterFor;
