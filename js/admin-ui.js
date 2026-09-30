/**
 * Stage-1 Admin Demo UI — shell + page modules.
 * Depends on window.TAAdminStore.
 */
(function () {
  "use strict";

  var Store = null;

  var NAV = [
    { href: "/admin/", label: "Dashboard", page: "dashboard", section: "ops" },
    { href: "/admin/enquiries.html", label: "Enquiries", page: "enquiries", section: "ops" },
    { href: "/admin/customers.html", label: "Customers", page: "customers", section: "ops" },
    { href: "/admin/trips.html", label: "Trips & Itineraries", page: "trips", section: "ops" },
    { href: "/admin/quotations.html", label: "Quotations", page: "quotations", section: "ops" },
    { href: "/admin/bookings.html", label: "Bookings", page: "bookings", section: "ops" },
    {
      href: "/admin/content.html?tab=destinations",
      label: "Destinations",
      page: "content",
      tab: "destinations",
      section: "content",
      sub: true
    },
    {
      href: "/admin/content.html?tab=packages",
      label: "Tour Packages",
      page: "content",
      tab: "packages",
      section: "content",
      sub: true
    },
    {
      href: "/admin/content.html?tab=vehicles",
      label: "Vehicles",
      page: "content",
      tab: "vehicles",
      section: "content",
      sub: true
    },
    { href: "/admin/reviews.html", label: "Reviews", page: "reviews", section: "reviews" }
  ];

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(iso) {
    if (!iso) return "—";
    var d = String(iso).slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return escapeHtml(iso);
    var parts = d.split("-");
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return parts[2] + " " + months[Number(parts[1]) - 1] + " " + parts[0];
  }

  function formatDateRange(dates) {
    if (!dates) return "—";
    var start = dates.start ? formatDate(dates.start) : "";
    var end = dates.end ? formatDate(dates.end) : "";
    if (start && end) return start + " – " + end;
    return start || end || "—";
  }

  function travellerLabel(t) {
    if (!t) return "—";
    var a = Number(t.adults || 0);
    var c = Number(t.children || 0);
    var parts = [a + " adult" + (a === 1 ? "" : "s")];
    if (c) parts.push(c + " child" + (c === 1 ? "" : "ren"));
    return parts.join(", ");
  }

  function money(amount) {
    var n = Number(amount || 0);
    return "₹" + n.toLocaleString("en-IN");
  }

  function badgeClass(status) {
    var key = String(status || "")
      .toLowerCase()
      .replace(/\s+/g, "-");
    return "admin-badge admin-badge--" + key;
  }

  function badge(status) {
    return (
      '<span class="' +
      badgeClass(status) +
      '">' +
      escapeHtml(status || "—") +
      "</span>"
    );
  }

  function toast(message) {
    var el = qs("#admin-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "admin-toast";
      el.className = "admin-toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 2800);
  }

  function currentPage() {
    var body = document.body;
    return body.getAttribute("data-admin-page") || "dashboard";
  }

  function renderShell() {
    var page = currentPage();
    var title = document.body.getAttribute("data-admin-title") || "Admin";
    var activeTab = param("tab") || "destinations";

    var opsLinks = NAV.filter(function (n) {
      return n.section === "ops";
    })
      .map(function (n) {
        var active = n.page === page && !n.sub;
        return (
          '<a class="admin-nav__link' +
          (active ? " is-active" : "") +
          '" href="' +
          n.href +
          '">' +
          escapeHtml(n.label) +
          "</a>"
        );
      })
      .join("");

    var contentLinks = NAV.filter(function (n) {
      return n.section === "content";
    })
      .map(function (n) {
        var active = page === "content" && activeTab === n.tab;
        return (
          '<a class="admin-nav__link admin-nav__link--sub' +
          (active ? " is-active" : "") +
          '" href="' +
          n.href +
          '">' +
          escapeHtml(n.label) +
          "</a>"
        );
      })
      .join("");

    var app = qs("#admin-app");
    if (!app) return;

    var existingMain = qs("#admin-page-root");
    var pageHtml = existingMain ? existingMain.innerHTML : "";

    app.innerHTML =
      '<aside class="admin-sidebar" id="admin-sidebar" aria-label="Admin navigation">' +
      '<div class="admin-sidebar__brand">' +
      '<a class="admin-sidebar__brand-label" href="/admin/">Travel Agency</a>' +
      '<span class="admin-sidebar__brand-sub">Internal admin demo</span>' +
      "</div>" +
      '<nav class="admin-nav">' +
      '<div class="admin-nav__section">' +
      '<p class="admin-nav__section-title">Operations</p>' +
      opsLinks +
      "</div>" +
      '<div class="admin-nav__section">' +
      '<p class="admin-nav__section-title">Website Content</p>' +
      contentLinks +
      "</div>" +
      '<div class="admin-nav__section">' +
      '<p class="admin-nav__section-title">After travel</p>' +
      '<a class="admin-nav__link' +
      (page === "reviews" ? " is-active" : "") +
      '" href="/admin/reviews.html">Reviews</a>' +
      "</div>" +
      "</nav>" +
      '<div class="admin-sidebar__foot">' +
      '<a href="/">← Public website</a><br />Stage-1 demo · not production' +
      "</div>" +
      "</aside>" +
      '<div class="admin-main">' +
      '<header class="admin-topbar">' +
      '<button type="button" class="admin-topbar__menu" id="admin-nav-toggle" aria-expanded="false" aria-controls="admin-sidebar" aria-label="Open navigation">☰</button>' +
      '<h1 class="admin-topbar__title">' +
      escapeHtml(title) +
      "</h1>" +
      '<span class="admin-topbar__meta">Demo workspace</span>' +
      "</header>" +
      '<div class="admin-content" id="admin-page-root">' +
      pageHtml +
      "</div>" +
      "</div>" +
      '<div class="admin-backdrop" id="admin-backdrop" hidden></div>';

    var toggle = qs("#admin-nav-toggle");
    var backdrop = qs("#admin-backdrop");
    function closeNav() {
      app.classList.remove("is-nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      if (backdrop) {
        backdrop.classList.remove("is-open");
        backdrop.hidden = true;
      }
    }
    function openNav() {
      app.classList.add("is-nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "true");
      if (backdrop) {
        backdrop.hidden = false;
        backdrop.classList.add("is-open");
      }
    }
    if (toggle) {
      toggle.addEventListener("click", function () {
        if (app.classList.contains("is-nav-open")) closeNav();
        else openNav();
      });
    }
    if (backdrop) backdrop.addEventListener("click", closeNav);
  }

  /* ---------- Dashboard ---------- */

  function renderDashboard(root) {
    var stats = Store.getDashboardStats();
    var trips = Store.getTrips();
    var quotations = Store.getQuotations();
    var today = new Date().toISOString().slice(0, 10);

    var activeTrips = trips.filter(function (t) {
      return t.status !== "Completed" && t.status !== "Cancelled";
    }).length;

    var pendingQuotes = quotations.filter(function (q) {
      return q.status === "Draft" || q.status === "Sent";
    }).length;

    var upcomingCount = trips.filter(function (t) {
      var start = t.travelDates && t.travelDates.start;
      return start && start >= today && t.status !== "Completed" && t.status !== "Cancelled";
    }).length;

    var awaitingResponse = quotations.filter(function (q) {
      return q.status === "Sent";
    }).length;

    var pendingActions = [];
    if (stats.counts.newEnquiries) {
      pendingActions.push(
        stats.counts.newEnquiries +
          " new enquir" +
          (stats.counts.newEnquiries === 1 ? "y" : "ies") +
          " require response"
      );
    }
    if (awaitingResponse) {
      pendingActions.push(
        awaitingResponse +
          " quotation" +
          (awaitingResponse === 1 ? "" : "s") +
          " awaiting customer response"
      );
    }
    if (upcomingCount) {
      pendingActions.push(
        Math.min(1, upcomingCount) + " upcoming trip needs attention"
      );
    }
    (stats.pendingActions || []).forEach(function (a) {
      if (a.type === "reviews" || a.type === "bookings") pendingActions.push(a.label);
    });

    root.innerHTML =
      '<div class="admin-banner">High-fidelity admin demo — illustrative data and simulated workflows. Not a live booking system.</div>' +
      '<div class="admin-page-header"><div><h1>Dashboard</h1><p>Operational snapshot across enquiries, trips, quotations, and bookings.</p></div></div>' +
      '<div class="admin-stats">' +
      '<div class="admin-stat"><span class="admin-stat__label">New Enquiries</span><span class="admin-stat__value">' +
      stats.counts.newEnquiries +
      "</span></div>" +
      '<div class="admin-stat"><span class="admin-stat__label">Active Trips</span><span class="admin-stat__value">' +
      activeTrips +
      "</span></div>" +
      '<div class="admin-stat"><span class="admin-stat__label">Pending Quotations</span><span class="admin-stat__value">' +
      pendingQuotes +
      "</span></div>" +
      '<div class="admin-stat"><span class="admin-stat__label">Upcoming Trips</span><span class="admin-stat__value">' +
      upcomingCount +
      "</span></div>" +
      "</div>" +
      '<div class="admin-grid-2">' +
      '<section class="admin-panel"><h2 class="admin-panel__title">Recent Enquiries</h2><ul class="admin-list-plain">' +
      (stats.recentEnquiries || [])
        .map(function (e) {
          return (
            "<li><a href=\"/admin/enquiries.html?id=" +
            encodeURIComponent(e.id) +
            '">' +
            escapeHtml(e.customerName) +
            "</a> · " +
            escapeHtml(e.destination) +
            " " +
            badge(e.status) +
            '<div class="admin-muted">' +
            formatDate(e.createdAt) +
            "</div></li>"
          );
        })
        .join("") +
      "</ul></section>" +
      '<section class="admin-panel"><h2 class="admin-panel__title">Upcoming Trips</h2><ul class="admin-list-plain">' +
      ((stats.upcomingTrips && stats.upcomingTrips.length
        ? stats.upcomingTrips
        : [{ empty: true }]
      )
        .map(function (t) {
          if (t.empty) return '<li class="admin-muted">No upcoming trips in demo data.</li>';
          return (
            "<li><a href=\"/admin/trips.html?id=" +
            encodeURIComponent(t.id) +
            '">' +
            escapeHtml(t.customerName) +
            " — " +
            escapeHtml(t.destination) +
            "</a> " +
            badge(t.status) +
            '<div class="admin-muted">' +
            formatDateRange(t.travelDates) +
            "</div></li>"
          );
        })
        .join("")) +
      "</ul></section>" +
      "</div>" +
      '<section class="admin-panel"><h2 class="admin-panel__title">Pending Actions</h2><ul class="admin-list-plain">' +
      (pendingActions.length
        ? pendingActions
            .map(function (label) {
              return "<li>" + escapeHtml(label) + "</li>";
            })
            .join("")
        : '<li class="admin-muted">No pending actions right now.</li>') +
      "</ul></section>";
  }

  /* ---------- Enquiries ---------- */

  function renderEnquiryDetail(root, enquiry) {
    if (!enquiry) {
      root.innerHTML =
        '<p class="admin-empty">Enquiry not found. <a href="/admin/enquiries.html">Back to list</a></p>';
      return;
    }

    var statusOptions = Store.ENQUIRY_STATUSES.map(function (s) {
      return (
        '<option value="' +
        escapeHtml(s) +
        '"' +
        (s === enquiry.status ? " selected" : "") +
        ">" +
        escapeHtml(s) +
        "</option>"
      );
    }).join("");

    root.innerHTML =
      '<p class="admin-muted"><a href="/admin/enquiries.html">← All enquiries</a></p>' +
      '<div class="admin-page-header"><div><h1>' +
      escapeHtml(enquiry.customerName || "Enquiry") +
      "</h1><p>Source: " +
      escapeHtml(enquiry.source || "—") +
      " · Created " +
      formatDate(enquiry.createdAt) +
      "</p></div>" +
      badge(enquiry.status) +
      "</div>" +
      '<div class="admin-detail__grid">' +
      '<section class="admin-panel"><h2 class="admin-panel__title">Contact</h2>' +
      '<dl class="admin-dl">' +
      "<dt>Email</dt><dd>" +
      escapeHtml(enquiry.email || "—") +
      "</dd>" +
      "<dt>Phone</dt><dd>" +
      escapeHtml(enquiry.phone || "—") +
      "</dd>" +
      (enquiry.customerId
        ? '<dt>Customer</dt><dd><a href="/admin/customers.html?id=' +
          encodeURIComponent(enquiry.customerId) +
          '">Open profile</a></dd>'
        : "") +
      "</dl></section>" +
      '<section class="admin-panel"><h2 class="admin-panel__title">Trip requirements</h2>' +
      '<dl class="admin-dl">' +
      "<dt>Destination</dt><dd>" +
      escapeHtml(enquiry.destination || "—") +
      "</dd>" +
      "<dt>Dates</dt><dd>" +
      formatDateRange(enquiry.travelDates) +
      (enquiry.travelDates && enquiry.travelDates.flexible
        ? ' <span class="admin-muted">(flexible)</span>'
        : "") +
      "</dd>" +
      "<dt>Travellers</dt><dd>" +
      travellerLabel(enquiry.travellers) +
      "</dd>" +
      "<dt>Trip type</dt><dd>" +
      escapeHtml(enquiry.tripType || "—") +
      "</dd>" +
      "</dl>" +
      '<p style="margin-top:1rem"><strong>Requirements</strong><br />' +
      escapeHtml(enquiry.requirements || "—") +
      "</p>" +
      (enquiry.message
        ? "<p><strong>Message</strong><br />" + escapeHtml(enquiry.message) + "</p>"
        : "") +
      "</section>" +
      "</div>" +
      '<section class="admin-panel"><h2 class="admin-panel__title">Actions</h2>' +
      '<div class="admin-actions">' +
      '<label class="form-field" style="margin:0"><span class="form-label">Change status</span>' +
      '<select class="form-select" id="enq-status">' +
      statusOptions +
      "</select></label>" +
      '<button type="button" class="btn btn--secondary" id="enq-save-status">Update status</button>' +
      '<button type="button" class="btn btn--primary" id="enq-create-trip">Create Trip</button>' +
      "</div></section>";

    qs("#enq-save-status").addEventListener("click", function () {
      var status = qs("#enq-status").value;
      Store.setEnquiryStatus(enquiry.id, status);
      toast("Enquiry status updated to " + status);
      renderEnquiryDetail(root, Store.getEnquiry(enquiry.id));
    });

    qs("#enq-create-trip").addEventListener("click", function () {
      var trip = Store.createTripFromEnquiry(enquiry.id);
      if (enquiry.status === "New" || enquiry.status === "Contacted") {
        Store.setEnquiryStatus(enquiry.id, "Planning");
      }
      toast("Trip created");
      window.location.href = "/admin/trips.html?id=" + encodeURIComponent(trip.id);
    });
  }

  function renderEnquiriesList(root) {
    var all = Store.getEnquiries();
    var filter = param("status") || "All";
    var q = (param("q") || "").toLowerCase();

    function applyFilters() {
      var status = qs("#enq-filter-active")
        ? qs("#enq-filter-active").getAttribute("data-status")
        : filter;
      var query = (qs("#enq-search") && qs("#enq-search").value) || "";
      query = query.toLowerCase();
      return all.filter(function (e) {
        if (status && status !== "All" && e.status !== status) return false;
        if (!query) return true;
        var hay =
          (e.customerName || "") +
          " " +
          (e.destination || "") +
          " " +
          (e.tripType || "") +
          " " +
          (e.email || "");
        return hay.toLowerCase().indexOf(query) !== -1;
      });
    }

    function paint() {
      var rows = applyFilters();
      var statuses = ["All"].concat(Store.ENQUIRY_STATUSES);
      var filtersHtml = statuses
        .map(function (s) {
          var active =
            (qs("#enq-filter-active")
              ? qs("#enq-filter-active").getAttribute("data-status")
              : filter) === s;
          return (
            '<button type="button" class="admin-filter' +
            (active ? " is-active" : "") +
            '" data-status="' +
            escapeHtml(s) +
            '">' +
            escapeHtml(s) +
            "</button>"
          );
        })
        .join("");

      var table =
        rows.length === 0
          ? '<p class="admin-empty">No enquiries match this filter.</p>'
          : '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
            "<th>Customer</th><th>Destination</th><th>Travel Dates</th><th>Travellers</th><th>Trip Type</th><th>Status</th><th>Created</th><th>Action</th>" +
            "</tr></thead><tbody>" +
            rows
              .map(function (e) {
                return (
                  "<tr><td>" +
                  escapeHtml(e.customerName) +
                  "</td><td>" +
                  escapeHtml(e.destination) +
                  "</td><td>" +
                  formatDateRange(e.travelDates) +
                  "</td><td>" +
                  travellerLabel(e.travellers) +
                  "</td><td>" +
                  escapeHtml(e.tripType || "—") +
                  "</td><td>" +
                  badge(e.status) +
                  "</td><td>" +
                  formatDate(e.createdAt) +
                  '</td><td><a href="/admin/enquiries.html?id=' +
                  encodeURIComponent(e.id) +
                  '">Open</a></td></tr>'
                );
              })
              .join("") +
            "</tbody></table></div>";

      root.innerHTML =
        '<div class="admin-page-header"><div><h1>Enquiries</h1><p>Lifecycle from new lead through booked and completed.</p></div></div>' +
        '<div class="admin-toolbar">' +
        '<label class="form-field" style="margin:0"><span class="visually-hidden">Search</span>' +
        '<input class="form-input" id="enq-search" type="search" placeholder="Search customer, destination…" value="' +
        escapeHtml(qs("#enq-search") ? qs("#enq-search").value : param("q") || "") +
        '" /></label>' +
        "</div>" +
        '<div class="admin-filters" id="enq-filters" data-status="' +
        escapeHtml(
          qs("#enq-filter-active")
            ? qs("#enq-filter-active").getAttribute("data-status")
            : filter
        ) +
        '"><span id="enq-filter-active" hidden data-status="' +
        escapeHtml(
          qs("#enq-filter-active")
            ? qs("#enq-filter-active").getAttribute("data-status")
            : filter
        ) +
        '"></span>' +
        filtersHtml +
        "</div>" +
        '<div style="margin-top:1rem">' +
        table +
        "</div>";

      qsa("#enq-filters .admin-filter").forEach(function (btn) {
        btn.addEventListener("click", function () {
          qs("#enq-filter-active").setAttribute("data-status", btn.getAttribute("data-status"));
          paint();
        });
      });
      var search = qs("#enq-search");
      if (search) {
        search.addEventListener("input", function () {
          paint();
        });
      }
    }

    // Hold active filter in a hidden node pattern — simplify:
    root.innerHTML = "";
    var state = { status: filter, q: q };
    function paint2() {
      var rows = all.filter(function (e) {
        if (state.status !== "All" && e.status !== state.status) return false;
        if (!state.q) return true;
        var hay =
          (e.customerName || "") +
          " " +
          (e.destination || "") +
          " " +
          (e.tripType || "") +
          " " +
          (e.email || "");
        return hay.toLowerCase().indexOf(state.q) !== -1;
      });
      var filtersHtml = ["All"]
        .concat(Store.ENQUIRY_STATUSES)
        .map(function (s) {
          return (
            '<button type="button" class="admin-filter' +
            (state.status === s ? " is-active" : "") +
            '" data-status="' +
            escapeHtml(s) +
            '">' +
            escapeHtml(s) +
            "</button>"
          );
        })
        .join("");
      var table =
        rows.length === 0
          ? '<p class="admin-empty">No enquiries match this filter.</p>'
          : '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
            "<th>Customer</th><th>Destination</th><th>Travel Dates</th><th>Travellers</th><th>Trip Type</th><th>Status</th><th>Created</th><th>Action</th>" +
            "</tr></thead><tbody>" +
            rows
              .map(function (e) {
                return (
                  "<tr><td>" +
                  escapeHtml(e.customerName) +
                  "</td><td>" +
                  escapeHtml(e.destination) +
                  "</td><td>" +
                  formatDateRange(e.travelDates) +
                  "</td><td>" +
                  travellerLabel(e.travellers) +
                  "</td><td>" +
                  escapeHtml(e.tripType || "—") +
                  "</td><td>" +
                  badge(e.status) +
                  "</td><td>" +
                  formatDate(e.createdAt) +
                  '</td><td><a href="/admin/enquiries.html?id=' +
                  encodeURIComponent(e.id) +
                  '">Open</a></td></tr>'
                );
              })
              .join("") +
            "</tbody></table></div>";

      root.innerHTML =
        '<div class="admin-page-header"><div><h1>Enquiries</h1><p>Lifecycle from new lead through booked and completed.</p></div></div>' +
        '<div class="admin-toolbar"><label class="form-field" style="margin:0"><span class="u-sr-only">Search enquiries</span>' +
        '<input class="form-input" id="enq-search" type="search" placeholder="Search customer, destination…" value="' +
        escapeHtml(state.q) +
        '" /></label></div>' +
        '<div class="admin-filters" id="enq-filters">' +
        filtersHtml +
        "</div>" +
        '<div style="margin-top:1rem">' +
        table +
        "</div>";

      qsa("#enq-filters .admin-filter").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.status = btn.getAttribute("data-status");
          paint2();
        });
      });
      qs("#enq-search").addEventListener("input", function (ev) {
        state.q = ev.target.value.toLowerCase();
        paint2();
      });
    }
    paint2();
  }

  function renderEnquiries(root) {
    var id = param("id");
    if (id) renderEnquiryDetail(root, Store.getEnquiry(id));
    else renderEnquiriesList(root);
  }

  /* ---------- Customers ---------- */

  function renderCustomerDetail(root, customer) {
    if (!customer) {
      root.innerHTML =
        '<p class="admin-empty">Customer not found. <a href="/admin/customers.html">Back</a></p>';
      return;
    }
    var enquiries = Store.getEnquiries().filter(function (e) {
      return e.customerId === customer.id;
    });
    var trips = Store.getTrips().filter(function (t) {
      return t.customerId === customer.id;
    });
    var lastEnq = enquiries[0];

    root.innerHTML =
      '<p class="admin-muted"><a href="/admin/customers.html">← All customers</a></p>' +
      '<div class="admin-page-header"><div><h1>' +
      escapeHtml(customer.name) +
      "</h1><p>" +
      escapeHtml(customer.notes || "") +
      "</p></div>" +
      badge(customer.status) +
      "</div>" +
      '<div class="admin-detail__grid">' +
      '<section class="admin-panel"><h2 class="admin-panel__title">Contact information</h2>' +
      '<dl class="admin-dl"><dt>Email</dt><dd>' +
      escapeHtml(customer.email) +
      "</dd><dt>Phone</dt><dd>" +
      escapeHtml(customer.phone) +
      "</dd><dt>Last enquiry</dt><dd>" +
      (lastEnq
        ? formatDate(lastEnq.createdAt) + " · " + escapeHtml(lastEnq.destination)
        : "—") +
      "</dd></dl></section>" +
      '<section class="admin-panel"><h2 class="admin-panel__title">Travel history</h2>' +
      "<p>" +
      trips.length +
      " trip" +
      (trips.length === 1 ? "" : "s") +
      " · " +
      enquiries.length +
      " enquir" +
      (enquiries.length === 1 ? "y" : "ies") +
      "</p></section>" +
      "</div>" +
      '<div class="admin-grid-2">' +
      '<section class="admin-panel"><h2 class="admin-panel__title">Previous enquiries</h2><ul class="admin-list-plain">' +
      (enquiries.length
        ? enquiries
            .map(function (e) {
              return (
                "<li><a href=\"/admin/enquiries.html?id=" +
                encodeURIComponent(e.id) +
                '">' +
                escapeHtml(e.destination) +
                "</a> " +
                badge(e.status) +
                '<div class="admin-muted">' +
                formatDate(e.createdAt) +
                "</div></li>"
              );
            })
            .join("")
        : '<li class="admin-muted">No enquiries.</li>') +
      "</ul></section>" +
      '<section class="admin-panel"><h2 class="admin-panel__title">Current / recent trips</h2><ul class="admin-list-plain">' +
      (trips.length
        ? trips
            .map(function (t) {
              return (
                "<li><a href=\"/admin/trips.html?id=" +
                encodeURIComponent(t.id) +
                '">' +
                escapeHtml(t.destination) +
                "</a> " +
                badge(t.status) +
                '<div class="admin-muted">' +
                formatDateRange(t.travelDates) +
                "</div></li>"
              );
            })
            .join("")
        : '<li class="admin-muted">No trips yet.</li>') +
      "</ul></section></div>";
  }

  function renderCustomers(root) {
    var id = param("id");
    if (id) {
      renderCustomerDetail(root, Store.getCustomer(id));
      return;
    }
    var customers = Store.getCustomers();
    var enquiries = Store.getEnquiries();
    root.innerHTML =
      '<div class="admin-page-header"><div><h1>Customers</h1><p>Simple customer records linked to enquiries and trips — not a full CRM.</p></div></div>' +
      '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
      "<th>Name</th><th>Email</th><th>Phone</th><th>Trips</th><th>Last Enquiry</th><th>Status</th>" +
      "</tr></thead><tbody>" +
      customers
        .map(function (c) {
          var last = enquiries.filter(function (e) {
            return e.customerId === c.id;
          })[0];
          return (
            "<tr><td><a href=\"/admin/customers.html?id=" +
            encodeURIComponent(c.id) +
            '">' +
            escapeHtml(c.name) +
            "</a></td><td>" +
            escapeHtml(c.email) +
            "</td><td>" +
            escapeHtml(c.phone) +
            "</td><td>" +
            (c.tripCount || 0) +
            "</td><td>" +
            (last ? formatDate(last.createdAt) : "—") +
            "</td><td>" +
            badge(c.status) +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div>";
  }

  /* ---------- Trips ---------- */

  function renderTripDetail(root, trip) {
    if (!trip) {
      root.innerHTML =
        '<p class="admin-empty">Trip not found. <a href="/admin/trips.html">Back</a></p>';
      return;
    }

    function paint() {
      trip = Store.getTrip(trip.id);
      var days = trip.itinerary || [];
      var daysHtml = days
        .map(function (day) {
          var acts = (day.activities || [])
            .map(function (a) {
              return (
                '<div class="admin-activity" data-act="' +
                escapeHtml(a.id) +
                '"><div><strong>' +
                escapeHtml(a.title) +
                "</strong>" +
                (a.time
                  ? ' <span class="admin-muted">' + escapeHtml(a.time) + "</span>"
                  : "") +
                "<div>" +
                escapeHtml(a.description || "") +
                '</div></div><div class="admin-actions">' +
                '<button type="button" class="btn btn--ghost js-edit-act" data-day="' +
                day.day +
                '" data-id="' +
                escapeHtml(a.id) +
                '">Edit</button>' +
                '<button type="button" class="btn btn--ghost js-del-act" data-day="' +
                day.day +
                '" data-id="' +
                escapeHtml(a.id) +
                '">Delete</button></div></div>'
              );
            })
            .join("");
          return (
            '<article class="admin-day"><div class="admin-day__head"><h3 class="admin-day__title">DAY ' +
            String(day.day).padStart(2, "0") +
            " · " +
            escapeHtml(day.title) +
            '</h3><div class="admin-actions">' +
            '<button type="button" class="btn btn--ghost js-edit-day" data-day="' +
            day.day +
            '">Edit day</button>' +
            '<button type="button" class="btn btn--secondary js-add-act" data-day="' +
            day.day +
            '">Add activity</button></div></div>' +
            '<div class="admin-day__body">' +
            (day.notes
              ? '<p class="admin-muted">' + escapeHtml(day.notes) + "</p>"
              : "") +
            (acts || '<p class="admin-muted">No activities yet.</p>') +
            "</div></article>"
          );
        })
        .join("");

      root.innerHTML =
        '<p class="admin-muted"><a href="/admin/trips.html">← All trips</a></p>' +
        '<div class="admin-page-header"><div><h1>' +
        escapeHtml(trip.destination) +
        " trip</h1><p>" +
        escapeHtml(trip.customerName) +
        " · " +
        formatDateRange(trip.travelDates) +
        " · " +
        travellerLabel(trip.travellers) +
        "</p></div>" +
        badge(trip.status) +
        "</div>" +
        '<div class="admin-detail__grid">' +
        '<section class="admin-panel"><h2 class="admin-panel__title">Trip details</h2>' +
        '<dl class="admin-dl"><dt>Customer</dt><dd>' +
        (trip.customerId
          ? '<a href="/admin/customers.html?id=' +
            encodeURIComponent(trip.customerId) +
            '">' +
            escapeHtml(trip.customerName) +
            "</a>"
          : escapeHtml(trip.customerName)) +
        "</dd><dt>Destination</dt><dd>" +
        escapeHtml(trip.destination) +
        "</dd><dt>Dates</dt><dd>" +
        formatDateRange(trip.travelDates) +
        "</dd><dt>Travellers</dt><dd>" +
        travellerLabel(trip.travellers) +
        "</dd><dt>Status</dt><dd>" +
        badge(trip.status) +
        "</dd></dl>" +
        '<div class="admin-actions" style="margin-top:1rem">' +
        '<button type="button" class="btn btn--primary" id="trip-create-quote">Create Quotation</button>' +
        (trip.enquiryId
          ? '<a class="btn btn--secondary" href="/admin/enquiries.html?id=' +
            encodeURIComponent(trip.enquiryId) +
            '">View enquiry</a>'
          : "") +
        "</div></section>" +
        '<section class="admin-panel"><h2 class="admin-panel__title">Trip notes</h2>' +
        '<textarea class="form-textarea" id="trip-notes" rows="4">' +
        escapeHtml(trip.notes || "") +
        "</textarea>" +
        '<div class="admin-actions"><button type="button" class="btn btn--secondary" id="trip-save-notes">Save notes</button></div></section>' +
        "</div>" +
        '<section class="admin-panel"><div class="admin-page-header" style="margin-bottom:1rem"><h2 class="admin-panel__title" style="margin:0">Itinerary</h2>' +
        '<button type="button" class="btn btn--secondary" id="trip-add-day">Add day</button></div>' +
        (daysHtml || '<p class="admin-muted">No days yet — add a day to begin.</p>') +
        "</section>";

      qs("#trip-save-notes").addEventListener("click", function () {
        Store.setTripNotes(trip.id, qs("#trip-notes").value);
        toast("Notes saved");
        paint();
      });
      qs("#trip-add-day").addEventListener("click", function () {
        var title = window.prompt("Day title", "New day");
        if (title == null) return;
        Store.addDay(trip.id, { title: title || "New day" });
        toast("Day added");
        paint();
      });
      qs("#trip-create-quote").addEventListener("click", function () {
        var quote = Store.createQuotationFromTrip(trip.id);
        toast("Quotation created (illustrative)");
        window.location.href =
          "/admin/quotations.html?id=" + encodeURIComponent(quote.id);
      });
      qsa(".js-edit-day").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var dayNum = Number(btn.getAttribute("data-day"));
          var day = (Store.getTrip(trip.id).itinerary || []).filter(function (d) {
            return Number(d.day) === dayNum;
          })[0];
          var title = window.prompt("Day title", day ? day.title : "");
          if (title == null) return;
          var notes = window.prompt("Day notes", day ? day.notes || "" : "");
          if (notes == null) return;
          Store.updateDay(trip.id, dayNum, { title: title, notes: notes });
          toast("Day updated");
          paint();
        });
      });
      qsa(".js-add-act").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var dayNum = Number(btn.getAttribute("data-day"));
          var title = window.prompt("Activity title", "New activity");
          if (title == null) return;
          var time = window.prompt("Time (optional)", "Morning") || "";
          var description = window.prompt("Description", "") || "";
          Store.addActivity(trip.id, dayNum, {
            title: title,
            time: time,
            description: description
          });
          toast("Activity added");
          paint();
        });
      });
      qsa(".js-edit-act").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var dayNum = Number(btn.getAttribute("data-day"));
          var actId = btn.getAttribute("data-id");
          var day = (Store.getTrip(trip.id).itinerary || []).filter(function (d) {
            return Number(d.day) === dayNum;
          })[0];
          var act = ((day && day.activities) || []).filter(function (a) {
            return a.id === actId;
          })[0];
          if (!act) return;
          var title = window.prompt("Activity title", act.title);
          if (title == null) return;
          var time = window.prompt("Time", act.time || "");
          if (time == null) return;
          var description = window.prompt("Description", act.description || "");
          if (description == null) return;
          Store.updateActivity(trip.id, dayNum, actId, {
            title: title,
            time: time,
            description: description
          });
          toast("Activity updated");
          paint();
        });
      });
      qsa(".js-del-act").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (!window.confirm("Delete this activity?")) return;
          Store.deleteActivity(
            trip.id,
            Number(btn.getAttribute("data-day")),
            btn.getAttribute("data-id")
          );
          toast("Activity deleted");
          paint();
        });
      });
    }

    paint();
  }

  function renderTrips(root) {
    var id = param("id");
    if (id) {
      renderTripDetail(root, Store.getTrip(id));
      return;
    }
    var trips = Store.getTrips();
    root.innerHTML =
      '<div class="admin-page-header"><div><h1>Trips &amp; Itineraries</h1><p>Build day-by-day plans from enquiries.</p></div></div>' +
      '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
      "<th>Customer</th><th>Destination</th><th>Travel Dates</th><th>Travellers</th><th>Status</th><th>Action</th>" +
      "</tr></thead><tbody>" +
      trips
        .map(function (t) {
          return (
            "<tr><td>" +
            escapeHtml(t.customerName) +
            "</td><td>" +
            escapeHtml(t.destination) +
            "</td><td>" +
            formatDateRange(t.travelDates) +
            "</td><td>" +
            travellerLabel(t.travellers) +
            "</td><td>" +
            badge(t.status) +
            '</td><td><a href="/admin/trips.html?id=' +
            encodeURIComponent(t.id) +
            '">Open</a></td></tr>'
          );
        })
        .join("") +
      "</tbody></table></div>";
  }

  /* ---------- Quotations ---------- */

  function renderQuotationDetail(root, quote) {
    if (!quote) {
      root.innerHTML =
        '<p class="admin-empty">Quotation not found. <a href="/admin/quotations.html">Back</a></p>';
      return;
    }
    var trip = quote.tripId ? Store.getTrip(quote.tripId) : null;
    var lines = (quote.lineItems || [])
      .map(function (li) {
        return (
          "<tr><td>" +
          escapeHtml(li.description) +
          "</td><td style=\"text-align:right\">" +
          money(li.amount) +
          "</td></tr>"
        );
      })
      .join("");

    root.innerHTML =
      '<p class="admin-muted"><a href="/admin/quotations.html">← All quotations</a></p>' +
      '<div class="admin-page-header"><div><h1>' +
      escapeHtml(quote.tripLabel || quote.quoteNumber) +
      "</h1><p>" +
      escapeHtml(quote.quoteNumber) +
      " · " +
      formatDate(quote.date) +
      "</p></div>" +
      badge(quote.status) +
      "</div>" +
      '<div class="admin-detail__grid">' +
      '<section class="admin-panel admin-quote-sheet"><h2 class="admin-panel__title">' +
      escapeHtml(quote.tripLabel || "Travel quotation") +
      "</h2>" +
      "<p><strong>" +
      escapeHtml(quote.customerName) +
      "</strong><br />" +
      (trip ? formatDateRange(trip.travelDates) + "<br />" : "") +
      (trip ? travellerLabel(trip.travellers) : "") +
      "</p>" +
      '<table class="admin-table" style="margin-top:1rem"><tbody>' +
      lines +
      "</tbody></table>" +
      '<div class="admin-quote-sheet__total"><span>Total</span><span>' +
      money(quote.amount) +
      "</span></div>" +
      '<p class="admin-muted" style="margin-top:1rem">' +
      escapeHtml(quote.demoDisclaimer || "Illustrative demo pricing.") +
      "</p>" +
      "<h3>Inclusions</h3><ul>" +
      (quote.inclusions || [])
        .map(function (i) {
          return "<li>" + escapeHtml(i) + "</li>";
        })
        .join("") +
      "</ul><h3>Exclusions</h3><ul>" +
      (quote.exclusions || [])
        .map(function (i) {
          return "<li>" + escapeHtml(i) + "</li>";
        })
        .join("") +
      "</ul></section>" +
      '<section class="admin-panel"><h2 class="admin-panel__title">Demo actions</h2>' +
      '<p class="admin-muted">Simulated only — no email or WhatsApp.</p>' +
      '<div class="admin-actions">' +
      '<button type="button" class="btn btn--secondary" id="quote-send">Send Quote</button>' +
      '<button type="button" class="btn btn--primary" id="quote-approve">Mark Approved</button>' +
      '<button type="button" class="btn btn--primary" id="quote-booking"' +
      (quote.status === "Approved" ? "" : " disabled") +
      ">Create Booking</button>" +
      (quote.tripId
        ? '<a class="btn btn--ghost" href="/admin/trips.html?id=' +
          encodeURIComponent(quote.tripId) +
          '">Open trip</a>'
        : "") +
      "</div></section></div>";

    qs("#quote-send").addEventListener("click", function () {
      Store.setQuotationStatus(quote.id, "Sent");
      toast("Quote marked as Sent (simulated)");
      renderQuotationDetail(root, Store.getQuotation(quote.id));
    });
    qs("#quote-approve").addEventListener("click", function () {
      Store.setQuotationStatus(quote.id, "Approved");
      toast("Quote approved");
      renderQuotationDetail(root, Store.getQuotation(quote.id));
    });
    var bookBtn = qs("#quote-booking");
    if (bookBtn && !bookBtn.disabled) {
      bookBtn.addEventListener("click", function () {
        try {
          var booking = Store.createBookingFromQuotation(quote.id);
          toast("Booking created");
          window.location.href =
            "/admin/bookings.html?id=" + encodeURIComponent(booking.id);
        } catch (err) {
          toast(err.message || "Could not create booking");
        }
      });
    }
  }

  function renderQuotations(root) {
    var id = param("id");
    if (id) {
      renderQuotationDetail(root, Store.getQuotation(id));
      return;
    }
    var quotes = Store.getQuotations();
    root.innerHTML =
      '<div class="admin-page-header"><div><h1>Quotations</h1><p>Illustrative pricing for demo conversations — not live commercial rates.</p></div></div>' +
      '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
      "<th>Quote Number</th><th>Customer</th><th>Trip</th><th>Amount</th><th>Status</th><th>Date</th><th>Action</th>" +
      "</tr></thead><tbody>" +
      quotes
        .map(function (q) {
          return (
            "<tr><td>" +
            escapeHtml(q.quoteNumber) +
            "</td><td>" +
            escapeHtml(q.customerName) +
            "</td><td>" +
            escapeHtml(q.tripLabel) +
            "</td><td>" +
            money(q.amount) +
            "</td><td>" +
            badge(q.status) +
            "</td><td>" +
            formatDate(q.date) +
            '</td><td><a href="/admin/quotations.html?id=' +
            encodeURIComponent(q.id) +
            '">Open</a></td></tr>'
          );
        })
        .join("") +
      "</tbody></table></div>";
  }

  /* ---------- Bookings ---------- */

  function renderBookingDetail(root, booking) {
    if (!booking) {
      root.innerHTML =
        '<p class="admin-empty">Booking not found. <a href="/admin/bookings.html">Back</a></p>';
      return;
    }
    var options = Store.BOOKING_STATUSES.map(function (s) {
      return (
        '<option value="' +
        escapeHtml(s) +
        '"' +
        (s === booking.status ? " selected" : "") +
        ">" +
        escapeHtml(s) +
        "</option>"
      );
    }).join("");

    root.innerHTML =
      '<p class="admin-muted"><a href="/admin/bookings.html">← All bookings</a></p>' +
      '<div class="admin-page-header"><div><h1>' +
      escapeHtml(booking.bookingRef || booking.id) +
      "</h1><p>" +
      escapeHtml(booking.destination) +
      "</p></div>" +
      badge(booking.status) +
      "</div>" +
      '<div class="admin-detail__grid">' +
      '<section class="admin-panel"><h2 class="admin-panel__title">Booking detail</h2>' +
      '<dl class="admin-dl"><dt>Customer</dt><dd>' +
      escapeHtml(booking.customerName) +
      "</dd><dt>Trip</dt><dd>" +
      (booking.tripId
        ? '<a href="/admin/trips.html?id=' +
          encodeURIComponent(booking.tripId) +
          '">Open trip</a>'
        : "—") +
      "</dd><dt>Dates</dt><dd>" +
      formatDateRange(booking.travelDates) +
      "</dd><dt>Travellers</dt><dd>" +
      travellerLabel(booking.travellers) +
      "</dd><dt>Quotation</dt><dd>" +
      money(booking.amount) +
      (booking.quotationId
        ? ' · <a href="/admin/quotations.html?id=' +
          encodeURIComponent(booking.quotationId) +
          '">View quote</a>'
        : "") +
      "</dd></dl>" +
      "<h3>Itinerary summary</h3><p>" +
      escapeHtml(booking.itinerarySummary || "—") +
      "</p></section>" +
      '<section class="admin-panel"><h2 class="admin-panel__title">Status</h2>' +
      '<label class="form-field"><span class="form-label">Booking status</span>' +
      '<select class="form-select" id="booking-status">' +
      options +
      "</select></label>" +
      '<div class="admin-actions"><button type="button" class="btn btn--primary" id="booking-save">Update status</button></div>' +
      "</section></div>";

    qs("#booking-save").addEventListener("click", function () {
      Store.setBookingStatus(booking.id, qs("#booking-status").value);
      toast("Booking status updated");
      renderBookingDetail(root, Store.getBooking(booking.id));
    });
  }

  function renderBookings(root) {
    var id = param("id");
    if (id) {
      renderBookingDetail(root, Store.getBooking(id));
      return;
    }
    var bookings = Store.getBookings();
    root.innerHTML =
      '<div class="admin-page-header"><div><h1>Bookings</h1><p>Confirmed travel after approved quotations.</p></div></div>' +
      '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
      "<th>Booking ID</th><th>Customer</th><th>Destination</th><th>Travel Dates</th><th>Amount</th><th>Status</th><th>Action</th>" +
      "</tr></thead><tbody>" +
      bookings
        .map(function (b) {
          return (
            "<tr><td>" +
            escapeHtml(b.bookingRef || b.id) +
            "</td><td>" +
            escapeHtml(b.customerName) +
            "</td><td>" +
            escapeHtml(b.destination) +
            "</td><td>" +
            formatDateRange(b.travelDates) +
            "</td><td>" +
            money(b.amount) +
            "</td><td>" +
            badge(b.status) +
            '</td><td><a href="/admin/bookings.html?id=' +
            encodeURIComponent(b.id) +
            '">Open</a></td></tr>'
          );
        })
        .join("") +
      "</tbody></table></div>";
  }

  /* ---------- Content ---------- */

  function fetchJson(url) {
    return fetch(url, { credentials: "same-origin" }).then(function (res) {
      if (!res.ok) throw new Error("Failed " + url);
      return res.json();
    });
  }

  function renderContent(root) {
    var tab = param("tab") || "destinations";
    var id = param("id");

    Promise.all([
      fetchJson("/data/destinations.json"),
      fetchJson("/data/packages.json"),
      fetchJson("/data/vehicles.json")
    ])
      .then(function (parts) {
        var destinations = parts[0];
        var packages = parts[1];
        var vehicles = parts[2];

        function pubBadge(type, itemId) {
          var meta = Store.getContentMeta(type, itemId);
          return badge(
            meta.publishStatus === "published" ? "Published" : "Unpublished"
          );
        }

        function togglePublish(type, itemId) {
          var meta = Store.getContentMeta(type, itemId);
          var next =
            meta.publishStatus === "published" ? "unpublished" : "published";
          Store.setContentPublishStatus(type, itemId, next);
          toast(
            next === "published" ? "Marked published (demo)" : "Marked unpublished (demo)"
          );
          renderContent(root);
        }

        var tabs =
          '<div class="admin-tabs">' +
          '<a class="admin-filter' +
          (tab === "destinations" ? " is-active" : "") +
          '" href="/admin/content.html?tab=destinations">Destinations</a>' +
          '<a class="admin-filter' +
          (tab === "packages" ? " is-active" : "") +
          '" href="/admin/content.html?tab=packages">Tour Packages</a>' +
          '<a class="admin-filter' +
          (tab === "vehicles" ? " is-active" : "") +
          '" href="/admin/content.html?tab=vehicles">Vehicles</a>' +
          "</div>";

        if (tab === "destinations") {
          if (id) {
            var dest = destinations.filter(function (d) {
              return d.id === id || d.slug === id;
            })[0];
            if (!dest) {
              root.innerHTML = '<p class="admin-empty">Destination not found.</p>';
              return;
            }
            root.innerHTML =
              tabs +
              '<p class="admin-muted"><a href="/admin/content.html?tab=destinations">← Destinations</a></p>' +
              '<div class="admin-page-header"><div><h1>' +
              escapeHtml(dest.name) +
              "</h1><p>" +
              escapeHtml(dest.tagline || "") +
              "</p></div>" +
              pubBadge("destinations", dest.id) +
              "</div>" +
              '<section class="admin-panel"><p>' +
              escapeHtml(dest.shortDescription || "") +
              "</p>" +
              '<dl class="admin-dl"><dt>Scope</dt><dd>' +
              escapeHtml(dest.travelScope || "") +
              "</dd><dt>Region</dt><dd>" +
              escapeHtml(dest.region || "") +
              "</dd></dl>" +
              '<div class="admin-actions">' +
              '<button type="button" class="btn btn--secondary" id="content-toggle">Publish / Unpublish</button>' +
              '<button type="button" class="btn btn--ghost" id="content-edit">Edit (demo)</button>' +
              "</div>" +
              '<p class="admin-muted" id="edit-note" hidden>Demo edit only — source JSON is not rewritten. Use Publish to persist status in localStorage.</p>' +
              "</section>";
            qs("#content-toggle").addEventListener("click", function () {
              togglePublish("destinations", dest.id);
            });
            qs("#content-edit").addEventListener("click", function () {
              qs("#edit-note").hidden = false;
              toast("Demo edit panel — field edits are illustrative only");
            });
            return;
          }

          var domestic = destinations.filter(function (d) {
            return d.travelScope === "domestic";
          });
          var intl = destinations.filter(function (d) {
            return d.travelScope === "international";
          });
          function destRows(list) {
            return list
              .map(function (d) {
                return (
                  "<tr><td>" +
                  escapeHtml(d.name) +
                  "</td><td>" +
                  escapeHtml(d.travelScope) +
                  "</td><td>" +
                  pubBadge("destinations", d.id) +
                  '</td><td><a href="/admin/content.html?tab=destinations&id=' +
                  encodeURIComponent(d.id) +
                  '">View</a> · <button type="button" class="btn btn--ghost js-pub" data-id="' +
                  escapeHtml(d.id) +
                  '">Publish / Unpublish</button></td></tr>'
                );
              })
              .join("");
          }
          root.innerHTML =
            tabs +
            '<div class="admin-page-header"><div><h1>Destinations</h1><p>Website content catalogue — publish status is demo-only.</p></div></div>' +
            '<section class="admin-panel" style="margin-bottom:1rem"><h2 class="admin-panel__title">Domestic</h2>' +
            '<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Destination</th><th>Scope</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
            destRows(domestic) +
            "</tbody></table></div></section>" +
            '<section class="admin-panel"><h2 class="admin-panel__title">International</h2>' +
            '<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Destination</th><th>Scope</th><th>Status</th><th>Actions</th></tr></thead><tbody>' +
            destRows(intl) +
            "</tbody></table></div></section>";
          qsa(".js-pub").forEach(function (btn) {
            btn.addEventListener("click", function () {
              togglePublish("destinations", btn.getAttribute("data-id"));
            });
          });
          return;
        }

        if (tab === "packages") {
          if (id) {
            var pkg = packages.filter(function (p) {
              return p.id === id || p.slug === id;
            })[0];
            if (!pkg) {
              root.innerHTML = '<p class="admin-empty">Package not found.</p>';
              return;
            }
            root.innerHTML =
              tabs +
              '<p class="admin-muted"><a href="/admin/content.html?tab=packages">← Packages</a></p>' +
              '<div class="admin-page-header"><div><h1>' +
              escapeHtml(pkg.title) +
              "</h1><p>" +
              escapeHtml(pkg.destinationSlug) +
              " · " +
              escapeHtml(String(pkg.durationDays)) +
              " days</p></div>" +
              pubBadge("packages", pkg.id) +
              "</div>" +
              '<section class="admin-panel"><p>' +
              escapeHtml(pkg.shortDescription || "") +
              "</p><p><strong>Price:</strong> " +
              escapeHtml(pkg.startingPriceLabel || "Illustrative") +
              '</p><div class="admin-actions">' +
              '<button type="button" class="btn btn--secondary" id="content-toggle">Publish / Unpublish</button>' +
              '<button type="button" class="btn btn--ghost" id="content-edit">Edit (demo)</button></div></section>';
            qs("#content-toggle").addEventListener("click", function () {
              togglePublish("packages", pkg.id);
            });
            qs("#content-edit").addEventListener("click", function () {
              toast("Demo edit — source JSON not rewritten");
            });
            return;
          }

          root.innerHTML =
            tabs +
            '<div class="admin-page-header"><div><h1>Tour Packages</h1><p>Catalogue mirrored from website package data.</p></div></div>' +
            '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
            "<th>Package</th><th>Destination</th><th>Duration</th><th>Price</th><th>Status</th><th>Actions</th>" +
            "</tr></thead><tbody>" +
            packages
              .map(function (p) {
                return (
                  "<tr><td>" +
                  escapeHtml(p.title) +
                  "</td><td>" +
                  escapeHtml(p.destinationSlug) +
                  "</td><td>" +
                  escapeHtml(String(p.durationDays)) +
                  "D / " +
                  escapeHtml(String(p.durationNights)) +
                  "N</td><td>" +
                  escapeHtml(p.startingPriceLabel || "Illustrative") +
                  "</td><td>" +
                  pubBadge("packages", p.id) +
                  '</td><td><a href="/admin/content.html?tab=packages&id=' +
                  encodeURIComponent(p.id) +
                  '">View</a> · <button type="button" class="btn btn--ghost js-pub" data-id="' +
                  escapeHtml(p.id) +
                  '">Publish / Unpublish</button></td></tr>'
                );
              })
              .join("") +
            "</tbody></table></div>";
          qsa(".js-pub").forEach(function (btn) {
            btn.addEventListener("click", function () {
              togglePublish("packages", btn.getAttribute("data-id"));
            });
          });
          return;
        }

        // vehicles
        if (id) {
          var veh = vehicles.filter(function (v) {
            return v.id === id || v.slug === id;
          })[0];
          if (!veh) {
            root.innerHTML = '<p class="admin-empty">Vehicle not found.</p>';
            return;
          }
          var img = veh.imagePlaceholder
            ? "/assets/images/" + veh.imagePlaceholder
            : "";
          root.innerHTML =
            tabs +
            '<p class="admin-muted"><a href="/admin/content.html?tab=vehicles">← Vehicles</a></p>' +
            '<div class="admin-page-header"><div><h1>' +
            escapeHtml(veh.name) +
            "</h1><p>Vehicle catalogue — not fleet operations.</p></div>" +
            pubBadge("vehicles", veh.id) +
            "</div>" +
            '<section class="admin-panel">' +
            (img
              ? '<img class="admin-vehicle-thumb" src="' +
                escapeHtml(img) +
                '" alt="" style="width:12rem;height:8rem;margin-bottom:1rem" />'
              : "") +
            '<dl class="admin-dl"><dt>Seating</dt><dd>' +
            escapeHtml(String(veh.seatingCapacity)) +
            "</dd><dt>Type</dt><dd>" +
            escapeHtml(veh.type || "") +
            "</dd><dt>Description</dt><dd>" +
            escapeHtml(veh.shortDescription || "") +
            "</dd><dt>Location</dt><dd>Catalogue (demo)</dd></dl>" +
            '<div class="admin-actions">' +
            '<button type="button" class="btn btn--secondary" id="content-toggle">Publish / Unpublish</button>' +
            '<button type="button" class="btn btn--ghost" id="content-edit">Edit (demo)</button></div></section>';
          qs("#content-toggle").addEventListener("click", function () {
            togglePublish("vehicles", veh.id);
          });
          qs("#content-edit").addEventListener("click", function () {
            toast("Demo edit — catalogue fields are illustrative");
          });
          return;
        }

        root.innerHTML =
          tabs +
          '<div class="admin-page-header"><div><h1>Vehicles</h1><p>Catalogue only — no drivers, dispatch, or live availability.</p></div></div>' +
          '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
          "<th>Vehicle</th><th>Image</th><th>Seating</th><th>Description</th><th>Location</th><th>Status</th><th>Actions</th>" +
          "</tr></thead><tbody>" +
          vehicles
            .map(function (v) {
              var thumb = v.imagePlaceholder
                ? '<img class="admin-vehicle-thumb" src="/assets/images/' +
                  escapeHtml(v.imagePlaceholder) +
                  '" alt="" />'
                : "—";
              return (
                "<tr><td>" +
                escapeHtml(v.name) +
                "</td><td>" +
                thumb +
                "</td><td>" +
                escapeHtml(String(v.seatingCapacity)) +
                "</td><td>" +
                escapeHtml(v.shortDescription || "") +
                "</td><td>Catalogue</td><td>" +
                pubBadge("vehicles", v.id) +
                '</td><td><a href="/admin/content.html?tab=vehicles&id=' +
                encodeURIComponent(v.id) +
                '">View</a> · <button type="button" class="btn btn--ghost js-pub" data-id="' +
                escapeHtml(v.id) +
                '">Publish / Unpublish</button></td></tr>'
              );
            })
            .join("") +
          "</tbody></table></div>";
        qsa(".js-pub").forEach(function (btn) {
          btn.addEventListener("click", function () {
            togglePublish("vehicles", btn.getAttribute("data-id"));
          });
        });
      })
      .catch(function (err) {
        root.innerHTML =
          '<p class="admin-empty">Could not load content data. Serve the site over HTTP so /data JSON can load.<br />' +
          escapeHtml(err.message || "") +
          "</p>";
      });
  }

  /* ---------- Reviews ---------- */

  function renderReviews(root) {
    function paint() {
      var reviews = Store.getReviews();
      root.innerHTML =
        '<div class="admin-page-header"><div><h1>Reviews</h1><p>Moderate post-trip reviews before they can appear as website content.</p></div></div>' +
        '<div class="admin-table-wrap"><table class="admin-table"><thead><tr>' +
        "<th>Customer</th><th>Trip</th><th>Rating</th><th>Review</th><th>Date</th><th>Status</th><th>Actions</th>" +
        "</tr></thead><tbody>" +
        reviews
          .map(function (r) {
            return (
              "<tr><td>" +
              escapeHtml(r.customerName) +
              "</td><td>" +
              escapeHtml(r.tripLabel || r.destination || "—") +
              "</td><td>" +
              escapeHtml(String(r.rating)) +
              " / 5</td><td>" +
              escapeHtml(r.body || r.review || "") +
              "</td><td>" +
              formatDate(r.date || r.createdAt) +
              "</td><td>" +
              badge(r.status) +
              '</td><td><button type="button" class="btn btn--secondary js-approve" data-id="' +
              escapeHtml(r.id) +
              '">Approve</button> <button type="button" class="btn btn--ghost js-hide" data-id="' +
              escapeHtml(r.id) +
              '">Hide</button></td></tr>'
            );
          })
          .join("") +
        "</tbody></table></div>";

      qsa(".js-approve").forEach(function (btn) {
        btn.addEventListener("click", function () {
          Store.setReviewStatus(btn.getAttribute("data-id"), "Approved");
          toast("Review approved");
          paint();
        });
      });
      qsa(".js-hide").forEach(function (btn) {
        btn.addEventListener("click", function () {
          Store.setReviewStatus(btn.getAttribute("data-id"), "Hidden");
          toast("Review hidden");
          paint();
        });
      });
    }
    paint();
  }

  /* ---------- boot ---------- */

  function route(root) {
    var page = currentPage();
    if (page === "dashboard") renderDashboard(root);
    else if (page === "enquiries") renderEnquiries(root);
    else if (page === "customers") renderCustomers(root);
    else if (page === "trips") renderTrips(root);
    else if (page === "quotations") renderQuotations(root);
    else if (page === "bookings") renderBookings(root);
    else if (page === "content") renderContent(root);
    else if (page === "reviews") renderReviews(root);
    else root.innerHTML = '<p class="admin-empty">Unknown admin page.</p>';
  }

  function init() {
    Store = window.TAAdminStore;
    if (!Store) {
      document.body.innerHTML =
        "<p style='padding:2rem;font-family:sans-serif'>Admin store failed to load.</p>";
      return;
    }
    renderShell();
    var root = qs("#admin-page-root");
    Store.ensureLoaded()
      .then(function () {
        route(root);
      })
      .catch(function (err) {
        root.innerHTML =
          '<p class="admin-empty">Could not load admin demo data. Serve this project over a local HTTP server (paths use /data/…).<br />' +
          escapeHtml(err.message || String(err)) +
          "</p>";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
