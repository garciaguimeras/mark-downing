/*
 * ConsoleConverterFactory module
 */


var createConverterFor = function(md) {
    return {

        leaf: function(md) {
            var txt = `>>>> ${md.type}\n`;
            for (var i = 0; i < md.content.length; i++) {
                txt += md.content[i] + '\n';
            }
            return txt;
        },

        begin: function(md) {},

        end: function(md) {},

    };
};


// Module exports

module.exports.createConverterFor = createConverterFor;
