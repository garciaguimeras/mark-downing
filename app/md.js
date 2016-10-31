/*
 * Markdown definition module
 */

// Md object

const MdType = {
    Document: 1,
    RichText: 2,
    Code: 3,

    Paragraph: 10,
    Line: 11,

    Header1: 20,
    Header2: 21,
    Header3: 22,
    Header4: 23,
    Header5: 24,
    Header6: 25,
};

var Md = function(type) {
    this.type = type;
    this.content = null;
    this.children = [];
    this.visits = 0;
};

Md.prototype = {

    isVisited: function() {
        return this.visits > 0;
    },

    addChild: function(md) {
        this.children[this.children.length] = md;
    },

    addChildren: function(mdArray) {
        mdArray.forEach((md) => {
            this.addChild(md);
        });
    },

};


// Module exports

module.exports = {
    MdType: MdType,
    Md: Md,
};
