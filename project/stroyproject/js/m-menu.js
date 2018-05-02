! function e(t, o, n) {
    function s(a, u) { if (!o[a]) { if (!t[a]) { var c = "function" == typeof require && require; if (!u && c) return c(a, !0); if (i) return i(a, !0); throw new Error("Cannot find module '" + a + "'") } var p = o[a] = { exports: {} };
            t[a][0].call(p.exports, function(e) { var o = t[a][1][e]; return s(o ? o : e) }, p, p.exports, e, t, o, n) } return o[a].exports } for (var i = "function" == typeof require && require, a = 0; a < n.length; a++) s(n[a]); return s }({ 1: [function(e, t, o) { "use strict";
        Object.defineProperty(o, "__esModule", { value: !0 }), o["default"] = function() { return "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 } }, {}], 2: [function(e, t, o) { "use strict";

        function n(e) { return e && e.__esModule ? e : { "default": e } } var s = e("cadmiumUI/src/utils/isTouchDevice"),
            i = n(s);
        $(function() {
            (0, i["default"])() || $("body").addClass("cd-notouch"), $(document).on("click", ".js-menu-open", function(e) { e.stopPropagation(), $(".pf-m-menu").addClass("pf-m-aside-opened"), $(".pf-page").addClass("pf-page--overflow") }), $(document).on("click", ".js-aside-close", function(e) { e.stopPropagation(), $(".pf-page").removeClass("pf-page--overflow"), $(this).closest("aside").removeClass("pf-m-aside-opened") }), $(document).on("click", ".js-m-aside", function(e) { e.target === this && ($("body").removeClass("_overflow"), $(this).removeClass("pf-m-aside-opened")), $(".pf-popup").fadeOut() }), $(document).on("click", ".js-services", function(e) { e.preventDefault(), $("._overlay").fadeIn(), $(".mp-services").removeClass("mp-services--hidden") }), $(document).on("click", ".js-services-close, ._overlay", function(e) { e.preventDefault(), $("._overlay").fadeOut(), $(".mp-services").addClass("mp-services--hidden") }), $(document).on("click", "body", function(e) { e.stopPropagation(), $(".pf-popup").fadeOut(), $(".lg-m-submenu__list").removeClass("lg-m-submenu__list__opened").removeAttr("style") }), $(document).on("click", ".js-popup", function() { var e = $(this),
                    t = $(".js-popup-overlay"),
                    o = e.data("popup"); if (o) { var n = '[data-target="' + popup + '"]',
                        s = $(n);
                    s.fadeIn(), s.is("[data-no-overlay]") || t.fadeIn() } }), $(document).on("click", ".js-close-popup", function() { var e = $(this),
                    t = $(".js-popup-overlay"),
                    o = e.closest("[data-target]");
                o.length && (t.fadeOut(), o.fadeOut()) }), $(document).on("click", ".js-submenu", function(e) { e.preventDefault(), e.stopPropagation(); var t = $(".lg-m-submenu__list"),
                    o = "calc(100%*" + (t.children().length + 1) + ")";
                t.hasClass("lg-m-submenu__list__opened") ? t.removeClass("lg-m-submenu__list__opened").removeAttr("style") : t.addClass("lg-m-submenu__list__opened").css("max-height", o) }), $(document).on("click", ".js-location", function(e) { e.preventDefault(), e.stopPropagation(); var t = $(".pf-popup--location"),
                    o = $(this),
                    n = $(".js-location-pos"); if (t.is(":visible")) t.fadeOut("fast");
                else { var s = 0;
                    s = n.length ? document.documentElement.clientWidth - (n.offset().left + n.outerWidth()) : document.documentElement.clientWidth - (o.offset().left + o.outerWidth()), t.css("right", s), t.fadeIn("fast") } }), $(document).on("click", ".js-login", function(e) { e.preventDefault(), e.stopPropagation(), e.stopPropagation(); var t = $(".pf-popup--login"),
                    o = $(this); if (t.is(":visible")) t.fadeOut("fast");
                else { var n = document.documentElement.clientWidth - (o.offset().left + o.outerWidth());
                    t.css("right", n), t.fadeIn("fast") } }), $(document).on("click", ".pf-popup-overlay", function(e) { e.preventDefault(), e.stopPropagation(); var t = $(this),
                    o = $(".pf-popup"),
                    n = o.find("form");
                n.get(0).reset(), o.fadeOut("fast"), t.fadeOut("fast") }), $(document).on("click", ".js-close-popup", function(e) { e.preventDefault(), e.stopPropagation(); var t = $(this).closest(".pf-popup"),
                    o = t.find("form"),
                    n = $(".pf-popup-overlay");
                o.length && o.get(0).reset(), t.fadeOut("fast"), n.fadeOut("fast") }), $(document).on("click", ".pf-popup", function(e) { e.stopPropagation() }), $(document).keyup(function(e) { 27 !== e.keyCode && 27 !== e.which || ($(".pf-popup").fadeOut(), $(".js-services-close").trigger("click")) }) }) }, { "cadmiumUI/src/utils/isTouchDevice": 1 }] }, {}, [2]);