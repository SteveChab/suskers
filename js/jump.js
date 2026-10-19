/* ====================================================================
   Jump links
   ====================================================================
   A link to an id scrolls the page but leaves the keyboard where it
   was, so the next Tab starts over from the top of the document. This
   moves the focus to match the scroll.
   ==================================================================== */

(function () {
  function land(id) {
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus();
  }

  function hashId() {
    try {
      return decodeURIComponent(location.hash.slice(1));
    } catch (e) {
      return location.hash.slice(1);
    }
  }

  // The browser does the scrolling; this follows on the next frame, so
  // the scroll is settled before the focus lands.
  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;
    var id = link.getAttribute('href').slice(1);
    if (!id) return;
    requestAnimationFrame(function () { land(id); });
  });

  window.addEventListener('hashchange', function () { land(hashId()); });
  if (location.hash) land(hashId());
}());
