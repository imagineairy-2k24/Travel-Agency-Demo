/**
 * Shared progressive-enhancement entry.
 * Trip planner logic lives in /js/planner.js (include separately on planner pages).
 */
(function () {
  "use strict";

  var DESKTOP_MQ = "(min-width: 768px)";

  function isDesktopNav() {
    return window.matchMedia(DESKTOP_MQ).matches;
  }

  /**
   * Mobile nav: right-side drawer, backdrop, Escape/outside close, link close.
   * Expects [data-nav-toggle] + [data-site-nav] (or #site-nav).
   */
  function initNavToggle() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-site-nav]") || document.getElementById("site-nav");
    if (!toggle || !nav) return;

    /* Drop unicode hamburger so CSS lines are the only icon (avoids double-render) */
    var toggleIcon = toggle.querySelector("[aria-hidden=\"true\"]");
    if (toggleIcon) toggleIcon.textContent = "";

    var backdrop = document.querySelector("[data-nav-backdrop]");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "nav-backdrop";
      backdrop.setAttribute("data-nav-backdrop", "");
      backdrop.hidden = true;
      document.body.appendChild(backdrop);
    }

    function ensureDrawerChrome() {
      if (nav.querySelector("[data-nav-drawer-head]")) return;
      var head = document.createElement("div");
      head.className = "site-nav__drawer-head";
      head.setAttribute("data-nav-drawer-head", "");
      head.innerHTML =
        '<p class="site-nav__drawer-title">Menu</p>' +
        '<button type="button" class="site-nav__drawer-close" data-nav-close aria-label="Close menu">' +
        '<span aria-hidden="true">×</span></button>';
      nav.insertBefore(head, nav.firstChild);
    }

    ensureDrawerChrome();

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-is-open", open);
      backdrop.classList.toggle("is-visible", open);
      backdrop.hidden = !open;
      nav.setAttribute("aria-hidden", open ? "false" : "true");
      if (!open) closeAllNavPanels(nav);
    }

    function isOpen() {
      return nav.classList.contains("is-open");
    }

    /* Closed drawer should not be announced as visible content on mobile. */
    if (!isDesktopNav()) {
      nav.setAttribute("aria-hidden", "true");
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(!isOpen());
    });

    backdrop.addEventListener("click", function () {
      setOpen(false);
      toggle.focus();
    });

    nav.addEventListener("click", function (event) {
      var target = event.target;
      var closeBtn =
        target && target.closest
          ? target.closest("[data-nav-close]")
          : null;
      if (!closeBtn) return;
      event.stopPropagation();
      setOpen(false);
      toggle.focus();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen() && !isDesktopNav()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!isOpen() || isDesktopNav()) return;
      var target = event.target;
      if (nav.contains(target) || toggle.contains(target)) return;
      if (backdrop.contains(target)) return;
      setOpen(false);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (isOpen() && !isDesktopNav()) setOpen(false);
      });
    });

    window.matchMedia(DESKTOP_MQ).addEventListener("change", function (event) {
      if (event.matches) {
        setOpen(false);
        nav.removeAttribute("aria-hidden");
      } else {
        nav.setAttribute("aria-hidden", isOpen() ? "false" : "true");
      }
    });
  }

  function closeAllNavPanels(nav) {
    nav.querySelectorAll(".site-nav__item--has-panel").forEach(function (item) {
      item.classList.remove("is-open");
      var trigger = item.querySelector(".site-nav__trigger");
      var panel = item.querySelector(".site-nav__panel");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (panel) panel.hidden = true;
    });
  }

  function openNavPanel(item) {
    var trigger = item.querySelector(".site-nav__trigger");
    var panel = item.querySelector(".site-nav__panel");
    item.classList.add("is-open");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    if (panel) panel.hidden = false;
  }

  function closeNavPanel(item) {
    var trigger = item.querySelector(".site-nav__trigger");
    var panel = item.querySelector(".site-nav__panel");
    item.classList.remove("is-open");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;
  }

  /**
   * Desktop dropdown panels + mobile accordion for .site-nav__item--has-panel.
   */
  function initNavPanels() {
    var nav = document.querySelector("[data-site-nav]") || document.getElementById("site-nav");
    if (!nav) return;

    var items = Array.prototype.slice.call(
      nav.querySelectorAll(".site-nav__item--has-panel")
    );
    if (!items.length) return;

    var hoverTimer = null;

    items.forEach(function (item) {
      var trigger = item.querySelector(".site-nav__trigger");
      var panel = item.querySelector(".site-nav__panel");
      if (!trigger || !panel) return;

      if (!panel.id) {
        panel.id =
          "nav-panel-" +
          (trigger.id || Math.random().toString(36).slice(2, 8));
      }
      trigger.setAttribute("aria-controls", panel.id);
      trigger.setAttribute("aria-expanded", "false");
      panel.hidden = true;

      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        if (isDesktopNav()) {
          // Desktop: open on click (hover may already open). Outside click / Escape / leave closes.
          // Avoid hover-then-click immediately toggling closed.
          items.forEach(function (other) {
            if (other !== item) closeNavPanel(other);
          });
          openNavPanel(item);
          return;
        }
        var willOpen = !item.classList.contains("is-open");
        if (willOpen) openNavPanel(item);
        else closeNavPanel(item);
      });

      item.addEventListener("mouseenter", function () {
        if (!isDesktopNav()) return;
        window.clearTimeout(hoverTimer);
        items.forEach(function (other) {
          if (other !== item) closeNavPanel(other);
        });
        openNavPanel(item);
      });

      item.addEventListener("mouseleave", function () {
        if (!isDesktopNav()) return;
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(function () {
          if (!item.contains(document.activeElement)) closeNavPanel(item);
        }, 120);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var openItem = nav.querySelector(".site-nav__item--has-panel.is-open");
      if (!openItem) return;
      var trigger = openItem.querySelector(".site-nav__trigger");
      closeAllNavPanels(nav);
      if (trigger && isDesktopNav()) trigger.focus();
    });

    document.addEventListener("click", function (event) {
      if (!isDesktopNav()) return;
      if (nav.contains(event.target)) return;
      closeAllNavPanels(nav);
    });

    window.matchMedia(DESKTOP_MQ).addEventListener("change", function () {
      closeAllNavPanels(nav);
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

  /**
   * Homepage featured destinations India / International tabs.
   */
  function initDestinationTabs() {
    var root = document.querySelector("[data-destination-tabs]");
    if (!root) return;

    var tabs = Array.prototype.slice.call(
      root.querySelectorAll('[role="tab"]')
    );
    var panels = Array.prototype.slice.call(
      root.querySelectorAll('[role="tabpanel"]')
    );
    if (!tabs.length || !panels.length) return;

    function activate(tab) {
      var targetId = tab.getAttribute("aria-controls");
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
        t.classList.toggle("is-active", selected);
      });
      panels.forEach(function (panel) {
        var match = panel.id === targetId;
        panel.hidden = !match;
        panel.classList.toggle("is-active", match);
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab);
      });
      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          next = tabs[(index + 1) % tabs.length];
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (event.key === "Home") {
          next = tabs[0];
        } else if (event.key === "End") {
          next = tabs[tabs.length - 1];
        }
        if (!next) return;
        event.preventDefault();
        next.focus();
        activate(next);
      });
    });

    var initial =
      tabs.find(function (t) {
        return t.getAttribute("aria-selected") === "true";
      }) || tabs[0];
    activate(initial);
  }

  function boot() {
    initNavToggle();
    initNavPanels();
    initHeaderScroll();
    initSelectionCards();
    initDestinationTabs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
