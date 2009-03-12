// ==UserScript==
// @name          Facebook minus Twitter updates
// @version       1.0
// @namespace     http://github.com/Carlo/greasekit-scripts/tree/master 
// @author        Carlo Zottmann <carlo@zottmann.org>
// @include       http://*facebook.com/profile*
// @include       http://*facebook.com/home*
// ==/UserScript==


(function() {
    var spans = document.evaluate('//span[@class="status_source"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < spans.snapshotLength; i++) {
        var elem = spans.snapshotItem(i);
    
        if (!elem.innerHTML.match(/Twitter/)) { continue; }

        elem.parentNode.parentNode.parentNode.style.display = "none";
    }
})();
