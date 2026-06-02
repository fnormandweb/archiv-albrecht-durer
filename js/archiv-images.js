/**
 * ARCHIV — système d’images musée (fallbacks, cadres, object-fit)
 */
(function (global) {
    "use strict";

    global.ARCHIV_PLACEHOLDER_IMAGE = "img/durer/placeholder-artwork.svg";

    function esc(s) {
        if (!s) return "";
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
    }

    function isPrintWork(work) {
        return work && (work.category === "burin" || work.category === "bois");
    }

    /** Contexte : card | print | detail | lightbox | hero | portrait */
    global.archivImageFit = function (context, work) {
        var print = isPrintWork(work);
        if (context === "hero") {
            return { fit: "cover", position: (work && work.imagePosition) || "center 22%", ratio: null, mat: "dark" };
        }
        if (context === "detail" || context === "lightbox") {
            return { fit: "contain", position: "center", ratio: null, mat: "dark" };
        }
        if (context === "feature") {
            return { fit: "contain", position: "center", ratio: "16/11", mat: "paper" };
        }
        if (context === "portrait") {
            return { fit: "cover", position: (work && work.imagePosition) || "center top", ratio: "4/5", mat: "dark" };
        }
        if (context === "print" || print) {
            return { fit: "contain", position: "center", ratio: "3/4", mat: "paper" };
        }
        return { fit: "cover", position: (work && work.imagePosition) || "center top", ratio: "4/5", mat: "dark" };
    };

    global.archivImageFallbackChain = function (work) {
        if (!work) return [global.ARCHIV_PLACEHOLDER_IMAGE];
        var seen = {};
        var chain = [];

        function add(u) {
            if (!u || seen[u]) return;
            seen[u] = true;
            chain.push(u);
        }

        var media = global.archivMedia ? global.archivMedia(work) : null;
        if (media) {
            add(media.thumb);
            add(media.full);
        }
        if (global.ARCHIV_WORK_URLS && global.ARCHIV_WORK_URLS[work.id]) {
            add(global.ARCHIV_WORK_URLS[work.id]);
        }
        add(work.imageRemote);
        add(work.image);
        if (global.ARCHIV_LOCAL_IMAGES && global.ARCHIV_LOCAL_IMAGES[work.id]) {
            add(global.ARCHIV_LOCAL_IMAGES[work.id]);
        }
        add(global.ARCHIV_PLACEHOLDER_IMAGE);
        return chain;
    };

    global.archivBindImageFallback = function (imgEl, work) {
        if (!imgEl || !work) return;
        var $img = imgEl.jquery ? imgEl : null;
        var el = $img ? $img[0] : imgEl;
        if (!el || el.tagName !== "IMG") return;

        var chain = global.archivImageFallbackChain(work).filter(function (u, i, arr) {
            return u && arr.indexOf(u) === i;
        });
        var idx = 0;
        var current = el.getAttribute("src") || "";
        for (var i = 0; i < chain.length; i++) {
            if (chain[i] === current) {
                idx = i;
                break;
            }
        }

        function onFail() {
            idx += 1;
            while (idx < chain.length && chain[idx] === global.ARCHIV_PLACEHOLDER_IMAGE && idx < chain.length - 1) {
                idx += 1;
            }
            if (idx < chain.length && chain[idx] !== current) {
                el.setAttribute("src", chain[idx]);
                return;
            }
            el.classList.add("is-image-error");
            el.setAttribute("src", global.ARCHIV_PLACEHOLDER_IMAGE);
            var frame = el.closest(".archiv-museum-frame, .archiv-home-work__frame, .archiv-artwork-card__frame, .archiv-portrait-obj__frame, .archiv-oeuvre-hero");
            if (frame) frame.classList.add("is-image-error");
        }

        el.addEventListener("error", onFail);
        el.addEventListener("load", function () {
            if (el.getAttribute("src") === global.ARCHIV_PLACEHOLDER_IMAGE) return;
            el.classList.remove("is-image-error");
            var frame = el.closest(".archiv-museum-frame, .archiv-home-work__frame, .archiv-artwork-card__frame, .archiv-portrait-obj__frame, .archiv-oeuvre-hero");
            if (frame) frame.classList.remove("is-image-error");
        });
    };

    /**
     * HTML : cadre muséal + img (sans lien)
     */
    global.archivRenderMuseumImage = function (work, opts) {
        opts = opts || {};
        if (!work) return "";
        var context = opts.context || "card";
        var fit = global.archivImageFit(context, work);
        var media = global.archivMedia ? global.archivMedia(work) : { thumb: work.imageThumb || work.image };
        var src = opts.src || media.thumb || media.full || global.ARCHIV_PLACEHOLDER_IMAGE;
        var w = opts.width || (context === "detail" ? 1200 : 640);
        var h = opts.height || Math.round(w * (fit.ratio === "3/4" ? 4 / 3 : 5 / 4));
        var loading = opts.eager ? "eager" : "lazy";
        var ratioStyle = fit.ratio ? "aspect-ratio:" + fit.ratio + ";" : "";

        var imgHtml = '<img class="archiv-museum-img archiv-museum-img--' + esc(fit.fit) + '"';
        imgHtml += ' src="' + esc(src) + '"';
        imgHtml += ' alt="' + esc(work.imageAlt || work.title) + '"';
        imgHtml += ' loading="' + loading + '" decoding="async"';
        imgHtml += ' width="' + w + '" height="' + h + '"';
        imgHtml += ' data-archiv-work-id="' + esc(work.id) + '"';
        imgHtml += ' style="object-fit:' + esc(fit.fit) + ";object-position:" + esc(fit.position) + '">';

        if (opts.imageOnly) {
            return imgHtml;
        }

        var html = '<div class="archiv-museum-frame archiv-museum-frame--' + esc(context);
        if (fit.mat) html += " archiv-museum-frame--mat-" + esc(fit.mat);
        html += '" style="' + ratioStyle + '">';
        html += imgHtml;
        html += "</div>";
        return html;
    };

    global.archivInitMuseumImages = function (root) {
        var scope = root || document;
        var nodes = scope.querySelectorAll ? scope.querySelectorAll("img[data-archiv-work-id]") : [];
        nodes.forEach(function (el) {
            var id = el.getAttribute("data-archiv-work-id");
            var work = global.archivGetOeuvre ? global.archivGetOeuvre(id) : null;
            if (work) global.archivBindImageFallback(el, work);
        });
    };

    /** Images statiques dans le HTML généré (heroes, blocs gravure) → src locale + fallback */
    global.archivHydrateStaticImages = function (root) {
        root = root || document;
        if (!global.archivGetOeuvre || !global.archivMedia) return;

        var selector =
            '.archiv-archive-hero__specimen a[href*="oeuvre.html?id="], ' +
            '.archiv-engraving-detail__img a[href*="oeuvre.html?id="], ' +
            '.archiv-portraits-hero__specimen a[href*="oeuvre.html?id="], ' +
            '.archiv-science-grid a[href*="oeuvre.html?id="]';
        var links = root.querySelectorAll ? root.querySelectorAll(selector) : [];

        links.forEach(function (a) {
            var match = (a.getAttribute("href") || "").match(/[?&]id=([^&]+)/) || (a.getAttribute("href") || "").match(/id=([^&]+)/);
            if (!match) return;
            var work = global.archivGetOeuvre(match[1]);
            if (!work) return;
            var media = global.archivMedia(work);
            var src = media.thumb || media.full;
            if (!src) return;

            var img = a.querySelector("img");
            if (!img) {
                img = document.createElement("img");
                img.alt = work.imageAlt || work.title;
                img.setAttribute("decoding", "async");
                img.setAttribute("loading", a.closest(".archiv-archive-hero") ? "eager" : "lazy");
                a.appendChild(img);
            }
            img.setAttribute("src", src);
            img.setAttribute("data-archiv-work-id", work.id);
            img.classList.add("archiv-museum-img", "archiv-museum-img--contain");
            global.archivBindImageFallback(img, work);
        });
    };
})(typeof window !== "undefined" ? window : this);
