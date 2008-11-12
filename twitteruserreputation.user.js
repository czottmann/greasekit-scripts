// ==UserScript==
// @name            Twitter User Reputation
// @description     Twitter user reputation display, c/o TwerpScan.com
// @version         1.3
// @namespace       http://github.com/Carlo/greasekit-scripts/tree/master 
// @author          Carlo Zottmann <carlo@zottmann.org>
// @include         http://twitter.com/*
// @exclude         http://twitter.com/home
// ==/UserScript==

(function() {
    if (!document.title.match(/^Twitter \/ \w+$/)) { 
        return;
    }

    // Still unused
    // var bgc  = document.defaultView.getComputedStyle(side, null).backgroundColor.replace(/[^\d\,]+/g, "");

    var side = document.getElementById("side");
    var u    = document.location.href.replace(/^.*twitter\.com\//,'');
    var h    = ["<div class='section'>", 
                "<div class='section-header'><h1>Reputation</h1></div>",
                "<iframe src='http://twerpscan.com/embed/user_reputation.html?",
                "user=", u, "' width='72' height='27' ",
                "scrolling='no' marginheight='0' marginwidth='0' ",
                "frameborder='0'></iframe>",
                "</div>"].join("");

    side.innerHTML = h + side.innerHTML;
})();
