/*
 * ConsoleConverterFactory module
 */


var createConverterFor = function(md) {
    return {

        leaf: function(md) {
            console.log(`>>>> ${md.type}`);
            md.content.forEach((line) => {
                console.log(line);
            });
        },

        begin: function(md) {},

        end: function(md) {},

    };
};


// Module exports

module.exports.createConverterFor = createConverterFor;
