/*
 * Markdown definition module
 */

// Md object

const MdType = {
    None: 0,

    Document: 1,
    RichText: 2,
    Code: 3,

    Paragraph: 10,
    Line: 11,

    Title1: 20,
    Title2: 21,
    Title3: 22,
    Title4: 23,
    Title5: 24,
    Title6: 25,

    PlainText: 100,
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
