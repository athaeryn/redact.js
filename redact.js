$(document).ready( function () {
    var loremblocks = $('.lorem'), color;
    loremblocks.each(function (i) {
        color = $(this).css('color');
        var content = $(this).html();
        var split = content.split(' ');
        for (var i = 0; i < split.length; i++) {
            split[i] = '<span>' + split[i] + '</span>';
        }
        $(this).html(split.join(' '));
    });
    loremblocks.find('span').css({
        'color': 'transparent',
        'background-color': color
    });
});
