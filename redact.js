$(document).ready(function () {
    "use strict";
 
    // This give arrays "pushUnique" function
    // If the item you wish to push exists in the array, then you get back its
    // id, which is just its position in the array. If it doesn't exist, then it
    // gets pushed on to the array, and you still get back the id.
    Array.prototype.pushUnique = function (item) {
        var id = this.indexOf(item);
        if (id == -1) {
            this.push(item);
            id = this.length - 1;
        }
        return id;
    }

    // "color" will hold the ids of each unique color.
    var color = [],
        chars = '*&#@!%'.split('');

    // Simply returns a random character from the "chars" array.
    function randChar() {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    // "This"->"!@&$" 
    function grawlix(text) {
        var grawlix = '';
        for (var i = 0; i < text.length; i++) {
            grawlix += text[i] == ' ' ? ' ' : randChar();
        }
        return grawlix;
    }
   
    // Wraps each word in a <span>, and is repectful of &nbsp;
    function spanify(text) {
        return text.replace(/\S+/g, function (a) {
            a = a.replace(/&nbsp;/g, '</span>&nbsp;<span>');
            return "<span>" + a + "</span>";
        });
    }

    $('.redacted').each(function () {
        // Get a unique id for the color.
        var colorID = color.pushUnique($(this).css('color'));

        // Wrap the text in <span>s and put it back.
        $(this).html(spanify($(this).html()));

        // Go through each of these new <span>s.
        $(this).find('span').each(function () {
            
            // Set the content to grawlixes.
            $(this).html(grawlix($(this).html()));

            // Hide the text and position relative so that our blocks position
            // themselves correctly.
            $(this).css({
                'color': 'transparent',
                'position': 'relative'
            });
        });

        // Attach a hook class with the appropriate unique color id 
        $(this).addClass('redacted' + colorID);
    });

    // Set the common style for the blocks.
    var style = ".redacted>span:after{position:absolute;top:25%;bottom:25%;left:0;right:0;content:'';}"

    // Create rules for each unique color.
    for (var i = 0; i < color.length; i++) {
        style += ".redacted" + i + ">span:after{background:" + color[i] + "}"
    }

    // Insert the style tag into the document.
    $('head').append("<style>" + style + "</style>");

});
