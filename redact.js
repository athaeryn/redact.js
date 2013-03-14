$(document).ready( function () {
    var style = "<style>.redacted>span:after{position:absolute;top:25%;bottom:25%;left:0;right:0;background:black;content:'';}</style>"
    $('head').append(style);
    function randChar() {
        var chars = ['*', '&', '#', '@', '!', '%'];
        return chars[Math.floor(Math.random() * chars.length)];
    }
    var redactedblocks = $('.redacted'), color;
    redactedblocks.each(function (i) {
        color = $(this).css('color');
        var original = $(this).html();
        var grawlix = '';
        for (var i = 0; i < original.length; i++) {
            grawlix += original[i] == ' ' ? ' ' : randChar();
        }
        var split = grawlix.split(' ');
        for (var i = 0; i < split.length; i++) {
            split[i] = '<span>' + split[i] + '</span>';
        }
        $(this).html(split.join(' '));
    });
    redactedblocks.find('span').css({
        'color': 'transparent',
        'position': 'relative'
    });
});
