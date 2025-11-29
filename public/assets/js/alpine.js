/*! Load Alpine.js via CDN through this local stub (defer) */
(function () {
  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js";
  s.defer = true;
  document.head.appendChild(s);
})();
