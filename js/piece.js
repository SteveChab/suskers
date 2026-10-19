/* ====================================================================
   The pieces
   ====================================================================
   What every bar shares: the play toggle, the mark that turns on a
   press, chrome away, and the reduced-motion copy for the gate.
   ==================================================================== */

var Piece = (function () {
  var PLAY  = 'M0 0 18 10 0 20Z';
  var PAUSE = 'M0 0H6V20H0ZM12 0H18V20H12Z';

  function setPlay(btn, on) {
    btn.classList.toggle('is-on', on);
    document.getElementById(btn.getAttribute('aria-labelledby')).textContent = on ? 'Pause' : 'Play';
    btn.querySelector('path').setAttribute('d', on ? PAUSE : PLAY);
  }

  // Strip, reflow, re-add, so a fast second press still turns.
  function turn(btn) {
    var mark = btn.querySelector('.control__mark');
    mark.classList.remove('control__mark--turning');
    void mark.offsetWidth;
    mark.classList.add('control__mark--turning');
  }

  document.addEventListener('animationend', function (e) {
    if (e.animationName === 'control-turn') e.target.classList.remove('control__mark--turning');
  });

  var wantsCalm = window.matchMedia &&
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Returns the button the gate should open on.
  function calmGate(body, go, still) {
    if (!wantsCalm) return go;
    body.textContent = 'Your system asks for reduced motion, so the art is holding still. ' +
      'Held still, it is the same picture torn the same way, without the clock. ' +
      'Starting the animation from here means blinking and strobing.';
    still.classList.add('btn--solid');
    go.classList.remove('btn--solid');
    return still;
  }

  // Chrome away, on any page with an #overlay.
  (function () {
    var overlay = document.getElementById('overlay');
    if (!overlay) return;

    var hint  = document.getElementById('hint');
    var label = overlay.querySelector('.sr-only');
    var body  = document.body;

    function toggle() {
      var on = !body.classList.contains('is-bare');
      body.classList.toggle('is-bare', on);
      label.textContent = on
        ? 'Bring the navigation and the controls back'
        : 'Hide the navigation and the controls';
      hint.hidden = !on;

      // Going bare hides whatever held the keyboard, so the overlay
      // takes the focus rather than leaving it on a display: none
      // control.
      if (on && !overlay.contains(document.activeElement)) overlay.focus();
    }

    overlay.addEventListener('click', toggle);

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      // A modal dialog answers Escape itself. In a text field the key
      // belongs to the field, and hiding the bar would strand the
      // keyboard on a display: none input.
      var active = document.activeElement;
      if (document.querySelector('dialog[open]')) return;
      if (active && active.matches && active.matches('input, textarea, select')) return;
      toggle();
    });
  }());

  return { setPlay: setPlay, turn: turn, calmGate: calmGate };
}());
