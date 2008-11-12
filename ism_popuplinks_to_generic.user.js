// ==UserScript==
// @name            ISM Popup Links to Generic Links
// @description     I am tired of having ISM open popups. Me want standard links.
// @version         1.1
// @namespace       http://github.com/Carlo/greasekit-scripts/tree/master 
// @author          Carlo Zottmann <carlo@zottmann.org>
// @include         http://www.ishotmyself.com*
// @include         http://ishotmyself.com*
// ==/UserScript==

(function ()
{
    var candidates = document.getElementsByTagName("a");

    for (var cand = null, i = 0; (cand = candidates[i]); i++) {
        if (cand.getAttribute("onclick") == null && cand.href.toLowerCase().indexOf("javascript:") == 0) {
            match = cand.href.match(/(popupLandscape\('([^']+)'\))/i);

            if (match != null) {
                // cand.setAttribute("onclick", match[1] + "\nreturn false;");
                cand.setAttribute("href", match[2]);
            }
        }
    }
})();
