/**
 * Shared progressive-enhancement entry.
 * Trip planner logic lives in /js/planner.js (include separately on planner pages).
 */
(function () {
  "use strict";

  /**
   * Mobile nav: toggle, Escape close, outside click, link click close.
   * Expects [data-nav-toggle] + [data-site-nav] (or #site-nav).
   */
  function initNavToggle() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-site-nav]") || document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    function isOpen() {
      return nav.classList.contains("is-open");
    }

    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!isOpen()) return;
      var target = event.target;
      if (nav.contains(target) || toggle.contains(target)) return;
      setOpen(false);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (isOpen()) setOpen(false);
      });
    });
  }

  /**
   * Transparent-over-hero → solid on scroll.
   * Requires .site-header--over-hero on the header.
   */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header--over-hero");
    if (!header) return;

    var threshold = 24;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > threshold);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /**
   * Hook: selection-card pressed state (styleguide / non-planner pages).
   * Skip cards inside [data-trip-planner] — owned by planner.js.
   * Multi-select: data-selection-multi="true" (no sibling clear).
   */
  function initSelectionCards() {
    var cards = document.querySelectorAll("[data-selection-card]");
    if (!cards.length) return;

    cards.forEach(function (card) {
      if (card.closest("[data-trip-planner]")) return;

      card.addEventListener("click", function () {
        var group = card.getAttribute("data-selection-group");
        var multi =
          card.getAttribute("data-selection-multi") === "true" ||
          (group &&
            document.querySelector(
              '[data-selection-group="' +
                group +
                '"][data-selection-multi="true"]'
            ));

        if (group && !multi) {
          document
            .querySelectorAll('[data-selection-group="' + group + '"]')
            .forEach(function (sibling) {
              sibling.classList.remove("is-selected");
              sibling.setAttribute("aria-pressed", "false");
            });
        }

        if (multi) {
          var on = card.getAttribute("aria-pressed") !== "true";
          card.classList.toggle("is-selected", on);
          card.setAttribute("aria-pressed", on ? "true" : "false");
          return;
        }

        var selected = card.getAttribute("aria-pressed") !== "true";
        card.classList.toggle("is-selected", selected);
        card.setAttribute("aria-pressed", selected ? "true" : "false");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHeaderScroll();
    initSelectionCards();
  });
})();
