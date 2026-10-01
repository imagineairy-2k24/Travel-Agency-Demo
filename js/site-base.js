/**
 * Site base path helper for GitHub Pages project sites and local root hosting.
 * Requires a <base href="..."> written by the inline head snippet in each HTML page.
 */
(function (global) {
  var REPO = "Travel-Agency-Demo";

  function detectBase() {
    if (typeof document !== "undefined") {
      var el = document.querySelector("base[href]");
      if (el) {
        try {
          var path = new URL(el.href, global.location.href).pathname || "/";
          if (path.length > 1 && path.charAt(path.length - 1) === "/") {
            path = path.slice(0, -1);
          }
          return path === "/" ? "" : path;
        } catch (e) {
          /* fall through */
        }
      }
    }

    var pathname = global.location.pathname || "/";
    if (pathname === "/" + REPO || pathname.indexOf("/" + REPO + "/") === 0) {
      return "/" + REPO;
    }
    if (/\.github\.io$/i.test(global.location.hostname)) {
      var parts = pathname.split("/").filter(Boolean);
      if (parts.length) return "/" + parts[0];
    }
    return "";
  }

  var base = detectBase();

  function url(path) {
    if (path == null || path === "") return path;
    if (/^(https?:|mailto:|tel:|data:|blob:|#|\/\/)/i.test(path)) return path;
    if (path.charAt(0) === "/") return base + path;
    return path;
  }

  global.TA = global.TA || {};
  global.TA.base = base;
  global.TA.url = url;
})(typeof window !== "undefined" ? window : this);
