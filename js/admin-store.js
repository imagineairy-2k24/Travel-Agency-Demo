/**
 * Stage-1 Admin Demo store — illustrative seed JSON + localStorage overlays.
 * No APIs, auth, payments, or server persistence.
 *
 * Public: window.TAAdminStore
 *
 * Enquiry status set (locked labels):
 *   New | Contacted | Planning | Quotation Sent | Approved | Booked | Completed
 * Demo choice: any of these statuses may be selected (not forward-only).
 *
 * localStorage keys (prefix taAdmin):
 *   taAdmin:enquiries   — { statusById: {}, appended: [] }
 *   taAdmin:trips       — { byId: { [id]: trip } }
 *   taAdmin:quotations  — { statusById: {}, appended: [] }
 *   taAdmin:bookings    — { statusById: {}, appended: [] }
 *   taAdmin:reviews     — { statusById: {} }
 *   taAdmin:content     — { destinations:{}, packages:{}, vehicles:{} } values published|unpublished
 */
(function (global) {
  "use strict";

  var KEYS = {
    enquiries: "taAdmin:enquiries",
    trips: "taAdmin:trips",
    quotations: "taAdmin:quotations",
    bookings: "taAdmin:bookings",
    reviews: "taAdmin:reviews",
    content: "taAdmin:content"
  };

  var ENQUIRY_STATUSES = [
    "New",
    "Contacted",
    "Planning",
    "Quotation Sent",
    "Approved",
    "Booked",
    "Completed"
  ];

  var QUOTE_STATUSES = ["Draft", "Sent", "Approved", "Declined"];
  var BOOKING_STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];
  var REVIEW_STATUSES = ["Pending", "Approved", "Hidden"];
  var PUBLISH_STATUSES = ["published", "unpublished"];
  var CONTENT_TYPES = ["destinations", "packages", "vehicles"];

  var SEED_URLS = {
    customers: "/data/admin-customers.json",
    enquiries: "/data/admin-enquiries.json",
    trips: "/data/admin-trips.json",
    quotations: "/data/admin-quotations.json",
    bookings: "/data/admin-bookings.json",
    reviews: "/data/admin-reviews.json"
  };

  var DEST_NAMES = {
    kashmir: "Kashmir",
    rajasthan: "Rajasthan",
    kerala: "Kerala",
    sikkim: "Sikkim",
    bali: "Bali",
    thailand: "Thailand",
    dubai: "Dubai",
    singapore: "Singapore"
  };

  var cache = {
    customers: null,
    enquiries: null,
    trips: null,
    quotations: null,
    bookings: null,
    reviews: null,
    loaded: false
  };

  /* ---------- storage helpers ---------- */

  function readStore(key, fallback) {
    try {
      var raw = global.localStorage.getItem(key);
      if (!raw) return fallback;
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function emptyEnquiryOverlay() {
    return { statusById: {}, appended: [] };
  }

  function emptyTripOverlay() {
    return { byId: {} };
  }

  function emptyQuoteOverlay() {
    return { statusById: {}, appended: [] };
  }

  function emptyBookingOverlay() {
    return { statusById: {}, appended: [] };
  }

  function emptyReviewOverlay() {
    return { statusById: {} };
  }

  function emptyContentOverlay() {
    return { destinations: {}, packages: {}, vehicles: {} };
  }

  /* ---------- seed loading ---------- */

  function loadSeed(url) {
    return fetch(url, {
      credentials: "same-origin",
      cache: "no-store"
    }).then(function (res) {
      if (!res.ok) throw new Error("Failed to load " + url + " (" + res.status + ")");
      return res.json();
    });
  }

  function loadAllSeeds(urls) {
    var map = urls || SEED_URLS;
    return Promise.all([
      loadSeed(map.customers),
      loadSeed(map.enquiries),
      loadSeed(map.trips),
      loadSeed(map.quotations),
      loadSeed(map.bookings),
      loadSeed(map.reviews)
    ]).then(function (parts) {
      cache.customers = parts[0];
      cache.enquiries = parts[1];
      cache.trips = parts[2];
      cache.quotations = parts[3];
      cache.bookings = parts[4];
      cache.reviews = parts[5];
      cache.loaded = true;
      return {
        customers: cache.customers,
        enquiries: cache.enquiries,
        trips: cache.trips,
        quotations: cache.quotations,
        bookings: cache.bookings,
        reviews: cache.reviews
      };
    });
  }

  function ensureLoaded() {
    if (cache.loaded) return Promise.resolve();
    return loadAllSeeds();
  }

  /* ---------- public enquiry bridge (also usable without full init) ---------- */

  /**
   * Append a public planner enquiry into taAdmin:enquiries.appended.
   * Safe to call from public pages even if seeds are not loaded.
   */
  function appendPublicEnquiry(payload) {
    if (!payload || typeof payload !== "object") return null;
    var overlay = readStore(KEYS.enquiries, emptyEnquiryOverlay());
    if (!Array.isArray(overlay.appended)) overlay.appended = [];
    if (!overlay.statusById || typeof overlay.statusById !== "object") {
      overlay.statusById = {};
    }

    var slug = payload.destinationSlug || payload.destination || "";
    var name =
      payload.destination ||
      DEST_NAMES[slug] ||
      (slug ? String(slug) : "Undecided");

    var enquiry = {
      id: payload.id || "enq-public-" + Date.now(),
      customerId: payload.customerId || null,
      customerName: payload.customerName || payload.name || "",
      email: payload.email || "",
      phone: payload.phone || "",
      destination: name,
      destinationSlug: slug,
      travelDates: {
        start: (payload.travelDates && payload.travelDates.start) || payload.startDate || "",
        end: (payload.travelDates && payload.travelDates.end) || payload.endDate || "",
        flexible: !!(
          (payload.travelDates && payload.travelDates.flexible) ||
          payload.flexibleDates
        )
      },
      travellers: {
        adults: Number(
          (payload.travellers && payload.travellers.adults) != null
            ? payload.travellers.adults
            : payload.adults != null
              ? payload.adults
              : 2
        ),
        children: Number(
          (payload.travellers && payload.travellers.children) != null
            ? payload.travellers.children
            : payload.children != null
              ? payload.children
              : 0
        )
      },
      tripType: payload.tripType || "",
      status: "New",
      createdAt: payload.createdAt || payload.submittedAt || new Date().toISOString(),
      requirements: payload.requirements || "",
      message: payload.message || "",
      source: payload.source || "Plan Your Trip"
    };

    overlay.appended.push(enquiry);
    writeStore(KEYS.enquiries, overlay);
    return enquiry;
  }

  /**
   * Map planner session state → enquiry payload and append.
   */
  function appendEnquiryFromPlannerState(state) {
    if (!state || typeof state !== "object") return null;
    var prefs = state.preferences || {};
    var contact = state.contact || {};
    var reqParts = [];
    if (prefs.hotelCategory) reqParts.push("Hotel: " + prefs.hotelCategory);
    if (prefs.vehicleCategory) reqParts.push("Vehicle: " + prefs.vehicleCategory);
    if (prefs.pace) reqParts.push("Pace: " + prefs.pace);
    if (prefs.mustVisit) reqParts.push("Must visit: " + prefs.mustVisit);
    if (prefs.specialRequirements) reqParts.push(prefs.specialRequirements);
    if (state.budget) reqParts.push("Budget: " + state.budget);
    if (Array.isArray(state.services) && state.services.length) {
      reqParts.push("Services: " + state.services.join(", "));
    }
    if (state.package) reqParts.push("Package interest: " + state.package);

    return appendPublicEnquiry({
      id: "enq-public-" + Date.now(),
      customerName: contact.name || "",
      email: contact.email || "",
      phone: contact.phone || "",
      destinationSlug: state.destination || "",
      destination: DEST_NAMES[state.destination] || state.destination || "",
      startDate: state.startDate || "",
      endDate: state.endDate || "",
      flexibleDates: !!state.flexibleDates,
      adults: state.adults,
      children: state.children,
      tripType: state.tripType || "",
      requirements: reqParts.join(" · "),
      message: contact.message || "",
      source: "Plan Your Trip",
      createdAt: state.submittedAt || new Date().toISOString()
    });
  }

  /* ---------- merge helpers ---------- */

  function mergeEnquiries() {
    var seed = Array.isArray(cache.enquiries) ? clone(cache.enquiries) : [];
    var overlay = readStore(KEYS.enquiries, emptyEnquiryOverlay());
    var byId = {};
    seed.forEach(function (e) {
      byId[e.id] = e;
    });
    (overlay.appended || []).forEach(function (e) {
      if (e && e.id) byId[e.id] = clone(e);
    });
    Object.keys(overlay.statusById || {}).forEach(function (id) {
      if (byId[id]) byId[id].status = overlay.statusById[id];
    });
    return Object.keys(byId)
      .map(function (id) {
        return byId[id];
      })
      .sort(function (a, b) {
        return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
      });
  }

  function mergeTrips() {
    var seed = Array.isArray(cache.trips) ? clone(cache.trips) : [];
    var overlay = readStore(KEYS.trips, emptyTripOverlay());
    var byId = {};
    seed.forEach(function (t) {
      byId[t.id] = t;
    });
    Object.keys(overlay.byId || {}).forEach(function (id) {
      byId[id] = clone(overlay.byId[id]);
    });
    return Object.keys(byId).map(function (id) {
      return byId[id];
    });
  }

  function mergeQuotations() {
    var seed = Array.isArray(cache.quotations) ? clone(cache.quotations) : [];
    var overlay = readStore(KEYS.quotations, emptyQuoteOverlay());
    var byId = {};
    seed.forEach(function (q) {
      byId[q.id] = q;
    });
    (overlay.appended || []).forEach(function (q) {
      if (q && q.id) byId[q.id] = clone(q);
    });
    Object.keys(overlay.statusById || {}).forEach(function (id) {
      if (byId[id]) byId[id].status = overlay.statusById[id];
    });
    return Object.keys(byId).map(function (id) {
      return byId[id];
    });
  }

  function mergeBookings() {
    var seed = Array.isArray(cache.bookings) ? clone(cache.bookings) : [];
    var overlay = readStore(KEYS.bookings, emptyBookingOverlay());
    var byId = {};
    seed.forEach(function (b) {
      byId[b.id] = b;
    });
    (overlay.appended || []).forEach(function (b) {
      if (b && b.id) byId[b.id] = clone(b);
    });
    Object.keys(overlay.statusById || {}).forEach(function (id) {
      if (byId[id]) byId[id].status = overlay.statusById[id];
    });
    return Object.keys(byId).map(function (id) {
      return byId[id];
    });
  }

  function mergeReviews() {
    var seed = Array.isArray(cache.reviews) ? clone(cache.reviews) : [];
    var overlay = readStore(KEYS.reviews, emptyReviewOverlay());
    return seed.map(function (r) {
      var copy = clone(r);
      if (overlay.statusById && overlay.statusById[r.id]) {
        copy.status = overlay.statusById[r.id];
      }
      return copy;
    });
  }

  function findById(list, id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  /* ---------- customers ---------- */

  function getCustomers() {
    var customers = Array.isArray(cache.customers) ? clone(cache.customers) : [];
    var enquiries = mergeEnquiries();
    var trips = mergeTrips();
    return customers.map(function (c) {
      var copy = clone(c);
      copy.enquiryCount = enquiries.filter(function (e) {
        return e.customerId === c.id;
      }).length;
      copy.tripCount = trips.filter(function (t) {
        return t.customerId === c.id;
      }).length;
      return copy;
    });
  }

  function getCustomer(id) {
    return findById(getCustomers(), id);
  }

  /* ---------- enquiries ---------- */

  function getEnquiries() {
    return mergeEnquiries();
  }

  function getEnquiry(id) {
    return findById(mergeEnquiries(), id);
  }

  function setEnquiryStatus(id, status) {
    if (ENQUIRY_STATUSES.indexOf(status) === -1) {
      throw new Error("Invalid enquiry status: " + status);
    }
    var overlay = readStore(KEYS.enquiries, emptyEnquiryOverlay());
    if (!overlay.statusById) overlay.statusById = {};
    if (!Array.isArray(overlay.appended)) overlay.appended = [];
    overlay.statusById[id] = status;
    writeStore(KEYS.enquiries, overlay);
    return getEnquiry(id);
  }

  function addEnquiry(enquiry) {
    return appendPublicEnquiry(enquiry);
  }

  /* ---------- trips ---------- */

  function getTrips() {
    return mergeTrips();
  }

  function getTrip(id) {
    return findById(mergeTrips(), id);
  }

  function persistTrip(trip) {
    var overlay = readStore(KEYS.trips, emptyTripOverlay());
    if (!overlay.byId) overlay.byId = {};
    overlay.byId[trip.id] = clone(trip);
    writeStore(KEYS.trips, overlay);
    return clone(trip);
  }

  function createTripFromEnquiry(enquiryId) {
    var enq = getEnquiry(enquiryId);
    if (!enq) throw new Error("Enquiry not found: " + enquiryId);
    var trip = {
      id: "trip-" + Date.now(),
      enquiryId: enq.id,
      customerId: enq.customerId || null,
      customerName: enq.customerName || "",
      destination: enq.destination || "",
      destinationSlug: enq.destinationSlug || "",
      travelDates: {
        start: (enq.travelDates && enq.travelDates.start) || "",
        end: (enq.travelDates && enq.travelDates.end) || ""
      },
      travellers: {
        adults: (enq.travellers && enq.travellers.adults) || 2,
        children: (enq.travellers && enq.travellers.children) || 0
      },
      status: "Planning",
      notes: "",
      itinerary: []
    };
    return persistTrip(trip);
  }

  function saveTrip(trip) {
    if (!trip || !trip.id) throw new Error("Trip requires id");
    return persistTrip(trip);
  }

  function requireTrip(tripId) {
    var trip = getTrip(tripId);
    if (!trip) throw new Error("Trip not found: " + tripId);
    return trip;
  }

  function findDay(trip, dayNum) {
    var days = trip.itinerary || [];
    for (var i = 0; i < days.length; i++) {
      if (Number(days[i].day) === Number(dayNum)) return days[i];
    }
    return null;
  }

  function addDay(tripId, dayPayload) {
    var trip = requireTrip(tripId);
    if (!Array.isArray(trip.itinerary)) trip.itinerary = [];
    var dayNum =
      dayPayload && dayPayload.day != null
        ? Number(dayPayload.day)
        : trip.itinerary.length + 1;
    var existing = findDay(trip, dayNum);
    if (existing) throw new Error("Day already exists: " + dayNum);
    trip.itinerary.push({
      day: dayNum,
      title: (dayPayload && dayPayload.title) || "Day " + dayNum,
      notes: (dayPayload && dayPayload.notes) || "",
      activities: (dayPayload && dayPayload.activities) || []
    });
    trip.itinerary.sort(function (a, b) {
      return Number(a.day) - Number(b.day);
    });
    return persistTrip(trip);
  }

  function updateDay(tripId, dayNum, patch) {
    var trip = requireTrip(tripId);
    var day = findDay(trip, dayNum);
    if (!day) throw new Error("Day not found: " + dayNum);
    if (patch) {
      if (patch.title != null) day.title = patch.title;
      if (patch.notes != null) day.notes = patch.notes;
      if (patch.activities) day.activities = patch.activities;
    }
    return persistTrip(trip);
  }

  function addActivity(tripId, dayNum, activity) {
    var trip = requireTrip(tripId);
    var day = findDay(trip, dayNum);
    if (!day) throw new Error("Day not found: " + dayNum);
    if (!Array.isArray(day.activities)) day.activities = [];
    var act = {
      id: (activity && activity.id) || "act-" + Date.now(),
      title: (activity && activity.title) || "Activity",
      time: (activity && activity.time) || "",
      description: (activity && activity.description) || ""
    };
    day.activities.push(act);
    return persistTrip(trip);
  }

  function updateActivity(tripId, dayNum, activityId, patch) {
    var trip = requireTrip(tripId);
    var day = findDay(trip, dayNum);
    if (!day) throw new Error("Day not found: " + dayNum);
    var acts = day.activities || [];
    var found = null;
    for (var i = 0; i < acts.length; i++) {
      if (acts[i].id === activityId) {
        found = acts[i];
        break;
      }
    }
    if (!found) throw new Error("Activity not found: " + activityId);
    if (patch) {
      if (patch.title != null) found.title = patch.title;
      if (patch.time != null) found.time = patch.time;
      if (patch.description != null) found.description = patch.description;
    }
    return persistTrip(trip);
  }

  function deleteActivity(tripId, dayNum, activityId) {
    var trip = requireTrip(tripId);
    var day = findDay(trip, dayNum);
    if (!day) throw new Error("Day not found: " + dayNum);
    day.activities = (day.activities || []).filter(function (a) {
      return a.id !== activityId;
    });
    return persistTrip(trip);
  }

  function setTripNotes(tripId, notes) {
    var trip = requireTrip(tripId);
    trip.notes = notes == null ? "" : String(notes);
    return persistTrip(trip);
  }

  /* ---------- quotations ---------- */

  function getQuotations() {
    return mergeQuotations();
  }

  function getQuotation(id) {
    return findById(mergeQuotations(), id);
  }

  function createQuotationFromTrip(tripId, overrides) {
    var trip = requireTrip(tripId);
    var overlay = readStore(KEYS.quotations, emptyQuoteOverlay());
    if (!Array.isArray(overlay.appended)) overlay.appended = [];
    if (!overlay.statusById) overlay.statusById = {};

    var amount =
      overrides && overrides.amount != null ? Number(overrides.amount) : 75000;
    var lineItems =
      (overrides && overrides.lineItems) || [
        { description: "Illustrative package block", amount: Math.round(amount * 0.7) },
        { description: "Transfers & planning (demo)", amount: Math.round(amount * 0.3) }
      ];

    var quote = {
      id: "quote-" + Date.now(),
      quoteNumber:
        (overrides && overrides.quoteNumber) ||
        "QT-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-4),
      tripId: trip.id,
      enquiryId: trip.enquiryId || null,
      customerId: trip.customerId || null,
      customerName: trip.customerName || "",
      tripLabel:
        (overrides && overrides.tripLabel) ||
        (trip.destination || "Trip") +
          " — " +
          (trip.travelDates && trip.travelDates.start
            ? trip.travelDates.start
            : "dates TBC"),
      amount: amount,
      currency: "INR",
      status: (overrides && overrides.status) || "Draft",
      date:
        (overrides && overrides.date) ||
        new Date().toISOString().slice(0, 10),
      lineItems: lineItems,
      inclusions:
        (overrides && overrides.inclusions) || [
          "Accommodation as discussed (illustrative)",
          "Selected transfers"
        ],
      exclusions:
        (overrides && overrides.exclusions) || [
          "Flights",
          "Personal expenses",
          "Anything not listed"
        ],
      demoDisclaimer: "Illustrative demo pricing — not a live quote."
    };

    if (QUOTE_STATUSES.indexOf(quote.status) === -1) quote.status = "Draft";
    overlay.appended.push(quote);
    writeStore(KEYS.quotations, overlay);
    return clone(quote);
  }

  function setQuotationStatus(id, status) {
    if (QUOTE_STATUSES.indexOf(status) === -1) {
      throw new Error("Invalid quotation status: " + status);
    }
    var overlay = readStore(KEYS.quotations, emptyQuoteOverlay());
    if (!overlay.statusById) overlay.statusById = {};
    if (!Array.isArray(overlay.appended)) overlay.appended = [];

    var existingAppended = null;
    for (var i = 0; i < overlay.appended.length; i++) {
      if (overlay.appended[i].id === id) {
        existingAppended = overlay.appended[i];
        break;
      }
    }
    if (existingAppended) {
      existingAppended.status = status;
    }
    overlay.statusById[id] = status;
    writeStore(KEYS.quotations, overlay);
    return getQuotation(id);
  }

  /* ---------- bookings ---------- */

  function getBookings() {
    return mergeBookings();
  }

  function getBooking(id) {
    return findById(mergeBookings(), id);
  }

  function createBookingFromQuotation(quotationId) {
    var quote = getQuotation(quotationId);
    if (!quote) throw new Error("Quotation not found: " + quotationId);
    if (quote.status !== "Approved") {
      throw new Error("Booking requires an Approved quotation");
    }
    var trip = quote.tripId ? getTrip(quote.tripId) : null;
    var overlay = readStore(KEYS.bookings, emptyBookingOverlay());
    if (!Array.isArray(overlay.appended)) overlay.appended = [];
    if (!overlay.statusById) overlay.statusById = {};

    var summary = "";
    if (trip && Array.isArray(trip.itinerary) && trip.itinerary.length) {
      summary = trip.itinerary
        .map(function (d) {
          return "Day " + d.day + ": " + d.title;
        })
        .join(" → ");
    } else {
      summary = quote.tripLabel || "Illustrative itinerary";
    }

    var booking = {
      id: "book-" + Date.now(),
      bookingRef: "BK-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-3),
      quotationId: quote.id,
      tripId: quote.tripId || null,
      customerId: quote.customerId || null,
      customerName: quote.customerName || "",
      destination: (trip && trip.destination) || "",
      travelDates: {
        start: (trip && trip.travelDates && trip.travelDates.start) || "",
        end: (trip && trip.travelDates && trip.travelDates.end) || ""
      },
      travellers: {
        adults: (trip && trip.travellers && trip.travellers.adults) || 2,
        children: (trip && trip.travellers && trip.travellers.children) || 0
      },
      amount: quote.amount,
      status: "Pending",
      itinerarySummary: summary,
      createdAt: new Date().toISOString()
    };

    overlay.appended.push(booking);
    writeStore(KEYS.bookings, overlay);
    return clone(booking);
  }

  function setBookingStatus(id, status) {
    if (BOOKING_STATUSES.indexOf(status) === -1) {
      throw new Error("Invalid booking status: " + status);
    }
    var overlay = readStore(KEYS.bookings, emptyBookingOverlay());
    if (!overlay.statusById) overlay.statusById = {};
    if (!Array.isArray(overlay.appended)) overlay.appended = [];
    for (var i = 0; i < overlay.appended.length; i++) {
      if (overlay.appended[i].id === id) {
        overlay.appended[i].status = status;
        break;
      }
    }
    overlay.statusById[id] = status;
    writeStore(KEYS.bookings, overlay);
    return getBooking(id);
  }

  /* ---------- reviews ---------- */

  function getReviews() {
    return mergeReviews();
  }

  function setReviewStatus(id, status) {
    if (REVIEW_STATUSES.indexOf(status) === -1) {
      throw new Error("Invalid review status: " + status);
    }
    var overlay = readStore(KEYS.reviews, emptyReviewOverlay());
    if (!overlay.statusById) overlay.statusById = {};
    overlay.statusById[id] = status;
    writeStore(KEYS.reviews, overlay);
    return findById(mergeReviews(), id);
  }

  /* ---------- content publish ---------- */

  function getContentMeta(type, id) {
    if (CONTENT_TYPES.indexOf(type) === -1) {
      throw new Error("Invalid content type: " + type);
    }
    var overlay = readStore(KEYS.content, emptyContentOverlay());
    var map = overlay[type] || {};
    var status = map[id] || "published";
    return { type: type, id: id, publishStatus: status };
  }

  function setContentPublishStatus(type, id, status) {
    if (CONTENT_TYPES.indexOf(type) === -1) {
      throw new Error("Invalid content type: " + type);
    }
    if (PUBLISH_STATUSES.indexOf(status) === -1) {
      throw new Error("Invalid publish status: " + status);
    }
    var overlay = readStore(KEYS.content, emptyContentOverlay());
    CONTENT_TYPES.forEach(function (t) {
      if (!overlay[t] || typeof overlay[t] !== "object") overlay[t] = {};
    });
    overlay[type][id] = status;
    writeStore(KEYS.content, overlay);
    return getContentMeta(type, id);
  }

  /* ---------- dashboard ---------- */

  function getDashboardStats() {
    var enquiries = mergeEnquiries();
    var trips = mergeTrips();
    var quotations = mergeQuotations();
    var bookings = mergeBookings();
    var reviews = mergeReviews();

    var today = new Date().toISOString().slice(0, 10);
    var upcomingTrips = trips
      .filter(function (t) {
        var start = t.travelDates && t.travelDates.start;
        return start && start >= today && t.status !== "Completed" && t.status !== "Cancelled";
      })
      .sort(function (a, b) {
        return String(a.travelDates.start).localeCompare(String(b.travelDates.start));
      })
      .slice(0, 5);

    var recentEnquiries = enquiries.slice(0, 5);

    var pendingReviews = reviews.filter(function (r) {
      return r.status === "Pending";
    }).length;
    var draftQuotes = quotations.filter(function (q) {
      return q.status === "Draft";
    }).length;
    var pendingBookings = bookings.filter(function (b) {
      return b.status === "Pending";
    }).length;
    var newEnquiries = enquiries.filter(function (e) {
      return e.status === "New";
    }).length;

    var pendingActions = [];
    if (newEnquiries) {
      pendingActions.push({
        type: "enquiries",
        label: newEnquiries + " new enquir" + (newEnquiries === 1 ? "y" : "ies") + " to contact",
        count: newEnquiries
      });
    }
    if (draftQuotes) {
      pendingActions.push({
        type: "quotations",
        label: draftQuotes + " draft quotation" + (draftQuotes === 1 ? "" : "s"),
        count: draftQuotes
      });
    }
    if (pendingBookings) {
      pendingActions.push({
        type: "bookings",
        label: pendingBookings + " pending booking" + (pendingBookings === 1 ? "" : "s"),
        count: pendingBookings
      });
    }
    if (pendingReviews) {
      pendingActions.push({
        type: "reviews",
        label: pendingReviews + " review" + (pendingReviews === 1 ? "" : "s") + " awaiting moderation",
        count: pendingReviews
      });
    }

    return {
      counts: {
        customers: (cache.customers || []).length,
        enquiries: enquiries.length,
        trips: trips.length,
        quotations: quotations.length,
        bookings: bookings.length,
        reviews: reviews.length,
        newEnquiries: newEnquiries,
        pendingReviews: pendingReviews,
        draftQuotes: draftQuotes,
        pendingBookings: pendingBookings
      },
      recentEnquiries: recentEnquiries,
      upcomingTrips: upcomingTrips,
      pendingActions: pendingActions
    };
  }

  /* ---------- reset ---------- */

  function resetDemo() {
    Object.keys(KEYS).forEach(function (k) {
      try {
        global.localStorage.removeItem(KEYS[k]);
      } catch (e) {
        /* ignore */
      }
    });
    return true;
  }

  var api = {
    KEYS: KEYS,
    ENQUIRY_STATUSES: ENQUIRY_STATUSES,
    QUOTE_STATUSES: QUOTE_STATUSES,
    BOOKING_STATUSES: BOOKING_STATUSES,
    REVIEW_STATUSES: REVIEW_STATUSES,
    SEED_URLS: SEED_URLS,

    loadSeed: loadSeed,
    loadAllSeeds: loadAllSeeds,
    ensureLoaded: ensureLoaded,

    appendPublicEnquiry: appendPublicEnquiry,
    appendEnquiryFromPlannerState: appendEnquiryFromPlannerState,

    getCustomers: getCustomers,
    getCustomer: getCustomer,

    getEnquiries: getEnquiries,
    getEnquiry: getEnquiry,
    setEnquiryStatus: setEnquiryStatus,
    addEnquiry: addEnquiry,

    getTrips: getTrips,
    getTrip: getTrip,
    createTripFromEnquiry: createTripFromEnquiry,
    saveTrip: saveTrip,
    addDay: addDay,
    updateDay: updateDay,
    addActivity: addActivity,
    updateActivity: updateActivity,
    deleteActivity: deleteActivity,
    setTripNotes: setTripNotes,

    getQuotations: getQuotations,
    getQuotation: getQuotation,
    createQuotationFromTrip: createQuotationFromTrip,
    setQuotationStatus: setQuotationStatus,

    getBookings: getBookings,
    getBooking: getBooking,
    createBookingFromQuotation: createBookingFromQuotation,
    setBookingStatus: setBookingStatus,

    getReviews: getReviews,
    setReviewStatus: setReviewStatus,

    getContentMeta: getContentMeta,
    setContentPublishStatus: setContentPublishStatus,

    getDashboardStats: getDashboardStats,
    resetDemo: resetDemo
  };

  global.TAAdminStore = api;
})(typeof window !== "undefined" ? window : this);
