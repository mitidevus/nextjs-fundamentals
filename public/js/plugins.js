/**
 * ===================================================================
 * javascript plugins
 *
 * -------------------------------------------------------------------
 */

/* HTML5 Placeholder jQuery Plugin - v2.1.2
 * Copyright (c)2015 Mathias Bynens
 * 2015-06-09
 */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof module && module.exports ? require("jquery") : jQuery
      );
})(function (a) {
  function b(b) {
    var c = {},
      d = /^jQuery\d+$/;
    return (
      a.each(b.attributes, function (a, b) {
        b.specified && !d.test(b.name) && (c[b.name] = b.value);
      }),
      c
    );
  }
  function c(b, c) {
    var d = this,
      f = a(d);
    if (d.value == f.attr("placeholder") && f.hasClass(m.customClass))
      if (f.data("placeholder-password")) {
        if (
          ((f = f
            .hide()
            .nextAll('input[type="password"]:first')
            .show()
            .attr("id", f.removeAttr("id").data("placeholder-id"))),
          b === !0)
        )
          return (f[0].value = c);
        f.focus();
      } else
        (d.value = ""), f.removeClass(m.customClass), d == e() && d.select();
  }
  function d() {
    var d,
      e = this,
      f = a(e),
      g = this.id;
    if ("" === e.value) {
      if ("password" === e.type) {
        if (!f.data("placeholder-textinput")) {
          try {
            d = f.clone().prop({ type: "text" });
          } catch (h) {
            d = a("<input>").attr(a.extend(b(this), { type: "text" }));
          }
          d
            .removeAttr("name")
            .data({ "placeholder-password": f, "placeholder-id": g })
            .bind("focus.placeholder", c),
            f
              .data({ "placeholder-textinput": d, "placeholder-id": g })
              .before(d);
        }
        f = f
          .removeAttr("id")
          .hide()
          .prevAll('input[type="text"]:first')
          .attr("id", g)
          .show();
      }
      f.addClass(m.customClass), (f[0].value = f.attr("placeholder"));
    } else f.removeClass(m.customClass);
  }
  function e() {
    try {
      return document.activeElement;
    } catch (a) {}
  }
  var f,
    g,
    h =
      "[object OperaMini]" == Object.prototype.toString.call(window.operamini),
    i = "placeholder" in document.createElement("input") && !h,
    j = "placeholder" in document.createElement("textarea") && !h,
    k = a.valHooks,
    l = a.propHooks;
  if (i && j)
    (g = a.fn.placeholder =
      function () {
        return this;
      }),
      (g.input = g.textarea = !0);
  else {
    var m = {};
    (g = a.fn.placeholder =
      function (b) {
        var e = { customClass: "placeholder" };
        m = a.extend({}, e, b);
        var f = this;
        return (
          f
            .filter((i ? "textarea" : ":input") + "[placeholder]")
            .not("." + m.customClass)
            .bind({ "focus.placeholder": c, "blur.placeholder": d })
            .data("placeholder-enabled", !0)
            .trigger("blur.placeholder"),
          f
        );
      }),
      (g.input = i),
      (g.textarea = j),
      (f = {
        get: function (b) {
          var c = a(b),
            d = c.data("placeholder-password");
          return d
            ? d[0].value
            : c.data("placeholder-enabled") && c.hasClass(m.customClass)
            ? ""
            : b.value;
        },
        set: function (b, f) {
          var g = a(b),
            h = g.data("placeholder-password");
          return h
            ? (h[0].value = f)
            : g.data("placeholder-enabled")
            ? ("" === f
                ? ((b.value = f), b != e() && d.call(b))
                : g.hasClass(m.customClass)
                ? c.call(b, !0, f) || (b.value = f)
                : (b.value = f),
              g)
            : (b.value = f);
        },
      }),
      i || ((k.input = f), (l.value = f)),
      j || ((k.textarea = f), (l.value = f)),
      a(function () {
        a(document).delegate("form", "submit.placeholder", function () {
          var b = a("." + m.customClass, this).each(c);
          setTimeout(function () {
            b.each(d);
          }, 10);
        });
      }),
      a(window).bind("beforeunload.placeholder", function () {
        a("." + m.customClass).each(function () {
          this.value = "";
        });
      });
  }
});

/*!
Mailchimp Ajax Submit
jQuery Plugin
Author: Siddharth Doshi

Use:
===
$('#form_id').ajaxchimp(options);

- Form should have one <input> element with attribute 'type=email'
- Form should have one label element with attribute 'for=email_input_id' (used to display error/success message)
- All options are optional.

Options:
=======
options = {
    language: 'en',
    callback: callbackFunction,
    url: 'http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f'
}

Notes:
=====
To get the mailchimp JSONP url (undocumented), change 'post?' to 'post-json?' and add '&c=?' to the end.
For e.g. 'http://blahblah.us1.list-manage.com/subscribe/post-json?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f&c=?',
*/
(function ($) {
  "use strict";
  $.ajaxChimp = {
    responses: {
      "We have sent you a confirmation email": 0,
      "Please enter a value": 1,
      "An email address must contain a single @": 2,
      "The domain portion of the email address is invalid (the portion after the @: )": 3,
      "The username portion of the email address is invalid (the portion before the @: )": 4,
      "This email address looks fake or invalid. Please enter a real email address": 5,
    },
    translations: { en: null },
    init: function (selector, options) {
      $(selector).ajaxChimp(options);
    },
  };
  $.fn.ajaxChimp = function (options) {
    $(this).each(function (i, elem) {
      var form = $(elem);
      var email = form.find("input[type=email]");
      var label = form.find("label[htmlFor=" + email.attr("id") + "]");
      var settings = $.extend(
        { url: form.attr("action"), language: "en" },
        options
      );
      var url = settings.url.replace("/post?", "/post-json?").concat("&c=?");
      form.attr("novalidate", "true");
      email.attr("name", "EMAIL");
      form.submit(function () {
        var msg;
        function successCallback(resp) {
          if (resp.result === "success") {
            msg = "We have sent you a confirmation email";
            label.removeClass("error").addClass("valid");
            email.removeClass("error").addClass("valid");
          } else {
            email.removeClass("valid").addClass("error");
            label.removeClass("valid").addClass("error");
            var index = -1;
            try {
              var parts = resp.msg.split(" - ", 2);
              if (parts[1] === undefined) {
                msg = resp.msg;
              } else {
                var i = parseInt(parts[0], 10);
                if (i.toString() === parts[0]) {
                  index = parts[0];
                  msg = parts[1];
                } else {
                  index = -1;
                  msg = resp.msg;
                }
              }
            } catch (e) {
              index = -1;
              msg = resp.msg;
            }
          }
          if (
            settings.language !== "en" &&
            $.ajaxChimp.responses[msg] !== undefined &&
            $.ajaxChimp.translations &&
            $.ajaxChimp.translations[settings.language] &&
            $.ajaxChimp.translations[settings.language][
              $.ajaxChimp.responses[msg]
            ]
          ) {
            msg =
              $.ajaxChimp.translations[settings.language][
                $.ajaxChimp.responses[msg]
              ];
          }
          label.html(msg);
          label.show(2e3);
          if (settings.callback) {
            settings.callback(resp);
          }
        }
        var data = {};
        var dataArray = form.serializeArray();
        $.each(dataArray, function (index, item) {
          data[item.name] = item.value;
        });
        $.ajax({
          url: url,
          data: data,
          success: successCallback,
          dataType: "jsonp",
          error: function (resp, text) {
            console.log("mailchimp ajax submit error: " + text);
          },
        });
        var submitMsg = "Submitting...";
        if (
          settings.language !== "en" &&
          $.ajaxChimp.translations &&
          $.ajaxChimp.translations[settings.language] &&
          $.ajaxChimp.translations[settings.language]["submit"]
        ) {
          submitMsg = $.ajaxChimp.translations[settings.language]["submit"];
        }
        label.html(submitMsg).show(2e3);
        return false;
      });
    });
    return this;
  };
})(jQuery);

/* jshint browser:true
 * !
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
!(function (a) {
  "use strict";
  a.fn.fitVids = function (b) {
    var c = { customSelector: null, ignore: null };
    if (!document.getElementById("fit-vids-style")) {
      var d = document.head || document.getElementsByTagName("head")[0],
        e =
          ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
        f = document.createElement("div");
      (f.innerHTML = '<p>x</p><style id="fit-vids-style">' + e + "</style>"),
        d.appendChild(f.childNodes[1]);
    }
    return (
      b && a.extend(c, b),
      this.each(function () {
        var b = [
          'iframe[src*="player.vimeo.com"]',
          'iframe[src*="youtube.com"]',
          'iframe[src*="youtube-nocookie.com"]',
          'iframe[src*="kickstarter.com"][src*="video.html"]',
          "object",
          "embed",
        ];
        c.customSelector && b.push(c.customSelector);
        var d = ".fitvidsignore";
        c.ignore && (d = d + ", " + c.ignore);
        var e = a(this).find(b.join(","));
        (e = e.not("object object")),
          (e = e.not(d)),
          e.each(function (b) {
            var c = a(this);
            if (
              !(
                c.parents(d).length > 0 ||
                ("embed" === this.tagName.toLowerCase() &&
                  c.parent("object").length) ||
                c.parent(".fluid-width-video-wrapper").length
              )
            ) {
              c.css("height") ||
                c.css("width") ||
                (!isNaN(c.attr("height")) && !isNaN(c.attr("width"))) ||
                (c.attr("height", 9), c.attr("width", 16));
              var e =
                  "object" === this.tagName.toLowerCase() ||
                  (c.attr("height") && !isNaN(parseInt(c.attr("height"), 10)))
                    ? parseInt(c.attr("height"), 10)
                    : c.height(),
                f = isNaN(parseInt(c.attr("width"), 10))
                  ? c.width()
                  : parseInt(c.attr("width"), 10),
                g = e / f;
              if (!c.attr("id")) {
                var h = "fitvid" + b;
                c.attr("id", h);
              }
              c
                .wrap('<div class="fluid-width-video-wrapper"></div>')
                .parent(".fluid-width-video-wrapper")
                .css("padding-top", 100 * g + "%"),
                c.removeAttr("height").removeAttr("width");
            }
          });
      })
    );
  };
})(window.jQuery || window.Zepto);

/*
 * jQuery FlexSlider v2.6.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */ !(function ($) {
  var e = !0;
  ($.flexslider = function (t, a) {
    var n = $(t);
    n.vars = $.extend({}, $.flexslider.defaults, a);
    var i = n.vars.namespace,
      s =
        window.navigator &&
        window.navigator.msPointerEnabled &&
        window.MSGesture,
      r =
        ("ontouchstart" in window ||
          s ||
          (window.DocumentTouch && document instanceof DocumentTouch)) &&
        n.vars.touch,
      o = "click touchend MSPointerUp keyup",
      l = "",
      c,
      d = "vertical" === n.vars.direction,
      u = n.vars.reverse,
      v = n.vars.itemWidth > 0,
      p = "fade" === n.vars.animation,
      m = "" !== n.vars.asNavFor,
      f = {};
    $.data(t, "flexslider", n),
      (f = {
        init: function () {
          (n.animating = !1),
            (n.currentSlide = parseInt(
              n.vars.startAt ? n.vars.startAt : 0,
              10
            )),
            isNaN(n.currentSlide) && (n.currentSlide = 0),
            (n.animatingTo = n.currentSlide),
            (n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last),
            (n.containerSelector = n.vars.selector.substr(
              0,
              n.vars.selector.search(" ")
            )),
            (n.slides = $(n.vars.selector, n)),
            (n.container = $(n.containerSelector, n)),
            (n.count = n.slides.length),
            (n.syncExists = $(n.vars.sync).length > 0),
            "slide" === n.vars.animation && (n.vars.animation = "swing"),
            (n.prop = d ? "top" : "marginLeft"),
            (n.args = {}),
            (n.manualPause = !1),
            (n.stopped = !1),
            (n.started = !1),
            (n.startTimeout = null),
            (n.transitions =
              !n.vars.video &&
              !p &&
              n.vars.useCSS &&
              (function () {
                var e = document.createElement("div"),
                  t = [
                    "perspectiveProperty",
                    "WebkitPerspective",
                    "MozPerspective",
                    "OPerspective",
                    "msPerspective",
                  ];
                for (var a in t)
                  if (void 0 !== e.style[t[a]])
                    return (
                      (n.pfx = t[a].replace("Perspective", "").toLowerCase()),
                      (n.prop = "-" + n.pfx + "-transform"),
                      !0
                    );
                return !1;
              })()),
            (n.ensureAnimationEnd = ""),
            "" !== n.vars.controlsContainer &&
              (n.controlsContainer =
                $(n.vars.controlsContainer).length > 0 &&
                $(n.vars.controlsContainer)),
            "" !== n.vars.manualControls &&
              (n.manualControls =
                $(n.vars.manualControls).length > 0 &&
                $(n.vars.manualControls)),
            "" !== n.vars.customDirectionNav &&
              (n.customDirectionNav =
                2 === $(n.vars.customDirectionNav).length &&
                $(n.vars.customDirectionNav)),
            n.vars.randomize &&
              (n.slides.sort(function () {
                return Math.round(Math.random()) - 0.5;
              }),
              n.container.empty().append(n.slides)),
            n.doMath(),
            n.setup("init"),
            n.vars.controlNav && f.controlNav.setup(),
            n.vars.directionNav && f.directionNav.setup(),
            n.vars.keyboard &&
              (1 === $(n.containerSelector).length ||
                n.vars.multipleKeyboard) &&
              $(document).bind("keyup", function (e) {
                var t = e.keyCode;
                if (!n.animating && (39 === t || 37 === t)) {
                  var a =
                    39 === t
                      ? n.getTarget("next")
                      : 37 === t
                      ? n.getTarget("prev")
                      : !1;
                  n.flexAnimate(a, n.vars.pauseOnAction);
                }
              }),
            n.vars.mousewheel &&
              n.bind("mousewheel", function (e, t, a, i) {
                e.preventDefault();
                var s = 0 > t ? n.getTarget("next") : n.getTarget("prev");
                n.flexAnimate(s, n.vars.pauseOnAction);
              }),
            n.vars.pausePlay && f.pausePlay.setup(),
            n.vars.slideshow &&
              n.vars.pauseInvisible &&
              f.pauseInvisible.init(),
            n.vars.slideshow &&
              (n.vars.pauseOnHover &&
                n.hover(
                  function () {
                    n.manualPlay || n.manualPause || n.pause();
                  },
                  function () {
                    n.manualPause || n.manualPlay || n.stopped || n.play();
                  }
                ),
              (n.vars.pauseInvisible && f.pauseInvisible.isHidden()) ||
                (n.vars.initDelay > 0
                  ? (n.startTimeout = setTimeout(n.play, n.vars.initDelay))
                  : n.play())),
            m && f.asNav.setup(),
            r && n.vars.touch && f.touch(),
            (!p || (p && n.vars.smoothHeight)) &&
              $(window).bind("resize orientationchange focus", f.resize),
            n.find("img").attr("draggable", "false"),
            setTimeout(function () {
              n.vars.start(n);
            }, 200);
        },
        asNav: {
          setup: function () {
            (n.asNav = !0),
              (n.animatingTo = Math.floor(n.currentSlide / n.move)),
              (n.currentItem = n.currentSlide),
              n.slides
                .removeClass(i + "active-slide")
                .eq(n.currentItem)
                .addClass(i + "active-slide"),
              s
                ? ((t._slider = n),
                  n.slides.each(function () {
                    var e = this;
                    (e._gesture = new MSGesture()),
                      (e._gesture.target = e),
                      e.addEventListener(
                        "MSPointerDown",
                        function (e) {
                          e.preventDefault(),
                            e.currentTarget._gesture &&
                              e.currentTarget._gesture.addPointer(e.pointerId);
                        },
                        !1
                      ),
                      e.addEventListener("MSGestureTap", function (e) {
                        e.preventDefault();
                        var t = $(this),
                          a = t.index();
                        $(n.vars.asNavFor).data("flexslider").animating ||
                          t.hasClass("active") ||
                          ((n.direction = n.currentItem < a ? "next" : "prev"),
                          n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0));
                      });
                  }))
                : n.slides.on(o, function (e) {
                    e.preventDefault();
                    var t = $(this),
                      a = t.index(),
                      s = t.offset().left - $(n).scrollLeft();
                    0 >= s && t.hasClass(i + "active-slide")
                      ? n.flexAnimate(n.getTarget("prev"), !0)
                      : $(n.vars.asNavFor).data("flexslider").animating ||
                        t.hasClass(i + "active-slide") ||
                        ((n.direction = n.currentItem < a ? "next" : "prev"),
                        n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0));
                  });
          },
        },
        controlNav: {
          setup: function () {
            n.manualControls
              ? f.controlNav.setupManual()
              : f.controlNav.setupPaging();
          },
          setupPaging: function () {
            var e =
                "thumbnails" === n.vars.controlNav
                  ? "control-thumbs"
                  : "control-paging",
              t = 1,
              a,
              s;
            if (
              ((n.controlNavScaffold = $(
                '<ol class="' + i + "control-nav " + i + e + '"></ol>'
              )),
              n.pagingCount > 1)
            )
              for (var r = 0; r < n.pagingCount; r++) {
                (s = n.slides.eq(r)),
                  void 0 === s.attr("data-thumb-alt") &&
                    s.attr("data-thumb-alt", "");
                var c =
                  "" !== s.attr("data-thumb-alt")
                    ? (c = ' alt="' + s.attr("data-thumb-alt") + '"')
                    : "";
                if (
                  ((a =
                    "thumbnails" === n.vars.controlNav
                      ? '<img src="' + s.attr("data-thumb") + '"' + c + "/>"
                      : '<a href="#">' + t + "</a>"),
                  "thumbnails" === n.vars.controlNav &&
                    !0 === n.vars.thumbCaptions)
                ) {
                  var d = s.attr("data-thumbcaption");
                  "" !== d &&
                    void 0 !== d &&
                    (a += '<span class="' + i + 'caption">' + d + "</span>");
                }
                n.controlNavScaffold.append("<li>" + a + "</li>"), t++;
              }
            n.controlsContainer
              ? $(n.controlsContainer).append(n.controlNavScaffold)
              : n.append(n.controlNavScaffold),
              f.controlNav.set(),
              f.controlNav.active(),
              n.controlNavScaffold.delegate("a, img", o, function (e) {
                if ((e.preventDefault(), "" === l || l === e.type)) {
                  var t = $(this),
                    a = n.controlNav.index(t);
                  t.hasClass(i + "active") ||
                    ((n.direction = a > n.currentSlide ? "next" : "prev"),
                    n.flexAnimate(a, n.vars.pauseOnAction));
                }
                "" === l && (l = e.type), f.setToClearWatchedEvent();
              });
          },
          setupManual: function () {
            (n.controlNav = n.manualControls),
              f.controlNav.active(),
              n.controlNav.bind(o, function (e) {
                if ((e.preventDefault(), "" === l || l === e.type)) {
                  var t = $(this),
                    a = n.controlNav.index(t);
                  t.hasClass(i + "active") ||
                    (a > n.currentSlide
                      ? (n.direction = "next")
                      : (n.direction = "prev"),
                    n.flexAnimate(a, n.vars.pauseOnAction));
                }
                "" === l && (l = e.type), f.setToClearWatchedEvent();
              });
          },
          set: function () {
            var e = "thumbnails" === n.vars.controlNav ? "img" : "a";
            n.controlNav = $(
              "." + i + "control-nav li " + e,
              n.controlsContainer ? n.controlsContainer : n
            );
          },
          active: function () {
            n.controlNav
              .removeClass(i + "active")
              .eq(n.animatingTo)
              .addClass(i + "active");
          },
          update: function (e, t) {
            n.pagingCount > 1 && "add" === e
              ? n.controlNavScaffold.append(
                  $('<li><a href="#">' + n.count + "</a></li>")
                )
              : 1 === n.pagingCount
              ? n.controlNavScaffold.find("li").remove()
              : n.controlNav.eq(t).closest("li").remove(),
              f.controlNav.set(),
              n.pagingCount > 1 && n.pagingCount !== n.controlNav.length
                ? n.update(t, e)
                : f.controlNav.active();
          },
        },
        directionNav: {
          setup: function () {
            var e = $(
              '<ul class="' +
                i +
                'direction-nav"><li class="' +
                i +
                'nav-prev"><a class="' +
                i +
                'prev" href="#">' +
                n.vars.prevText +
                '</a></li><li class="' +
                i +
                'nav-next"><a class="' +
                i +
                'next" href="#">' +
                n.vars.nextText +
                "</a></li></ul>"
            );
            n.customDirectionNav
              ? (n.directionNav = n.customDirectionNav)
              : n.controlsContainer
              ? ($(n.controlsContainer).append(e),
                (n.directionNav = $(
                  "." + i + "direction-nav li a",
                  n.controlsContainer
                )))
              : (n.append(e),
                (n.directionNav = $("." + i + "direction-nav li a", n))),
              f.directionNav.update(),
              n.directionNav.bind(o, function (e) {
                e.preventDefault();
                var t;
                ("" === l || l === e.type) &&
                  ((t = $(this).hasClass(i + "next")
                    ? n.getTarget("next")
                    : n.getTarget("prev")),
                  n.flexAnimate(t, n.vars.pauseOnAction)),
                  "" === l && (l = e.type),
                  f.setToClearWatchedEvent();
              });
          },
          update: function () {
            var e = i + "disabled";
            1 === n.pagingCount
              ? n.directionNav.addClass(e).attr("tabindex", "-1")
              : n.vars.animationLoop
              ? n.directionNav.removeClass(e).removeAttr("tabindex")
              : 0 === n.animatingTo
              ? n.directionNav
                  .removeClass(e)
                  .filter("." + i + "prev")
                  .addClass(e)
                  .attr("tabindex", "-1")
              : n.animatingTo === n.last
              ? n.directionNav
                  .removeClass(e)
                  .filter("." + i + "next")
                  .addClass(e)
                  .attr("tabindex", "-1")
              : n.directionNav.removeClass(e).removeAttr("tabindex");
          },
        },
        pausePlay: {
          setup: function () {
            var e = $('<div class="' + i + 'pauseplay"><a href="#"></a></div>');
            n.controlsContainer
              ? (n.controlsContainer.append(e),
                (n.pausePlay = $("." + i + "pauseplay a", n.controlsContainer)))
              : (n.append(e), (n.pausePlay = $("." + i + "pauseplay a", n))),
              f.pausePlay.update(n.vars.slideshow ? i + "pause" : i + "play"),
              n.pausePlay.bind(o, function (e) {
                e.preventDefault(),
                  ("" === l || l === e.type) &&
                    ($(this).hasClass(i + "pause")
                      ? ((n.manualPause = !0), (n.manualPlay = !1), n.pause())
                      : ((n.manualPause = !1), (n.manualPlay = !0), n.play())),
                  "" === l && (l = e.type),
                  f.setToClearWatchedEvent();
              });
          },
          update: function (e) {
            "play" === e
              ? n.pausePlay
                  .removeClass(i + "pause")
                  .addClass(i + "play")
                  .html(n.vars.playText)
              : n.pausePlay
                  .removeClass(i + "play")
                  .addClass(i + "pause")
                  .html(n.vars.pauseText);
          },
        },
        touch: function () {
          function e(e) {
            e.stopPropagation(),
              n.animating
                ? e.preventDefault()
                : (n.pause(),
                  t._gesture.addPointer(e.pointerId),
                  (T = 0),
                  (c = d ? n.h : n.w),
                  (f = Number(new Date())),
                  (l =
                    v && u && n.animatingTo === n.last
                      ? 0
                      : v && u
                      ? n.limit -
                        (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo
                      : v && n.currentSlide === n.last
                      ? n.limit
                      : v
                      ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide
                      : u
                      ? (n.last - n.currentSlide + n.cloneOffset) * c
                      : (n.currentSlide + n.cloneOffset) * c));
          }
          function a(e) {
            e.stopPropagation();
            var a = e.target._slider;
            if (a) {
              var n = -e.translationX,
                i = -e.translationY;
              return (
                (T += d ? i : n),
                (m = T),
                (y = d
                  ? Math.abs(T) < Math.abs(-n)
                  : Math.abs(T) < Math.abs(-i)),
                e.detail === e.MSGESTURE_FLAG_INERTIA
                  ? void setImmediate(function () {
                      t._gesture.stop();
                    })
                  : void (
                      (!y || Number(new Date()) - f > 500) &&
                      (e.preventDefault(),
                      !p &&
                        a.transitions &&
                        (a.vars.animationLoop ||
                          (m =
                            T /
                            ((0 === a.currentSlide && 0 > T) ||
                            (a.currentSlide === a.last && T > 0)
                              ? Math.abs(T) / c + 2
                              : 1)),
                        a.setProps(l + m, "setTouch")))
                    )
              );
            }
          }
          function i(e) {
            e.stopPropagation();
            var t = e.target._slider;
            if (t) {
              if (t.animatingTo === t.currentSlide && !y && null !== m) {
                var a = u ? -m : m,
                  n = a > 0 ? t.getTarget("next") : t.getTarget("prev");
                t.canAdvance(n) &&
                ((Number(new Date()) - f < 550 && Math.abs(a) > 50) ||
                  Math.abs(a) > c / 2)
                  ? t.flexAnimate(n, t.vars.pauseOnAction)
                  : p ||
                    t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0);
              }
              (r = null), (o = null), (m = null), (l = null), (T = 0);
            }
          }
          var r,
            o,
            l,
            c,
            m,
            f,
            g,
            h,
            S,
            y = !1,
            x = 0,
            b = 0,
            T = 0;
          s
            ? ((t.style.msTouchAction = "none"),
              (t._gesture = new MSGesture()),
              (t._gesture.target = t),
              t.addEventListener("MSPointerDown", e, !1),
              (t._slider = n),
              t.addEventListener("MSGestureChange", a, !1),
              t.addEventListener("MSGestureEnd", i, !1))
            : ((g = function (e) {
                n.animating
                  ? e.preventDefault()
                  : (window.navigator.msPointerEnabled ||
                      1 === e.touches.length) &&
                    (n.pause(),
                    (c = d ? n.h : n.w),
                    (f = Number(new Date())),
                    (x = e.touches[0].pageX),
                    (b = e.touches[0].pageY),
                    (l =
                      v && u && n.animatingTo === n.last
                        ? 0
                        : v && u
                        ? n.limit -
                          (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo
                        : v && n.currentSlide === n.last
                        ? n.limit
                        : v
                        ? (n.itemW + n.vars.itemMargin) *
                          n.move *
                          n.currentSlide
                        : u
                        ? (n.last - n.currentSlide + n.cloneOffset) * c
                        : (n.currentSlide + n.cloneOffset) * c),
                    (r = d ? b : x),
                    (o = d ? x : b),
                    t.addEventListener("touchmove", h, !1),
                    t.addEventListener("touchend", S, !1));
              }),
              (h = function (e) {
                (x = e.touches[0].pageX),
                  (b = e.touches[0].pageY),
                  (m = d ? r - b : r - x),
                  (y = d
                    ? Math.abs(m) < Math.abs(x - o)
                    : Math.abs(m) < Math.abs(b - o));
                var t = 500;
                (!y || Number(new Date()) - f > t) &&
                  (e.preventDefault(),
                  !p &&
                    n.transitions &&
                    (n.vars.animationLoop ||
                      (m /=
                        (0 === n.currentSlide && 0 > m) ||
                        (n.currentSlide === n.last && m > 0)
                          ? Math.abs(m) / c + 2
                          : 1),
                    n.setProps(l + m, "setTouch")));
              }),
              (S = function (e) {
                if (
                  (t.removeEventListener("touchmove", h, !1),
                  n.animatingTo === n.currentSlide && !y && null !== m)
                ) {
                  var a = u ? -m : m,
                    i = a > 0 ? n.getTarget("next") : n.getTarget("prev");
                  n.canAdvance(i) &&
                  ((Number(new Date()) - f < 550 && Math.abs(a) > 50) ||
                    Math.abs(a) > c / 2)
                    ? n.flexAnimate(i, n.vars.pauseOnAction)
                    : p ||
                      n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0);
                }
                t.removeEventListener("touchend", S, !1),
                  (r = null),
                  (o = null),
                  (m = null),
                  (l = null);
              }),
              t.addEventListener("touchstart", g, !1));
        },
        resize: function () {
          !n.animating &&
            n.is(":visible") &&
            (v || n.doMath(),
            p
              ? f.smoothHeight()
              : v
              ? (n.slides.width(n.computedW),
                n.update(n.pagingCount),
                n.setProps())
              : d
              ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal"))
              : (n.vars.smoothHeight && f.smoothHeight(),
                n.newSlides.width(n.computedW),
                n.setProps(n.computedW, "setTotal")));
        },
        smoothHeight: function (e) {
          if (!d || p) {
            var t = p ? n : n.viewport;
            e
              ? t.animate(
                  { height: n.slides.eq(n.animatingTo).innerHeight() },
                  e
                )
              : t.innerHeight(n.slides.eq(n.animatingTo).innerHeight());
          }
        },
        sync: function (e) {
          var t = $(n.vars.sync).data("flexslider"),
            a = n.animatingTo;
          switch (e) {
            case "animate":
              t.flexAnimate(a, n.vars.pauseOnAction, !1, !0);
              break;
            case "play":
              t.playing || t.asNav || t.play();
              break;
            case "pause":
              t.pause();
          }
        },
        uniqueID: function (e) {
          return (
            e
              .filter("[id]")
              .add(e.find("[id]"))
              .each(function () {
                var e = $(this);
                e.attr("id", e.attr("id") + "_clone");
              }),
            e
          );
        },
        pauseInvisible: {
          visProp: null,
          init: function () {
            var e = f.pauseInvisible.getHiddenProp();
            if (e) {
              var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
              document.addEventListener(t, function () {
                f.pauseInvisible.isHidden()
                  ? n.startTimeout
                    ? clearTimeout(n.startTimeout)
                    : n.pause()
                  : n.started
                  ? n.play()
                  : n.vars.initDelay > 0
                  ? setTimeout(n.play, n.vars.initDelay)
                  : n.play();
              });
            }
          },
          isHidden: function () {
            var e = f.pauseInvisible.getHiddenProp();
            return e ? document[e] : !1;
          },
          getHiddenProp: function () {
            var e = ["webkit", "moz", "ms", "o"];
            if ("hidden" in document) return "hidden";
            for (var t = 0; t < e.length; t++)
              if (e[t] + "Hidden" in document) return e[t] + "Hidden";
            return null;
          },
        },
        setToClearWatchedEvent: function () {
          clearTimeout(c),
            (c = setTimeout(function () {
              l = "";
            }, 3e3));
        },
      }),
      (n.flexAnimate = function (e, t, a, s, o) {
        if (
          (n.vars.animationLoop ||
            e === n.currentSlide ||
            (n.direction = e > n.currentSlide ? "next" : "prev"),
          m &&
            1 === n.pagingCount &&
            (n.direction = n.currentItem < e ? "next" : "prev"),
          !n.animating && (n.canAdvance(e, o) || a) && n.is(":visible"))
        ) {
          if (m && s) {
            var l = $(n.vars.asNavFor).data("flexslider");
            if (
              ((n.atEnd = 0 === e || e === n.count - 1),
              l.flexAnimate(e, !0, !1, !0, o),
              (n.direction = n.currentItem < e ? "next" : "prev"),
              (l.direction = n.direction),
              Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || 0 === e)
            )
              return (
                (n.currentItem = e),
                n.slides
                  .removeClass(i + "active-slide")
                  .eq(e)
                  .addClass(i + "active-slide"),
                !1
              );
            (n.currentItem = e),
              n.slides
                .removeClass(i + "active-slide")
                .eq(e)
                .addClass(i + "active-slide"),
              (e = Math.floor(e / n.visible));
          }
          if (
            ((n.animating = !0),
            (n.animatingTo = e),
            t && n.pause(),
            n.vars.before(n),
            n.syncExists && !o && f.sync("animate"),
            n.vars.controlNav && f.controlNav.active(),
            v ||
              n.slides
                .removeClass(i + "active-slide")
                .eq(e)
                .addClass(i + "active-slide"),
            (n.atEnd = 0 === e || e === n.last),
            n.vars.directionNav && f.directionNav.update(),
            e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()),
            p)
          )
            r
              ? (n.slides.eq(n.currentSlide).css({ opacity: 0, zIndex: 1 }),
                n.slides.eq(e).css({ opacity: 1, zIndex: 2 }),
                n.wrapup(c))
              : (n.slides
                  .eq(n.currentSlide)
                  .css({ zIndex: 1 })
                  .animate(
                    { opacity: 0 },
                    n.vars.animationSpeed,
                    n.vars.easing
                  ),
                n.slides
                  .eq(e)
                  .css({ zIndex: 2 })
                  .animate(
                    { opacity: 1 },
                    n.vars.animationSpeed,
                    n.vars.easing,
                    n.wrapup
                  ));
          else {
            var c = d ? n.slides.filter(":first").height() : n.computedW,
              g,
              h,
              S;
            v
              ? ((g = n.vars.itemMargin),
                (S = (n.itemW + g) * n.move * n.animatingTo),
                (h = S > n.limit && 1 !== n.visible ? n.limit : S))
              : (h =
                  0 === n.currentSlide &&
                  e === n.count - 1 &&
                  n.vars.animationLoop &&
                  "next" !== n.direction
                    ? u
                      ? (n.count + n.cloneOffset) * c
                      : 0
                    : n.currentSlide === n.last &&
                      0 === e &&
                      n.vars.animationLoop &&
                      "prev" !== n.direction
                    ? u
                      ? 0
                      : (n.count + 1) * c
                    : u
                    ? (n.count - 1 - e + n.cloneOffset) * c
                    : (e + n.cloneOffset) * c),
              n.setProps(h, "", n.vars.animationSpeed),
              n.transitions
                ? ((n.vars.animationLoop && n.atEnd) ||
                    ((n.animating = !1), (n.currentSlide = n.animatingTo)),
                  n.container.unbind("webkitTransitionEnd transitionend"),
                  n.container.bind(
                    "webkitTransitionEnd transitionend",
                    function () {
                      clearTimeout(n.ensureAnimationEnd), n.wrapup(c);
                    }
                  ),
                  clearTimeout(n.ensureAnimationEnd),
                  (n.ensureAnimationEnd = setTimeout(function () {
                    n.wrapup(c);
                  }, n.vars.animationSpeed + 100)))
                : n.container.animate(
                    n.args,
                    n.vars.animationSpeed,
                    n.vars.easing,
                    function () {
                      n.wrapup(c);
                    }
                  );
          }
          n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed);
        }
      }),
      (n.wrapup = function (e) {
        p ||
          v ||
          (0 === n.currentSlide &&
          n.animatingTo === n.last &&
          n.vars.animationLoop
            ? n.setProps(e, "jumpEnd")
            : n.currentSlide === n.last &&
              0 === n.animatingTo &&
              n.vars.animationLoop &&
              n.setProps(e, "jumpStart")),
          (n.animating = !1),
          (n.currentSlide = n.animatingTo),
          n.vars.after(n);
      }),
      (n.animateSlides = function () {
        !n.animating && e && n.flexAnimate(n.getTarget("next"));
      }),
      (n.pause = function () {
        clearInterval(n.animatedSlides),
          (n.animatedSlides = null),
          (n.playing = !1),
          n.vars.pausePlay && f.pausePlay.update("play"),
          n.syncExists && f.sync("pause");
      }),
      (n.play = function () {
        n.playing && clearInterval(n.animatedSlides),
          (n.animatedSlides =
            n.animatedSlides ||
            setInterval(n.animateSlides, n.vars.slideshowSpeed)),
          (n.started = n.playing = !0),
          n.vars.pausePlay && f.pausePlay.update("pause"),
          n.syncExists && f.sync("play");
      }),
      (n.stop = function () {
        n.pause(), (n.stopped = !0);
      }),
      (n.canAdvance = function (e, t) {
        var a = m ? n.pagingCount - 1 : n.last;
        return t
          ? !0
          : m &&
            n.currentItem === n.count - 1 &&
            0 === e &&
            "prev" === n.direction
          ? !0
          : m &&
            0 === n.currentItem &&
            e === n.pagingCount - 1 &&
            "next" !== n.direction
          ? !1
          : e !== n.currentSlide || m
          ? n.vars.animationLoop
            ? !0
            : n.atEnd &&
              0 === n.currentSlide &&
              e === a &&
              "next" !== n.direction
            ? !1
            : n.atEnd &&
              n.currentSlide === a &&
              0 === e &&
              "next" === n.direction
            ? !1
            : !0
          : !1;
      }),
      (n.getTarget = function (e) {
        return (
          (n.direction = e),
          "next" === e
            ? n.currentSlide === n.last
              ? 0
              : n.currentSlide + 1
            : 0 === n.currentSlide
            ? n.last
            : n.currentSlide - 1
        );
      }),
      (n.setProps = function (e, t, a) {
        var i = (function () {
          var a = e
              ? e
              : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
            i = (function () {
              if (v)
                return "setTouch" === t
                  ? e
                  : u && n.animatingTo === n.last
                  ? 0
                  : u
                  ? n.limit -
                    (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo
                  : n.animatingTo === n.last
                  ? n.limit
                  : a;
              switch (t) {
                case "setTotal":
                  return u
                    ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e
                    : (n.currentSlide + n.cloneOffset) * e;
                case "setTouch":
                  return u ? e : e;
                case "jumpEnd":
                  return u ? e : n.count * e;
                case "jumpStart":
                  return u ? n.count * e : e;
                default:
                  return e;
              }
            })();
          return -1 * i + "px";
        })();
        n.transitions &&
          ((i = d
            ? "translate3d(0," + i + ",0)"
            : "translate3d(" + i + ",0,0)"),
          (a = void 0 !== a ? a / 1e3 + "s" : "0s"),
          n.container.css("-" + n.pfx + "-transition-duration", a),
          n.container.css("transition-duration", a)),
          (n.args[n.prop] = i),
          (n.transitions || void 0 === a) && n.container.css(n.args),
          n.container.css("transform", i);
      }),
      (n.setup = function (e) {
        if (p)
          n.slides.css({
            width: "100%",
            float: "left",
            marginRight: "-100%",
            position: "relative",
          }),
            "init" === e &&
              (r
                ? n.slides
                    .css({
                      opacity: 0,
                      display: "block",
                      webkitTransition:
                        "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                      zIndex: 1,
                    })
                    .eq(n.currentSlide)
                    .css({ opacity: 1, zIndex: 2 })
                : 0 == n.vars.fadeFirstSlide
                ? n.slides
                    .css({ opacity: 0, display: "block", zIndex: 1 })
                    .eq(n.currentSlide)
                    .css({ zIndex: 2 })
                    .css({ opacity: 1 })
                : n.slides
                    .css({ opacity: 0, display: "block", zIndex: 1 })
                    .eq(n.currentSlide)
                    .css({ zIndex: 2 })
                    .animate(
                      { opacity: 1 },
                      n.vars.animationSpeed,
                      n.vars.easing
                    )),
            n.vars.smoothHeight && f.smoothHeight();
        else {
          var t, a;
          "init" === e &&
            ((n.viewport = $('<div class="' + i + 'viewport"></div>')
              .css({ overflow: "hidden", position: "relative" })
              .appendTo(n)
              .append(n.container)),
            (n.cloneCount = 0),
            (n.cloneOffset = 0),
            u &&
              ((a = $.makeArray(n.slides).reverse()),
              (n.slides = $(a)),
              n.container.empty().append(n.slides))),
            n.vars.animationLoop &&
              !v &&
              ((n.cloneCount = 2),
              (n.cloneOffset = 1),
              "init" !== e && n.container.find(".clone").remove(),
              n.container
                .append(
                  f
                    .uniqueID(n.slides.first().clone().addClass("clone"))
                    .attr("aria-hidden", "true")
                )
                .prepend(
                  f
                    .uniqueID(n.slides.last().clone().addClass("clone"))
                    .attr("aria-hidden", "true")
                )),
            (n.newSlides = $(n.vars.selector, n)),
            (t = u
              ? n.count - 1 - n.currentSlide + n.cloneOffset
              : n.currentSlide + n.cloneOffset),
            d && !v
              ? (n.container
                  .height(200 * (n.count + n.cloneCount) + "%")
                  .css("position", "absolute")
                  .width("100%"),
                setTimeout(
                  function () {
                    n.newSlides.css({ display: "block" }),
                      n.doMath(),
                      n.viewport.height(n.h),
                      n.setProps(t * n.h, "init");
                  },
                  "init" === e ? 100 : 0
                ))
              : (n.container.width(200 * (n.count + n.cloneCount) + "%"),
                n.setProps(t * n.computedW, "init"),
                setTimeout(
                  function () {
                    n.doMath(),
                      n.newSlides.css({
                        width: n.computedW,
                        marginRight: n.computedM,
                        float: "left",
                        display: "block",
                      }),
                      n.vars.smoothHeight && f.smoothHeight();
                  },
                  "init" === e ? 100 : 0
                ));
        }
        v ||
          n.slides
            .removeClass(i + "active-slide")
            .eq(n.currentSlide)
            .addClass(i + "active-slide"),
          n.vars.init(n);
      }),
      (n.doMath = function () {
        var e = n.slides.first(),
          t = n.vars.itemMargin,
          a = n.vars.minItems,
          i = n.vars.maxItems;
        (n.w = void 0 === n.viewport ? n.width() : n.viewport.width()),
          (n.h = e.height()),
          (n.boxPadding = e.outerWidth() - e.width()),
          v
            ? ((n.itemT = n.vars.itemWidth + t),
              (n.itemM = t),
              (n.minW = a ? a * n.itemT : n.w),
              (n.maxW = i ? i * n.itemT - t : n.w),
              (n.itemW =
                n.minW > n.w
                  ? (n.w - t * (a - 1)) / a
                  : n.maxW < n.w
                  ? (n.w - t * (i - 1)) / i
                  : n.vars.itemWidth > n.w
                  ? n.w
                  : n.vars.itemWidth),
              (n.visible = Math.floor(n.w / n.itemW)),
              (n.move =
                n.vars.move > 0 && n.vars.move < n.visible
                  ? n.vars.move
                  : n.visible),
              (n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1)),
              (n.last = n.pagingCount - 1),
              (n.limit =
                1 === n.pagingCount
                  ? 0
                  : n.vars.itemWidth > n.w
                  ? n.itemW * (n.count - 1) + t * (n.count - 1)
                  : (n.itemW + t) * n.count - n.w - t))
            : ((n.itemW = n.w),
              (n.itemM = t),
              (n.pagingCount = n.count),
              (n.last = n.count - 1)),
          (n.computedW = n.itemW - n.boxPadding),
          (n.computedM = n.itemM);
      }),
      (n.update = function (e, t) {
        n.doMath(),
          v ||
            (e < n.currentSlide
              ? (n.currentSlide += 1)
              : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1),
            (n.animatingTo = n.currentSlide)),
          n.vars.controlNav &&
            !n.manualControls &&
            (("add" === t && !v) || n.pagingCount > n.controlNav.length
              ? f.controlNav.update("add")
              : (("remove" === t && !v) ||
                  n.pagingCount < n.controlNav.length) &&
                (v &&
                  n.currentSlide > n.last &&
                  ((n.currentSlide -= 1), (n.animatingTo -= 1)),
                f.controlNav.update("remove", n.last))),
          n.vars.directionNav && f.directionNav.update();
      }),
      (n.addSlide = function (e, t) {
        var a = $(e);
        (n.count += 1),
          (n.last = n.count - 1),
          d && u
            ? void 0 !== t
              ? n.slides.eq(n.count - t).after(a)
              : n.container.prepend(a)
            : void 0 !== t
            ? n.slides.eq(t).before(a)
            : n.container.append(a),
          n.update(t, "add"),
          (n.slides = $(n.vars.selector + ":not(.clone)", n)),
          n.setup(),
          n.vars.added(n);
      }),
      (n.removeSlide = function (e) {
        var t = isNaN(e) ? n.slides.index($(e)) : e;
        (n.count -= 1),
          (n.last = n.count - 1),
          isNaN(e)
            ? $(e, n.slides).remove()
            : d && u
            ? n.slides.eq(n.last).remove()
            : n.slides.eq(e).remove(),
          n.doMath(),
          n.update(t, "remove"),
          (n.slides = $(n.vars.selector + ":not(.clone)", n)),
          n.setup(),
          n.vars.removed(n);
      }),
      f.init();
  }),
    $(window)
      .blur(function (t) {
        e = !1;
      })
      .focus(function (t) {
        e = !0;
      }),
    ($.flexslider.defaults = {
      namespace: "flex-",
      selector: ".slides > li",
      animation: "fade",
      easing: "swing",
      direction: "horizontal",
      reverse: !1,
      animationLoop: !0,
      smoothHeight: !1,
      startAt: 0,
      slideshow: !0,
      slideshowSpeed: 7e3,
      animationSpeed: 600,
      initDelay: 0,
      randomize: !1,
      fadeFirstSlide: !0,
      thumbCaptions: !1,
      pauseOnAction: !0,
      pauseOnHover: !1,
      pauseInvisible: !0,
      useCSS: !0,
      touch: !0,
      video: !1,
      controlNav: !0,
      directionNav: !0,
      prevText: "Previous",
      nextText: "Next",
      keyboard: !0,
      multipleKeyboard: !1,
      mousewheel: !1,
      pausePlay: !1,
      pauseText: "Pause",
      playText: "Play",
      controlsContainer: "",
      manualControls: "",
      customDirectionNav: "",
      sync: "",
      asNavFor: "",
      itemWidth: 0,
      itemMargin: 0,
      minItems: 1,
      maxItems: 0,
      move: 0,
      allowOneSlide: !0,
      start: function () {},
      before: function () {},
      after: function () {},
      end: function () {},
      added: function () {},
      removed: function () {},
      init: function () {},
    }),
    ($.fn.flexslider = function (e) {
      if ((void 0 === e && (e = {}), "object" == typeof e))
        return this.each(function () {
          var t = $(this),
            a = e.selector ? e.selector : ".slides > li",
            n = t.find(a);
          (1 === n.length && e.allowOneSlide === !1) || 0 === n.length
            ? (n.fadeIn(400), e.start && e.start(t))
            : void 0 === t.data("flexslider") && new $.flexslider(this, e);
        });
      var t = $(this).data("flexslider");
      switch (e) {
        case "play":
          t.play();
          break;
        case "pause":
          t.pause();
          break;
        case "stop":
          t.stop();
          break;
        case "next":
          t.flexAnimate(t.getTarget("next"), !0);
          break;
        case "prev":
        case "previous":
          t.flexAnimate(t.getTarget("prev"), !0);
          break;
        default:
          "number" == typeof e && t.flexAnimate(e, !0);
      }
    });
})(jQuery);

/*!
 *
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2014, John Dyer (http://j.hn)
 * License: MIT
 *
 */
var mejs = mejs || {};
(mejs.version = "2.22.0"),
  (mejs.meIndex = 0),
  (mejs.plugins = {
    silverlight: [
      {
        version: [3, 0],
        types: [
          "video/mp4",
          "video/m4v",
          "video/mov",
          "video/wmv",
          "audio/wma",
          "audio/m4a",
          "audio/mp3",
          "audio/wav",
          "audio/mpeg",
        ],
      },
    ],
    flash: [
      {
        version: [9, 0, 124],
        types: [
          "video/mp4",
          "video/m4v",
          "video/mov",
          "video/flv",
          "video/rtmp",
          "video/x-flv",
          "audio/flv",
          "audio/x-flv",
          "audio/mp3",
          "audio/m4a",
          "audio/mpeg",
          "video/dailymotion",
          "video/x-dailymotion",
          "application/x-mpegURL",
        ],
      },
    ],
    youtube: [
      {
        version: null,
        types: [
          "video/youtube",
          "video/x-youtube",
          "audio/youtube",
          "audio/x-youtube",
        ],
      },
    ],
    vimeo: [{ version: null, types: ["video/vimeo", "video/x-vimeo"] }],
  }),
  (mejs.Utility = {
    encodeUrl: function (a) {
      return encodeURIComponent(a);
    },
    escapeHTML: function (a) {
      return a
        .toString()
        .split("&")
        .join("&amp;")
        .split("<")
        .join("&lt;")
        .split('"')
        .join("&quot;");
    },
    absolutizeUrl: function (a) {
      var b = document.createElement("div");
      return (
        (b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>'),
        b.firstChild.href
      );
    },
    getScriptPath: function (a) {
      for (
        var b,
          c,
          d,
          e,
          f,
          g,
          h = 0,
          i = "",
          j = "",
          k = document.getElementsByTagName("script"),
          l = k.length,
          m = a.length;
        l > h;
        h++
      ) {
        for (
          e = k[h].src,
            c = e.lastIndexOf("/"),
            c > -1
              ? ((g = e.substring(c + 1)), (f = e.substring(0, c + 1)))
              : ((g = e), (f = "")),
            b = 0;
          m > b;
          b++
        )
          if (((j = a[b]), (d = g.indexOf(j)), d > -1)) {
            i = f;
            break;
          }
        if ("" !== i) break;
      }
      return i;
    },
    calculateTimeFormat: function (a, b, c) {
      0 > a && (a = 0), "undefined" == typeof c && (c = 25);
      var d = b.timeFormat,
        e = d[0],
        f = d[1] == d[0],
        g = f ? 2 : 1,
        h = ":",
        i = Math.floor(a / 3600) % 24,
        j = Math.floor(a / 60) % 60,
        k = Math.floor(a % 60),
        l = Math.floor(((a % 1) * c).toFixed(3)),
        m = [
          [l, "f"],
          [k, "s"],
          [j, "m"],
          [i, "h"],
        ];
      d.length < g && (h = d[g]);
      for (var n = !1, o = 0, p = m.length; p > o; o++)
        if (-1 !== d.indexOf(m[o][1])) n = !0;
        else if (n) {
          for (var q = !1, r = o; p > r; r++)
            if (m[r][0] > 0) {
              q = !0;
              break;
            }
          if (!q) break;
          f || (d = e + d),
            (d = m[o][1] + h + d),
            f && (d = m[o][1] + d),
            (e = m[o][1]);
        }
      b.currentTimeFormat = d;
    },
    twoDigitsString: function (a) {
      return 10 > a ? "0" + a : String(a);
    },
    secondsToTimeCode: function (a, b) {
      if ((0 > a && (a = 0), "object" != typeof b)) {
        var c = "m:ss";
        (c = arguments[1] ? "hh:mm:ss" : c),
          (c = arguments[2] ? c + ":ff" : c),
          (b = { currentTimeFormat: c, framesPerSecond: arguments[3] || 25 });
      }
      var d = b.framesPerSecond;
      "undefined" == typeof d && (d = 25);
      var c = b.currentTimeFormat,
        e = Math.floor(a / 3600) % 24,
        f = Math.floor(a / 60) % 60,
        g = Math.floor(a % 60),
        h = Math.floor(((a % 1) * d).toFixed(3));
      lis = [
        [h, "f"],
        [g, "s"],
        [f, "m"],
        [e, "h"],
      ];
      var j = c;
      for (i = 0, len = lis.length; i < len; i++)
        (j = j.replace(lis[i][1] + lis[i][1], this.twoDigitsString(lis[i][0]))),
          (j = j.replace(lis[i][1], lis[i][0]));
      return j;
    },
    timeCodeToSeconds: function (a, b, c, d) {
      "undefined" == typeof c ? (c = !1) : "undefined" == typeof d && (d = 25);
      var e = a.split(":"),
        f = parseInt(e[0], 10),
        g = parseInt(e[1], 10),
        h = parseInt(e[2], 10),
        i = 0,
        j = 0;
      return c && (i = parseInt(e[3]) / d), (j = 3600 * f + 60 * g + h + i);
    },
    convertSMPTEtoSeconds: function (a) {
      if ("string" != typeof a) return !1;
      a = a.replace(",", ".");
      var b = 0,
        c = -1 != a.indexOf(".") ? a.split(".")[1].length : 0,
        d = 1;
      a = a.split(":").reverse();
      for (var e = 0; e < a.length; e++)
        (d = 1), e > 0 && (d = Math.pow(60, e)), (b += Number(a[e]) * d);
      return Number(b.toFixed(c));
    },
    removeSwf: function (a) {
      var b = document.getElementById(a);
      b &&
        /object|embed/i.test(b.nodeName) &&
        (mejs.MediaFeatures.isIE
          ? ((b.style.display = "none"),
            (function () {
              4 == b.readyState
                ? mejs.Utility.removeObjectInIE(a)
                : setTimeout(arguments.callee, 10);
            })())
          : b.parentNode.removeChild(b));
    },
    removeObjectInIE: function (a) {
      var b = document.getElementById(a);
      if (b) {
        for (var c in b) "function" == typeof b[c] && (b[c] = null);
        b.parentNode.removeChild(b);
      }
    },
    determineScheme: function (a) {
      return a && -1 != a.indexOf("://")
        ? a.substr(0, a.indexOf("://") + 3)
        : "//";
    },
  }),
  (mejs.PluginDetector = {
    hasPluginVersion: function (a, b) {
      var c = this.plugins[a];
      return (
        (b[1] = b[1] || 0),
        (b[2] = b[2] || 0),
        c[0] > b[0] ||
        (c[0] == b[0] && c[1] > b[1]) ||
        (c[0] == b[0] && c[1] == b[1] && c[2] >= b[2])
          ? !0
          : !1
      );
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function (a, b, c, d, e) {
      this.plugins[a] = this.detectPlugin(b, c, d, e);
    },
    detectPlugin: function (a, b, c, d) {
      var e,
        f,
        g,
        h = [0, 0, 0];
      if (
        "undefined" != typeof this.nav.plugins &&
        "object" == typeof this.nav.plugins[a]
      ) {
        if (
          ((e = this.nav.plugins[a].description),
          e &&
            ("undefined" == typeof this.nav.mimeTypes ||
              !this.nav.mimeTypes[b] ||
              this.nav.mimeTypes[b].enabledPlugin))
        )
          for (
            h = e
              .replace(a, "")
              .replace(/^\s+/, "")
              .replace(/\sr/gi, ".")
              .split("."),
              f = 0;
            f < h.length;
            f++
          )
            h[f] = parseInt(h[f].match(/\d+/), 10);
      } else if ("undefined" != typeof window.ActiveXObject)
        try {
          (g = new ActiveXObject(c)), g && (h = d(g));
        } catch (i) {}
      return h;
    },
  }),
  mejs.PluginDetector.addPlugin(
    "flash",
    "Shockwave Flash",
    "application/x-shockwave-flash",
    "ShockwaveFlash.ShockwaveFlash",
    function (a) {
      var b = [],
        c = a.GetVariable("$version");
      return (
        c &&
          ((c = c.split(" ")[1].split(",")),
          (b = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)])),
        b
      );
    }
  ),
  mejs.PluginDetector.addPlugin(
    "silverlight",
    "Silverlight Plug-In",
    "application/x-silverlight-2",
    "AgControl.AgControl",
    function (a) {
      var b = [0, 0, 0, 0],
        c = function (a, b, c, d) {
          for (
            ;
            a.isVersionSupported(b[0] + "." + b[1] + "." + b[2] + "." + b[3]);

          )
            b[c] += d;
          b[c] -= d;
        };
      return (
        c(a, b, 0, 1),
        c(a, b, 1, 1),
        c(a, b, 2, 1e4),
        c(a, b, 2, 1e3),
        c(a, b, 2, 100),
        c(a, b, 2, 10),
        c(a, b, 2, 1),
        c(a, b, 3, 1),
        b
      );
    }
  ),
  (mejs.MediaFeatures = {
    init: function () {
      var a,
        b,
        c = this,
        d = document,
        e = mejs.PluginDetector.nav,
        f = mejs.PluginDetector.ua.toLowerCase(),
        g = ["source", "track", "audio", "video"];
      (c.isiPad = null !== f.match(/ipad/i)),
        (c.isiPhone = null !== f.match(/iphone/i)),
        (c.isiOS = c.isiPhone || c.isiPad),
        (c.isAndroid = null !== f.match(/android/i)),
        (c.isBustedAndroid = null !== f.match(/android 2\.[12]/)),
        (c.isBustedNativeHTTPS =
          "https:" === location.protocol &&
          (null !== f.match(/android [12]\./) ||
            null !== f.match(/macintosh.* version.* safari/))),
        (c.isIE =
          -1 != e.appName.toLowerCase().indexOf("microsoft") ||
          null !== e.appName.toLowerCase().match(/trident/gi)),
        (c.isChrome = null !== f.match(/chrome/gi)),
        (c.isChromium = null !== f.match(/chromium/gi)),
        (c.isFirefox = null !== f.match(/firefox/gi)),
        (c.isWebkit = null !== f.match(/webkit/gi)),
        (c.isGecko = null !== f.match(/gecko/gi) && !c.isWebkit && !c.isIE),
        (c.isOpera = null !== f.match(/opera/gi)),
        (c.hasTouch = "ontouchstart" in window),
        (c.svgAsImg = !!document.implementation.hasFeature(
          "http://www.w3.org/TR/SVG11/feature#Image",
          "1.1"
        ));
      for (a = 0; a < g.length; a++) b = document.createElement(g[a]);
      c.supportsMediaTag =
        "undefined" != typeof b.canPlayType || c.isBustedAndroid;
      try {
        b.canPlayType("video/mp4");
      } catch (h) {
        c.supportsMediaTag = !1;
      }
      (c.supportsPointerEvents = (function () {
        var a,
          b = document.createElement("x"),
          c = document.documentElement,
          d = window.getComputedStyle;
        return "pointerEvents" in b.style
          ? ((b.style.pointerEvents = "auto"),
            (b.style.pointerEvents = "x"),
            c.appendChild(b),
            (a = d && "auto" === d(b, "").pointerEvents),
            c.removeChild(b),
            !!a)
          : !1;
      })()),
        (c.hasFirefoxPluginMovingProblem = !1),
        (c.hasiOSFullScreen = "undefined" != typeof b.webkitEnterFullscreen),
        (c.hasNativeFullscreen = "undefined" != typeof b.requestFullscreen),
        (c.hasWebkitNativeFullScreen =
          "undefined" != typeof b.webkitRequestFullScreen),
        (c.hasMozNativeFullScreen =
          "undefined" != typeof b.mozRequestFullScreen),
        (c.hasMsNativeFullScreen = "undefined" != typeof b.msRequestFullscreen),
        (c.hasTrueNativeFullScreen =
          c.hasWebkitNativeFullScreen ||
          c.hasMozNativeFullScreen ||
          c.hasMsNativeFullScreen),
        (c.nativeFullScreenEnabled = c.hasTrueNativeFullScreen),
        c.hasMozNativeFullScreen
          ? (c.nativeFullScreenEnabled = document.mozFullScreenEnabled)
          : c.hasMsNativeFullScreen &&
            (c.nativeFullScreenEnabled = document.msFullscreenEnabled),
        c.isChrome && (c.hasiOSFullScreen = !1),
        c.hasTrueNativeFullScreen &&
          ((c.fullScreenEventName = ""),
          c.hasWebkitNativeFullScreen
            ? (c.fullScreenEventName = "webkitfullscreenchange")
            : c.hasMozNativeFullScreen
            ? (c.fullScreenEventName = "mozfullscreenchange")
            : c.hasMsNativeFullScreen &&
              (c.fullScreenEventName = "MSFullscreenChange"),
          (c.isFullScreen = function () {
            return c.hasMozNativeFullScreen
              ? d.mozFullScreen
              : c.hasWebkitNativeFullScreen
              ? d.webkitIsFullScreen
              : c.hasMsNativeFullScreen
              ? null !== d.msFullscreenElement
              : void 0;
          }),
          (c.requestFullScreen = function (a) {
            c.hasWebkitNativeFullScreen
              ? a.webkitRequestFullScreen()
              : c.hasMozNativeFullScreen
              ? a.mozRequestFullScreen()
              : c.hasMsNativeFullScreen && a.msRequestFullscreen();
          }),
          (c.cancelFullScreen = function () {
            c.hasWebkitNativeFullScreen
              ? document.webkitCancelFullScreen()
              : c.hasMozNativeFullScreen
              ? document.mozCancelFullScreen()
              : c.hasMsNativeFullScreen && document.msExitFullscreen();
          })),
        c.hasiOSFullScreen &&
          f.match(/mac os x 10_5/i) &&
          ((c.hasNativeFullScreen = !1), (c.hasiOSFullScreen = !1));
    },
  }),
  mejs.MediaFeatures.init(),
  (mejs.HtmlMediaElement = {
    pluginType: "native",
    isFullScreen: !1,
    setCurrentTime: function (a) {
      this.currentTime = a;
    },
    setMuted: function (a) {
      this.muted = a;
    },
    setVolume: function (a) {
      this.volume = a;
    },
    stop: function () {
      this.pause();
    },
    setSrc: function (a) {
      for (var b = this.getElementsByTagName("source"); b.length > 0; )
        this.removeChild(b[0]);
      if ("string" == typeof a) this.src = a;
      else {
        var c, d;
        for (c = 0; c < a.length; c++)
          if (((d = a[c]), this.canPlayType(d.type))) {
            this.src = d.src;
            break;
          }
      }
    },
    setVideoSize: function (a, b) {
      (this.width = a), (this.height = b);
    },
  }),
  (mejs.PluginMediaElement = function (a, b, c) {
    (this.id = a),
      (this.pluginType = b),
      (this.src = c),
      (this.events = {}),
      (this.attributes = {});
  }),
  (mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: "",
    isFullScreen: !1,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: !0,
    ended: !1,
    seeking: !1,
    duration: 0,
    error: null,
    tagName: "",
    muted: !1,
    volume: 1,
    currentTime: 0,
    play: function () {
      null != this.pluginApi &&
        ("youtube" == this.pluginType || "vimeo" == this.pluginType
          ? this.pluginApi.playVideo()
          : this.pluginApi.playMedia(),
        (this.paused = !1));
    },
    load: function () {
      null != this.pluginApi &&
        ("youtube" == this.pluginType ||
          "vimeo" == this.pluginType ||
          this.pluginApi.loadMedia(),
        (this.paused = !1));
    },
    pause: function () {
      null != this.pluginApi &&
        ("youtube" == this.pluginType || "vimeo" == this.pluginType
          ? 1 == this.pluginApi.getPlayerState() && this.pluginApi.pauseVideo()
          : this.pluginApi.pauseMedia(),
        (this.paused = !0));
    },
    stop: function () {
      null != this.pluginApi &&
        ("youtube" == this.pluginType || "vimeo" == this.pluginType
          ? this.pluginApi.stopVideo()
          : this.pluginApi.stopMedia(),
        (this.paused = !0));
    },
    canPlayType: function (a) {
      var b,
        c,
        d,
        e = mejs.plugins[this.pluginType];
      for (b = 0; b < e.length; b++)
        if (
          ((d = e[b]),
          mejs.PluginDetector.hasPluginVersion(this.pluginType, d.version))
        )
          for (c = 0; c < d.types.length; c++)
            if (a == d.types[c]) return "probably";
      return "";
    },
    positionFullscreenButton: function (a, b, c) {
      null != this.pluginApi &&
        this.pluginApi.positionFullscreenButton &&
        this.pluginApi.positionFullscreenButton(
          Math.floor(a),
          Math.floor(b),
          c
        );
    },
    hideFullscreenButton: function () {
      null != this.pluginApi &&
        this.pluginApi.hideFullscreenButton &&
        this.pluginApi.hideFullscreenButton();
    },
    setSrc: function (a) {
      if ("string" == typeof a)
        this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a)),
          (this.src = mejs.Utility.absolutizeUrl(a));
      else {
        var b, c;
        for (b = 0; b < a.length; b++)
          if (((c = a[b]), this.canPlayType(c.type))) {
            this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src)),
              (this.src = mejs.Utility.absolutizeUrl(c.src));
            break;
          }
      }
    },
    setCurrentTime: function (a) {
      null != this.pluginApi &&
        ("youtube" == this.pluginType || "vimeo" == this.pluginType
          ? this.pluginApi.seekTo(a)
          : this.pluginApi.setCurrentTime(a),
        (this.currentTime = a));
    },
    setVolume: function (a) {
      null != this.pluginApi &&
        ("youtube" == this.pluginType
          ? this.pluginApi.setVolume(100 * a)
          : this.pluginApi.setVolume(a),
        (this.volume = a));
    },
    setMuted: function (a) {
      null != this.pluginApi &&
        ("youtube" == this.pluginType
          ? (a ? this.pluginApi.mute() : this.pluginApi.unMute(),
            (this.muted = a),
            this.dispatchEvent({ type: "volumechange" }))
          : this.pluginApi.setMuted(a),
        (this.muted = a));
    },
    setVideoSize: function (a, b) {
      this.pluginElement &&
        this.pluginElement.style &&
        ((this.pluginElement.style.width = a + "px"),
        (this.pluginElement.style.height = b + "px")),
        null != this.pluginApi &&
          this.pluginApi.setVideoSize &&
          this.pluginApi.setVideoSize(a, b);
    },
    setFullscreen: function (a) {
      null != this.pluginApi &&
        this.pluginApi.setFullscreen &&
        this.pluginApi.setFullscreen(a);
    },
    enterFullScreen: function () {
      null != this.pluginApi &&
        this.pluginApi.setFullscreen &&
        this.setFullscreen(!0);
    },
    exitFullScreen: function () {
      null != this.pluginApi &&
        this.pluginApi.setFullscreen &&
        this.setFullscreen(!1);
    },
    addEventListener: function (a, b, c) {
      (this.events[a] = this.events[a] || []), this.events[a].push(b);
    },
    removeEventListener: function (a, b) {
      if (!a) return (this.events = {}), !0;
      var c = this.events[a];
      if (!c) return !0;
      if (!b) return (this.events[a] = []), !0;
      for (var d = 0; d < c.length; d++)
        if (c[d] === b) return this.events[a].splice(d, 1), !0;
      return !1;
    },
    dispatchEvent: function (a) {
      var b,
        c = this.events[a.type];
      if (c) for (b = 0; b < c.length; b++) c[b].apply(this, [a]);
    },
    hasAttribute: function (a) {
      return a in this.attributes;
    },
    removeAttribute: function (a) {
      delete this.attributes[a];
    },
    getAttribute: function (a) {
      return this.hasAttribute(a) ? this.attributes[a] : "";
    },
    setAttribute: function (a, b) {
      this.attributes[a] = b;
    },
    remove: function () {
      mejs.Utility.removeSwf(this.pluginElement.id);
    },
  }),
  (mejs.MediaElementDefaults = {
    mode: "auto",
    plugins: ["flash", "silverlight", "youtube", "vimeo"],
    enablePluginDebug: !1,
    httpsBasicAuthSite: !1,
    type: "",
    pluginPath: mejs.Utility.getScriptPath([
      "mediaelement.js",
      "mediaelement.min.js",
      "mediaelement-and-player.js",
      "mediaelement-and-player.min.js",
    ]),
    flashName: "flashmediaelement.swf",
    flashStreamer: "",
    flashScriptAccess: "sameDomain",
    enablePluginSmoothing: !1,
    enablePseudoStreaming: !1,
    pseudoStreamingStartQueryParam: "start",
    silverlightName: "silverlightmediaelement.xap",
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: 0.8,
    success: function () {},
    error: function () {},
  }),
  (mejs.MediaElement = function (a, b) {
    return mejs.HtmlMediaElementShim.create(a, b);
  }),
  (mejs.HtmlMediaElementShim = {
    create: function (a, b) {
      var c,
        d,
        e = {},
        f = "string" == typeof a ? document.getElementById(a) : a,
        g = f.tagName.toLowerCase(),
        h = "audio" === g || "video" === g,
        i = h ? f.getAttribute("src") : f.getAttribute("href"),
        j = f.getAttribute("poster"),
        k = f.getAttribute("autoplay"),
        l = f.getAttribute("preload"),
        m = f.getAttribute("controls");
      for (d in mejs.MediaElementDefaults) e[d] = mejs.MediaElementDefaults[d];
      for (d in b) e[d] = b[d];
      return (
        (i = "undefined" == typeof i || null === i || "" == i ? null : i),
        (j = "undefined" == typeof j || null === j ? "" : j),
        (l =
          "undefined" == typeof l || null === l || "false" === l ? "none" : l),
        (k = !("undefined" == typeof k || null === k || "false" === k)),
        (m = !("undefined" == typeof m || null === m || "false" === m)),
        (c = this.determinePlayback(
          f,
          e,
          mejs.MediaFeatures.supportsMediaTag,
          h,
          i
        )),
        (c.url = null !== c.url ? mejs.Utility.absolutizeUrl(c.url) : ""),
        (c.scheme = mejs.Utility.determineScheme(c.url)),
        "native" == c.method
          ? (mejs.MediaFeatures.isBustedAndroid &&
              ((f.src = c.url),
              f.addEventListener(
                "click",
                function () {
                  f.play();
                },
                !1
              )),
            this.updateNative(c, e, k, l))
          : "" !== c.method
          ? this.createPlugin(c, e, j, k, l, m)
          : (this.createErrorMessage(c, e, j), this)
      );
    },
    determinePlayback: function (a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q = [],
        r = {
          method: "",
          url: "",
          htmlMediaElement: a,
          isVideo: "audio" != a.tagName.toLowerCase(),
          scheme: "",
        };
      if ("undefined" != typeof b.type && "" !== b.type)
        if ("string" == typeof b.type) q.push({ type: b.type, url: e });
        else
          for (f = 0; f < b.type.length; f++)
            q.push({ type: b.type[f], url: e });
      else if (null !== e)
        (k = this.formatType(e, a.getAttribute("type"))),
          q.push({ type: k, url: e });
      else
        for (f = 0; f < a.childNodes.length; f++)
          (j = a.childNodes[f]),
            1 == j.nodeType &&
              "source" == j.tagName.toLowerCase() &&
              ((e = j.getAttribute("src")),
              (k = this.formatType(e, j.getAttribute("type"))),
              (p = j.getAttribute("media")),
              (!p ||
                !window.matchMedia ||
                (window.matchMedia && window.matchMedia(p).matches)) &&
                q.push({ type: k, url: e }));
      if (
        (!d &&
          q.length > 0 &&
          null !== q[0].url &&
          this.getTypeFromFile(q[0].url).indexOf("audio") > -1 &&
          (r.isVideo = !1),
        mejs.MediaFeatures.isBustedAndroid &&
          (a.canPlayType = function (a) {
            return null !== a.match(/video\/(mp4|m4v)/gi) ? "maybe" : "";
          }),
        mejs.MediaFeatures.isChromium &&
          (a.canPlayType = function (a) {
            return null !== a.match(/video\/(webm|ogv|ogg)/gi) ? "maybe" : "";
          }),
        c &&
          ("auto" === b.mode ||
            "auto_plugin" === b.mode ||
            "native" === b.mode) &&
          (!mejs.MediaFeatures.isBustedNativeHTTPS ||
            b.httpsBasicAuthSite !== !0))
      ) {
        for (
          d ||
            ((o = document.createElement(r.isVideo ? "video" : "audio")),
            a.parentNode.insertBefore(o, a),
            (a.style.display = "none"),
            (r.htmlMediaElement = a = o)),
            f = 0;
          f < q.length;
          f++
        )
          if (
            "video/m3u8" == q[f].type ||
            "" !== a.canPlayType(q[f].type).replace(/no/, "") ||
            "" !==
              a
                .canPlayType(q[f].type.replace(/mp3/, "mpeg"))
                .replace(/no/, "") ||
            "" !==
              a.canPlayType(q[f].type.replace(/m4a/, "mp4")).replace(/no/, "")
          ) {
            (r.method = "native"), (r.url = q[f].url);
            break;
          }
        if (
          "native" === r.method &&
          (null !== r.url && (a.src = r.url), "auto_plugin" !== b.mode)
        )
          return r;
      }
      if ("auto" === b.mode || "auto_plugin" === b.mode || "shim" === b.mode)
        for (f = 0; f < q.length; f++)
          for (k = q[f].type, g = 0; g < b.plugins.length; g++)
            for (
              l = b.plugins[g], m = mejs.plugins[l], h = 0;
              h < m.length;
              h++
            )
              if (
                ((n = m[h]),
                null == n.version ||
                  mejs.PluginDetector.hasPluginVersion(l, n.version))
              )
                for (i = 0; i < n.types.length; i++)
                  if (k.toLowerCase() == n.types[i].toLowerCase())
                    return (r.method = l), (r.url = q[f].url), r;
      return "auto_plugin" === b.mode && "native" === r.method
        ? r
        : ("" === r.method && q.length > 0 && (r.url = q[0].url), r);
    },
    formatType: function (a, b) {
      return a && !b
        ? this.getTypeFromFile(a)
        : b && ~b.indexOf(";")
        ? b.substr(0, b.indexOf(";"))
        : b;
    },
    getTypeFromFile: function (a) {
      a = a.split("?")[0];
      var b = a.substring(a.lastIndexOf(".") + 1).toLowerCase(),
        c = /(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(b)
          ? "video/"
          : "audio/";
      return this.getTypeFromExtension(b, c);
    },
    getTypeFromExtension: function (a, b) {
      switch (((b = b || ""), a)) {
        case "mp4":
        case "m4v":
        case "m4a":
        case "f4v":
        case "f4a":
          return b + "mp4";
        case "flv":
          return b + "x-flv";
        case "webm":
        case "webma":
        case "webmv":
          return b + "webm";
        case "ogg":
        case "oga":
        case "ogv":
          return b + "ogg";
        case "m3u8":
          return "application/x-mpegurl";
        case "ts":
          return b + "mp2t";
        default:
          return b + a;
      }
    },
    createErrorMessage: function (a, b, c) {
      var d = a.htmlMediaElement,
        e = document.createElement("div"),
        f = b.customError;
      e.className = "me-cannotplay";
      try {
        (e.style.width = d.width + "px"), (e.style.height = d.height + "px");
      } catch (g) {}
      f ||
        ((f = '<a href="' + a.url + '">'),
        "" !== c &&
          (f += '<img src="' + c + '" width="100%" height="100%" alt="" />'),
        (f += "<span>" + mejs.i18n.t("Download File") + "</span></a>")),
        (e.innerHTML = f),
        d.parentNode.insertBefore(e, d),
        (d.style.display = "none"),
        b.error(d);
    },
    createPlugin: function (a, b, c, d, e, f) {
      var g,
        h,
        i,
        j = a.htmlMediaElement,
        k = 1,
        l = 1,
        m = "me_" + a.method + "_" + mejs.meIndex++,
        n = new mejs.PluginMediaElement(m, a.method, a.url),
        o = document.createElement("div");
      n.tagName = j.tagName;
      for (var p = 0; p < j.attributes.length; p++) {
        var q = j.attributes[p];
        q.specified && n.setAttribute(q.name, q.value);
      }
      for (
        h = j.parentNode;
        null !== h &&
        null != h.tagName &&
        "body" !== h.tagName.toLowerCase() &&
        null != h.parentNode &&
        null != h.parentNode.tagName &&
        null != h.parentNode.constructor &&
        "ShadowRoot" === h.parentNode.constructor.name;

      ) {
        if ("p" === h.parentNode.tagName.toLowerCase()) {
          h.parentNode.parentNode.insertBefore(h, h.parentNode);
          break;
        }
        h = h.parentNode;
      }
      switch (
        (a.isVideo
          ? ((k =
              b.pluginWidth > 0
                ? b.pluginWidth
                : b.videoWidth > 0
                ? b.videoWidth
                : null !== j.getAttribute("width")
                ? j.getAttribute("width")
                : b.defaultVideoWidth),
            (l =
              b.pluginHeight > 0
                ? b.pluginHeight
                : b.videoHeight > 0
                ? b.videoHeight
                : null !== j.getAttribute("height")
                ? j.getAttribute("height")
                : b.defaultVideoHeight),
            (k = mejs.Utility.encodeUrl(k)),
            (l = mejs.Utility.encodeUrl(l)))
          : b.enablePluginDebug && ((k = 320), (l = 240)),
        (n.success = b.success),
        (o.className = "me-plugin"),
        (o.id = m + "_container"),
        a.isVideo
          ? j.parentNode.insertBefore(o, j)
          : document.body.insertBefore(o, document.body.childNodes[0]),
        ("flash" === a.method || "silverlight" === a.method) &&
          ((i = [
            "id=" + m,
            "isvideo=" + (a.isVideo ? "true" : "false"),
            "autoplay=" + (d ? "true" : "false"),
            "preload=" + e,
            "width=" + k,
            "startvolume=" + b.startVolume,
            "timerrate=" + b.timerRate,
            "flashstreamer=" + b.flashStreamer,
            "height=" + l,
            "pseudostreamstart=" + b.pseudoStreamingStartQueryParam,
          ]),
          null !== a.url &&
            ("flash" == a.method
              ? i.push("file=" + mejs.Utility.encodeUrl(a.url))
              : i.push("file=" + a.url)),
          b.enablePluginDebug && i.push("debug=true"),
          b.enablePluginSmoothing && i.push("smoothing=true"),
          b.enablePseudoStreaming && i.push("pseudostreaming=true"),
          f && i.push("controls=true"),
          b.pluginVars && (i = i.concat(b.pluginVars)),
          (window[m + "_init"] = function () {
            switch (n.pluginType) {
              case "flash":
                n.pluginElement = n.pluginApi = document.getElementById(m);
                break;
              case "silverlight":
                (n.pluginElement = document.getElementById(n.id)),
                  (n.pluginApi = n.pluginElement.Content.MediaElementJS);
            }
            null != n.pluginApi && n.success && n.success(n, j);
          }),
          (window[m + "_event"] = function (a, b) {
            var c, d, e;
            c = { type: a, target: n };
            for (d in b) (n[d] = b[d]), (c[d] = b[d]);
            (e = b.bufferedTime || 0),
              (c.target.buffered = c.buffered =
                {
                  start: function (a) {
                    return 0;
                  },
                  end: function (a) {
                    return e;
                  },
                  length: 1,
                }),
              n.dispatchEvent(c);
          })),
        a.method)
      ) {
        case "silverlight":
          o.innerHTML =
            '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' +
            m +
            '" name="' +
            m +
            '" width="' +
            k +
            '" height="' +
            l +
            '" class="mejs-shim"><param name="initParams" value="' +
            i.join(",") +
            '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' +
            b.pluginPath +
            b.silverlightName +
            '" /></object>';
          break;
        case "flash":
          mejs.MediaFeatures.isIE
            ? ((g = document.createElement("div")),
              o.appendChild(g),
              (g.outerHTML =
                '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' +
                m +
                '" width="' +
                k +
                '" height="' +
                l +
                '" class="mejs-shim"><param name="movie" value="' +
                b.pluginPath +
                b.flashName +
                "?" +
                new Date().getTime() +
                '" /><param name="flashvars" value="' +
                i.join("&amp;") +
                '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' +
                b.flashScriptAccess +
                '" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>'))
            : (o.innerHTML =
                '<embed id="' +
                m +
                '" name="' +
                m +
                '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="' +
                b.flashScriptAccess +
                '" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' +
                b.pluginPath +
                b.flashName +
                '" flashvars="' +
                i.join("&") +
                '" width="' +
                k +
                '" height="' +
                l +
                '" scale="default"class="mejs-shim"></embed>');
          break;
        case "youtube":
          var r;
          if (-1 != a.url.lastIndexOf("youtu.be"))
            (r = a.url.substr(a.url.lastIndexOf("/") + 1)),
              -1 != r.indexOf("?") && (r = r.substr(0, r.indexOf("?")));
          else {
            var s = a.url.match(/[?&]v=([^&#]+)|&|#|$/);
            s && (r = s[1]);
          }
          (youtubeSettings = {
            container: o,
            containerId: o.id,
            pluginMediaElement: n,
            pluginId: m,
            videoId: r,
            height: l,
            width: k,
            scheme: a.scheme,
          }),
            window.postMessage
              ? mejs.YouTubeApi.enqueueIframe(youtubeSettings)
              : mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) &&
                mejs.YouTubeApi.createFlash(youtubeSettings, b);
          break;
        case "vimeo":
          var t = m + "_player";
          if (
            ((n.vimeoid = a.url.substr(a.url.lastIndexOf("/") + 1)),
            (o.innerHTML =
              '<iframe src="' +
              a.scheme +
              "player.vimeo.com/video/" +
              n.vimeoid +
              "?api=1&portrait=0&byline=0&title=0&player_id=" +
              t +
              '" width="' +
              k +
              '" height="' +
              l +
              '" frameBorder="0" class="mejs-shim" id="' +
              t +
              '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
            "function" == typeof $f)
          ) {
            var u = $f(o.childNodes[0]),
              v = -1;
            u.addEvent("ready", function () {
              function a(a, b, c, d) {
                var e = { type: c, target: b };
                "timeupdate" == c &&
                  ((b.currentTime = e.currentTime = d.seconds),
                  (b.duration = e.duration = d.duration)),
                  b.dispatchEvent(e);
              }
              (u.playVideo = function () {
                u.api("play");
              }),
                (u.stopVideo = function () {
                  u.api("unload");
                }),
                (u.pauseVideo = function () {
                  u.api("pause");
                }),
                (u.seekTo = function (a) {
                  u.api("seekTo", a);
                }),
                (u.setVolume = function (a) {
                  u.api("setVolume", a);
                }),
                (u.setMuted = function (a) {
                  a
                    ? ((u.lastVolume = u.api("getVolume")),
                      u.api("setVolume", 0))
                    : (u.api("setVolume", u.lastVolume), delete u.lastVolume);
                }),
                (u.getPlayerState = function () {
                  return v;
                }),
                u.addEvent("play", function () {
                  (v = 1), a(u, n, "play"), a(u, n, "playing");
                }),
                u.addEvent("pause", function () {
                  (v = 2), a(u, n, "pause");
                }),
                u.addEvent("finish", function () {
                  (v = 0), a(u, n, "ended");
                }),
                u.addEvent("playProgress", function (b) {
                  a(u, n, "timeupdate", b);
                }),
                u.addEvent("seek", function (b) {
                  (v = 3), a(u, n, "seeked", b);
                }),
                u.addEvent("loadProgress", function (b) {
                  (v = 3), a(u, n, "progress", b);
                }),
                (n.pluginElement = o),
                (n.pluginApi = u),
                n.success(n, n.pluginElement);
            });
          } else
            console.warn("You need to include froogaloop for vimeo to work");
      }
      return (j.style.display = "none"), j.removeAttribute("autoplay"), n;
    },
    updateNative: function (a, b, c, d) {
      var e,
        f = a.htmlMediaElement;
      for (e in mejs.HtmlMediaElement) f[e] = mejs.HtmlMediaElement[e];
      return b.success(f, f), f;
    },
  }),
  (mejs.YouTubeApi = {
    isIframeStarted: !1,
    isIframeLoaded: !1,
    loadIframeApi: function (a) {
      if (!this.isIframeStarted) {
        var b = document.createElement("script");
        b.src = a.scheme + "www.youtube.com/player_api";
        var c = document.getElementsByTagName("script")[0];
        c.parentNode.insertBefore(b, c), (this.isIframeStarted = !0);
      }
    },
    iframeQueue: [],
    enqueueIframe: function (a) {
      this.isLoaded
        ? this.createIframe(a)
        : (this.loadIframeApi(a), this.iframeQueue.push(a));
    },
    createIframe: function (a) {
      var b = a.pluginMediaElement,
        c = new YT.Player(a.containerId, {
          height: a.height,
          width: a.width,
          videoId: a.videoId,
          playerVars: { controls: 0, wmode: "transparent" },
          events: {
            onReady: function () {
              (c.setVideoSize = function (a, b) {
                c.setSize(a, b);
              }),
                (a.pluginMediaElement.pluginApi = c),
                (a.pluginMediaElement.pluginElement = document.getElementById(
                  a.containerId
                )),
                b.success(b, b.pluginElement),
                setInterval(function () {
                  mejs.YouTubeApi.createEvent(c, b, "timeupdate");
                }, 250);
            },
            onStateChange: function (a) {
              mejs.YouTubeApi.handleStateChange(a.data, c, b);
            },
          },
        });
    },
    createEvent: function (a, b, c) {
      var d = { type: c, target: b };
      if (a && a.getDuration) {
        (b.currentTime = d.currentTime = a.getCurrentTime()),
          (b.duration = d.duration = a.getDuration()),
          (d.paused = b.paused),
          (d.ended = b.ended),
          (d.muted = a.isMuted()),
          (d.volume = a.getVolume() / 100),
          (d.bytesTotal = a.getVideoBytesTotal()),
          (d.bufferedBytes = a.getVideoBytesLoaded());
        var e = (d.bufferedBytes / d.bytesTotal) * d.duration;
        d.target.buffered = d.buffered = {
          start: function (a) {
            return 0;
          },
          end: function (a) {
            return e;
          },
          length: 1,
        };
      }
      b.dispatchEvent(d);
    },
    iFrameReady: function () {
      for (
        this.isLoaded = !0, this.isIframeLoaded = !0;
        this.iframeQueue.length > 0;

      ) {
        var a = this.iframeQueue.pop();
        this.createIframe(a);
      }
    },
    flashPlayers: {},
    createFlash: function (a) {
      this.flashPlayers[a.pluginId] = a;
      var b,
        c =
          a.scheme +
          "www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" +
          a.pluginId +
          "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
      mejs.MediaFeatures.isIE
        ? ((b = document.createElement("div")),
          a.container.appendChild(b),
          (b.outerHTML =
            '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' +
            a.scheme +
            'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' +
            a.pluginId +
            '" width="' +
            a.width +
            '" height="' +
            a.height +
            '" class="mejs-shim"><param name="movie" value="' +
            c +
            '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' +
            options.flashScriptAccess +
            '" /><param name="allowFullScreen" value="true" /></object>'))
        : (a.container.innerHTML =
            '<object type="application/x-shockwave-flash" id="' +
            a.pluginId +
            '" data="' +
            c +
            '" width="' +
            a.width +
            '" height="' +
            a.height +
            '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="' +
            options.flashScriptAccess +
            '"><param name="wmode" value="transparent"></object>');
    },
    flashReady: function (a) {
      var b = this.flashPlayers[a],
        c = document.getElementById(a),
        d = b.pluginMediaElement;
      (d.pluginApi = d.pluginElement = c),
        b.success(d, d.pluginElement),
        c.cueVideoById(b.videoId);
      var e = b.containerId + "_callback";
      (window[e] = function (a) {
        mejs.YouTubeApi.handleStateChange(a, c, d);
      }),
        c.addEventListener("onStateChange", e),
        setInterval(function () {
          mejs.YouTubeApi.createEvent(c, d, "timeupdate");
        }, 250),
        mejs.YouTubeApi.createEvent(c, d, "canplay");
    },
    handleStateChange: function (a, b, c) {
      switch (a) {
        case -1:
          (c.paused = !0),
            (c.ended = !0),
            mejs.YouTubeApi.createEvent(b, c, "loadedmetadata");
          break;
        case 0:
          (c.paused = !1),
            (c.ended = !0),
            mejs.YouTubeApi.createEvent(b, c, "ended");
          break;
        case 1:
          (c.paused = !1),
            (c.ended = !1),
            mejs.YouTubeApi.createEvent(b, c, "play"),
            mejs.YouTubeApi.createEvent(b, c, "playing");
          break;
        case 2:
          (c.paused = !0),
            (c.ended = !1),
            mejs.YouTubeApi.createEvent(b, c, "pause");
          break;
        case 3:
          mejs.YouTubeApi.createEvent(b, c, "progress");
          break;
        case 5:
      }
    },
  }),
  (window.onYouTubePlayerAPIReady = function () {
    mejs.YouTubeApi.iFrameReady();
  }),
  (window.onYouTubePlayerReady = function (a) {
    mejs.YouTubeApi.flashReady(a);
  }),
  (window.mejs = mejs),
  (window.MediaElement = mejs.MediaElement),
  (function (a, b, c) {
    "use strict";
    var d = {
      locale: {
        language: (b.i18n && b.i18n.locale.language) || "",
        strings: (b.i18n && b.i18n.locale.strings) || {},
      },
      ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
      methods: {},
    };
    (d.getLanguage = function () {
      var a =
        d.locale.language ||
        window.navigator.userLanguage ||
        window.navigator.language;
      return d.ietf_lang_regex.exec(a) ? a : null;
    }),
      "undefined" != typeof mejsL10n && (d.locale.language = mejsL10n.language),
      (d.methods.checkPlain = function (a) {
        var b,
          c,
          d = { "&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;" };
        a = String(a);
        for (b in d)
          d.hasOwnProperty(b) &&
            ((c = new RegExp(b, "g")), (a = a.replace(c, d[b])));
        return a;
      }),
      (d.methods.t = function (a, b) {
        return (
          d.locale.strings &&
            d.locale.strings[b.context] &&
            d.locale.strings[b.context][a] &&
            (a = d.locale.strings[b.context][a]),
          d.methods.checkPlain(a)
        );
      }),
      (d.t = function (a, b) {
        if ("string" == typeof a && a.length > 0) {
          var c = d.getLanguage();
          return (b = b || { context: c }), d.methods.t(a, b);
        }
        throw {
          name: "InvalidArgumentException",
          message: "First argument is either not a string or empty.",
        };
      }),
      (b.i18n = d);
  })(document, mejs),
  (function (a, b) {
    "use strict";
    "undefined" != typeof mejsL10n && (a[mejsL10n.language] = mejsL10n.strings);
  })(mejs.i18n.locale.strings),
  /*!
   *
   * MediaElementPlayer
   * http://mediaelementjs.com/
   *
   * Creates a controller bar for HTML5 <video> add <audio> tags
   * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
   *
   * Copyright 2010-2013, John Dyer (http://j.hn/)
   * License: MIT
   *
   */ "undefined" != typeof jQuery
    ? (mejs.$ = jQuery)
    : "undefined" != typeof Zepto
    ? ((mejs.$ = Zepto),
      (Zepto.fn.outerWidth = function (a) {
        var b = $(this).width();
        return (
          a &&
            ((b += parseInt($(this).css("margin-right"), 10)),
            (b += parseInt($(this).css("margin-left"), 10))),
          b
        );
      }))
    : "undefined" != typeof ender && (mejs.$ = ender),
  (function (a) {
    (mejs.MepDefaults = {
      poster: "",
      showPosterWhenEnded: !1,
      defaultVideoWidth: 480,
      defaultVideoHeight: 270,
      videoWidth: -1,
      videoHeight: -1,
      defaultAudioWidth: 400,
      defaultAudioHeight: 30,
      defaultSeekBackwardInterval: function (a) {
        return 0.05 * a.duration;
      },
      defaultSeekForwardInterval: function (a) {
        return 0.05 * a.duration;
      },
      setDimensions: !0,
      audioWidth: -1,
      audioHeight: -1,
      startVolume: 0.8,
      loop: !1,
      autoRewind: !0,
      enableAutosize: !0,
      timeFormat: "",
      alwaysShowHours: !1,
      showTimecodeFrameCount: !1,
      framesPerSecond: 25,
      autosizeProgress: !0,
      alwaysShowControls: !1,
      hideVideoControlsOnLoad: !1,
      clickToPlayPause: !0,
      iPadUseNativeControls: !1,
      iPhoneUseNativeControls: !1,
      AndroidUseNativeControls: !1,
      features: [
        "playpause",
        "current",
        "progress",
        "duration",
        "tracks",
        "volume",
        "fullscreen",
      ],
      isVideo: !0,
      stretching: "auto",
      enableKeyboard: !0,
      pauseOtherPlayers: !0,
      keyActions: [
        {
          keys: [32, 179],
          action: function (a, b) {
            b.paused || b.ended ? b.play() : b.pause();
          },
        },
        {
          keys: [38],
          action: function (a, b) {
            a.container.find(".mejs-volume-slider").css("display", "block"),
              a.isVideo && (a.showControls(), a.startControlsTimer());
            var c = Math.min(b.volume + 0.1, 1);
            b.setVolume(c);
          },
        },
        {
          keys: [40],
          action: function (a, b) {
            a.container.find(".mejs-volume-slider").css("display", "block"),
              a.isVideo && (a.showControls(), a.startControlsTimer());
            var c = Math.max(b.volume - 0.1, 0);
            b.setVolume(c);
          },
        },
        {
          keys: [37, 227],
          action: function (a, b) {
            if (!isNaN(b.duration) && b.duration > 0) {
              a.isVideo && (a.showControls(), a.startControlsTimer());
              var c = Math.max(
                b.currentTime - a.options.defaultSeekBackwardInterval(b),
                0
              );
              b.setCurrentTime(c);
            }
          },
        },
        {
          keys: [39, 228],
          action: function (a, b) {
            if (!isNaN(b.duration) && b.duration > 0) {
              a.isVideo && (a.showControls(), a.startControlsTimer());
              var c = Math.min(
                b.currentTime + a.options.defaultSeekForwardInterval(b),
                b.duration
              );
              b.setCurrentTime(c);
            }
          },
        },
        {
          keys: [70],
          action: function (a, b) {
            "undefined" != typeof a.enterFullScreen &&
              (a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen());
          },
        },
        {
          keys: [77],
          action: function (a, b) {
            a.container.find(".mejs-volume-slider").css("display", "block"),
              a.isVideo && (a.showControls(), a.startControlsTimer()),
              a.media.muted ? a.setMuted(!1) : a.setMuted(!0);
          },
        },
      ],
    }),
      (mejs.mepIndex = 0),
      (mejs.players = {}),
      (mejs.MediaElementPlayer = function (b, c) {
        if (!(this instanceof mejs.MediaElementPlayer))
          return new mejs.MediaElementPlayer(b, c);
        var d = this;
        return (
          (d.$media = d.$node = a(b)),
          (d.node = d.media = d.$media[0]),
          d.node
            ? "undefined" != typeof d.node.player
              ? d.node.player
              : ("undefined" == typeof c && (c = d.$node.data("mejsoptions")),
                (d.options = a.extend({}, mejs.MepDefaults, c)),
                d.options.timeFormat ||
                  ((d.options.timeFormat = "mm:ss"),
                  d.options.alwaysShowHours &&
                    (d.options.timeFormat = "hh:mm:ss"),
                  d.options.showTimecodeFrameCount &&
                    (d.options.timeFormat += ":ff")),
                mejs.Utility.calculateTimeFormat(
                  0,
                  d.options,
                  d.options.framesPerSecond || 25
                ),
                (d.id = "mep_" + mejs.mepIndex++),
                (mejs.players[d.id] = d),
                d.init(),
                d)
            : void 0
        );
      }),
      (mejs.MediaElementPlayer.prototype = {
        hasFocus: !1,
        controlsAreVisible: !0,
        init: function () {
          var b = this,
            c = mejs.MediaFeatures,
            d = a.extend(!0, {}, b.options, {
              success: function (a, c) {
                b.meReady(a, c);
              },
              error: function (a) {
                b.handleError(a);
              },
            }),
            e = b.media.tagName.toLowerCase();
          if (
            ((b.isDynamic = "audio" !== e && "video" !== e),
            b.isDynamic
              ? (b.isVideo = b.options.isVideo)
              : (b.isVideo = "audio" !== e && b.options.isVideo),
            (c.isiPad && b.options.iPadUseNativeControls) ||
              (c.isiPhone && b.options.iPhoneUseNativeControls))
          )
            b.$media.attr("controls", "controls"),
              c.isiPad && null !== b.media.getAttribute("autoplay") && b.play();
          else if (c.isAndroid && b.options.AndroidUseNativeControls);
          else {
            b.$media.removeAttr("controls");
            var f = b.isVideo
              ? mejs.i18n.t("Video Player")
              : mejs.i18n.t("Audio Player");
            a('<span class="mejs-offscreen">' + f + "</span>").insertBefore(
              b.$media
            ),
              (b.container = a(
                '<div id="' +
                  b.id +
                  '" class="mejs-container ' +
                  (mejs.MediaFeatures.svgAsImg ? "svg" : "no-svg") +
                  '" tabindex="0" role="application" aria-label="' +
                  f +
                  '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>'
              )
                .addClass(b.$media[0].className)
                .insertBefore(b.$media)
                .focus(function (a) {
                  if (
                    !b.controlsAreVisible &&
                    !b.hasFocus &&
                    (b.showControls(!0), !b.hasMsNativeFullScreen)
                  ) {
                    var c = b.container.find(".mejs-playpause-button > button");
                    c.focus();
                  }
                })),
              "fill" !== b.options.stretching ||
                b.container.parent("mejs-fill-container").length ||
                ((b.outerContainer = b.$media.parent()),
                b.container.wrap('<div class="mejs-fill-container"/>')),
              b.container.addClass(
                (c.isAndroid ? "mejs-android " : "") +
                  (c.isiOS ? "mejs-ios " : "") +
                  (c.isiPad ? "mejs-ipad " : "") +
                  (c.isiPhone ? "mejs-iphone " : "") +
                  (b.isVideo ? "mejs-video " : "mejs-audio ")
              ),
              b.container.find(".mejs-mediaelement").append(b.$media),
              (b.node.player = b),
              (b.controls = b.container.find(".mejs-controls")),
              (b.layers = b.container.find(".mejs-layers"));
            var g = b.isVideo ? "video" : "audio",
              h = g.substring(0, 1).toUpperCase() + g.substring(1);
            b.options[g + "Width"] > 0 ||
            b.options[g + "Width"].toString().indexOf("%") > -1
              ? (b.width = b.options[g + "Width"])
              : "" !== b.media.style.width && null !== b.media.style.width
              ? (b.width = b.media.style.width)
              : null !== b.media.getAttribute("width")
              ? (b.width = b.$media.attr("width"))
              : (b.width = b.options["default" + h + "Width"]),
              b.options[g + "Height"] > 0 ||
              b.options[g + "Height"].toString().indexOf("%") > -1
                ? (b.height = b.options[g + "Height"])
                : "" !== b.media.style.height && null !== b.media.style.height
                ? (b.height = b.media.style.height)
                : null !== b.$media[0].getAttribute("height")
                ? (b.height = b.$media.attr("height"))
                : (b.height = b.options["default" + h + "Height"]),
              b.setPlayerSize(b.width, b.height),
              (d.pluginWidth = b.width),
              (d.pluginHeight = b.height);
          }
          mejs.MediaElement(b.$media[0], d),
            "undefined" != typeof b.container &&
              b.controlsAreVisible &&
              b.container.trigger("controlsshown");
        },
        showControls: function (a) {
          var b = this;
          (a = "undefined" == typeof a || a),
            b.controlsAreVisible ||
              (a
                ? (b.controls
                    .removeClass("mejs-offscreen")
                    .stop(!0, !0)
                    .fadeIn(200, function () {
                      (b.controlsAreVisible = !0),
                        b.container.trigger("controlsshown");
                    }),
                  b.container
                    .find(".mejs-control")
                    .removeClass("mejs-offscreen")
                    .stop(!0, !0)
                    .fadeIn(200, function () {
                      b.controlsAreVisible = !0;
                    }))
                : (b.controls
                    .removeClass("mejs-offscreen")
                    .css("display", "block"),
                  b.container
                    .find(".mejs-control")
                    .removeClass("mejs-offscreen")
                    .css("display", "block"),
                  (b.controlsAreVisible = !0),
                  b.container.trigger("controlsshown")),
              b.setControlsSize());
        },
        hideControls: function (b) {
          var c = this;
          (b = "undefined" == typeof b || b),
            !c.controlsAreVisible ||
              c.options.alwaysShowControls ||
              c.keyboardAction ||
              (b
                ? (c.controls.stop(!0, !0).fadeOut(200, function () {
                    a(this).addClass("mejs-offscreen").css("display", "block"),
                      (c.controlsAreVisible = !1),
                      c.container.trigger("controlshidden");
                  }),
                  c.container
                    .find(".mejs-control")
                    .stop(!0, !0)
                    .fadeOut(200, function () {
                      a(this)
                        .addClass("mejs-offscreen")
                        .css("display", "block");
                    }))
                : (c.controls
                    .addClass("mejs-offscreen")
                    .css("display", "block"),
                  c.container
                    .find(".mejs-control")
                    .addClass("mejs-offscreen")
                    .css("display", "block"),
                  (c.controlsAreVisible = !1),
                  c.container.trigger("controlshidden")));
        },
        controlsTimer: null,
        startControlsTimer: function (a) {
          var b = this;
          (a = "undefined" != typeof a ? a : 1500),
            b.killControlsTimer("start"),
            (b.controlsTimer = setTimeout(function () {
              b.hideControls(), b.killControlsTimer("hide");
            }, a));
        },
        killControlsTimer: function (a) {
          var b = this;
          null !== b.controlsTimer &&
            (clearTimeout(b.controlsTimer),
            delete b.controlsTimer,
            (b.controlsTimer = null));
        },
        controlsEnabled: !0,
        disableControls: function () {
          var a = this;
          a.killControlsTimer(),
            a.hideControls(!1),
            (this.controlsEnabled = !1);
        },
        enableControls: function () {
          var a = this;
          a.showControls(!1), (a.controlsEnabled = !0);
        },
        meReady: function (b, c) {
          var d,
            e,
            f = this,
            g = mejs.MediaFeatures,
            h = c.getAttribute("autoplay"),
            i = !("undefined" == typeof h || null === h || "false" === h);
          if (!f.created) {
            if (
              ((f.created = !0),
              (f.media = b),
              (f.domNode = c),
              !(
                (g.isAndroid && f.options.AndroidUseNativeControls) ||
                (g.isiPad && f.options.iPadUseNativeControls) ||
                (g.isiPhone && f.options.iPhoneUseNativeControls)
              ))
            ) {
              f.buildposter(f, f.controls, f.layers, f.media),
                f.buildkeyboard(f, f.controls, f.layers, f.media),
                f.buildoverlays(f, f.controls, f.layers, f.media),
                f.findTracks();
              for (d in f.options.features)
                if (((e = f.options.features[d]), f["build" + e]))
                  try {
                    f["build" + e](f, f.controls, f.layers, f.media);
                  } catch (j) {}
              f.container.trigger("controlsready"),
                f.setPlayerSize(f.width, f.height),
                f.setControlsSize(),
                f.isVideo &&
                  (mejs.MediaFeatures.hasTouch
                    ? f.$media.bind("touchstart", function () {
                        f.controlsAreVisible
                          ? f.hideControls(!1)
                          : f.controlsEnabled && f.showControls(!1);
                      })
                    : ((f.clickToPlayPauseCallback = function () {
                        f.options.clickToPlayPause &&
                          (f.media.paused ? f.play() : f.pause());
                      }),
                      f.media.addEventListener(
                        "click",
                        f.clickToPlayPauseCallback,
                        !1
                      ),
                      f.container
                        .bind("mouseenter", function () {
                          f.controlsEnabled &&
                            (f.options.alwaysShowControls ||
                              (f.killControlsTimer("enter"),
                              f.showControls(),
                              f.startControlsTimer(2500)));
                        })
                        .bind("mousemove", function () {
                          f.controlsEnabled &&
                            (f.controlsAreVisible || f.showControls(),
                            f.options.alwaysShowControls ||
                              f.startControlsTimer(2500));
                        })
                        .bind("mouseleave", function () {
                          f.controlsEnabled &&
                            (f.media.paused ||
                              f.options.alwaysShowControls ||
                              f.startControlsTimer(1e3));
                        })),
                  f.options.hideVideoControlsOnLoad && f.hideControls(!1),
                  i && !f.options.alwaysShowControls && f.hideControls(),
                  f.options.enableAutosize &&
                    f.media.addEventListener(
                      "loadedmetadata",
                      function (a) {
                        f.options.videoHeight <= 0 &&
                          null === f.domNode.getAttribute("height") &&
                          !isNaN(a.target.videoHeight) &&
                          (f.setPlayerSize(
                            a.target.videoWidth,
                            a.target.videoHeight
                          ),
                          f.setControlsSize(),
                          f.media.setVideoSize(
                            a.target.videoWidth,
                            a.target.videoHeight
                          ));
                      },
                      !1
                    )),
                f.media.addEventListener(
                  "play",
                  function () {
                    var a;
                    for (a in mejs.players) {
                      var b = mejs.players[a];
                      b.id == f.id ||
                        !f.options.pauseOtherPlayers ||
                        b.paused ||
                        b.ended ||
                        b.pause(),
                        (b.hasFocus = !1);
                    }
                    f.hasFocus = !0;
                  },
                  !1
                ),
                f.media.addEventListener(
                  "ended",
                  function (b) {
                    if (f.options.autoRewind)
                      try {
                        f.media.setCurrentTime(0),
                          window.setTimeout(function () {
                            a(f.container)
                              .find(".mejs-overlay-loading")
                              .parent()
                              .hide();
                          }, 20);
                      } catch (c) {}
                    f.media.pause(),
                      f.setProgressRail && f.setProgressRail(),
                      f.setCurrentRail && f.setCurrentRail(),
                      f.options.loop
                        ? f.play()
                        : !f.options.alwaysShowControls &&
                          f.controlsEnabled &&
                          f.showControls();
                  },
                  !1
                ),
                f.media.addEventListener(
                  "loadedmetadata",
                  function (a) {
                    f.updateDuration && f.updateDuration(),
                      f.updateCurrent && f.updateCurrent(),
                      f.isFullScreen ||
                        (f.setPlayerSize(f.width, f.height),
                        f.setControlsSize());
                  },
                  !1
                );
              var k = null;
              f.media.addEventListener(
                "timeupdate",
                function () {
                  k !== this.duration &&
                    ((k = this.duration),
                    mejs.Utility.calculateTimeFormat(
                      k,
                      f.options,
                      f.options.framesPerSecond || 25
                    ),
                    f.updateDuration && f.updateDuration(),
                    f.updateCurrent && f.updateCurrent(),
                    f.setControlsSize());
                },
                !1
              ),
                f.container.focusout(function (b) {
                  if (b.relatedTarget) {
                    var c = a(b.relatedTarget);
                    f.keyboardAction &&
                      0 === c.parents(".mejs-container").length &&
                      ((f.keyboardAction = !1), f.hideControls(!0));
                  }
                }),
                setTimeout(function () {
                  f.setPlayerSize(f.width, f.height), f.setControlsSize();
                }, 50),
                f.globalBind("resize", function () {
                  f.isFullScreen ||
                    (mejs.MediaFeatures.hasTrueNativeFullScreen &&
                      document.webkitIsFullScreen) ||
                    f.setPlayerSize(f.width, f.height),
                    f.setControlsSize();
                }),
                "youtube" == f.media.pluginType &&
                  (g.isiOS || g.isAndroid) &&
                  (f.container.find(".mejs-overlay-play").hide(),
                  f.container.find(".mejs-poster").hide());
            }
            i && "native" == b.pluginType && f.play(),
              f.options.success &&
                ("string" == typeof f.options.success
                  ? window[f.options.success](f.media, f.domNode, f)
                  : f.options.success(f.media, f.domNode, f));
          }
        },
        handleError: function (a) {
          var b = this;
          b.controls && b.controls.hide(),
            b.options.error && b.options.error(a);
        },
        setPlayerSize: function (a, b) {
          var c = this;
          if (!c.options.setDimensions) return !1;
          switch (
            ("undefined" != typeof a && (c.width = a),
            "undefined" != typeof b && (c.height = b),
            c.options.stretching)
          ) {
            case "fill":
              c.isVideo
                ? this.setFillMode()
                : this.setDimensions(c.width, c.height);
              break;
            case "responsive":
              this.setResponsiveMode();
              break;
            case "none":
              this.setDimensions(c.width, c.height);
              break;
            default:
              this.hasFluidMode() === !0
                ? this.setResponsiveMode()
                : this.setDimensions(c.width, c.height);
          }
        },
        hasFluidMode: function () {
          var a = this;
          return (
            a.height.toString().indexOf("%") > 0 ||
            ("none" !== a.$node.css("max-width") &&
              "t.width" !== a.$node.css("max-width")) ||
            (a.$node[0].currentStyle &&
              "100%" === a.$node[0].currentStyle.maxWidth)
          );
        },
        setResponsiveMode: function () {
          var b = this,
            c = (function () {
              return b.isVideo
                ? b.media.videoWidth && b.media.videoWidth > 0
                  ? b.media.videoWidth
                  : null !== b.media.getAttribute("width")
                  ? b.media.getAttribute("width")
                  : b.options.defaultVideoWidth
                : b.options.defaultAudioWidth;
            })(),
            d = (function () {
              return b.isVideo
                ? b.media.videoHeight && b.media.videoHeight > 0
                  ? b.media.videoHeight
                  : null !== b.media.getAttribute("height")
                  ? b.media.getAttribute("height")
                  : b.options.defaultVideoHeight
                : b.options.defaultAudioHeight;
            })(),
            e = b.container.parent().closest(":visible").width(),
            f = b.container.parent().closest(":visible").height(),
            g =
              b.isVideo || !b.options.autosizeProgress
                ? parseInt((e * d) / c, 10)
                : d;
          (isNaN(g) || (0 !== f && g > f && f > d)) && (g = f),
            b.container.parent().length > 0 &&
              "body" === b.container.parent()[0].tagName.toLowerCase() &&
              ((e = a(window).width()), (g = a(window).height())),
            g &&
              e &&
              (b.container.width(e).height(g),
              b.$media
                .add(b.container.find(".mejs-shim"))
                .width("100%")
                .height("100%"),
              b.isVideo && b.media.setVideoSize && b.media.setVideoSize(e, g),
              b.layers.children(".mejs-layer").width("100%").height("100%"));
        },
        setFillMode: function () {
          var a = this,
            b = a.outerContainer;
          b.width() || b.height(a.$media.width()),
            b.height() || b.height(a.$media.height());
          var c = b.width(),
            d = b.height();
          a.setDimensions("100%", "100%"),
            a.container.find(".mejs-poster img").css("display", "block"),
            (targetElement = a.container.find("object, embed, iframe, video"));
          var e = a.height,
            f = a.width,
            g = c,
            h = (e * c) / f,
            i = (f * d) / e,
            j = d,
            k = !(i > c),
            l = k ? Math.floor(g) : Math.floor(i),
            m = k ? Math.floor(h) : Math.floor(j);
          k
            ? (targetElement.height(m).width(c),
              a.media.setVideoSize && a.media.setVideoSize(c, m))
            : (targetElement.height(d).width(l),
              a.media.setVideoSize && a.media.setVideoSize(l, d)),
            targetElement.css({
              "margin-left": Math.floor((c - l) / 2),
              "margin-top": 0,
            });
        },
        setDimensions: function (a, b) {
          var c = this;
          c.container.width(a).height(b),
            c.layers.children(".mejs-layer").width(a).height(b);
        },
        setControlsSize: function () {
          var b = this,
            c = 0,
            d = 0,
            e = b.controls.find(".mejs-time-rail"),
            f = b.controls.find(".mejs-time-total"),
            g = e.siblings(),
            h = g.last(),
            i = null;
          if (b.container.is(":visible") && e.length && e.is(":visible")) {
            b.options &&
              !b.options.autosizeProgress &&
              (d = parseInt(e.css("width"), 10)),
              (0 !== d && d) ||
                (g.each(function () {
                  var b = a(this);
                  "absolute" != b.css("position") &&
                    b.is(":visible") &&
                    (c += a(this).outerWidth(!0));
                }),
                (d = b.controls.width() - c - (e.outerWidth(!0) - e.width())));
            do
              e.width(d),
                f.width(d - (f.outerWidth(!0) - f.width())),
                "absolute" != h.css("position") &&
                  ((i = h.length ? h.position() : null), d--);
            while (null !== i && i.top.toFixed(2) > 0 && d > 0);
            b.container.trigger("controlsresize");
          }
        },
        buildposter: function (b, c, d, e) {
          var f = this,
            g = a('<div class="mejs-poster mejs-layer"></div>').appendTo(d),
            h = b.$media.attr("poster");
          "" !== b.options.poster && (h = b.options.poster),
            h ? f.setPoster(h) : g.hide(),
            e.addEventListener(
              "play",
              function () {
                g.hide();
              },
              !1
            ),
            b.options.showPosterWhenEnded &&
              b.options.autoRewind &&
              e.addEventListener(
                "ended",
                function () {
                  g.show();
                },
                !1
              );
        },
        setPoster: function (b) {
          var c = this,
            d = c.container.find(".mejs-poster"),
            e = d.find("img");
          0 === e.length &&
            (e = a('<img width="100%" height="100%" alt="" />').appendTo(d)),
            e.attr("src", b),
            d.css({ "background-image": "url(" + b + ")" });
        },
        buildoverlays: function (b, c, d, e) {
          var f = this;
          if (b.isVideo) {
            var g = a(
                '<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>'
              )
                .hide()
                .appendTo(d),
              h = a(
                '<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>'
              )
                .hide()
                .appendTo(d),
              i = a(
                '<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>'
              )
                .appendTo(d)
                .bind("click", function () {
                  f.options.clickToPlayPause && e.paused && e.play();
                });
            e.addEventListener(
              "play",
              function () {
                i.hide(),
                  g.hide(),
                  c.find(".mejs-time-buffering").hide(),
                  h.hide();
              },
              !1
            ),
              e.addEventListener(
                "playing",
                function () {
                  i.hide(),
                    g.hide(),
                    c.find(".mejs-time-buffering").hide(),
                    h.hide();
                },
                !1
              ),
              e.addEventListener(
                "seeking",
                function () {
                  g.show(), c.find(".mejs-time-buffering").show();
                },
                !1
              ),
              e.addEventListener(
                "seeked",
                function () {
                  g.hide(), c.find(".mejs-time-buffering").hide();
                },
                !1
              ),
              e.addEventListener(
                "pause",
                function () {
                  mejs.MediaFeatures.isiPhone || i.show();
                },
                !1
              ),
              e.addEventListener(
                "waiting",
                function () {
                  g.show(), c.find(".mejs-time-buffering").show();
                },
                !1
              ),
              e.addEventListener(
                "loadeddata",
                function () {
                  g.show(),
                    c.find(".mejs-time-buffering").show(),
                    mejs.MediaFeatures.isAndroid &&
                      (e.canplayTimeout = window.setTimeout(function () {
                        if (document.createEvent) {
                          var a = document.createEvent("HTMLEvents");
                          return (
                            a.initEvent("canplay", !0, !0), e.dispatchEvent(a)
                          );
                        }
                      }, 300));
                },
                !1
              ),
              e.addEventListener(
                "canplay",
                function () {
                  g.hide(),
                    c.find(".mejs-time-buffering").hide(),
                    clearTimeout(e.canplayTimeout);
                },
                !1
              ),
              e.addEventListener(
                "error",
                function (a) {
                  f.handleError(a),
                    g.hide(),
                    i.hide(),
                    h.show(),
                    h
                      .find(".mejs-overlay-error")
                      .html("Error loading this resource");
                },
                !1
              ),
              e.addEventListener(
                "keydown",
                function (a) {
                  f.onkeydown(b, e, a);
                },
                !1
              );
          }
        },
        buildkeyboard: function (b, c, d, e) {
          var f = this;
          f.container.keydown(function () {
            f.keyboardAction = !0;
          }),
            f.globalBind("keydown", function (c) {
              return (
                (b.hasFocus =
                  0 !== a(c.target).closest(".mejs-container").length &&
                  a(c.target).closest(".mejs-container").attr("id") ===
                    b.$media.closest(".mejs-container").attr("id")),
                f.onkeydown(b, e, c)
              );
            }),
            f.globalBind("click", function (c) {
              b.hasFocus = 0 !== a(c.target).closest(".mejs-container").length;
            });
        },
        onkeydown: function (a, b, c) {
          if (a.hasFocus && a.options.enableKeyboard)
            for (var d = 0, e = a.options.keyActions.length; e > d; d++)
              for (
                var f = a.options.keyActions[d], g = 0, h = f.keys.length;
                h > g;
                g++
              )
                if (c.keyCode == f.keys[g])
                  return (
                    "function" == typeof c.preventDefault && c.preventDefault(),
                    f.action(a, b, c.keyCode, c),
                    !1
                  );
          return !0;
        },
        findTracks: function () {
          var b = this,
            c = b.$media.find("track");
          (b.tracks = []),
            c.each(function (c, d) {
              (d = a(d)),
                b.tracks.push({
                  srclang: d.attr("srclang")
                    ? d.attr("srclang").toLowerCase()
                    : "",
                  src: d.attr("src"),
                  kind: d.attr("kind"),
                  label: d.attr("label") || "",
                  entries: [],
                  isLoaded: !1,
                });
            });
        },
        changeSkin: function (a) {
          (this.container[0].className = "mejs-container " + a),
            this.setPlayerSize(this.width, this.height),
            this.setControlsSize();
        },
        play: function () {
          this.load(), this.media.play();
        },
        pause: function () {
          try {
            this.media.pause();
          } catch (a) {}
        },
        load: function () {
          this.isLoaded || this.media.load(), (this.isLoaded = !0);
        },
        setMuted: function (a) {
          this.media.setMuted(a);
        },
        setCurrentTime: function (a) {
          this.media.setCurrentTime(a);
        },
        getCurrentTime: function () {
          return this.media.currentTime;
        },
        setVolume: function (a) {
          this.media.setVolume(a);
        },
        getVolume: function () {
          return this.media.volume;
        },
        setSrc: function (a) {
          this.media.setSrc(a);
        },
        remove: function () {
          var a,
            b,
            c = this;
          c.container.prev(".mejs-offscreen").remove();
          for (a in c.options.features)
            if (((b = c.options.features[a]), c["clean" + b]))
              try {
                c["clean" + b](c);
              } catch (d) {}
          c.isDynamic
            ? c.$node.insertBefore(c.container)
            : (c.$media.prop("controls", !0),
              c.$node.clone().insertBefore(c.container).show(),
              c.$node.remove()),
            "native" !== c.media.pluginType && c.media.remove(),
            delete mejs.players[c.id],
            "object" == typeof c.container && c.container.remove(),
            c.globalUnbind(),
            delete c.node.player;
        },
        rebuildtracks: function () {
          var a = this;
          a.findTracks(), a.buildtracks(a, a.controls, a.layers, a.media);
        },
        resetSize: function () {
          var a = this;
          setTimeout(function () {
            a.setPlayerSize(a.width, a.height), a.setControlsSize();
          }, 50);
        },
      }),
      (function () {
        function b(b, d) {
          var e = { d: [], w: [] };
          return (
            a.each((b || "").split(" "), function (a, b) {
              var f = b + "." + d;
              0 === f.indexOf(".")
                ? (e.d.push(f), e.w.push(f))
                : e[c.test(b) ? "w" : "d"].push(f);
            }),
            (e.d = e.d.join(" ")),
            (e.w = e.w.join(" ")),
            e
          );
        }
        var c =
          /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
        (mejs.MediaElementPlayer.prototype.globalBind = function (c, d, e) {
          var f = this,
            g = f.node ? f.node.ownerDocument : document;
          (c = b(c, f.id)),
            c.d && a(g).bind(c.d, d, e),
            c.w && a(window).bind(c.w, d, e);
        }),
          (mejs.MediaElementPlayer.prototype.globalUnbind = function (c, d) {
            var e = this,
              f = e.node ? e.node.ownerDocument : document;
            (c = b(c, e.id)),
              c.d && a(f).unbind(c.d, d),
              c.w && a(window).unbind(c.w, d);
          });
      })(),
      "undefined" != typeof a &&
        ((a.fn.mediaelementplayer = function (b) {
          return (
            b === !1
              ? this.each(function () {
                  var b = a(this).data("mediaelementplayer");
                  b && b.remove(), a(this).removeData("mediaelementplayer");
                })
              : this.each(function () {
                  a(this).data(
                    "mediaelementplayer",
                    new mejs.MediaElementPlayer(this, b)
                  );
                }),
            this
          );
        }),
        a(document).ready(function () {
          a(".mejs-player").mediaelementplayer();
        })),
      (window.MediaElementPlayer = mejs.MediaElementPlayer);
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, {
      playText: mejs.i18n.t("Play"),
      pauseText: mejs.i18n.t("Pause"),
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildplaypause: function (b, c, d, e) {
          function f(a) {
            "play" === a
              ? (i.removeClass("mejs-play").addClass("mejs-pause"),
                j.attr({ title: h.pauseText, "aria-label": h.pauseText }))
              : (i.removeClass("mejs-pause").addClass("mejs-play"),
                j.attr({ title: h.playText, "aria-label": h.playText }));
          }
          var g = this,
            h = g.options,
            i = a(
              '<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' +
                g.id +
                '" title="' +
                h.playText +
                '" aria-label="' +
                h.playText +
                '"></button></div>'
            )
              .appendTo(c)
              .click(function (a) {
                return a.preventDefault(), e.paused ? e.play() : e.pause(), !1;
              }),
            j = i.find("button");
          f("pse"),
            e.addEventListener(
              "play",
              function () {
                f("play");
              },
              !1
            ),
            e.addEventListener(
              "playing",
              function () {
                f("play");
              },
              !1
            ),
            e.addEventListener(
              "pause",
              function () {
                f("pse");
              },
              !1
            ),
            e.addEventListener(
              "paused",
              function () {
                f("pse");
              },
              !1
            );
        },
      });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, { stopText: "Stop" }),
      a.extend(MediaElementPlayer.prototype, {
        buildstop: function (b, c, d, e) {
          var f = this;
          a(
            '<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' +
              f.id +
              '" title="' +
              f.options.stopText +
              '" aria-label="' +
              f.options.stopText +
              '"></button></div>'
          )
            .appendTo(c)
            .click(function () {
              e.paused || e.pause(),
                e.currentTime > 0 &&
                  (e.setCurrentTime(0),
                  e.pause(),
                  c.find(".mejs-time-current").width("0px"),
                  c.find(".mejs-time-handle").css("left", "0px"),
                  c
                    .find(".mejs-time-float-current")
                    .html(mejs.Utility.secondsToTimeCode(0, b.options)),
                  c
                    .find(".mejs-currenttime")
                    .html(mejs.Utility.secondsToTimeCode(0, b.options)),
                  d.find(".mejs-poster").show());
            });
        },
      });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, {
      progessHelpText: mejs.i18n.t(
        "Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds."
      ),
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildprogress: function (b, c, d, e) {
          a(
            '<div class="mejs-time-rail"><span  class="mejs-time-total mejs-time-slider"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>'
          ).appendTo(c),
            c.find(".mejs-time-buffering").hide();
          var f = this,
            g = c.find(".mejs-time-total"),
            h = c.find(".mejs-time-loaded"),
            i = c.find(".mejs-time-current"),
            j = c.find(".mejs-time-handle"),
            k = c.find(".mejs-time-float"),
            l = c.find(".mejs-time-float-current"),
            m = c.find(".mejs-time-slider"),
            n = function (a) {
              var c,
                d = g.offset(),
                f = g.width(),
                h = 0,
                i = 0,
                j = 0;
              (c =
                a.originalEvent && a.originalEvent.changedTouches
                  ? a.originalEvent.changedTouches[0].pageX
                  : a.changedTouches
                  ? a.changedTouches[0].pageX
                  : a.pageX),
                e.duration &&
                  (c < d.left
                    ? (c = d.left)
                    : c > f + d.left && (c = f + d.left),
                  (j = c - d.left),
                  (h = j / f),
                  (i = 0.02 >= h ? 0 : h * e.duration),
                  o && i !== e.currentTime && e.setCurrentTime(i),
                  mejs.MediaFeatures.hasTouch ||
                    (k.css("left", j),
                    l.html(mejs.Utility.secondsToTimeCode(i, b.options)),
                    k.show()));
            },
            o = !1,
            p = !1,
            q = 0,
            r = !1,
            s = b.options.autoRewind,
            t = function (a) {
              var c = e.currentTime,
                d = mejs.i18n.t("Time Slider"),
                f = mejs.Utility.secondsToTimeCode(c, b.options),
                g = e.duration;
              m.attr({
                "aria-label": d,
                "aria-valuemin": 0,
                "aria-valuemax": g,
                "aria-valuenow": c,
                "aria-valuetext": f,
                role: "slider",
                tabindex: 0,
              });
            },
            u = function () {
              var a = new Date();
              a - q >= 1e3 && e.play();
            };
          m.bind("focus", function (a) {
            b.options.autoRewind = !1;
          }),
            m.bind("blur", function (a) {
              b.options.autoRewind = s;
            }),
            m.bind("keydown", function (a) {
              new Date() - q >= 1e3 && (r = e.paused);
              var c = a.keyCode,
                d = e.duration,
                f = e.currentTime,
                g = b.options.defaultSeekForwardInterval(d),
                h = b.options.defaultSeekBackwardInterval(d);
              switch (c) {
                case 37:
                case 40:
                  f -= h;
                  break;
                case 39:
                case 38:
                  f += g;
                  break;
                case 36:
                  f = 0;
                  break;
                case 35:
                  f = d;
                  break;
                case 32:
                case 13:
                  return void (e.paused ? e.play() : e.pause());
                default:
                  return;
              }
              return (
                (f = 0 > f ? 0 : f >= d ? d : Math.floor(f)),
                (q = new Date()),
                r || e.pause(),
                f < e.duration && !r && setTimeout(u, 1100),
                e.setCurrentTime(f),
                a.preventDefault(),
                a.stopPropagation(),
                !1
              );
            }),
            g
              .bind("mousedown touchstart", function (a) {
                (1 === a.which || 0 === a.which) &&
                  ((o = !0),
                  n(a),
                  f.globalBind("mousemove.dur touchmove.dur", function (a) {
                    n(a);
                  }),
                  f.globalBind("mouseup.dur touchend.dur", function (a) {
                    (o = !1), k.hide(), f.globalUnbind(".dur");
                  }));
              })
              .bind("mouseenter", function (a) {
                (p = !0),
                  f.globalBind("mousemove.dur", function (a) {
                    n(a);
                  }),
                  mejs.MediaFeatures.hasTouch || k.show();
              })
              .bind("mouseleave", function (a) {
                (p = !1), o || (f.globalUnbind(".dur"), k.hide());
              }),
            e.addEventListener(
              "progress",
              function (a) {
                b.setProgressRail(a), b.setCurrentRail(a);
              },
              !1
            ),
            e.addEventListener(
              "timeupdate",
              function (a) {
                b.setProgressRail(a), b.setCurrentRail(a), t(a);
              },
              !1
            ),
            f.container.on("controlsresize", function () {
              b.setProgressRail(), b.setCurrentRail();
            }),
            (f.loaded = h),
            (f.total = g),
            (f.current = i),
            (f.handle = j);
        },
        setProgressRail: function (a) {
          var b = this,
            c = void 0 !== a ? a.target : b.media,
            d = null;
          c &&
          c.buffered &&
          c.buffered.length > 0 &&
          c.buffered.end &&
          c.duration
            ? (d = c.buffered.end(c.buffered.length - 1) / c.duration)
            : c &&
              void 0 !== c.bytesTotal &&
              c.bytesTotal > 0 &&
              void 0 !== c.bufferedBytes
            ? (d = c.bufferedBytes / c.bytesTotal)
            : a &&
              a.lengthComputable &&
              0 !== a.total &&
              (d = a.loaded / a.total),
            null !== d &&
              ((d = Math.min(1, Math.max(0, d))),
              b.loaded && b.total && b.loaded.width(b.total.width() * d));
        },
        setCurrentRail: function () {
          var a = this;
          if (
            void 0 !== a.media.currentTime &&
            a.media.duration &&
            a.total &&
            a.handle
          ) {
            var b = Math.round(
                (a.total.width() * a.media.currentTime) / a.media.duration
              ),
              c = b - Math.round(a.handle.outerWidth(!0) / 2);
            a.current.width(b), a.handle.css("left", c);
          }
        },
      });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, {
      duration: -1,
      timeAndDurationSeparator: "<span> | </span>",
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildcurrent: function (b, c, d, e) {
          var f = this;
          a(
            '<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">' +
              mejs.Utility.secondsToTimeCode(0, b.options) +
              "</span></div>"
          ).appendTo(c),
            (f.currenttime = f.controls.find(".mejs-currenttime")),
            e.addEventListener(
              "timeupdate",
              function () {
                b.updateCurrent();
              },
              !1
            );
        },
        buildduration: function (b, c, d, e) {
          var f = this;
          c.children().last().find(".mejs-currenttime").length > 0
            ? a(
                f.options.timeAndDurationSeparator +
                  '<span class="mejs-duration">' +
                  mejs.Utility.secondsToTimeCode(
                    f.options.duration,
                    f.options
                  ) +
                  "</span>"
              ).appendTo(c.find(".mejs-time"))
            : (c
                .find(".mejs-currenttime")
                .parent()
                .addClass("mejs-currenttime-container"),
              a(
                '<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' +
                  mejs.Utility.secondsToTimeCode(
                    f.options.duration,
                    f.options
                  ) +
                  "</span></div>"
              ).appendTo(c)),
            (f.durationD = f.controls.find(".mejs-duration")),
            e.addEventListener(
              "timeupdate",
              function () {
                b.updateDuration();
              },
              !1
            );
        },
        updateCurrent: function () {
          var a = this,
            b = a.media.currentTime;
          isNaN(b) && (b = 0),
            a.currenttime &&
              a.currenttime.html(mejs.Utility.secondsToTimeCode(b, a.options));
        },
        updateDuration: function () {
          var a = this,
            b = a.media.duration;
          a.options.duration > 0 && (b = a.options.duration),
            isNaN(b) && (b = 0),
            a.container.toggleClass("mejs-long-video", b > 3600),
            a.durationD &&
              b > 0 &&
              a.durationD.html(mejs.Utility.secondsToTimeCode(b, a.options));
        },
      });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, {
      muteText: mejs.i18n.t("Mute Toggle"),
      allyVolumeControlText: mejs.i18n.t(
        "Use Up/Down Arrow keys to increase or decrease volume."
      ),
      hideVolumeOnTouchDevices: !0,
      audioVolume: "horizontal",
      videoVolume: "vertical",
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildvolume: function (b, c, d, e) {
          if (
            (!mejs.MediaFeatures.isAndroid && !mejs.MediaFeatures.isiOS) ||
            !this.options.hideVolumeOnTouchDevices
          ) {
            var f = this,
              g = f.isVideo ? f.options.videoVolume : f.options.audioVolume,
              h =
                "horizontal" == g
                  ? a(
                      '<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' +
                        f.id +
                        '" title="' +
                        f.options.muteText +
                        '" aria-label="' +
                        f.options.muteText +
                        '"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">' +
                        f.options.allyVolumeControlText +
                        '</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>'
                    ).appendTo(c)
                  : a(
                      '<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' +
                        f.id +
                        '" title="' +
                        f.options.muteText +
                        '" aria-label="' +
                        f.options.muteText +
                        '"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">' +
                        f.options.allyVolumeControlText +
                        '</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>'
                    ).appendTo(c),
              i = f.container.find(
                ".mejs-volume-slider, .mejs-horizontal-volume-slider"
              ),
              j = f.container.find(
                ".mejs-volume-total, .mejs-horizontal-volume-total"
              ),
              k = f.container.find(
                ".mejs-volume-current, .mejs-horizontal-volume-current"
              ),
              l = f.container.find(
                ".mejs-volume-handle, .mejs-horizontal-volume-handle"
              ),
              m = function (a, b) {
                if (!i.is(":visible") && "undefined" == typeof b)
                  return i.show(), m(a, !0), void i.hide();
                (a = Math.max(0, a)),
                  (a = Math.min(a, 1)),
                  0 === a
                    ? (h.removeClass("mejs-mute").addClass("mejs-unmute"),
                      h
                        .children("button")
                        .attr("title", mejs.i18n.t("Unmute"))
                        .attr("aria-label", mejs.i18n.t("Unmute")))
                    : (h.removeClass("mejs-unmute").addClass("mejs-mute"),
                      h
                        .children("button")
                        .attr("title", mejs.i18n.t("Mute"))
                        .attr("aria-label", mejs.i18n.t("Mute")));
                var c = j.position();
                if ("vertical" == g) {
                  var d = j.height(),
                    e = d - d * a;
                  l.css("top", Math.round(c.top + e - l.height() / 2)),
                    k.height(d - e),
                    k.css("top", c.top + e);
                } else {
                  var f = j.width(),
                    n = f * a;
                  l.css("left", Math.round(c.left + n - l.width() / 2)),
                    k.width(Math.round(n));
                }
              },
              n = function (a) {
                var b = null,
                  c = j.offset();
                if ("vertical" === g) {
                  var d = j.height(),
                    f = a.pageY - c.top;
                  if (((b = (d - f) / d), 0 === c.top || 0 === c.left)) return;
                } else {
                  var h = j.width(),
                    i = a.pageX - c.left;
                  b = i / h;
                }
                (b = Math.max(0, b)),
                  (b = Math.min(b, 1)),
                  m(b),
                  0 === b ? e.setMuted(!0) : e.setMuted(!1),
                  e.setVolume(b);
              },
              o = !1,
              p = !1;
            h.hover(
              function () {
                i.show(), (p = !0);
              },
              function () {
                (p = !1), o || "vertical" != g || i.hide();
              }
            );
            var q = function (a) {
              var b = Math.floor(100 * e.volume);
              i.attr({
                "aria-label": mejs.i18n.t("Volume Slider"),
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": b,
                "aria-valuetext": b + "%",
                role: "slider",
                tabindex: 0,
              });
            };
            i
              .bind("mouseover", function () {
                p = !0;
              })
              .bind("mousedown", function (a) {
                return (
                  n(a),
                  f.globalBind("mousemove.vol", function (a) {
                    n(a);
                  }),
                  f.globalBind("mouseup.vol", function () {
                    (o = !1),
                      f.globalUnbind(".vol"),
                      p || "vertical" != g || i.hide();
                  }),
                  (o = !0),
                  !1
                );
              })
              .bind("keydown", function (a) {
                var b = a.keyCode,
                  c = e.volume;
                switch (b) {
                  case 38:
                    c = Math.min(c + 0.1, 1);
                    break;
                  case 40:
                    c = Math.max(0, c - 0.1);
                    break;
                  default:
                    return !0;
                }
                return (o = !1), m(c), e.setVolume(c), !1;
              }),
              h.find("button").click(function () {
                e.setMuted(!e.muted);
              }),
              h.find("button").bind("focus", function () {
                i.show();
              }),
              e.addEventListener(
                "volumechange",
                function (a) {
                  o ||
                    (e.muted
                      ? (m(0),
                        h.removeClass("mejs-mute").addClass("mejs-unmute"))
                      : (m(e.volume),
                        h.removeClass("mejs-unmute").addClass("mejs-mute"))),
                    q(a);
                },
                !1
              ),
              0 === b.options.startVolume && e.setMuted(!0),
              "native" === e.pluginType && e.setVolume(b.options.startVolume),
              f.container.on("controlsresize", function () {
                m(e.volume);
              });
          }
        },
      });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, {
      usePluginFullScreen: !0,
      newWindowCallback: function () {
        return "";
      },
      fullscreenText: mejs.i18n.t("Fullscreen"),
    }),
      a.extend(MediaElementPlayer.prototype, {
        isFullScreen: !1,
        isNativeFullScreen: !1,
        isInIframe: !1,
        fullscreenMode: "",
        buildfullscreen: function (b, c, d, e) {
          if (b.isVideo) {
            (b.isInIframe = window.location != window.parent.location),
              e.addEventListener("play", function () {
                b.detectFullscreenMode();
              });
            var f = this,
              g = null,
              h = a(
                '<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' +
                  f.id +
                  '" title="' +
                  f.options.fullscreenText +
                  '" aria-label="' +
                  f.options.fullscreenText +
                  '"></button></div>'
              )
                .appendTo(c)
                .on("click", function () {
                  var a =
                    (mejs.MediaFeatures.hasTrueNativeFullScreen &&
                      mejs.MediaFeatures.isFullScreen()) ||
                    b.isFullScreen;
                  a ? b.exitFullScreen() : b.enterFullScreen();
                })
                .on("mouseover", function () {
                  if ("plugin-hover" == f.fullscreenMode) {
                    null !== g && (clearTimeout(g), delete g);
                    var a = h.offset(),
                      c = b.container.offset();
                    e.positionFullscreenButton(
                      a.left - c.left,
                      a.top - c.top,
                      !0
                    );
                  }
                })
                .on("mouseout", function () {
                  "plugin-hover" == f.fullscreenMode &&
                    (null !== g && (clearTimeout(g), delete g),
                    (g = setTimeout(function () {
                      e.hideFullscreenButton();
                    }, 1500)));
                });
            if (
              ((b.fullscreenBtn = h),
              f.globalBind("keydown", function (a) {
                27 == a.keyCode &&
                  ((mejs.MediaFeatures.hasTrueNativeFullScreen &&
                    mejs.MediaFeatures.isFullScreen()) ||
                    f.isFullScreen) &&
                  b.exitFullScreen();
              }),
              (f.normalHeight = 0),
              (f.normalWidth = 0),
              mejs.MediaFeatures.hasTrueNativeFullScreen)
            ) {
              var i = function (a) {
                b.isFullScreen &&
                  (mejs.MediaFeatures.isFullScreen()
                    ? ((b.isNativeFullScreen = !0), b.setControlsSize())
                    : ((b.isNativeFullScreen = !1), b.exitFullScreen()));
              };
              b.globalBind(mejs.MediaFeatures.fullScreenEventName, i);
            }
          }
        },
        detectFullscreenMode: function () {
          var a = this,
            b = "",
            c = mejs.MediaFeatures;
          return (
            c.hasTrueNativeFullScreen && "native" === a.media.pluginType
              ? (b = "native-native")
              : c.hasTrueNativeFullScreen &&
                "native" !== a.media.pluginType &&
                !c.hasFirefoxPluginMovingProblem
              ? (b = "plugin-native")
              : a.usePluginFullScreen
              ? mejs.MediaFeatures.supportsPointerEvents
                ? ((b = "plugin-click"), a.createPluginClickThrough())
                : (b = "plugin-hover")
              : (b = "fullwindow"),
            (a.fullscreenMode = b),
            b
          );
        },
        isPluginClickThroughCreated: !1,
        createPluginClickThrough: function () {
          var b = this;
          if (!b.isPluginClickThroughCreated) {
            var c,
              d,
              e = !1,
              f = function () {
                if (e) {
                  for (var a in g) g[a].hide();
                  b.fullscreenBtn.css("pointer-events", ""),
                    b.controls.css("pointer-events", ""),
                    b.media.removeEventListener(
                      "click",
                      b.clickToPlayPauseCallback
                    ),
                    (e = !1);
                }
              },
              g = {},
              h = ["top", "left", "right", "bottom"],
              i = function () {
                var a = fullscreenBtn.offset().left - b.container.offset().left,
                  d = fullscreenBtn.offset().top - b.container.offset().top,
                  e = fullscreenBtn.outerWidth(!0),
                  f = fullscreenBtn.outerHeight(!0),
                  h = b.container.width(),
                  i = b.container.height();
                for (c in g)
                  g[c].css({ position: "absolute", top: 0, left: 0 });
                g.top.width(h).height(d),
                  g.left.width(a).height(f).css({ top: d }),
                  g.right
                    .width(h - a - e)
                    .height(f)
                    .css({ top: d, left: a + e }),
                  g.bottom
                    .width(h)
                    .height(i - f - d)
                    .css({ top: d + f });
              };
            for (
              b.globalBind("resize", function () {
                i();
              }),
                c = 0,
                d = h.length;
              d > c;
              c++
            )
              g[h[c]] = a('<div class="mejs-fullscreen-hover" />')
                .appendTo(b.container)
                .mouseover(f)
                .hide();
            fullscreenBtn.on("mouseover", function () {
              if (!b.isFullScreen) {
                var a = fullscreenBtn.offset(),
                  d = player.container.offset();
                media.positionFullscreenButton(
                  a.left - d.left,
                  a.top - d.top,
                  !1
                ),
                  b.fullscreenBtn.css("pointer-events", "none"),
                  b.controls.css("pointer-events", "none"),
                  b.media.addEventListener("click", b.clickToPlayPauseCallback);
                for (c in g) g[c].show();
                i(), (e = !0);
              }
            }),
              media.addEventListener("fullscreenchange", function (a) {
                (b.isFullScreen = !b.isFullScreen),
                  b.isFullScreen
                    ? b.media.removeEventListener(
                        "click",
                        b.clickToPlayPauseCallback
                      )
                    : b.media.addEventListener(
                        "click",
                        b.clickToPlayPauseCallback
                      ),
                  f();
              }),
              b.globalBind("mousemove", function (a) {
                if (e) {
                  var c = fullscreenBtn.offset();
                  (a.pageY < c.top ||
                    a.pageY > c.top + fullscreenBtn.outerHeight(!0) ||
                    a.pageX < c.left ||
                    a.pageX > c.left + fullscreenBtn.outerWidth(!0)) &&
                    (fullscreenBtn.css("pointer-events", ""),
                    b.controls.css("pointer-events", ""),
                    (e = !1));
                }
              }),
              (b.isPluginClickThroughCreated = !0);
          }
        },
        cleanfullscreen: function (a) {
          a.exitFullScreen();
        },
        containerSizeTimeout: null,
        enterFullScreen: function () {
          var b = this;
          return mejs.MediaFeatures.hasiOSFullScreen
            ? void b.media.webkitEnterFullscreen()
            : (a(document.documentElement).addClass("mejs-fullscreen"),
              (b.normalHeight = b.container.height()),
              (b.normalWidth = b.container.width()),
              "native-native" === b.fullscreenMode ||
              "plugin-native" === b.fullscreenMode
                ? (mejs.MediaFeatures.requestFullScreen(b.container[0]),
                  b.isInIframe &&
                    setTimeout(function c() {
                      if (b.isNativeFullScreen) {
                        var d = 0.002,
                          e = a(window).width(),
                          f = screen.width,
                          g = Math.abs(f - e),
                          h = f * d;
                        g > h ? b.exitFullScreen() : setTimeout(c, 500);
                      }
                    }, 1e3))
                : "fullwindow" == b.fullscreeMode,
              b.container
                .addClass("mejs-container-fullscreen")
                .width("100%")
                .height("100%"),
              (b.containerSizeTimeout = setTimeout(function () {
                b.container.css({ width: "100%", height: "100%" }),
                  b.setControlsSize();
              }, 500)),
              "native" === b.media.pluginType
                ? b.$media.width("100%").height("100%")
                : (b.container.find(".mejs-shim").width("100%").height("100%"),
                  setTimeout(function () {
                    var c = a(window),
                      d = c.width(),
                      e = c.height();
                    b.media.setVideoSize(d, e);
                  }, 500)),
              b.layers.children("div").width("100%").height("100%"),
              b.fullscreenBtn &&
                b.fullscreenBtn
                  .removeClass("mejs-fullscreen")
                  .addClass("mejs-unfullscreen"),
              b.setControlsSize(),
              (b.isFullScreen = !0),
              b.container
                .find(".mejs-captions-text")
                .css("font-size", (screen.width / b.width) * 1 * 100 + "%"),
              b.container.find(".mejs-captions-position").css("bottom", "45px"),
              void b.container.trigger("enteredfullscreen"));
        },
        exitFullScreen: function () {
          var b = this;
          clearTimeout(b.containerSizeTimeout),
            mejs.MediaFeatures.hasTrueNativeFullScreen &&
              (mejs.MediaFeatures.isFullScreen() || b.isFullScreen) &&
              mejs.MediaFeatures.cancelFullScreen(),
            a(document.documentElement).removeClass("mejs-fullscreen"),
            b.container
              .removeClass("mejs-container-fullscreen")
              .width(b.normalWidth)
              .height(b.normalHeight),
            "native" === b.media.pluginType
              ? b.$media.width(b.normalWidth).height(b.normalHeight)
              : (b.container
                  .find(".mejs-shim")
                  .width(b.normalWidth)
                  .height(b.normalHeight),
                b.media.setVideoSize(b.normalWidth, b.normalHeight)),
            b.layers
              .children("div")
              .width(b.normalWidth)
              .height(b.normalHeight),
            b.fullscreenBtn
              .removeClass("mejs-unfullscreen")
              .addClass("mejs-fullscreen"),
            b.setControlsSize(),
            (b.isFullScreen = !1),
            b.container.find(".mejs-captions-text").css("font-size", ""),
            b.container.find(".mejs-captions-position").css("bottom", ""),
            b.container.trigger("exitedfullscreen");
        },
      });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, {
      speeds: ["2.00", "1.50", "1.25", "1.00", "0.75"],
      defaultSpeed: "1.00",
      speedChar: "x",
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildspeed: function (b, c, d, e) {
          var f = this;
          if ("native" == f.media.pluginType) {
            for (
              var g = null,
                h = null,
                i = null,
                j = null,
                k = [],
                l = !1,
                m = 0,
                n = f.options.speeds.length;
              n > m;
              m++
            ) {
              var o = f.options.speeds[m];
              "string" == typeof o
                ? (k.push({ name: o + f.options.speedChar, value: o }),
                  o === f.options.defaultSpeed && (l = !0))
                : (k.push(o), o.value === f.options.defaultSpeed && (l = !0));
            }
            l ||
              k.push({
                name: f.options.defaultSpeed + f.options.speedChar,
                value: f.options.defaultSpeed,
              }),
              k.sort(function (a, b) {
                return parseFloat(b.value) - parseFloat(a.value);
              });
            var p = function (a) {
                for (m = 0, n = k.length; n > m; m++)
                  if (k[m].value === a) return k[m].name;
              },
              q =
                '<div class="mejs-button mejs-speed-button"><button type="button">' +
                p(f.options.defaultSpeed) +
                '</button><div class="mejs-speed-selector"><ul>';
            for (m = 0, il = k.length; m < il; m++)
              (j = f.id + "-speed-" + k[m].value),
                (q +=
                  '<li><input type="radio" name="speed" value="' +
                  k[m].value +
                  '" id="' +
                  j +
                  '" ' +
                  (k[m].value === f.options.defaultSpeed ? " checked" : "") +
                  ' /><label htmlFor="' +
                  j +
                  '" ' +
                  (k[m].value === f.options.defaultSpeed
                    ? ' class="mejs-speed-selected"'
                    : "") +
                  ">" +
                  k[m].name +
                  "</label></li>");
            (q += "</ul></div></div>"),
              (g = a(q).appendTo(c)),
              (h = g.find(".mejs-speed-selector")),
              (i = f.options.defaultSpeed),
              e.addEventListener(
                "loadedmetadata",
                function (a) {
                  i && (e.playbackRate = parseFloat(i));
                },
                !0
              ),
              h.on("click", 'input[type="radio"]', function () {
                var b = a(this).attr("value");
                (i = b),
                  (e.playbackRate = parseFloat(b)),
                  g.find("button").html(p(b)),
                  g
                    .find(".mejs-speed-selected")
                    .removeClass("mejs-speed-selected"),
                  g
                    .find('input[type="radio"]:checked')
                    .next()
                    .addClass("mejs-speed-selected");
              }),
              g.one("mouseenter focusin", function () {
                h.height(
                  g.find(".mejs-speed-selector ul").outerHeight(!0) +
                    g.find(".mejs-speed-translations").outerHeight(!0)
                ).css("top", -1 * h.height() + "px");
              });
          }
        },
      });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, {
      startLanguage: "",
      tracksText: mejs.i18n.t("Captions/Subtitles"),
      tracksAriaLive: !1,
      hideCaptionsButtonWhenEmpty: !0,
      toggleCaptionsButtonWhenOnlyOne: !1,
      slidesSelector: "",
    }),
      a.extend(MediaElementPlayer.prototype, {
        hasChapters: !1,
        cleartracks: function (a, b, c, d) {
          a &&
            (a.captions && a.captions.remove(),
            a.chapters && a.chapters.remove(),
            a.captionsText && a.captionsText.remove(),
            a.captionsButton && a.captionsButton.remove());
        },
        buildtracks: function (b, c, d, e) {
          if (0 !== b.tracks.length) {
            var f,
              g = this,
              h = g.options.tracksAriaLive
                ? 'role="log" aria-live="assertive" aria-atomic="false"'
                : "";
            if (g.domNode.textTracks)
              for (f = g.domNode.textTracks.length - 1; f >= 0; f--)
                g.domNode.textTracks[f].mode = "hidden";
            g.cleartracks(b, c, d, e),
              (b.chapters = a('<div class="mejs-chapters mejs-layer"></div>')
                .prependTo(d)
                .hide()),
              (b.captions = a(
                '<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" ' +
                  h +
                  '><span class="mejs-captions-text"></span></div></div>'
              )
                .prependTo(d)
                .hide()),
              (b.captionsText = b.captions.find(".mejs-captions-text")),
              (b.captionsButton = a(
                '<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' +
                  g.id +
                  '" title="' +
                  g.options.tracksText +
                  '" aria-label="' +
                  g.options.tracksText +
                  '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' +
                  b.id +
                  '_captions" id="' +
                  b.id +
                  '_captions_none" value="none" checked="checked" /><label htmlFor="' +
                  b.id +
                  '_captions_none">' +
                  mejs.i18n.t("None") +
                  "</label></li></ul></div></div>"
              ).appendTo(c));
            var i = 0;
            for (f = 0; f < b.tracks.length; f++)
              "subtitles" == b.tracks[f].kind && i++;
            for (
              g.options.toggleCaptionsButtonWhenOnlyOne && 1 == i
                ? b.captionsButton.on("click", function () {
                    null === b.selectedTrack
                      ? (lang = b.tracks[0].srclang)
                      : (lang = "none"),
                      b.setTrack(lang);
                  })
                : (b.captionsButton
                    .on("mouseenter focusin", function () {
                      a(this)
                        .find(".mejs-captions-selector")
                        .removeClass("mejs-offscreen");
                    })
                    .on("click", "input[type=radio]", function () {
                      (lang = this.value), b.setTrack(lang);
                    }),
                  b.captionsButton.on("mouseleave focusout", function () {
                    a(this)
                      .find(".mejs-captions-selector")
                      .addClass("mejs-offscreen");
                  })),
                b.options.alwaysShowControls
                  ? b.container
                      .find(".mejs-captions-position")
                      .addClass("mejs-captions-position-hover")
                  : b.container
                      .bind("controlsshown", function () {
                        b.container
                          .find(".mejs-captions-position")
                          .addClass("mejs-captions-position-hover");
                      })
                      .bind("controlshidden", function () {
                        e.paused ||
                          b.container
                            .find(".mejs-captions-position")
                            .removeClass("mejs-captions-position-hover");
                      }),
                b.trackToLoad = -1,
                b.selectedTrack = null,
                b.isLoadingTrack = !1,
                f = 0;
              f < b.tracks.length;
              f++
            )
              "subtitles" == b.tracks[f].kind &&
                b.addTrackButton(b.tracks[f].srclang, b.tracks[f].label);
            b.loadNextTrack(),
              e.addEventListener(
                "timeupdate",
                function (a) {
                  b.displayCaptions();
                },
                !1
              ),
              "" !== b.options.slidesSelector &&
                ((b.slidesContainer = a(b.options.slidesSelector)),
                e.addEventListener(
                  "timeupdate",
                  function (a) {
                    b.displaySlides();
                  },
                  !1
                )),
              e.addEventListener(
                "loadedmetadata",
                function (a) {
                  b.displayChapters();
                },
                !1
              ),
              b.container.hover(
                function () {
                  b.hasChapters &&
                    (b.chapters.removeClass("mejs-offscreen"),
                    b.chapters
                      .fadeIn(200)
                      .height(b.chapters.find(".mejs-chapter").outerHeight()));
                },
                function () {
                  b.hasChapters &&
                    !e.paused &&
                    b.chapters.fadeOut(200, function () {
                      a(this).addClass("mejs-offscreen"),
                        a(this).css("display", "block");
                    });
                }
              ),
              g.container.on("controlsresize", function () {
                g.adjustLanguageBox();
              }),
              null !== b.node.getAttribute("autoplay") &&
                b.chapters.addClass("mejs-offscreen");
          }
        },
        setTrack: function (a) {
          var b,
            c = this;
          if ("none" == a)
            (c.selectedTrack = null),
              c.captionsButton.removeClass("mejs-captions-enabled");
          else
            for (b = 0; b < c.tracks.length; b++)
              if (c.tracks[b].srclang == a) {
                null === c.selectedTrack &&
                  c.captionsButton.addClass("mejs-captions-enabled"),
                  (c.selectedTrack = c.tracks[b]),
                  c.captions.attr("lang", c.selectedTrack.srclang),
                  c.displayCaptions();
                break;
              }
        },
        loadNextTrack: function () {
          var a = this;
          a.trackToLoad++,
            a.trackToLoad < a.tracks.length
              ? ((a.isLoadingTrack = !0), a.loadTrack(a.trackToLoad))
              : ((a.isLoadingTrack = !1), a.checkForTracks());
        },
        loadTrack: function (b) {
          var c = this,
            d = c.tracks[b],
            e = function () {
              (d.isLoaded = !0),
                c.enableTrackButton(d.srclang, d.label),
                c.loadNextTrack();
            };
          a.ajax({
            url: d.src,
            dataType: "text",
            success: function (a) {
              "string" == typeof a && /<tt\s+xml/gi.exec(a)
                ? (d.entries = mejs.TrackFormatParser.dfxp.parse(a))
                : (d.entries = mejs.TrackFormatParser.webvtt.parse(a)),
                e(),
                "chapters" == d.kind &&
                  c.media.addEventListener(
                    "play",
                    function (a) {
                      c.media.duration > 0 && c.displayChapters(d);
                    },
                    !1
                  ),
                "slides" == d.kind && c.setupSlides(d);
            },
            error: function () {
              c.removeTrackButton(d.srclang), c.loadNextTrack();
            },
          });
        },
        enableTrackButton: function (b, c) {
          var d = this;
          "" === c && (c = mejs.language.codes[b] || b),
            d.captionsButton
              .find("input[value=" + b + "]")
              .prop("disabled", !1)
              .siblings("label")
              .html(c),
            d.options.startLanguage == b &&
              a("#" + d.id + "_captions_" + b)
                .prop("checked", !0)
                .trigger("click"),
            d.adjustLanguageBox();
        },
        removeTrackButton: function (a) {
          var b = this;
          b.captionsButton
            .find("input[value=" + a + "]")
            .closest("li")
            .remove(),
            b.adjustLanguageBox();
        },
        addTrackButton: function (b, c) {
          var d = this;
          "" === c && (c = mejs.language.codes[b] || b),
            d.captionsButton
              .find("ul")
              .append(
                a(
                  '<li><input type="radio" name="' +
                    d.id +
                    '_captions" id="' +
                    d.id +
                    "_captions_" +
                    b +
                    '" value="' +
                    b +
                    '" disabled="disabled" /><label htmlFor="' +
                    d.id +
                    "_captions_" +
                    b +
                    '">' +
                    c +
                    " (loading)</label></li>"
                )
              ),
            d.adjustLanguageBox(),
            d.container
              .find(".mejs-captions-translations option[value=" + b + "]")
              .remove();
        },
        adjustLanguageBox: function () {
          var a = this;
          a.captionsButton
            .find(".mejs-captions-selector")
            .height(
              a.captionsButton
                .find(".mejs-captions-selector ul")
                .outerHeight(!0) +
                a.captionsButton
                  .find(".mejs-captions-translations")
                  .outerHeight(!0)
            );
        },
        checkForTracks: function () {
          var a = this,
            b = !1;
          if (a.options.hideCaptionsButtonWhenEmpty) {
            for (i = 0; i < a.tracks.length; i++)
              if ("subtitles" == a.tracks[i].kind && a.tracks[i].isLoaded) {
                b = !0;
                break;
              }
            b || (a.captionsButton.hide(), a.setControlsSize());
          }
        },
        displayCaptions: function () {
          if ("undefined" != typeof this.tracks) {
            var a,
              b = this,
              c = b.selectedTrack;
            if (null !== c && c.isLoaded) {
              for (a = 0; a < c.entries.times.length; a++)
                if (
                  b.media.currentTime >= c.entries.times[a].start &&
                  b.media.currentTime <= c.entries.times[a].stop
                )
                  return (
                    b.captionsText
                      .html(c.entries.text[a])
                      .attr(
                        "class",
                        "mejs-captions-text " +
                          (c.entries.times[a].identifier || "")
                      ),
                    void b.captions.show().height(0)
                  );
              b.captions.hide();
            } else b.captions.hide();
          }
        },
        setupSlides: function (a) {
          var b = this;
          (b.slides = a),
            (b.slides.entries.imgs = [b.slides.entries.text.length]),
            b.showSlide(0);
        },
        showSlide: function (b) {
          if (
            "undefined" != typeof this.tracks &&
            "undefined" != typeof this.slidesContainer
          ) {
            var c = this,
              d = c.slides.entries.text[b],
              e = c.slides.entries.imgs[b];
            "undefined" == typeof e || "undefined" == typeof e.fadeIn
              ? (c.slides.entries.imgs[b] = e =
                  a('<img src="' + d + '">').on("load", function () {
                    e.appendTo(c.slidesContainer)
                      .hide()
                      .fadeIn()
                      .siblings(":visible")
                      .fadeOut();
                  }))
              : e.is(":visible") ||
                e.is(":animated") ||
                e.fadeIn().siblings(":visible").fadeOut();
          }
        },
        displaySlides: function () {
          if ("undefined" != typeof this.slides) {
            var a,
              b = this,
              c = b.slides;
            for (a = 0; a < c.entries.times.length; a++)
              if (
                b.media.currentTime >= c.entries.times[a].start &&
                b.media.currentTime <= c.entries.times[a].stop
              )
                return void b.showSlide(a);
          }
        },
        displayChapters: function () {
          var a,
            b = this;
          for (a = 0; a < b.tracks.length; a++)
            if ("chapters" == b.tracks[a].kind && b.tracks[a].isLoaded) {
              b.drawChapters(b.tracks[a]), (b.hasChapters = !0);
              break;
            }
        },
        drawChapters: function (b) {
          var c,
            d,
            e = this,
            f = 0,
            g = 0;
          for (e.chapters.empty(), c = 0; c < b.entries.times.length; c++)
            (d = b.entries.times[c].stop - b.entries.times[c].start),
              (f = Math.floor((d / e.media.duration) * 100)),
              (f + g > 100 ||
                (c == b.entries.times.length - 1 && 100 > f + g)) &&
                (f = 100 - g),
              e.chapters.append(
                a(
                  '<div class="mejs-chapter" rel="' +
                    b.entries.times[c].start +
                    '" style="left: ' +
                    g.toString() +
                    "%;width: " +
                    f.toString() +
                    '%;"><div class="mejs-chapter-block' +
                    (c == b.entries.times.length - 1
                      ? " mejs-chapter-block-last"
                      : "") +
                    '"><span class="ch-title">' +
                    b.entries.text[c] +
                    '</span><span class="ch-time">' +
                    mejs.Utility.secondsToTimeCode(
                      b.entries.times[c].start,
                      e.options
                    ) +
                    "&ndash;" +
                    mejs.Utility.secondsToTimeCode(
                      b.entries.times[c].stop,
                      e.options
                    ) +
                    "</span></div></div>"
                )
              ),
              (g += f);
          e.chapters.find("div.mejs-chapter").click(function () {
            e.media.setCurrentTime(parseFloat(a(this).attr("rel"))),
              e.media.paused && e.media.play();
          }),
            e.chapters.show();
        },
      }),
      (mejs.language = {
        codes: {
          af: "Afrikaans",
          sq: "Albanian",
          ar: "Arabic",
          be: "Belarusian",
          bg: "Bulgarian",
          ca: "Catalan",
          zh: "Chinese",
          "zh-cn": "Chinese Simplified",
          "zh-tw": "Chinese Traditional",
          hr: "Croatian",
          cs: "Czech",
          da: "Danish",
          nl: "Dutch",
          en: "English",
          et: "Estonian",
          fl: "Filipino",
          fi: "Finnish",
          fr: "French",
          gl: "Galician",
          de: "German",
          el: "Greek",
          ht: "Haitian Creole",
          iw: "Hebrew",
          hi: "Hindi",
          hu: "Hungarian",
          is: "Icelandic",
          id: "Indonesian",
          ga: "Irish",
          it: "Italian",
          ja: "Japanese",
          ko: "Korean",
          lv: "Latvian",
          lt: "Lithuanian",
          mk: "Macedonian",
          ms: "Malay",
          mt: "Maltese",
          no: "Norwegian",
          fa: "Persian",
          pl: "Polish",
          pt: "Portuguese",
          ro: "Romanian",
          ru: "Russian",
          sr: "Serbian",
          sk: "Slovak",
          sl: "Slovenian",
          es: "Spanish",
          sw: "Swahili",
          sv: "Swedish",
          tl: "Tagalog",
          th: "Thai",
          tr: "Turkish",
          uk: "Ukrainian",
          vi: "Vietnamese",
          cy: "Welsh",
          yi: "Yiddish",
        },
      }),
      (mejs.TrackFormatParser = {
        webvtt: {
          pattern_timecode:
            /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
          parse: function (b) {
            for (
              var c,
                d,
                e,
                f = 0,
                g = mejs.TrackFormatParser.split2(b, /\r?\n/),
                h = { text: [], times: [] };
              f < g.length;
              f++
            ) {
              if (((c = this.pattern_timecode.exec(g[f])), c && f < g.length)) {
                for (
                  f - 1 >= 0 && "" !== g[f - 1] && (e = g[f - 1]),
                    f++,
                    d = g[f],
                    f++;
                  "" !== g[f] && f < g.length;

                )
                  (d = d + "\n" + g[f]), f++;
                (d = a
                  .trim(d)
                  .replace(
                    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
                    "<a href='$1' target='_blank'>$1</a>"
                  )),
                  h.text.push(d),
                  h.times.push({
                    identifier: e,
                    start:
                      0 === mejs.Utility.convertSMPTEtoSeconds(c[1])
                        ? 0.2
                        : mejs.Utility.convertSMPTEtoSeconds(c[1]),
                    stop: mejs.Utility.convertSMPTEtoSeconds(c[3]),
                    settings: c[5],
                  });
              }
              e = "";
            }
            return h;
          },
        },
        dfxp: {
          parse: function (b) {
            b = a(b).filter("tt");
            var c,
              d,
              e = 0,
              f = b.children("div").eq(0),
              g = f.find("p"),
              h = b.find("#" + f.attr("style")),
              i = { text: [], times: [] };
            if (h.length) {
              var j = h.removeAttr("id").get(0).attributes;
              if (j.length)
                for (c = {}, e = 0; e < j.length; e++)
                  c[j[e].name.split(":")[1]] = j[e].value;
            }
            for (e = 0; e < g.length; e++) {
              var k,
                l = { start: null, stop: null, style: null };
              if (
                (g.eq(e).attr("begin") &&
                  (l.start = mejs.Utility.convertSMPTEtoSeconds(
                    g.eq(e).attr("begin")
                  )),
                !l.start &&
                  g.eq(e - 1).attr("end") &&
                  (l.start = mejs.Utility.convertSMPTEtoSeconds(
                    g.eq(e - 1).attr("end")
                  )),
                g.eq(e).attr("end") &&
                  (l.stop = mejs.Utility.convertSMPTEtoSeconds(
                    g.eq(e).attr("end")
                  )),
                !l.stop &&
                  g.eq(e + 1).attr("begin") &&
                  (l.stop = mejs.Utility.convertSMPTEtoSeconds(
                    g.eq(e + 1).attr("begin")
                  )),
                c)
              ) {
                k = "";
                for (var m in c) k += m + ":" + c[m] + ";";
              }
              k && (l.style = k),
                0 === l.start && (l.start = 0.2),
                i.times.push(l),
                (d = a
                  .trim(g.eq(e).html())
                  .replace(
                    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
                    "<a href='$1' target='_blank'>$1</a>"
                  )),
                i.text.push(d),
                0 === i.times.start && (i.times.start = 2);
            }
            return i;
          },
        },
        split2: function (a, b) {
          return a.split(b);
        },
      }),
      3 != "x\n\ny".split(/\n/gi).length &&
        (mejs.TrackFormatParser.split2 = function (a, b) {
          var c,
            d = [],
            e = "";
          for (c = 0; c < a.length; c++)
            (e += a.substring(c, c + 1)),
              b.test(e) && (d.push(e.replace(b, "")), (e = ""));
          return d.push(e), d;
        });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, {
      contextMenuItems: [
        {
          render: function (a) {
            return "undefined" == typeof a.enterFullScreen
              ? null
              : a.isFullScreen
              ? mejs.i18n.t("Turn off Fullscreen")
              : mejs.i18n.t("Go Fullscreen");
          },
          click: function (a) {
            a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen();
          },
        },
        {
          render: function (a) {
            return a.media.muted ? mejs.i18n.t("Unmute") : mejs.i18n.t("Mute");
          },
          click: function (a) {
            a.media.muted ? a.setMuted(!1) : a.setMuted(!0);
          },
        },
        { isSeparator: !0 },
        {
          render: function (a) {
            return mejs.i18n.t("Download Video");
          },
          click: function (a) {
            window.location.href = a.media.currentSrc;
          },
        },
      ],
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function (b, c, d, e) {
          (b.contextMenu = a('<div class="mejs-contextmenu"></div>')
            .appendTo(a("body"))
            .hide()),
            b.container.bind("contextmenu", function (a) {
              return b.isContextMenuEnabled
                ? (a.preventDefault(),
                  b.renderContextMenu(a.clientX - 1, a.clientY - 1),
                  !1)
                : void 0;
            }),
            b.container.bind("click", function () {
              b.contextMenu.hide();
            }),
            b.contextMenu.bind("mouseleave", function () {
              b.startContextMenuTimer();
            });
        },
        cleancontextmenu: function (a) {
          a.contextMenu.remove();
        },
        isContextMenuEnabled: !0,
        enableContextMenu: function () {
          this.isContextMenuEnabled = !0;
        },
        disableContextMenu: function () {
          this.isContextMenuEnabled = !1;
        },
        contextMenuTimeout: null,
        startContextMenuTimer: function () {
          var a = this;
          a.killContextMenuTimer(),
            (a.contextMenuTimer = setTimeout(function () {
              a.hideContextMenu(), a.killContextMenuTimer();
            }, 750));
        },
        killContextMenuTimer: function () {
          var a = this.contextMenuTimer;
          null != a && (clearTimeout(a), delete a, (a = null));
        },
        hideContextMenu: function () {
          this.contextMenu.hide();
        },
        renderContextMenu: function (b, c) {
          for (
            var d = this,
              e = "",
              f = d.options.contextMenuItems,
              g = 0,
              h = f.length;
            h > g;
            g++
          )
            if (f[g].isSeparator)
              e += '<div class="mejs-contextmenu-separator"></div>';
            else {
              var i = f[g].render(d);
              null != i &&
                (e +=
                  '<div class="mejs-contextmenu-item" data-itemindex="' +
                  g +
                  '" id="element-' +
                  1e6 * Math.random() +
                  '">' +
                  i +
                  "</div>");
            }
          d.contextMenu.empty().append(a(e)).css({ top: c, left: b }).show(),
            d.contextMenu.find(".mejs-contextmenu-item").each(function () {
              var b = a(this),
                c = parseInt(b.data("itemindex"), 10),
                e = d.options.contextMenuItems[c];
              "undefined" != typeof e.show && e.show(b, d),
                b.click(function () {
                  "undefined" != typeof e.click && e.click(d),
                    d.contextMenu.hide();
                });
            }),
            setTimeout(function () {
              d.killControlsTimer("rev3");
            }, 100);
        },
      });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, {
      skipBackInterval: 30,
      skipBackText: mejs.i18n.t("Skip back %1 seconds"),
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildskipback: function (b, c, d, e) {
          var f = this,
            g = f.options.skipBackText.replace(
              "%1",
              f.options.skipBackInterval
            );
          a(
            '<div class="mejs-button mejs-skip-back-button"><button type="button" aria-controls="' +
              f.id +
              '" title="' +
              g +
              '" aria-label="' +
              g +
              '">' +
              f.options.skipBackInterval +
              "</button></div>"
          )
            .appendTo(c)
            .click(function () {
              e.setCurrentTime(
                Math.max(e.currentTime - f.options.skipBackInterval, 0)
              ),
                a(this).find("button").blur();
            });
        },
      });
  })(mejs.$),
  (function (a) {
    a.extend(mejs.MepDefaults, { postrollCloseText: mejs.i18n.t("Close") }),
      a.extend(MediaElementPlayer.prototype, {
        buildpostroll: function (b, c, d, e) {
          var f = this,
            g = f.container.find('link[rel="postroll"]').attr("href");
          "undefined" != typeof g &&
            ((b.postroll = a(
              '<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' +
                f.options.postrollCloseText +
                '</a><div class="mejs-postroll-layer-content"></div></div>'
            )
              .prependTo(d)
              .hide()),
            f.media.addEventListener(
              "ended",
              function (c) {
                a.ajax({
                  dataType: "html",
                  url: g,
                  success: function (a, b) {
                    d.find(".mejs-postroll-layer-content").html(a);
                  },
                }),
                  b.postroll.show();
              },
              !1
            ));
        },
      });
  })(mejs.$);

/*! Lity - v1.6.6 - 2016-04-22
 * http://sorgalla.com/lity/
 * Copyright (c) 2016 Jan Sorgalla; Licensed MIT */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (c) {
        return b(a, c);
      })
    : "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = b(a, require("jquery")))
    : (a.lity = b(a, a.jQuery || a.Zepto));
})("undefined" != typeof window ? window : this, function (a, b) {
  "use strict";
  function c() {
    o[p > 0 ? "addClass" : "removeClass"]("lity-active");
  }
  function d(a) {
    var c = b.Deferred();
    return (
      w ? (a.one(w, c.resolve), setTimeout(c.resolve, 500)) : c.resolve(),
      c.promise()
    );
  }
  function e(a, c, d) {
    if (1 === arguments.length) return b.extend({}, a);
    if ("string" == typeof c) {
      if ("undefined" == typeof d)
        return "undefined" == typeof a[c] ? null : a[c];
      a[c] = d;
    } else b.extend(a, c);
    return this;
  }
  function f(a) {
    for (
      var b, c = decodeURI(a).split("&"), d = {}, e = 0, f = c.length;
      f > e;
      e++
    )
      c[e] && ((b = c[e].split("=")), (d[b[0]] = b[1]));
    return d;
  }
  function g(a, c) {
    return a + (a.indexOf("?") > -1 ? "&" : "?") + b.param(c);
  }
  function h(a) {
    return b('<span class="lity-error"/>').append(a);
  }
  function i(a) {
    if (!q.test(a)) return !1;
    var c = b('<img src="' + a + '">'),
      d = b.Deferred(),
      e = function () {
        d.reject(h("Failed loading image"));
      };
    return (
      c
        .on("load", function () {
          return 0 === this.naturalWidth ? e() : void d.resolve(c);
        })
        .on("error", e),
      d.promise()
    );
  }
  function j(a) {
    var c;
    try {
      c = b(a);
    } catch (d) {
      return !1;
    }
    if (!c.length) return !1;
    var e = b(
      '<span style="display:none !important" class="lity-inline-placeholder"/>'
    );
    return c.after(e).on("lity:ready", function (a, b) {
      b.one("lity:remove", function () {
        e.before(c.addClass("lity-hide")).remove();
      });
    });
  }
  function k(a) {
    var c,
      d = a;
    return (
      (c = r.exec(a)),
      c &&
        (d = g(
          "https://www.youtube" + (c[2] || "") + ".com/embed/" + c[4],
          b.extend({ autoplay: 1 }, f(c[5] || ""))
        )),
      (c = s.exec(a)),
      c &&
        (d = g(
          "https://player.vimeo.com/video/" + c[3],
          b.extend({ autoplay: 1 }, f(c[4] || ""))
        )),
      (c = t.exec(a)),
      c &&
        (d = g("https://www.google." + c[3] + "/maps?" + c[6], {
          output: c[6].indexOf("layer=c") > 0 ? "svembed" : "embed",
        })),
      '<div class="lity-iframe-container"><iframe frameBorder="0" allowfullscreen src="' +
        d +
        '"></iframe></div>'
    );
  }
  function l(a) {
    function f(a) {
      27 === a.keyCode && k();
    }
    function g() {
      var a = m.documentElement.clientHeight
        ? m.documentElement.clientHeight
        : Math.round(n.height());
      q.css("max-height", Math.floor(a) + "px").trigger("lity:resize", [o]);
    }
    function h(a, c) {
      o &&
        ((q = b(c)),
        n.on("resize", g),
        g(),
        o.find(".lity-loader").each(function () {
          var a = b(this);
          d(a).always(function () {
            a.remove();
          });
        }),
        o.removeClass("lity-loading").find(".lity-content").empty().append(q),
        q.removeClass("lity-hide").trigger("lity:ready", [o, a]),
        t.resolve());
    }
    function i(a, d, e, g) {
      (t = b.Deferred()),
        p++,
        c(),
        (o = b(e.template).addClass("lity-loading").appendTo("body")),
        e.esc && n.on("keyup", f),
        setTimeout(function () {
          o
            .addClass("lity-opened lity-" + a)
            .on("click", "[data-lity-close]", function (a) {
              b(a.target).is("[data-lity-close]") && k();
            })
            .trigger("lity:open", [o, g]),
            b.when(d).always(b.proxy(h, null, g));
        }, 0);
    }
    function j(a, c, d) {
      var e,
        f,
        g = b.extend({}, u, s);
      if (((c = b.extend({}, v, r, c)), c.handler && g[c.handler]))
        (f = g[c.handler](a, l)), (e = c.handler);
      else {
        var h = {};
        b.each(["inline", "iframe"], function (a, b) {
          g[b] && (h[b] = g[b]), delete g[b];
        });
        var j = function (b, c) {
          return c ? ((f = c(a, l)), f ? ((e = b), !1) : void 0) : !0;
        };
        b.each(g, j), e || b.each(h, j);
      }
      return f && b.when(k()).done(b.proxy(i, null, e, f, c, d)), !!f;
    }
    function k() {
      if (o) {
        var a = b.Deferred();
        return (
          t.done(function () {
            p--,
              c(),
              n.off("resize", g).off("keyup", f),
              q.trigger("lity:close", [o]),
              o.removeClass("lity-opened").addClass("lity-closed");
            var b = o,
              e = q;
            (o = null),
              (q = null),
              d(e.add(b)).always(function () {
                e.trigger("lity:remove", [b]), b.remove(), a.resolve();
              });
          }),
          a.promise()
        );
      }
    }
    function l(a) {
      if (!a.preventDefault) return l.open(a);
      var c = b(this),
        d = c.data("lity-target") || c.attr("href") || c.attr("src");
      if (d) {
        var e = c.data("lity-options") || c.data("lity");
        j(d, e, c) && (c.blur(), a.preventDefault());
      }
    }
    var o,
      q,
      r = {},
      s = {},
      t = b.Deferred().resolve();
    return (
      (l.handlers = b.proxy(e, l, s)),
      (l.options = b.proxy(e, l, r)),
      (l.open = function (a, b, c) {
        return j(a, b, c), l;
      }),
      (l.close = function () {
        return k(), l;
      }),
      l.options(a)
    );
  }
  var m = a.document,
    n = b(a),
    o = b("html"),
    p = 0,
    q = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
    r =
      /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
    s = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
    t = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
    u = { image: i, inline: j, iframe: k },
    v = {
      esc: !0,
      handler: null,
      template:
        '<div class="lity" tabindex="-1"><div class="lity-wrap" data-lity-close><div class="lity-loader">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" title="Close (Esc)" data-lity-close>×</button></div></div></div>',
    },
    w = (function () {
      var a = m.createElement("div"),
        b = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        };
      for (var c in b) if (void 0 !== a.style[c]) return b[c];
      return !1;
    })();
  return (
    (l.version = "1.6.6"),
    (l.handlers = b.proxy(e, l, u)),
    (l.options = b.proxy(e, l, v)),
    b(m).on("click", "[data-lity]", l()),
    l
  );
});

/*!
 * Masonry PACKAGED v4.0.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!(function (t, e) {
  "use strict";
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  function i(i, r, a) {
    function h(t, e, n) {
      var o,
        r = "$()." + i + '("' + e + '")';
      return (
        t.each(function (t, h) {
          var u = a.data(h, i);
          if (!u)
            return void s(
              i + " not initialized. Cannot call methods, i.e. " + r
            );
          var d = u[e];
          if (!d || "_" == e.charAt(0))
            return void s(r + " is not a valid method");
          var c = d.apply(u, n);
          o = void 0 === o ? c : o;
        }),
        void 0 !== o ? o : t
      );
    }
    function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (r.prototype.option ||
          (r.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ("string" == typeof t) {
            var e = o.call(arguments, 1);
            return h(this, t, e);
          }
          return u(this, t), this;
        }),
        n(a));
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var o = Array.prototype.slice,
    r = t.console,
    s =
      "undefined" == typeof r
        ? function () {}
        : function (t) {
            r.error(t);
          };
  return n(e || t.jQuery), i;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })(this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            n = (i[t] = i[t] || []);
          return (n[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = 0,
            o = i[n];
          e = e || [];
          for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
            var s = r && r[o];
            s && (this.off(t, o), delete r[o]),
              o.apply(this, e),
              (n += s ? 0 : 1),
              (o = i[n]);
          }
          return this;
        }
      }),
      t
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("get-size/get-size", [], function () {
          return e();
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        u > e;
        e++
      ) {
        var i = h[e];
        t[i] = 0;
      }
      return t;
    }
    function n(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function o() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var o = n(e);
        (r.isBoxSizeOuter = s = 200 == t(o.width)), i.removeChild(e);
      }
    }
    function r(e) {
      if (
        (o(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var r = n(e);
        if ("none" == r.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = "border-box" == r.boxSizing), c = 0;
          u > c;
          c++
        ) {
          var l = h[c],
            f = r[l],
            m = parseFloat(f);
          a[l] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          E = a.borderTopWidth + a.borderBottomWidth,
          z = d && s,
          b = t(r.width);
        b !== !1 && (a.width = b + (z ? 0 : p + _));
        var x = t(r.height);
        return (
          x !== !1 && (a.height = x + (z ? 0 : g + E)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (g + E)),
          (a.outerWidth = a.width + y),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var s,
      a =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      h = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      u = h.length,
      d = !1;
    return r;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + "MatchesSelector";
        if (t[o]) return o;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      }),
      (i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t);
              e(t, n) && o.push(t);
              for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                o.push(i[r]);
            }
          }),
          o
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          t && clearTimeout(t);
          var e = arguments,
            r = this;
          this[o] = setTimeout(function () {
            n.apply(r, e), delete r[o];
          }, i || 100);
        };
      }),
      (i.docReady = function (t) {
        "complete" == document.readyState
          ? t()
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var n = t.console;
    return (
      (i.htmlInit = function (e, o) {
        i.docReady(function () {
          var r = i.toDashed(o),
            s = "data-" + r,
            a = document.querySelectorAll("[" + s + "]"),
            h = document.querySelectorAll(".js-" + r),
            u = i.makeArray(a).concat(i.makeArray(h)),
            d = s + "-options",
            c = t.jQuery;
          u.forEach(function (t) {
            var i,
              r = t.getAttribute(s) || t.getAttribute(d);
            try {
              i = r && JSON.parse(r);
            } catch (a) {
              return void (
                n &&
                n.error("Error parsing " + s + " on " + t.className + ": " + a)
              );
            }
            var h = new e(t, i);
            c && c.data(t, o, h);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t, t.EvEmitter, t.getSize)));
  })(window, function (t, e, i) {
    "use strict";
    function n(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function o(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function r(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var s = document.documentElement.style,
      a = "string" == typeof s.transition ? "transition" : "WebkitTransition",
      h = "string" == typeof s.transform ? "transform" : "WebkitTransform",
      u = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[a],
      d = [h, a, a + "Duration", a + "Property"],
      c = (o.prototype = Object.create(e.prototype));
    (c.constructor = o),
      (c._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (c.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (c.getSize = function () {
        this.size = i(this.element);
      }),
      (c.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var n = d[i] || i;
          e[n] = t[i];
        }
      }),
      (c.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          n = t[e ? "left" : "right"],
          o = t[i ? "top" : "bottom"],
          r = this.layout.size,
          s =
            -1 != n.indexOf("%")
              ? (parseFloat(n) / 100) * r.width
              : parseInt(n, 10),
          a =
            -1 != o.indexOf("%")
              ? (parseFloat(o) / 100) * r.height
              : parseInt(o, 10);
        (s = isNaN(s) ? 0 : s),
          (a = isNaN(a) ? 0 : a),
          (s -= e ? r.paddingLeft : r.paddingRight),
          (a -= i ? r.paddingTop : r.paddingBottom),
          (this.position.x = s),
          (this.position.y = a);
      }),
      (c.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop"),
          o = i ? "paddingLeft" : "paddingRight",
          r = i ? "left" : "right",
          s = i ? "right" : "left",
          a = this.position.x + t[o];
        (e[r] = this.getXValue(a)), (e[s] = "");
        var h = n ? "paddingTop" : "paddingBottom",
          u = n ? "top" : "bottom",
          d = n ? "bottom" : "top",
          c = this.position.y + t[h];
        (e[u] = this.getYValue(c)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (c.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (c.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (c._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = parseInt(t, 10),
          r = parseInt(e, 10),
          s = o === this.position.x && r === this.position.y;
        if ((this.setPosition(t, e), s && !this.isTransitioning))
          return void this.layoutPosition();
        var a = t - i,
          h = e - n,
          u = {};
        (u.transform = this.getTranslate(a, h)),
          this.transition({
            to: u,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (c.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = n ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (c.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (c.moveTo = c._transitionTo),
      (c.setPosition = function (t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (c._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (c._transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var n = this.element.offsetHeight;
          n = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = "opacity," + r(d.transform || "transform");
    (c.enableTransition = function () {
      this.isTransitioning ||
        (this.css({
          transitionProperty: l,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(u, this, !1));
    }),
      (c.transition = o.prototype[a ? "_transition" : "_nonTransition"]),
      (c.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (c.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var f = { "-webkit-transform": "transform" };
    (c.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = f[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[i],
          n(e.ingProperties) && this.disableTransition(),
          i in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
          i in e.onEnd)
        ) {
          var o = e.onEnd[i];
          o.call(this), delete e.onEnd[i];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (c.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(u, this, !1),
          (this.isTransitioning = !1);
      }),
      (c._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var m = { transitionProperty: "", transitionDuration: "" };
    return (
      (c.removeTransitionStyles = function () {
        this.css(m);
      }),
      (c.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (c.remove = function () {
        return a && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (c.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (c.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (c.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (c.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (c.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (c.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      o
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, n, o, r) {
            return e(t, i, n, o, r);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, n, o) {
    "use strict";
    function r(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return void (
          a &&
          a.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        h && (this.$element = h(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++d;
      (this.element.outlayerGUID = o), (c[o] = this), this._create();
      var r = this._getOption("initLayout");
      r && this.layout();
    }
    function s(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    var a = t.console,
      h = t.jQuery,
      u = function () {},
      d = 0,
      c = {};
    (r.namespace = "outlayer"),
      (r.Item = o),
      (r.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var l = r.prototype;
    return (
      n.extend(l, e.prototype),
      (l.option = function (t) {
        n.extend(this.options, t);
      }),
      (l._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (l._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (l.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (l._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var r = e[o],
            s = new i(r, this);
          n.push(s);
        }
        return n;
      }),
      (l._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (l.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (l.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (l._init = l.layout),
      (l._resetLayout = function () {
        this.getSize();
      }),
      (l.getSize = function () {
        this.size = i(this.element);
      }),
      (l._getMeasurement = function (t, e) {
        var n,
          o = this.options[t];
        o
          ? ("string" == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (l.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (l._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (l._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (l._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (l._processLayoutQueue = function (t) {
        t.forEach(function (t) {
          this._positionItem(t.item, t.x, t.y, t.isInstant);
        }, this);
      }),
      (l._positionItem = function (t, e, i, n) {
        n ? t.goTo(e, i) : t.moveTo(e, i);
      }),
      (l._postLayout = function () {
        this.resizeContainer();
      }),
      (l.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (l._getContainerSize = u),
      (l._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (l._emitCompleteOnItems = function (t, e) {
        function i() {
          o.dispatchEvent(t + "Complete", null, [e]);
        }
        function n() {
          s++, s == r && i();
        }
        var o = this,
          r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function (e) {
          e.once(t, n);
        });
      }),
      (l.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), h))
          if (((this.$element = this.$element || h(this.element)), e)) {
            var o = h.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (l.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (l.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (l.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (l.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              n.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (l._find = function (t) {
        return t
          ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (l._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (l._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (l._manageStamp = u),
      (l._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t),
          r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom,
          };
        return r;
      }),
      (l.handleEvent = n.handleEvent),
      (l.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (l.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (l.onresize = function () {
        this.resize();
      }),
      n.debounceMethod(r, "onresize", 100),
      (l.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (l.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (l.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (l.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (l.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (l.reveal = function (t) {
        this._emitCompleteOnItems("reveal", t),
          t &&
            t.length &&
            t.forEach(function (t) {
              t.reveal();
            });
      }),
      (l.hide = function (t) {
        this._emitCompleteOnItems("hide", t),
          t &&
            t.length &&
            t.forEach(function (t) {
              t.hide();
            });
      }),
      (l.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (l.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (l.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (l.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (l.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (l.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace);
      }),
      (r.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e];
      }),
      (r.create = function (t, e) {
        var i = s(r);
        return (
          (i.defaults = n.extend({}, r.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, r.compatOptions)),
          (i.namespace = t),
          (i.data = r.data),
          (i.Item = s(o)),
          n.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        );
      }),
      (r.Item = o),
      r
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(["outlayer/outlayer", "get-size/get-size"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    return (
      (i.compatOptions.fitWidth = "isFitWidth"),
      (i.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0;
      }),
      (i.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          r = o / n,
          s = n - (o % n),
          a = s && 1 > s ? "round" : "floor";
        (r = Math[a](r)), (this.cols = Math.max(r, 1));
      }),
      (i.prototype.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
          i = t ? this.element.parentNode : this.element,
          n = e(i);
        this.containerWidth = n && n.innerWidth;
      }),
      (i.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && 1 > e ? "round" : "ceil",
          n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (
          var o = this._getColGroup(n),
            r = Math.min.apply(Math, o),
            s = o.indexOf(r),
            a = { x: this.columnWidth * s, y: r },
            h = r + t.size.outerHeight,
            u = this.cols + 1 - o.length,
            d = 0;
          u > d;
          d++
        )
          this.colYs[s + d] = h;
        return a;
      }),
      (i.prototype._getColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
          var o = this.colYs.slice(n, n + t);
          e[n] = Math.max.apply(Math, o);
        }
        return e;
      }),
      (i.prototype._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption("originLeft"),
          r = o ? n.left : n.right,
          s = r + i.outerWidth,
          a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        (h -= s % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var u = this._getOption("originTop"),
            d = (u ? n.top : n.bottom) + i.outerHeight,
            c = a;
          h >= c;
          c++
        )
          this.colYs[c] = Math.max(d, this.colYs[c]);
      }),
      (i.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (i.prototype._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (i.prototype.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  });

/*!
 * imagesLoaded PACKAGED v3.2.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function () {
  "use strict";
  function e() {}
  function t(e, t) {
    for (var n = e.length; n--; ) if (e[n].listener === t) return n;
    return -1;
  }
  function n(e) {
    return function () {
      return this[e].apply(this, arguments);
    };
  }
  var i = e.prototype,
    r = this,
    s = r.EventEmitter;
  (i.getListeners = function (e) {
    var t,
      n,
      i = this._getEvents();
    if ("object" == typeof e) {
      t = {};
      for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
    } else t = i[e] || (i[e] = []);
    return t;
  }),
    (i.flattenListeners = function (e) {
      var t,
        n = [];
      for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
      return n;
    }),
    (i.getListenersAsObject = function (e) {
      var t,
        n = this.getListeners(e);
      return n instanceof Array && ((t = {}), (t[e] = n)), t || n;
    }),
    (i.addListener = function (e, n) {
      var i,
        r = this.getListenersAsObject(e),
        s = "object" == typeof n;
      for (i in r)
        r.hasOwnProperty(i) &&
          -1 === t(r[i], n) &&
          r[i].push(s ? n : { listener: n, once: !1 });
      return this;
    }),
    (i.on = n("addListener")),
    (i.addOnceListener = function (e, t) {
      return this.addListener(e, { listener: t, once: !0 });
    }),
    (i.once = n("addOnceListener")),
    (i.defineEvent = function (e) {
      return this.getListeners(e), this;
    }),
    (i.defineEvents = function (e) {
      for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
      return this;
    }),
    (i.removeListener = function (e, n) {
      var i,
        r,
        s = this.getListenersAsObject(e);
      for (r in s)
        s.hasOwnProperty(r) &&
          ((i = t(s[r], n)), -1 !== i && s[r].splice(i, 1));
      return this;
    }),
    (i.off = n("removeListener")),
    (i.addListeners = function (e, t) {
      return this.manipulateListeners(!1, e, t);
    }),
    (i.removeListeners = function (e, t) {
      return this.manipulateListeners(!0, e, t);
    }),
    (i.manipulateListeners = function (e, t, n) {
      var i,
        r,
        s = e ? this.removeListener : this.addListener,
        o = e ? this.removeListeners : this.addListeners;
      if ("object" != typeof t || t instanceof RegExp)
        for (i = n.length; i--; ) s.call(this, t, n[i]);
      else
        for (i in t)
          t.hasOwnProperty(i) &&
            (r = t[i]) &&
            ("function" == typeof r ? s.call(this, i, r) : o.call(this, i, r));
      return this;
    }),
    (i.removeEvent = function (e) {
      var t,
        n = typeof e,
        i = this._getEvents();
      if ("string" === n) delete i[e];
      else if ("object" === n)
        for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
      else delete this._events;
      return this;
    }),
    (i.removeAllListeners = n("removeEvent")),
    (i.emitEvent = function (e, t) {
      var n,
        i,
        r,
        s,
        o = this.getListenersAsObject(e);
      for (r in o)
        if (o.hasOwnProperty(r))
          for (i = o[r].length; i--; )
            (n = o[r][i]),
              n.once === !0 && this.removeListener(e, n.listener),
              (s = n.listener.apply(this, t || [])),
              s === this._getOnceReturnValue() &&
                this.removeListener(e, n.listener);
      return this;
    }),
    (i.trigger = n("emitEvent")),
    (i.emit = function (e) {
      var t = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(e, t);
    }),
    (i.setOnceReturnValue = function (e) {
      return (this._onceReturnValue = e), this;
    }),
    (i._getOnceReturnValue = function () {
      return this.hasOwnProperty("_onceReturnValue")
        ? this._onceReturnValue
        : !0;
    }),
    (i._getEvents = function () {
      return this._events || (this._events = {});
    }),
    (e.noConflict = function () {
      return (r.EventEmitter = s), e;
    }),
    "function" == typeof define && define.amd
      ? define("eventEmitter/EventEmitter", [], function () {
          return e;
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e)
      : (this.EventEmitter = e);
}).call(this),
  (function (e) {
    function t(t) {
      var n = e.event;
      return (n.target = n.target || n.srcElement || t), n;
    }
    var n = document.documentElement,
      i = function () {};
    n.addEventListener
      ? (i = function (e, t, n) {
          e.addEventListener(t, n, !1);
        })
      : n.attachEvent &&
        (i = function (e, n, i) {
          (e[n + i] = i.handleEvent
            ? function () {
                var n = t(e);
                i.handleEvent.call(i, n);
              }
            : function () {
                var n = t(e);
                i.call(e, n);
              }),
            e.attachEvent("on" + n, e[n + i]);
        });
    var r = function () {};
    n.removeEventListener
      ? (r = function (e, t, n) {
          e.removeEventListener(t, n, !1);
        })
      : n.detachEvent &&
        (r = function (e, t, n) {
          e.detachEvent("on" + t, e[t + n]);
          try {
            delete e[t + n];
          } catch (i) {
            e[t + n] = void 0;
          }
        });
    var s = { bind: i, unbind: r };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", s)
      : (e.eventie = s);
  })(this),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          ["eventEmitter/EventEmitter", "eventie/eventie"],
          function (n, i) {
            return t(e, n, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = t(
          e,
          require("wolfy87-eventemitter"),
          require("eventie")
        ))
      : (e.imagesLoaded = t(e, e.EventEmitter, e.eventie));
  })(window, function (e, t, n) {
    function i(e, t) {
      for (var n in t) e[n] = t[n];
      return e;
    }
    function r(e) {
      return "[object Array]" == f.call(e);
    }
    function s(e) {
      var t = [];
      if (r(e)) t = e;
      else if ("number" == typeof e.length)
        for (var n = 0; n < e.length; n++) t.push(e[n]);
      else t.push(e);
      return t;
    }
    function o(e, t, n) {
      if (!(this instanceof o)) return new o(e, t, n);
      "string" == typeof e && (e = document.querySelectorAll(e)),
        (this.elements = s(e)),
        (this.options = i({}, this.options)),
        "function" == typeof t ? (n = t) : i(this.options, t),
        n && this.on("always", n),
        this.getImages(),
        u && (this.jqDeferred = new u.Deferred());
      var r = this;
      setTimeout(function () {
        r.check();
      });
    }
    function h(e) {
      this.img = e;
    }
    function a(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var u = e.jQuery,
      c = e.console,
      f = Object.prototype.toString;
    (o.prototype = new t()),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        this.images = [];
        for (var e = 0; e < this.elements.length; e++) {
          var t = this.elements[e];
          this.addElementImages(t);
        }
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
          for (var n = e.querySelectorAll("img"), i = 0; i < n.length; i++) {
            var r = n[i];
            this.addImage(r);
          }
          if ("string" == typeof this.options.background) {
            var s = e.querySelectorAll(this.options.background);
            for (i = 0; i < s.length; i++) {
              var o = s[i];
              this.addElementBackgroundImages(o);
            }
          }
        }
      });
    var d = { 1: !0, 9: !0, 11: !0 };
    o.prototype.addElementBackgroundImages = function (e) {
      for (
        var t = m(e),
          n = /url\(['"]*([^'"\)]+)['"]*\)/gi,
          i = n.exec(t.backgroundImage);
        null !== i;

      ) {
        var r = i && i[1];
        r && this.addBackground(r, e), (i = n.exec(t.backgroundImage));
      }
    };
    var m =
      e.getComputedStyle ||
      function (e) {
        return e.currentStyle;
      };
    return (
      (o.prototype.addImage = function (e) {
        var t = new h(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var n = new a(e, t);
        this.images.push(n);
      }),
      (o.prototype.check = function () {
        function e(e, n, i) {
          setTimeout(function () {
            t.progress(e, n, i);
          });
        }
        var t = this;
        if (
          ((this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          !this.images.length)
        )
          return void this.complete();
        for (var n = 0; n < this.images.length; n++) {
          var i = this.images[n];
          i.once("progress", e), i.check();
        }
      }),
      (o.prototype.progress = function (e, t, n) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emit("progress", this, e, t),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && c && c.log("progress: " + n, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emit(e, this),
          this.emit("always", this),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (h.prototype = new t()),
      (h.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            n.bind(this.proxyImage, "load", this),
            n.bind(this.proxyImage, "error", this),
            n.bind(this.img, "load", this),
            n.bind(this.img, "error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (h.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth;
      }),
      (h.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emit("progress", this, this.img, t);
      }),
      (h.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (h.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (h.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (h.prototype.unbindEvents = function () {
        n.unbind(this.proxyImage, "load", this),
          n.unbind(this.proxyImage, "error", this),
          n.unbind(this.img, "load", this),
          n.unbind(this.img, "error", this);
      }),
      (a.prototype = new h()),
      (a.prototype.check = function () {
        n.bind(this.img, "load", this),
          n.bind(this.img, "error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (a.prototype.unbindEvents = function () {
        n.unbind(this.img, "load", this), n.unbind(this.img, "error", this);
      }),
      (a.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emit("progress", this, this.element, t);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((u = t),
            (u.fn.imagesLoaded = function (e, t) {
              var n = new o(this, e, t);
              return n.jqDeferred.promise(u(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });

/*
 * google code-prettify
 */
!(function () {
  var q = null;
  window.PR_SHOULD_USE_CONTINUATION = !0;
  (function () {
    function S(a) {
      function d(e) {
        var b = e.charCodeAt(0);
        if (b !== 92) return b;
        var a = e.charAt(1);
        return (b = r[a])
          ? b
          : "0" <= a && a <= "7"
          ? parseInt(e.substring(1), 8)
          : a === "u" || a === "x"
          ? parseInt(e.substring(2), 16)
          : e.charCodeAt(1);
      }
      function g(e) {
        if (e < 32) return (e < 16 ? "\\x0" : "\\x") + e.toString(16);
        e = String.fromCharCode(e);
        return e === "\\" || e === "-" || e === "]" || e === "^" ? "\\" + e : e;
      }
      function b(e) {
        var b = e
            .substring(1, e.length - 1)
            .match(
              /\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g
            ),
          e = [],
          a = b[0] === "^",
          c = ["["];
        a && c.push("^");
        for (var a = a ? 1 : 0, f = b.length; a < f; ++a) {
          var h = b[a];
          if (/\\[bdsw]/i.test(h)) c.push(h);
          else {
            var h = d(h),
              l;
            a + 2 < f && "-" === b[a + 1]
              ? ((l = d(b[a + 2])), (a += 2))
              : (l = h);
            e.push([h, l]);
            l < 65 ||
              h > 122 ||
              (l < 65 ||
                h > 90 ||
                e.push([Math.max(65, h) | 32, Math.min(l, 90) | 32]),
              l < 97 ||
                h > 122 ||
                e.push([Math.max(97, h) & -33, Math.min(l, 122) & -33]));
          }
        }
        e.sort(function (e, a) {
          return e[0] - a[0] || a[1] - e[1];
        });
        b = [];
        f = [];
        for (a = 0; a < e.length; ++a)
          (h = e[a]),
            h[0] <= f[1] + 1 ? (f[1] = Math.max(f[1], h[1])) : b.push((f = h));
        for (a = 0; a < b.length; ++a)
          (h = b[a]),
            c.push(g(h[0])),
            h[1] > h[0] && (h[1] + 1 > h[0] && c.push("-"), c.push(g(h[1])));
        c.push("]");
        return c.join("");
      }
      function s(e) {
        for (
          var a = e.source.match(
              /\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g
            ),
            c = a.length,
            d = [],
            f = 0,
            h = 0;
          f < c;
          ++f
        ) {
          var l = a[f];
          l === "("
            ? ++h
            : "\\" === l.charAt(0) &&
              (l = +l.substring(1)) &&
              (l <= h ? (d[l] = -1) : (a[f] = g(l)));
        }
        for (f = 1; f < d.length; ++f) -1 === d[f] && (d[f] = ++x);
        for (h = f = 0; f < c; ++f)
          (l = a[f]),
            l === "("
              ? (++h, d[h] || (a[f] = "(?:"))
              : "\\" === l.charAt(0) &&
                (l = +l.substring(1)) &&
                l <= h &&
                (a[f] = "\\" + d[l]);
        for (f = 0; f < c; ++f) "^" === a[f] && "^" !== a[f + 1] && (a[f] = "");
        if (e.ignoreCase && m)
          for (f = 0; f < c; ++f)
            (l = a[f]),
              (e = l.charAt(0)),
              l.length >= 2 && e === "["
                ? (a[f] = b(l))
                : e !== "\\" &&
                  (a[f] = l.replace(/[A-Za-z]/g, function (a) {
                    a = a.charCodeAt(0);
                    return "[" + String.fromCharCode(a & -33, a | 32) + "]";
                  }));
        return a.join("");
      }
      for (var x = 0, m = !1, j = !1, k = 0, c = a.length; k < c; ++k) {
        var i = a[k];
        if (i.ignoreCase) j = !0;
        else if (
          /[a-z]/i.test(
            i.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, "")
          )
        ) {
          m = !0;
          j = !1;
          break;
        }
      }
      for (
        var r = { b: 8, t: 9, n: 10, v: 11, f: 12, r: 13 },
          n = [],
          k = 0,
          c = a.length;
        k < c;
        ++k
      ) {
        i = a[k];
        if (i.global || i.multiline) throw Error("" + i);
        n.push("(?:" + s(i) + ")");
      }
      return RegExp(n.join("|"), j ? "gi" : "g");
    }
    function T(a, d) {
      function g(a) {
        var c = a.nodeType;
        if (c == 1) {
          if (!b.test(a.className)) {
            for (c = a.firstChild; c; c = c.nextSibling) g(c);
            c = a.nodeName.toLowerCase();
            if ("br" === c || "li" === c)
              (s[j] = "\n"), (m[j << 1] = x++), (m[(j++ << 1) | 1] = a);
          }
        } else if (c == 3 || c == 4)
          (c = a.nodeValue),
            c.length &&
              ((c = d
                ? c.replace(/\r\n?/g, "\n")
                : c.replace(/[\t\n\r ]+/g, " ")),
              (s[j] = c),
              (m[j << 1] = x),
              (x += c.length),
              (m[(j++ << 1) | 1] = a));
      }
      var b = /(?:^|\s)nocode(?:\s|$)/,
        s = [],
        x = 0,
        m = [],
        j = 0;
      g(a);
      return { a: s.join("").replace(/\n$/, ""), d: m };
    }
    function H(a, d, g, b) {
      d && ((a = { a: d, e: a }), g(a), b.push.apply(b, a.g));
    }
    function U(a) {
      for (var d = void 0, g = a.firstChild; g; g = g.nextSibling)
        var b = g.nodeType,
          d =
            b === 1 ? (d ? a : g) : b === 3 ? (V.test(g.nodeValue) ? a : d) : d;
      return d === a ? void 0 : d;
    }
    function C(a, d) {
      function g(a) {
        for (
          var j = a.e,
            k = [j, "pln"],
            c = 0,
            i = a.a.match(s) || [],
            r = {},
            n = 0,
            e = i.length;
          n < e;
          ++n
        ) {
          var z = i[n],
            w = r[z],
            t = void 0,
            f;
          if (typeof w === "string") f = !1;
          else {
            var h = b[z.charAt(0)];
            if (h) (t = z.match(h[1])), (w = h[0]);
            else {
              for (f = 0; f < x; ++f)
                if (((h = d[f]), (t = z.match(h[1])))) {
                  w = h[0];
                  break;
                }
              t || (w = "pln");
            }
            if (
              (f = w.length >= 5 && "lang-" === w.substring(0, 5)) &&
              !(t && typeof t[1] === "string")
            )
              (f = !1), (w = "src");
            f || (r[z] = w);
          }
          h = c;
          c += z.length;
          if (f) {
            f = t[1];
            var l = z.indexOf(f),
              B = l + f.length;
            t[2] && ((B = z.length - t[2].length), (l = B - f.length));
            w = w.substring(5);
            H(j + h, z.substring(0, l), g, k);
            H(j + h + l, f, I(w, f), k);
            H(j + h + B, z.substring(B), g, k);
          } else k.push(j + h, w);
        }
        a.g = k;
      }
      var b = {},
        s;
      (function () {
        for (
          var g = a.concat(d), j = [], k = {}, c = 0, i = g.length;
          c < i;
          ++c
        ) {
          var r = g[c],
            n = r[3];
          if (n) for (var e = n.length; --e >= 0; ) b[n.charAt(e)] = r;
          r = r[1];
          n = "" + r;
          k.hasOwnProperty(n) || (j.push(r), (k[n] = q));
        }
        j.push(/[\S\s]/);
        s = S(j);
      })();
      var x = d.length;
      return g;
    }
    function v(a) {
      var d = [],
        g = [];
      a.tripleQuotedStrings
        ? d.push([
            "str",
            /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,
            q,
            "'\"",
          ])
        : a.multiLineStrings
        ? d.push([
            "str",
            /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
            q,
            "'\"`",
          ])
        : d.push([
            "str",
            /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,
            q,
            "\"'",
          ]);
      a.verbatimStrings && g.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
      var b = a.hashComments;
      b &&
        (a.cStyleComments
          ? (b > 1
              ? d.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"])
              : d.push([
                  "com",
                  /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/,
                  q,
                  "#",
                ]),
            g.push([
              "str",
              /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,
              q,
            ]))
          : d.push(["com", /^#[^\n\r]*/, q, "#"]));
      a.cStyleComments &&
        (g.push(["com", /^\/\/[^\n\r]*/, q]),
        g.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q]));
      if ((b = a.regexLiterals)) {
        var s = (b = b > 1 ? "" : "\n\r") ? "." : "[\\S\\s]";
        g.push([
          "lang-regex",
          RegExp(
            "^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" +
              ("/(?=[^/*" +
                b +
                "])(?:[^/\\x5B\\x5C" +
                b +
                "]|\\x5C" +
                s +
                "|\\x5B(?:[^\\x5C\\x5D" +
                b +
                "]|\\x5C" +
                s +
                ")*(?:\\x5D|$))+/") +
              ")"
          ),
        ]);
      }
      (b = a.types) && g.push(["typ", b]);
      b = ("" + a.keywords).replace(/^ | $/g, "");
      b.length &&
        g.push(["kwd", RegExp("^(?:" + b.replace(/[\s,]+/g, "|") + ")\\b"), q]);
      d.push(["pln", /^\s+/, q, " \r\n\t\u00a0"]);
      b = "^.[^\\s\\w.$@'\"`/\\\\]*";
      a.regexLiterals && (b += "(?!s*/)");
      g.push(
        ["lit", /^@[$_a-z][\w$@]*/i, q],
        ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q],
        ["pln", /^[$_a-z][\w$@]*/i, q],
        [
          "lit",
          /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,
          q,
          "0123456789",
        ],
        ["pln", /^\\[\S\s]?/, q],
        ["pun", RegExp(b), q]
      );
      return C(d, g);
    }
    function J(a, d, g) {
      function b(a) {
        var c = a.nodeType;
        if (c == 1 && !x.test(a.className))
          if ("br" === a.nodeName)
            s(a), a.parentNode && a.parentNode.removeChild(a);
          else for (a = a.firstChild; a; a = a.nextSibling) b(a);
        else if ((c == 3 || c == 4) && g) {
          var d = a.nodeValue,
            i = d.match(m);
          if (i)
            (c = d.substring(0, i.index)),
              (a.nodeValue = c),
              (d = d.substring(i.index + i[0].length)) &&
                a.parentNode.insertBefore(j.createTextNode(d), a.nextSibling),
              s(a),
              c || a.parentNode.removeChild(a);
        }
      }
      function s(a) {
        function b(a, c) {
          var d = c ? a.cloneNode(!1) : a,
            e = a.parentNode;
          if (e) {
            var e = b(e, 1),
              g = a.nextSibling;
            e.appendChild(d);
            for (var i = g; i; i = g) (g = i.nextSibling), e.appendChild(i);
          }
          return d;
        }
        for (; !a.nextSibling; ) if (((a = a.parentNode), !a)) return;
        for (
          var a = b(a.nextSibling, 0), d;
          (d = a.parentNode) && d.nodeType === 1;

        )
          a = d;
        c.push(a);
      }
      for (
        var x = /(?:^|\s)nocode(?:\s|$)/,
          m = /\r\n?|\n/,
          j = a.ownerDocument,
          k = j.createElement("li");
        a.firstChild;

      )
        k.appendChild(a.firstChild);
      for (var c = [k], i = 0; i < c.length; ++i) b(c[i]);
      d === (d | 0) && c[0].setAttribute("value", d);
      var r = j.createElement("ol");
      r.className = "linenums";
      for (
        var d = Math.max(0, (d - 1) | 0) || 0, i = 0, n = c.length;
        i < n;
        ++i
      )
        (k = c[i]),
          (k.className = "L" + ((i + d) % 10)),
          k.firstChild || k.appendChild(j.createTextNode("\u00a0")),
          r.appendChild(k);
      a.appendChild(r);
    }
    function p(a, d) {
      for (var g = d.length; --g >= 0; ) {
        var b = d[g];
        F.hasOwnProperty(b)
          ? D.console && console.warn("cannot override language handler %s", b)
          : (F[b] = a);
      }
    }
    function I(a, d) {
      if (!a || !F.hasOwnProperty(a))
        a = /^\s*</.test(d) ? "default-markup" : "default-code";
      return F[a];
    }
    function K(a) {
      var d = a.h;
      try {
        var g = T(a.c, a.i),
          b = g.a;
        a.a = b;
        a.d = g.d;
        a.e = 0;
        I(d, b)(a);
        var s = /\bMSIE\s(\d+)/.exec(navigator.userAgent),
          s = s && +s[1] <= 8,
          d = /\n/g,
          x = a.a,
          m = x.length,
          g = 0,
          j = a.d,
          k = j.length,
          b = 0,
          c = a.g,
          i = c.length,
          r = 0;
        c[i] = m;
        var n, e;
        for (e = n = 0; e < i; )
          c[e] !== c[e + 2] ? ((c[n++] = c[e++]), (c[n++] = c[e++])) : (e += 2);
        i = n;
        for (e = n = 0; e < i; ) {
          for (
            var p = c[e], w = c[e + 1], t = e + 2;
            t + 2 <= i && c[t + 1] === w;

          )
            t += 2;
          c[n++] = p;
          c[n++] = w;
          e = t;
        }
        c.length = n;
        var f = a.c,
          h;
        if (f) (h = f.style.display), (f.style.display = "none");
        try {
          for (; b < k; ) {
            var l = j[b + 2] || m,
              B = c[r + 2] || m,
              t = Math.min(l, B),
              A = j[b + 1],
              G;
            if (A.nodeType !== 1 && (G = x.substring(g, t))) {
              s && (G = G.replace(d, "\r"));
              A.nodeValue = G;
              var L = A.ownerDocument,
                o = L.createElement("span");
              o.className = c[r + 1];
              var v = A.parentNode;
              v.replaceChild(o, A);
              o.appendChild(A);
              g < l &&
                ((j[b + 1] = A = L.createTextNode(x.substring(t, l))),
                v.insertBefore(A, o.nextSibling));
            }
            g = t;
            g >= l && (b += 2);
            g >= B && (r += 2);
          }
        } finally {
          if (f) f.style.display = h;
        }
      } catch (u) {
        D.console && console.log((u && u.stack) || u);
      }
    }
    var D = window,
      y = ["break,continue,do,else,for,if,return,while"],
      E = [
        [
          y,
          "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile",
        ],
        "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof",
      ],
      M = [
        E,
        "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where",
      ],
      N = [
        E,
        "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient",
      ],
      O = [
        N,
        "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where",
      ],
      E = [
        E,
        "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN",
      ],
      P = [
        y,
        "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None",
      ],
      Q = [
        y,
        "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END",
      ],
      W = [
        y,
        "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use",
      ],
      y = [y, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
      R =
        /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
      V = /\S/,
      X = v({
        keywords: [
          M,
          O,
          E,
          "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
          P,
          Q,
          y,
        ],
        hashComments: !0,
        cStyleComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0,
      }),
      F = {};
    p(X, ["default-code"]);
    p(
      C(
        [],
        [
          ["pln", /^[^<?]+/],
          ["dec", /^<!\w[^>]*(?:>|$)/],
          ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
          ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
          ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
          ["pun", /^(?:<[%?]|[%?]>)/],
          ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
          ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
          ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
          ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i],
        ]
      ),
      ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]
    );
    p(
      C(
        [
          ["pln", /^\s+/, q, " \t\r\n"],
          ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"],
        ],
        [
          ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
          ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
          ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
          ["pun", /^[/<->]+/],
          ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
          ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
          ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
          ["lang-css", /^style\s*=\s*"([^"]+)"/i],
          ["lang-css", /^style\s*=\s*'([^']+)'/i],
          ["lang-css", /^style\s*=\s*([^\s"'>]+)/i],
        ]
      ),
      ["in.tag"]
    );
    p(C([], [["atv", /^[\S\s]+/]]), ["uq.val"]);
    p(v({ keywords: M, hashComments: !0, cStyleComments: !0, types: R }), [
      "c",
      "cc",
      "cpp",
      "cxx",
      "cyc",
      "m",
    ]);
    p(v({ keywords: "null,true,false" }), ["json"]);
    p(
      v({
        keywords: O,
        hashComments: !0,
        cStyleComments: !0,
        verbatimStrings: !0,
        types: R,
      }),
      ["cs"]
    );
    p(v({ keywords: N, cStyleComments: !0 }), ["java"]);
    p(v({ keywords: y, hashComments: !0, multiLineStrings: !0 }), [
      "bash",
      "bsh",
      "csh",
      "sh",
    ]);
    p(
      v({
        keywords: P,
        hashComments: !0,
        multiLineStrings: !0,
        tripleQuotedStrings: !0,
      }),
      ["cv", "py", "python"]
    );
    p(
      v({
        keywords:
          "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: 2,
      }),
      ["perl", "pl", "pm"]
    );
    p(
      v({
        keywords: Q,
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0,
      }),
      ["rb", "ruby"]
    );
    p(v({ keywords: E, cStyleComments: !0, regexLiterals: !0 }), [
      "javascript",
      "js",
    ]);
    p(
      v({
        keywords:
          "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
        hashComments: 3,
        cStyleComments: !0,
        multilineStrings: !0,
        tripleQuotedStrings: !0,
        regexLiterals: !0,
      }),
      ["coffee"]
    );
    p(v({ keywords: W, cStyleComments: !0, multilineStrings: !0 }), [
      "rc",
      "rs",
      "rust",
    ]);
    p(C([], [["str", /^[\S\s]+/]]), ["regex"]);
    var Y = (D.PR = {
      createSimpleLexer: C,
      registerLangHandler: p,
      sourceDecorator: v,
      PR_ATTRIB_NAME: "atn",
      PR_ATTRIB_VALUE: "atv",
      PR_COMMENT: "com",
      PR_DECLARATION: "dec",
      PR_KEYWORD: "kwd",
      PR_LITERAL: "lit",
      PR_NOCODE: "nocode",
      PR_PLAIN: "pln",
      PR_PUNCTUATION: "pun",
      PR_SOURCE: "src",
      PR_STRING: "str",
      PR_TAG: "tag",
      PR_TYPE: "typ",
      prettyPrintOne: (D.prettyPrintOne = function (a, d, g) {
        var b = document.createElement("div");
        b.innerHTML = "<pre>" + a + "</pre>";
        b = b.firstChild;
        g && J(b, g, !0);
        K({ h: d, j: g, c: b, i: 1 });
        return b.innerHTML;
      }),
      prettyPrint: (D.prettyPrint = function (a, d) {
        function g() {
          for (
            var b = D.PR_SHOULD_USE_CONTINUATION ? c.now() + 250 : Infinity;
            i < p.length && c.now() < b;
            i++
          ) {
            for (var d = p[i], j = h, k = d; (k = k.previousSibling); ) {
              var m = k.nodeType,
                o = (m === 7 || m === 8) && k.nodeValue;
              if (
                o
                  ? !/^\??prettify\b/.test(o)
                  : m !== 3 || /\S/.test(k.nodeValue)
              )
                break;
              if (o) {
                j = {};
                o.replace(/\b(\w+)=([\w%+\-.:]+)/g, function (a, b, c) {
                  j[b] = c;
                });
                break;
              }
            }
            k = d.className;
            if ((j !== h || e.test(k)) && !v.test(k)) {
              m = !1;
              for (o = d.parentNode; o; o = o.parentNode)
                if (f.test(o.tagName) && o.className && e.test(o.className)) {
                  m = !0;
                  break;
                }
              if (!m) {
                d.className += " prettyprinted";
                m = j.lang;
                if (!m) {
                  var m = k.match(n),
                    y;
                  if (!m && (y = U(d)) && t.test(y.tagName))
                    m = y.className.match(n);
                  m && (m = m[1]);
                }
                if (w.test(d.tagName)) o = 1;
                else
                  var o = d.currentStyle,
                    u = s.defaultView,
                    o =
                      (o = o
                        ? o.whiteSpace
                        : u && u.getComputedStyle
                        ? u
                            .getComputedStyle(d, q)
                            .getPropertyValue("white-space")
                        : 0) && "pre" === o.substring(0, 3);
                u = j.linenums;
                if (!(u = u === "true" || +u))
                  u = (u = k.match(/\blinenums\b(?::(\d+))?/))
                    ? u[1] && u[1].length
                      ? +u[1]
                      : !0
                    : !1;
                u && J(d, u, o);
                r = { h: m, c: d, j: u, i: o };
                K(r);
              }
            }
          }
          i < p.length ? setTimeout(g, 250) : "function" === typeof a && a();
        }
        for (
          var b = d || document.body,
            s = b.ownerDocument || document,
            b = [
              b.getElementsByTagName("pre"),
              b.getElementsByTagName("code"),
              b.getElementsByTagName("xmp"),
            ],
            p = [],
            m = 0;
          m < b.length;
          ++m
        )
          for (var j = 0, k = b[m].length; j < k; ++j) p.push(b[m][j]);
        var b = q,
          c = Date;
        c.now ||
          (c = {
            now: function () {
              return +new Date();
            },
          });
        var i = 0,
          r,
          n = /\blang(?:uage)?-([\w.]+)(?!\S)/,
          e = /\bprettyprint\b/,
          v = /\bprettyprinted\b/,
          w = /pre|xmp/i,
          t = /^code$/i,
          f = /^(?:pre|code|xmp)$/i,
          h = {};
        g();
      }),
    });
    typeof define === "function" &&
      define.amd &&
      define("google-code-prettify", [], function () {
        return Y;
      });
  })();
})();

/*
 * jQuery Superfish Menu Plugin - v1.7.7
 * Copyright (c) 2015
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */
(function (e, s) {
  "use strict";
  var o = (function () {
    var o = {
        bcClass: "sf-breadcrumb",
        menuClass: "sf-js-enabled",
        anchorClass: "sf-with-ul",
        menuArrowClass: "sf-arrows",
      },
      n = (function () {
        var s = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(
          navigator.userAgent
        );
        return s && e("html").css("cursor", "pointer").on("click", e.noop), s;
      })(),
      t = (function () {
        var e = document.documentElement.style;
        return (
          "behavior" in e &&
          "fill" in e &&
          /iemobile/i.test(navigator.userAgent)
        );
      })(),
      i = (function () {
        return !!s.PointerEvent;
      })(),
      r = function (e, s) {
        var n = o.menuClass;
        s.cssArrows && (n += " " + o.menuArrowClass), e.toggleClass(n);
      },
      a = function (s, n) {
        return s
          .find("li." + n.pathClass)
          .slice(0, n.pathLevels)
          .addClass(n.hoverClass + " " + o.bcClass)
          .filter(function () {
            return e(this).children(n.popUpSelector).hide().show().length;
          })
          .removeClass(n.pathClass);
      },
      l = function (e) {
        e.children("a").toggleClass(o.anchorClass);
      },
      h = function (e) {
        var s = e.css("ms-touch-action"),
          o = e.css("touch-action");
        (o = o || s),
          (o = "pan-y" === o ? "auto" : "pan-y"),
          e.css({ "ms-touch-action": o, "touch-action": o });
      },
      u = function (s, o) {
        var r = "li:has(" + o.popUpSelector + ")";
        e.fn.hoverIntent && !o.disableHI
          ? s.hoverIntent(c, f, r)
          : s.on("mouseenter.superfish", r, c).on("mouseleave.superfish", r, f);
        var a = "MSPointerDown.superfish";
        i && (a = "pointerdown.superfish"),
          n || (a += " touchend.superfish"),
          t && (a += " mousedown.superfish"),
          s
            .on("focusin.superfish", "li", c)
            .on("focusout.superfish", "li", f)
            .on(a, "a", o, p);
      },
      p = function (s) {
        var o = e(this),
          n = m(o),
          t = o.siblings(s.data.popUpSelector);
        return n.onHandleTouch.call(t) === !1
          ? this
          : (t.length > 0 &&
              t.is(":hidden") &&
              (o.one("click.superfish", !1),
              "MSPointerDown" === s.type || "pointerdown" === s.type
                ? o.trigger("focus")
                : e.proxy(c, o.parent("li"))()),
            void 0);
      },
      c = function () {
        var s = e(this),
          o = m(s);
        clearTimeout(o.sfTimer),
          s.siblings().superfish("hide").end().superfish("show");
      },
      f = function () {
        var s = e(this),
          o = m(s);
        n
          ? e.proxy(d, s, o)()
          : (clearTimeout(o.sfTimer),
            (o.sfTimer = setTimeout(e.proxy(d, s, o), o.delay)));
      },
      d = function (s) {
        (s.retainPath = e.inArray(this[0], s.$path) > -1),
          this.superfish("hide"),
          this.parents("." + s.hoverClass).length ||
            (s.onIdle.call(v(this)), s.$path.length && e.proxy(c, s.$path)());
      },
      v = function (e) {
        return e.closest("." + o.menuClass);
      },
      m = function (e) {
        return v(e).data("sf-options");
      };
    return {
      hide: function (s) {
        if (this.length) {
          var o = this,
            n = m(o);
          if (!n) return this;
          var t = n.retainPath === !0 ? n.$path : "",
            i = o
              .find("li." + n.hoverClass)
              .add(this)
              .not(t)
              .removeClass(n.hoverClass)
              .children(n.popUpSelector),
            r = n.speedOut;
          if (
            (s && (i.show(), (r = 0)),
            (n.retainPath = !1),
            n.onBeforeHide.call(i) === !1)
          )
            return this;
          i.stop(!0, !0).animate(n.animationOut, r, function () {
            var s = e(this);
            n.onHide.call(s);
          });
        }
        return this;
      },
      show: function () {
        var e = m(this);
        if (!e) return this;
        var s = this.addClass(e.hoverClass),
          o = s.children(e.popUpSelector);
        return e.onBeforeShow.call(o) === !1
          ? this
          : (o.stop(!0, !0).animate(e.animation, e.speed, function () {
              e.onShow.call(o);
            }),
            this);
      },
      destroy: function () {
        return this.each(function () {
          var s,
            n = e(this),
            t = n.data("sf-options");
          return t
            ? ((s = n.find(t.popUpSelector).parent("li")),
              clearTimeout(t.sfTimer),
              r(n, t),
              l(s),
              h(n),
              n.off(".superfish").off(".hoverIntent"),
              s.children(t.popUpSelector).attr("style", function (e, s) {
                return s.replace(/display[^;]+;?/g, "");
              }),
              t.$path
                .removeClass(t.hoverClass + " " + o.bcClass)
                .addClass(t.pathClass),
              n.find("." + t.hoverClass).removeClass(t.hoverClass),
              t.onDestroy.call(n),
              n.removeData("sf-options"),
              void 0)
            : !1;
        });
      },
      init: function (s) {
        return this.each(function () {
          var n = e(this);
          if (n.data("sf-options")) return !1;
          var t = e.extend({}, e.fn.superfish.defaults, s),
            i = n.find(t.popUpSelector).parent("li");
          (t.$path = a(n, t)),
            n.data("sf-options", t),
            r(n, t),
            l(i),
            h(n),
            u(n, t),
            i.not("." + o.bcClass).superfish("hide", !0),
            t.onInit.call(this);
        });
      },
    };
  })();
  (e.fn.superfish = function (s) {
    return o[s]
      ? o[s].apply(this, Array.prototype.slice.call(arguments, 1))
      : "object" != typeof s && s
      ? e.error("Method " + s + " does not exist on jQuery.fn.superfish")
      : o.init.apply(this, arguments);
  }),
    (e.fn.superfish.defaults = {
      popUpSelector: "ul,.sf-mega",
      hoverClass: "sfHover",
      pathClass: "overrideThisToUse",
      pathLevels: 1,
      delay: 800,
      animation: { opacity: "show" },
      animationOut: { opacity: "hide" },
      speed: "normal",
      speedOut: "fast",
      cssArrows: !0,
      disableHI: !1,
      onInit: e.noop,
      onBeforeShow: e.noop,
      onShow: e.noop,
      onBeforeHide: e.noop,
      onHide: e.noop,
      onIdle: e.noop,
      onDestroy: e.noop,
      onHandleTouch: e.noop,
    });
})(jQuery, window);

/**
 * hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 **/
(function ($) {
  $.fn.hoverIntent = function (handlerIn, handlerOut, selector) {
    // default configuration values
    var cfg = {
      interval: 100,
      sensitivity: 7,
      timeout: 0,
    };

    if (typeof handlerIn === "object") {
      cfg = $.extend(cfg, handlerIn);
    } else if ($.isFunction(handlerOut)) {
      cfg = $.extend(cfg, {
        over: handlerIn,
        out: handlerOut,
        selector: selector,
      });
    } else {
      cfg = $.extend(cfg, {
        over: handlerIn,
        out: handlerIn,
        selector: handlerOut,
      });
    }

    // instantiate variables
    // cX, cY = current X and Y position of mouse, updated by mousemove event
    // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
    var cX, cY, pX, pY;

    // A private function for getting mouse position
    var track = function (ev) {
      cX = ev.pageX;
      cY = ev.pageY;
    };

    // A private function for comparing current and previous mouse position
    var compare = function (ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      // compare mouse positions to see if they've crossed the threshold
      if (Math.abs(pX - cX) + Math.abs(pY - cY) < cfg.sensitivity) {
        $(ob).off("mousemove.hoverIntent", track);
        // set hoverIntent state to true (so mouseOut can be called)
        ob.hoverIntent_s = 1;
        return cfg.over.apply(ob, [ev]);
      } else {
        // set previous coordinates for next time
        pX = cX;
        pY = cY;
        // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
        ob.hoverIntent_t = setTimeout(function () {
          compare(ev, ob);
        }, cfg.interval);
      }
    };

    // A private function for delaying the mouseOut function
    var delay = function (ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      ob.hoverIntent_s = 0;
      return cfg.out.apply(ob, [ev]);
    };

    // A private function for handling mouse 'hovering'
    var handleHover = function (e) {
      // copy objects to be passed into t (required for event object to be passed in IE)
      var ev = jQuery.extend({}, e);
      var ob = this;

      // cancel hoverIntent timer if it exists
      if (ob.hoverIntent_t) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      }

      // if e.type == "mouseenter"
      if (e.type == "mouseenter") {
        // set "previous" X and Y position based on initial entry point
        pX = ev.pageX;
        pY = ev.pageY;
        // update "current" X and Y position based on mousemove
        $(ob).on("mousemove.hoverIntent", track);
        // start polling interval (self-calling timeout) to compare mouse coordinates over time
        if (ob.hoverIntent_s != 1) {
          ob.hoverIntent_t = setTimeout(function () {
            compare(ev, ob);
          }, cfg.interval);
        }

        // else e.type == "mouseleave"
      } else {
        // unbind expensive mousemove event
        $(ob).off("mousemove.hoverIntent", track);
        // if hoverIntent state is true, then call the mouseOut function after the specified delay
        if (ob.hoverIntent_s == 1) {
          ob.hoverIntent_t = setTimeout(function () {
            delay(ev, ob);
          }, cfg.timeout);
        }
      }
    };

    // listen for mouseenter and mouseleave
    return this.on(
      {
        "mouseenter.hoverIntent": handleHover,
        "mouseleave.hoverIntent": handleHover,
      },
      cfg.selector
    );
  };
})(jQuery);
