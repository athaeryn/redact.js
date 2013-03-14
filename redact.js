$(document).ready( function () {
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
        'background-color': color
    });
});
