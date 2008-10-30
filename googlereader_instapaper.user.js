// ==UserScript==
// @name          Instapaper in Google Reader
// @description   [v1.2] This script adds Instapaper links to all GR items. Look for the little scissors next to the item headlines.
// @namespace     http://carlo.zottmann.org/
// @author        Carlo Zottmann <carlo@zottmann.org>
// @include       http://www.google.com/reader/view/*
// @include       https://www.google.com/reader/view/*
// ==/UserScript==

// Most code reused from http://userscripts.org/scripts/show/29160 -- thanks!

(function() {
    var timerID;
    var busy = false;

    function makeIPLink(targetNode, href, titleStr) {
        var jslink = 'http://www.instapaper.com/b?v=4&k=UVAsB4xV1ksG&u=' +  encodeURIComponent(href) + '&t=' + encodeURIComponent(titleStr) + '&s=0';

        var a = document.createElement("a");
        a.setAttribute("href", jslink);
        a.setAttribute("target", "_blank");
        a.setAttribute("style", "color: #000; margin-left: 5px;");
        a.innerHTML = "&#x2702;";

        with (targetNode) {
            appendChild(a);
        }
    }

    function makeIPLinks(titleArray) {
        //loop for articles
        for (var i = 0; i < titleArray.length; i++) {
            var href = titleArray[i].href;
            var title = titleArray[i].node;
            var titleStr = titleArray[i].titleStr;
            //make span tag
            var node = document.createElement('span');
            node.className = 'googlereader2ip';
            makeIPLink(node, href, titleStr);
            title.insertBefore(node, title.childNodes[1]);
        }
    }

    //main function(timer calls every 3 seconds)
    function greader_add_instapaper() {
        if (busy) return;

        var titles = document.evaluate('//h2[@class="entry-title"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (! titles.snapshotLength) return;

        busy = true;

        var titleArray = new Array();
        for (var i = 0; i < titles.snapshotLength; i++) {
            var title = titles.snapshotItem(i);
            var nodes = title.childNodes;
            if ((nodes == null) ||
              (nodes[1] == null) ||
              (nodes[1].tagName != 'SPAN') ||
              (nodes[1].className != 'googlereader2ip')) {
                var link = null;
                var titleStr = '';
                if (title.firstChild.tagName == 'A') {
                    // entry-container (Expanded view or Collapsed item)
                    link = title.firstChild;
                    titleStr = link.firstChild.textContent;
                } else {
                    // entry (List view)
                    link = title.parentNode.parentNode.firstChild;
                    if (link.tagName != 'A') link = null;
                    titleStr = title.textContent;
                }
                if (link != null) {
                    titleArray.push({ node: title, href: link.href, titleStr: titleStr });
                }
            }
        }
        if (titleArray.length == 0) {
            busy = false;
            return;
        }
        
        makeIPLinks(titleArray);
        busy = false;
    }

    // be careful not to be too busy
    timerID = setInterval(greader_add_instapaper, 3000);
})();
