/* ARCHIV — apparition au scroll, fail-safe.
 * On ne masque QUE les éléments situés sous la ligne de flottaison (donc aucun
 * flash et aucun contenu visible affecté). Si JS/IO absent ou reduced-motion :
 * rien n'est masqué. Filet de sécurité : tout est révélé après 5 s. */
(function () {
  "use strict";
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var SEL = ".gal-card, .rp-tl-item, .rp-pillar, .rp-source";

  function init() {
    var els = Array.prototype.slice.call(document.querySelectorAll(SEL));
    if (!els.length) return;

    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    var armed = [];
    var fold = window.innerHeight - 20; /* strictement sous le pli → aucun flash */
    els.forEach(function (e) {
      /* n'armer (masquer) que ce qui est sous la ligne de flottaison */
      if (e.getBoundingClientRect().top > fold) {
        e.classList.add("rp-r");
        io.observe(e);
        armed.push(e);
      }
    });

    /* filet de sécurité : si l'observer ne se déclenche jamais, on révèle tout */
    setTimeout(function () {
      armed.forEach(function (e) { e.classList.add("is-in"); });
    }, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
