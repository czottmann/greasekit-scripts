// ==UserScript==
// @name          Last.FM-Links im FM4 Trackservice
// @version       1.1
// @namespace     http://github.com/Carlo/greasekit-scripts/tree/master 
// @author        Carlo Zottmann <carlo@zottmann.org>
// @include       http://fm4.orf.at/trackservicepopup/main
// ==/UserScript==

(function() {
    var elems = document.evaluate('//table//table//td/font', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!elems.snapshotLength) return;
    
    var elem = elems.snapshotItem(0);
    
    var new_elem = elem.innerHTML;
    new_elem = new_elem.replace( /(<b>([^<]*)<\/b>.*<i>([^<]*)<\/i>)/g, "$1 | <a href=\"http://last.fm/music/$3/_/$2\">Last.fm</a>" );
    
    elem.innerHTML = new_elem;
  
})();
