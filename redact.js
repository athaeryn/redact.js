$(document).ready(function () {
    "use strict";

    var color,
        chars = ['*', '&', '#', '@', '!', '%'];

    function randChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    $('.redacted').each(function () {
        // Get the original text
        var original = $(this).html(),
            grawlix = '';

        for (var i = 0; i < original.length; i++) {
            grawlix += original[i] == ' ' ? ' ' : randChar();
        }

        var split = grawlix.split(' ');
        for (var i = 0; i < split.length; i++) {
            split[i] = '<span>' + split[i] + '</span>';
        }

        $(this).html(split.join(' '));

        // Save the color
        color = $(this).css('color');

        // Change it to transparent. Also, position relative for the :afters.
        $(this).find('span').css({
            'color': 'transparent',
            'position': 'relative'
        });
    });

    var style = "<style>.redacted>span:after{position:absolute;top:25%;bottom:25%;left:0;right:0;background:" + color + ";content:'';}</style>"
    $('head').append(style);

});
