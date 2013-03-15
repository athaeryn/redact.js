$(document).ready(function () {
    "use strict";

    var color,
        chars = ['*', '&', '#', '@', '!', '%'];

    function randChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    $('.redacted').each(function () {
        // Get the original text of the outer element
        var all = $(this).html();

        // Wrap each word in <span>
        all = all.replace(/\s+/g, '</span> <span>');
        all = all.replace(/&nbsp;/g, '</span>&nbsp;<span>');
        all = '<span>' + all + '</span>';

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
        
        // Save the color
        color = $(this).css('color');

        // Change it to transparent. Also, position relative for the :afters.
    });

    // Inject the blocks' style, so they are sexy and thin
    var style = "<style>.redacted>span:after{position:absolute;top:25%;bottom:25%;left:0;right:0;background:" + color + ";content:'';}</style>"
    $('head').append(style);

});
