/**
 * Multi-step Plan Your Trip — client-side only.
 * State: sessionStorage key `taDemoPlanner`.
 * No APIs, payments, CRM, or WhatsApp Business API.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "taDemoPlanner";
  var SUMMARY_PATH = "/plan-your-trip/summary/";
  var PLANNER_PATH = "/plan-your-trip/";
  var WA_NUMBER = "919999999999";

  var STEP_IDS = [
    "destination",
    "dates",
    "travellers",
    "tripType",
    "services",
    "preferences",
    "budget",
    "contact"
  ];

  var DESTINATION_SLUGS = [
    "kashmir",
    "rajasthan",
    "kerala",
    "sikkim",
    "bali",
    "thailand",
    "dubai",
    "singapore"
  ];

  var TRAVEL_SCOPES = ["domestic", "international"];

  var DESTINATION_SCOPE = {
    kashmir: "domestic",
    rajasthan: "domestic",
    kerala: "domestic",
    sikkim: "domestic",
    bali: "international",
    thailand: "international",
    dubai: "international",
    singapore: "international"
  };

  function emptyState() {
    return {
      destination: "",
      travelScope: "",
      package: "",
      vehicle: "",
      startDate: "",
      endDate: "",
      flexibleDates: false,
      adults: 2,
      children: 0,
      tripType: "",
      services: [],
      preferences: {
        hotelCategory: "",
        vehicleCategory: "",
        pace: "",
        mustVisit: "",
        specialRequirements: ""
      },
      budget: "",
      contact: {
        name: "",
        phone: "",
        email: "",
        message: ""
      },
      submittedAt: ""
    };
  }

  function loadState() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      var parsed = JSON.parse(raw);
      return mergeState(emptyState(), parsed);
    } catch (e) {
      return emptyState();
    }
  }

  function saveState(state) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignore quota / private mode */
    }
  }

  function mergeState(base, patch) {
    if (!patch || typeof patch !== "object") return base;
    var out = Object.assign({}, base, patch);
    out.preferences = Object.assign(
      {},
      base.preferences,
      patch.preferences || {}
    );
    out.contact = Object.assign({}, base.contact, patch.contact || {});
    out.services = Array.isArray(patch.services)
      ? patch.services.slice()
      : base.services.slice();
    return out;
  }

  function getQueryParams() {
    var params = {};
    var search = window.location.search || "";
    if (!search || search === "?") return params;
    search
      .replace(/^\?/, "")
      .split("&")
      .forEach(function (pair) {
        if (!pair) return;
        var parts = pair.split("=");
        var key = decodeURIComponent(parts[0] || "").trim();
        var val = decodeURIComponent((parts[1] || "").replace(/\+/g, " "));
        if (key) params[key] = val;
      });
    return params;
  }

  var PACKAGE_DESTINATION = {
    "kashmir-family-tour": "kashmir",
    "rajasthan-heritage-tour": "rajasthan",
    "kerala-backwaters-escape": "kerala",
    "bali-escape": "bali",
    "thailand-highlights": "thailand",
    "dubai-discovery": "dubai",
    "singapore-explorer": "singapore"
  };

  var PACKAGE_TITLES = {
    "kashmir-family-tour": "Kashmir Family Escape",
    "rajasthan-heritage-tour": "Rajasthan Heritage Journey",
    "kerala-backwaters-escape": "Kerala Backwater Retreat",
    "bali-escape": "Bali Escape",
    "thailand-highlights": "Thailand Highlights",
    "dubai-discovery": "Dubai Discovery",
    "singapore-explorer": "Singapore Explorer"
  };

  function applyQueryPrefill(state) {
    var q = getQueryParams();
    if (q.destination) state.destination = String(q.destination).toLowerCase();
    if (q.travelScope) {
      var scope = String(q.travelScope).toLowerCase();
      if (TRAVEL_SCOPES.indexOf(scope) !== -1) state.travelScope = scope;
    }
    if (q.package) state.package = String(q.package);
    if (q.vehicle) state.vehicle = String(q.vehicle);
    if (q.tripType) {
      var tt = String(q.tripType).toLowerCase();
      if (tt === "couple") tt = "honeymoon";
      state.tripType = tt;
    }
    if (q.adults && !isNaN(Number(q.adults))) {
      state.adults = Math.max(1, parseInt(q.adults, 10));
    }
    if (q.children && !isNaN(Number(q.children))) {
      state.children = Math.max(0, parseInt(q.children, 10));
    }
    if (q.startDate) state.startDate = String(q.startDate);
    if (q.endDate) state.endDate = String(q.endDate);
    if (q.flexibleDates === "1" || q.flexibleDates === "true") {
      state.flexibleDates = true;
    }
    if (q.dates) {
      var range = String(q.dates).split(/[|,]/);
      if (range[0]) state.startDate = range[0].trim();
      if (range[1]) state.endDate = range[1].trim();
    }
    if (!state.destination && state.package && PACKAGE_DESTINATION[state.package]) {
      state.destination = PACKAGE_DESTINATION[state.package];
    }
    if (
      state.travelScope &&
      state.destination &&
      DESTINATION_SCOPE[state.destination] &&
      DESTINATION_SCOPE[state.destination] !== state.travelScope
    ) {
      state.destination = "";
    }
    if (!state.travelScope && state.destination && DESTINATION_SCOPE[state.destination]) {
      state.travelScope = DESTINATION_SCOPE[state.destination];
    }
    return state;
  }

  function labelize(value) {
    if (!value) return "";
    return String(value)
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, function (c) {
        return c.toUpperCase();
      });
  }

  function setError(root, message) {
    var el = root.querySelector("[data-planner-error]");
    if (!el) return;
    el.textContent = message || "";
    el.hidden = !message;
  }

  function clearError(root) {
    setError(root, "");
  }

  /* ---------- Selection cards (planner-owned) ---------- */

  function isMultiSelect(card) {
    if (card.getAttribute("data-selection-multi") === "true") return true;
    var group = card.getAttribute("data-selection-group");
    if (!group) return false;
    var any = card
      .closest("[data-trip-planner]")
      .querySelector(
        '[data-selection-group="' +
          group +
          '"][data-selection-multi="true"]'
      );
    return !!any;
  }

  function syncCardsFromState(root, state) {
    root.querySelectorAll("[data-selection-card]").forEach(function (card) {
      var group = card.getAttribute("data-selection-group") || "";
      var value = card.getAttribute("data-value") || "";
      var selected = false;

      if (
        group === "destination" ||
        group === "tripType" ||
        group === "budget" ||
        group === "travelScope"
      ) {
        selected = state[group] === value;
      } else if (group === "services") {
        selected = state.services.indexOf(value) !== -1;
      } else if (group === "hotelCategory" || group === "vehicleCategory" || group === "pace") {
        selected = state.preferences[group] === value;
      } else if (card.getAttribute("data-planner-field")) {
        var field = card.getAttribute("data-planner-field");
        selected = getByPath(state, field) === value;
      }

      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    filterDestinationCardsByScope(root, state);
    filterDomesticVehicleOptions(root, state);
  }

  /**
   * Show destinations only after India | International is chosen,
   * and only those matching the selected travelScope.
   */
  function filterDestinationCardsByScope(root, state) {
    var scope = state.travelScope || "";
    root
      .querySelectorAll('[data-selection-group="destination"]')
      .forEach(function (card) {
        var cardScope = card.getAttribute("data-travel-scope") || "";
        var visible = !!scope && (!cardScope || cardScope === scope);
        card.hidden = !visible;
        if (!visible && state.destination === (card.getAttribute("data-value") || "")) {
          state.destination = "";
          card.classList.remove("is-selected");
          card.setAttribute("aria-pressed", "false");
        }
      });

    var group =
      root.querySelector("[data-planner-destination-group]") ||
      (function () {
        var destCard = root.querySelector(
          '[data-selection-group="destination"]'
        );
        return destCard ? destCard.closest(".selection-card-group") : null;
      })();
    if (group) {
      group.hidden = !scope;
      group.setAttribute("aria-hidden", scope ? "false" : "true");
    }
  }

  /**
   * International scope: hide car-rental service + vehicle preferences
   * (demo fleet is domestic-only; vehicleIds empty on intl destinations).
   */
  function filterDomesticVehicleOptions(root, state) {
    var intl =
      state.travelScope === "international" ||
      (!!state.destination &&
        DESTINATION_SCOPE[state.destination] === "international");
    root.querySelectorAll("[data-planner-domestic-vehicle]").forEach(function (el) {
      el.hidden = intl;
    });
    if (!intl) return;

    var carIdx = state.services.indexOf("car");
    if (carIdx !== -1) {
      state.services.splice(carIdx, 1);
      var carCard = root.querySelector(
        '[data-selection-group="services"][data-value="car"]'
      );
      if (carCard) {
        carCard.classList.remove("is-selected");
        carCard.setAttribute("aria-pressed", "false");
      }
    }
    if (state.preferences.vehicleCategory) {
      state.preferences.vehicleCategory = "";
      root
        .querySelectorAll('[data-selection-group="vehicleCategory"]')
        .forEach(function (card) {
          card.classList.remove("is-selected");
          card.setAttribute("aria-pressed", "false");
        });
    }
  }

  function getByPath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc == null ? undefined : acc[key];
    }, obj);
  }

  function setByPath(obj, path, value) {
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]] || typeof cur[parts[i]] !== "object") {
        cur[parts[i]] = {};
      }
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
  }

  function bindSelectionCards(root, state, onChange) {
    root.querySelectorAll("[data-selection-card]").forEach(function (card) {
      card.addEventListener("click", function () {
        var group = card.getAttribute("data-selection-group") || "";
        var value = card.getAttribute("data-value") || "";
        var field = card.getAttribute("data-planner-field");
        var multi = isMultiSelect(card);

        if (multi || group === "services") {
          var list = state.services;
          if (field) {
            list = getByPath(state, field);
            if (!Array.isArray(list)) list = [];
          } else {
            list = state.services.slice();
          }
          var idx = list.indexOf(value);
          if (idx === -1) list.push(value);
          else list.splice(idx, 1);
          if (field) setByPath(state, field, list);
          else state.services = list;
        } else {
          if (
            group === "destination" ||
            group === "tripType" ||
            group === "budget" ||
            group === "travelScope"
          ) {
            state[group] = value;
            if (group === "travelScope") {
              if (
                value &&
                state.destination &&
                DESTINATION_SCOPE[state.destination] &&
                DESTINATION_SCOPE[state.destination] !== value
              ) {
                state.destination = "";
              }
            } else if (group === "destination" && value) {
              if (DESTINATION_SCOPE[value]) {
                state.travelScope = DESTINATION_SCOPE[value];
              }
            }
          } else if (
            group === "hotelCategory" ||
            group === "vehicleCategory" ||
            group === "pace"
          ) {
            state.preferences[group] = value;
          } else if (field) {
            setByPath(state, field, value);
          }
        }

        syncCardsFromState(root, state);
        saveState(state);
        if (onChange) onChange();
      });
    });
  }

  /* ---------- Form fields ---------- */

  function syncFieldsFromState(root, state) {
    root.querySelectorAll("[data-planner-field]").forEach(function (el) {
      if (el.hasAttribute("data-selection-card")) return;
      var path = el.getAttribute("data-planner-field");
      var val = getByPath(state, path);
      if (el.type === "checkbox") {
        el.checked = !!val;
      } else if (el.type === "number") {
        el.value = val == null ? "" : String(val);
      } else if (val != null) {
        el.value = String(val);
      }
    });

    // Common name= fallbacks when data-planner-field omitted
    setNamed(root, "startDate", state.startDate);
    setNamed(root, "endDate", state.endDate);
    setNamed(root, "adults", state.adults);
    setNamed(root, "children", state.children);
    setNamed(root, "mustVisit", state.preferences.mustVisit);
    setNamed(root, "specialRequirements", state.preferences.specialRequirements);
    setNamed(root, "name", state.contact.name);
    setNamed(root, "phone", state.contact.phone);
    setNamed(root, "email", state.contact.email);
    setNamed(root, "message", state.contact.message);

    var flex = root.querySelector('[name="flexibleDates"], [data-planner-field="flexibleDates"]');
    if (flex && flex.type === "checkbox") flex.checked = !!state.flexibleDates;
  }

  function setNamed(root, name, value) {
    var el = root.querySelector('[name="' + name + '"]');
    if (!el || el.hasAttribute("data-planner-field")) return;
    if (el.type === "checkbox") el.checked = !!value;
    else el.value = value == null ? "" : String(value);
  }

  function readFieldsIntoState(root, state) {
    root.querySelectorAll("[data-planner-field]").forEach(function (el) {
      if (el.hasAttribute("data-selection-card")) return;
      var path = el.getAttribute("data-planner-field");
      if (el.type === "checkbox") setByPath(state, path, el.checked);
      else if (el.type === "number") {
        var n = parseInt(el.value, 10);
        setByPath(state, path, isNaN(n) ? 0 : n);
      } else setByPath(state, path, el.value);
    });

    readNamed(root, "startDate", function (v) {
      state.startDate = v;
    });
    readNamed(root, "endDate", function (v) {
      state.endDate = v;
    });
    readNamed(root, "adults", function (v) {
      var n = parseInt(v, 10);
      state.adults = isNaN(n) ? 0 : n;
    });
    readNamed(root, "children", function (v) {
      var n = parseInt(v, 10);
      state.children = isNaN(n) ? 0 : 0 + n;
    });
    readNamed(root, "mustVisit", function (v) {
      state.preferences.mustVisit = v;
    });
    readNamed(root, "specialRequirements", function (v) {
      state.preferences.specialRequirements = v;
    });
    readNamed(root, "name", function (v) {
      state.contact.name = v;
    });
    readNamed(root, "phone", function (v) {
      state.contact.phone = v;
    });
    readNamed(root, "email", function (v) {
      state.contact.email = v;
    });
    readNamed(root, "message", function (v) {
      state.contact.message = v;
    });

    var flex = root.querySelector('[name="flexibleDates"], [data-planner-field="flexibleDates"]');
    if (flex && flex.type === "checkbox") state.flexibleDates = flex.checked;
  }

  function readNamed(root, name, assign) {
    var el = root.querySelector('[name="' + name + '"]');
    if (!el || el.hasAttribute("data-planner-field")) return;
    assign(el.type === "checkbox" ? el.checked : el.value);
  }

  function bindFieldListeners(root, state) {
    function onInput() {
      readFieldsIntoState(root, state);
      saveState(state);
    }
    root.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.addEventListener("change", onInput);
      el.addEventListener("input", onInput);
    });
  }

  /* ---------- Steps / progress ---------- */

  function getSteps(root) {
    return Array.prototype.slice.call(
      root.querySelectorAll("[data-planner-step]")
    );
  }

  function stepId(stepEl) {
    return stepEl.getAttribute("data-planner-step") || "";
  }

  function showStep(root, state, index) {
    var steps = getSteps(root);
    if (!steps.length) return;
    if (index < 0) index = 0;
    if (index >= steps.length) index = steps.length - 1;

    steps.forEach(function (step, i) {
      var active = i === index;
      step.hidden = !active;
      step.classList.toggle("is-active", active);
      step.setAttribute("aria-hidden", active ? "false" : "true");
    });

    root.setAttribute("data-current-step", stepId(steps[index]));
    root.setAttribute("data-current-step-index", String(index));

    var back = root.querySelector("[data-planner-back]");
    var next = root.querySelector("[data-planner-next]");
    var submit = root.querySelector("[data-planner-submit]");
    if (back) back.disabled = index === 0;
    if (next) next.hidden = index === steps.length - 1;
    if (submit) submit.hidden = index !== steps.length - 1;

    updateProgress(root, index, steps.length);
    clearError(root);
    syncCardsFromState(root, state);
    syncFieldsFromState(root, state);
  }

  function updateProgress(root, index, total) {
    var progress = root.querySelector("[data-planner-progress]");
    if (!progress) return;

    progress.setAttribute("data-progress-index", String(index));
    progress.setAttribute("data-progress-total", String(total));
    progress.setAttribute(
      "aria-valuenow",
      String(index + 1)
    );
    progress.setAttribute("aria-valuemin", "1");
    progress.setAttribute("aria-valuemax", String(total));

    var fill = progress.querySelector("[data-planner-progress-fill]");
    if (fill) {
      var pct = total <= 1 ? 100 : Math.round((index / (total - 1)) * 100);
      fill.style.width = pct + "%";
    }

    var label = progress.querySelector("[data-planner-progress-label]");
    if (label) {
      label.textContent = "Step " + (index + 1) + " of " + total;
    }

    var items = progress.querySelectorAll("[data-planner-progress-step]");
    items.forEach(function (item, i) {
      item.classList.toggle("is-current", i === index);
      item.classList.toggle("is-complete", i < index);
      item.setAttribute("aria-current", i === index ? "step" : "false");
    });
  }

  function currentIndex(root) {
    var raw = root.getAttribute("data-current-step-index");
    var n = parseInt(raw, 10);
    return isNaN(n) ? 0 : n;
  }

  function validateStep(root, state, stepEl) {
    readFieldsIntoState(root, state);
    var id = stepId(stepEl);

    if (id === "destination") {
      if (!state.travelScope) {
        return "Please choose India or International.";
      }
      if (!state.destination) return "Please select a destination.";
      if (
        DESTINATION_SCOPE[state.destination] &&
        DESTINATION_SCOPE[state.destination] !== state.travelScope
      ) {
        return "Please select a destination that matches India or International.";
      }
      if (
        DESTINATION_SLUGS.indexOf(state.destination) === -1 &&
        !root.querySelector(
          '[data-selection-group="destination"][data-value="' +
            state.destination +
            '"]'
        )
      ) {
        return "Please select a valid destination.";
      }
    }

    if (id === "dates") {
      if (!state.flexibleDates) {
        if (!state.startDate) return "Please choose a start date, or mark dates as flexible.";
        if (state.endDate && state.endDate < state.startDate) {
          return "End date should be on or after the start date.";
        }
      }
    }

    if (id === "travellers") {
      if (!state.adults || state.adults < 1) {
        return "Please enter at least one adult traveller.";
      }
      if (state.children < 0) return "Children cannot be negative.";
    }

    if (id === "tripType") {
      if (!state.tripType) return "Please select a trip type.";
    }

    if (id === "services") {
      if (!state.services || !state.services.length) {
        return "Please select at least one service.";
      }
    }

    if (id === "budget") {
      if (!state.budget) return "Please select a budget range.";
    }

    if (id === "contact") {
      if (!state.contact.name || !String(state.contact.name).trim()) {
        return "Please enter your name.";
      }
      if (!state.contact.phone || !String(state.contact.phone).trim()) {
        return "Please enter a WhatsApp / mobile number.";
      }
    }

    return "";
  }

  function buildWhatsAppUrl(state) {
    var lines = [
      "Hello Travel Agency — trip enquiry (demo)",
      "Destination: " + (labelize(state.destination) || "—"),
      "Dates: " +
        (state.flexibleDates
          ? "Flexible"
          : [state.startDate, state.endDate].filter(Boolean).join(" → ") || "—"),
      "Travellers: " +
        state.adults +
        " adult(s), " +
        state.children +
        " child(ren)",
      "Trip type: " + (labelize(state.tripType) || "—"),
      "Services: " +
        (state.services && state.services.length
          ? state.services.map(labelize).join(", ")
          : "—"),
      "Budget: " + (state.budget || "—"),
      "Name: " + (state.contact.name || "—"),
      "Phone: " + (state.contact.phone || "—")
    ];
    if (state.package) lines.push("Package: " + state.package);
    if (state.vehicle) lines.push("Vehicle: " + state.vehicle);
    if (state.contact.message) lines.push("Message: " + state.contact.message);

    return (
      "https://wa.me/" +
      WA_NUMBER +
      "?text=" +
      encodeURIComponent(lines.join("\n"))
    );
  }

  /* ---------- Planner page ---------- */

  function initPlanner(root) {
    var state = applyQueryPrefill(loadState());
    saveState(state);

    var steps = getSteps(root);
    if (!steps.length) {
      // Fallback: treat STEP_IDS as logical order even if markup uses data-step
      return;
    }

    bindSelectionCards(root, state);
    bindFieldListeners(root, state);
    syncCardsFromState(root, state);
    syncFieldsFromState(root, state);

    // Prefill package/vehicle context into preferences when present
    if (state.vehicle && !state.preferences.vehicleCategory) {
      state.preferences.vehicleCategory = state.vehicle;
    }

    var startIndex = 0;
    showStep(root, state, startIndex);

    var back = root.querySelector("[data-planner-back]");
    var next = root.querySelector("[data-planner-next]");
    var submit = root.querySelector("[data-planner-submit]");

    if (back) {
      back.addEventListener("click", function () {
        readFieldsIntoState(root, state);
        saveState(state);
        showStep(root, state, currentIndex(root) - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        var idx = currentIndex(root);
        var stepEl = getSteps(root)[idx];
        var err = validateStep(root, state, stepEl);
        if (err) {
          setError(root, err);
          return;
        }
        saveState(state);
        showStep(root, state, idx + 1);
      });
    }

    if (submit) {
      submit.addEventListener("click", function (e) {
        e.preventDefault();
        var idx = currentIndex(root);
        var stepEl = getSteps(root)[idx];
        var err = validateStep(root, state, stepEl);
        if (err) {
          setError(root, err);
          return;
        }
        state.submittedAt = new Date().toISOString();
        saveState(state);
        window.location.href = SUMMARY_PATH;
      });
    }

    var form = root.tagName === "FORM" ? root : root.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (submit && !submit.hidden) submit.click();
        else if (next && !next.hidden) next.click();
      });
    }
  }

  /* ---------- Summary page ---------- */

  function setText(root, selector, text) {
    var el = root.querySelector(selector);
    if (el) el.textContent = text == null ? "" : String(text);
  }

  function initSummary(root) {
    var state = loadState();
    var empty = root.querySelector("[data-planner-summary-empty]");
    var filled = root.querySelector("[data-planner-summary-filled]");
    var hasEnquiry =
      !!(state.destination || state.contact.name || state.submittedAt);

    if (!hasEnquiry) {
      if (empty) empty.hidden = false;
      if (filled) filled.hidden = true;
      return;
    }

    if (empty) empty.hidden = true;
    if (filled) filled.hidden = false;

    var total =
      (parseInt(state.adults, 10) || 0) + (parseInt(state.children, 10) || 0);
    var datesLabel = state.flexibleDates
      ? "Flexible dates"
      : [state.startDate, state.endDate].filter(Boolean).join(" → ") || "—";

    setText(root, '[data-summary-field="destination"]', labelize(state.destination) || "—");
    setText(root, '[data-summary-field="dates"]', datesLabel);
    setText(
      root,
      '[data-summary-field="travellers"]',
      (state.adults || 0) +
        " adult(s), " +
        (state.children || 0) +
        " child(ren) (total " +
        total +
        ")"
    );
    setText(root, '[data-summary-field="tripType"]', labelize(state.tripType) || "—");
    setText(
      root,
      '[data-summary-field="services"]',
      state.services && state.services.length
        ? state.services.map(labelize).join(", ")
        : "—"
    );
    setText(
      root,
      '[data-summary-field="hotelCategory"]',
      state.preferences.hotelCategory
        ? labelize(state.preferences.hotelCategory)
        : "—"
    );
    setText(
      root,
      '[data-summary-field="vehicleCategory"]',
      state.preferences.vehicleCategory
        ? labelize(state.preferences.vehicleCategory)
        : state.vehicle
          ? labelize(state.vehicle)
          : "—"
    );
    setText(
      root,
      '[data-summary-field="pace"]',
      state.preferences.pace ? labelize(state.preferences.pace) : "—"
    );
    setText(
      root,
      '[data-summary-field="mustVisit"]',
      state.preferences.mustVisit || "—"
    );
    setText(
      root,
      '[data-summary-field="specialRequirements"]',
      state.preferences.specialRequirements || "—"
    );
    setText(root, '[data-summary-field="budget"]', state.budget || "—");
    setText(root, '[data-summary-field="name"]', state.contact.name || "—");
    setText(root, '[data-summary-field="phone"]', state.contact.phone || "—");
    setText(root, '[data-summary-field="email"]', state.contact.email || "—");
    setText(root, '[data-summary-field="message"]', state.contact.message || "—");
    setText(
      root,
      '[data-summary-field="package"]',
      PACKAGE_TITLES[state.package] || labelize(state.package) || "—"
    );
    setText(root, '[data-summary-field="vehicle"]', labelize(state.vehicle) || "—");

    var wa = root.querySelector("[data-planner-whatsapp]");
    if (wa) {
      wa.setAttribute("href", buildWhatsAppUrl(state));
      wa.setAttribute("target", "_blank");
      wa.setAttribute("rel", "noopener noreferrer");
    }

    var backLink = root.querySelector("[data-planner-back-link]");
    if (backLink && !backLink.getAttribute("href")) {
      backLink.setAttribute("href", PLANNER_PATH);
    }
  }

  function init() {
    var planner = document.querySelector("[data-trip-planner]");
    if (planner) initPlanner(planner);

    var summary = document.querySelector("[data-planner-summary]");
    if (summary) initSummary(summary);
  }

  document.addEventListener("DOMContentLoaded", init);

  // Expose for optional manual re-init / debugging in demo
  window.TravelAgencyPlanner = {
    STORAGE_KEY: STORAGE_KEY,
    loadState: loadState,
    saveState: saveState,
    init: init,
    STEP_IDS: STEP_IDS
  };
})();
