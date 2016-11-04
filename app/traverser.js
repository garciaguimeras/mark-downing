/*
 * Document traverser
 */

var md = require('./md.js');

var MdType = md.MdType;
var Md = md.Md;

var MdTraverser = function(mdDocument) {
    this.mdDocument = mdDocument;
};

MdTraverser.prototype = {

    traverse: function(md, mdConverterFactory) {
        var mdConverter = mdConverterFactory.createConverterFor(md);

        if (md.children.length == 0) {
            if (mdConverter)
                return mdConverter.leaf(md);
        }
        else {
            var result = '';
            if (mdConverter)
                result += mdConverter.begin(md);
            md.children.forEach((child) => {
                result += this.traverse(child, mdConverterFactory);
            });
            if (mdConverter)
                result += mdConverter.end(md);
            return result;
        }
    },

    execute: function(mdConverterFactory) {
        if (mdConverterFactory != null) {
            return this.traverse(this.mdDocument, mdConverterFactory);
        }
    },

};


// Module exports

module.exports = {
    MdTraverser: MdTraverser,
};
