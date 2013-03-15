$(document).ready(function () {
    "use strict";

    var color = [],
        chars = '*&#@!%'.split('');

    function randChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    $('.redacted').each(function (id) {
        // Get the original text of the outer element
        var all = $(this).html();

        // Save the color
        color[id] = $(this).css('color');

        // Wrap each word in <span>
        all = all.replace(/\S+/g, function (a) {
            return "<span>" + a + "</span>";
        });
        all = all.replace(/&nbsp;/g, '</span>&nbsp;<span>');

        // Put the <span>-wrapped content back
        $(this).html(all);

        // Go through each of these new spans
        $(this).find('span').each(function () {
            
            // Grab the old content
            var old = $(this).html(),
                grawlix = '';

            // Replace each letter with a random character
            for (var i = 0; i < old.length; i++) {
                grawlix += old[i] == ' ' ? ' ' : randChar();
            }

            // Set the content to the grawlixes
            $(this).html(grawlix);

            // Set some stylings
            $(this).css({
                'color': 'transparent',
                'position': 'relative'
            });
        });

        // Give the element a class that can be targeted in the css
        $(this).addClass('redacted' + id);
    });

    // The common style for the blocks
    var style = ".redacted>span:after{position:absolute;top:25%;bottom:25%;left:0;right:0;content:'';}"

    // Create rules for each of the background colors
    for (var i = 0; i < color.length; i++) {
        style += ".redacted" + i + ">span:after{background:" + color[i] + "}"
    }

    // Insert the style tag
    $('head').append("<style>" + style + "</style>");

});
