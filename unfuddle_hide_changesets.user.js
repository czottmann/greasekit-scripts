// ==UserScript==
// @name          Hides the "Associated Changesets" in Unfuddle tickets and widens the comments column.
// @version       1.0
// @namespace     http://github.com/Carlo/greasekit-scripts/tree/master 
// @author        Carlo Zottmann <carlo@zottmann.org>
// @include       http://*.unfuddle.com/projects/*/tickets/by_number/*
// ==/UserScript==

(function() {
  try {
    $$("#ticket_show_changesets")[0].style.display = "none";
    $$("#ticket_show_comments")[0].style.width = "99%";
  } catch(e) {}
})();
