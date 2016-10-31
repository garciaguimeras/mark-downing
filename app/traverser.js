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

    traverse: function(md, fn) {
        if (md.children.length == 0) {
            fn(md);
        }
        else {
            md.children.forEach((child) => {
                this.traverse(child, fn);
            });
        }
    },

    execute: function(fn) {
        if (fn != null) {
            this.traverse(this.mdDocument, fn);
        }
    },

};


// Module exports

module.exports = {
    MdTraverser: MdTraverser,
};
