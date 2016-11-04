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
            mdConverter.leaf(md);
        }
        else {
            mdConverter.begin(md);
            md.children.forEach((child) => {
                this.traverse(child, mdConverterFactory);
            });
            mdConverter.end(md);
        }
    },

    execute: function(mdConverterFactory) {
        if (mdConverterFactory != null) {
            this.traverse(this.mdDocument, mdConverterFactory);
        }
    },

};


// Module exports

module.exports = {
    MdTraverser: MdTraverser,
};
