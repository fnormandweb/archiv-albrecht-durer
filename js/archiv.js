/* ARCHIV — interactions archive Dürer */
(function ($) {
    "use strict";

    function esc(s) {
        if (!s) return "";
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
    }

    var CATEGORY_LABELS = {
        peinture: "Peinture",
        bois: "Gravure sur bois",
        burin: "Gravure au burin",
        dessin: "Dessin",
        aquarelle: "Aquarelle",
        theorie: "Théorie"
    };

    function categoryLabel(cat) {
        return CATEGORY_LABELS[cat] || cat;
    }

    function lightboxTitleFromWork(work) {
        if (!work) return "";
        var t = "<strong>" + esc(work.title) + "</strong>";
        t += "<div class=\"mfp-gallery-lightbox__meta\">";
        t += "<span>" + esc(work.date) + "</span>";
        t += "<span>" + esc(work.technique) + "</span>";
        if (work.museum) t += "<span>" + esc(work.museum) + "</span>";
        if (work.dimensions) t += "<span>" + esc(work.dimensions) + "</span>";
        if (work.sourceLabel) {
            t += '<span><a href="' + esc(work.source) + '" target="_blank" rel="noopener">Source : ' + esc(work.sourceLabel) + "</a></span>";
        }
        if (work.rights) t += "<span>" + esc(work.rights) + "</span>";
        t += "</div>";
        return t;
    }

    function imageContextForWork(work, opts) {
        opts = opts || {};
        if (opts.feature) return "feature";
        if (opts.context) return opts.context;
        if (work.category === "burin" || work.category === "bois") return "print";
        return "card";
    }

    /** ArtworkCard — cartel de collection (Met / Rijks / BM) */
    function renderWorkCard(work, opts) {
        opts = opts || {};
        var media = window.archivMedia ? window.archivMedia(work) : { thumb: work.imageThumb || work.image, full: work.imageFull || work.image };
        var full = media.full || work.imageFull || work.image;
        var feature = opts.feature ? " archiv-artwork-card--feature" : "";
        var col = opts.feature ? "col-12 mb-4" : (opts.colClass || "col-md-6 col-lg-4 mb-4");
        var frameTag = opts.zoom !== false ? "a" : "div";
        var ctx = imageContextForWork(work, opts);
        var frameAttrs = opts.zoom !== false
            ? ' href="' + esc(full) + '" class="archiv-zoom-link" data-work-id="' + esc(work.id) + '"'
            : "";
        var h = '<article class="' + col + ' archiv-oeuvre-item" data-category="' + esc(work.category) + '">';
        h += '<div class="archiv-artwork-card archiv-work-card' + feature + '">';
        h += '<span class="archiv-artwork-card__category archiv-work-card__badge">' + esc(categoryLabel(work.category)) + "</span>";
        h += "<" + frameTag + frameAttrs + ">";
        if (window.archivRenderMuseumImage) {
            h += window.archivRenderMuseumImage(work, { context: ctx, eager: !!opts.feature });
        } else {
            h += '<div class="archiv-artwork-card__frame archiv-museum-frame archiv-museum-frame--card"><img src="' + esc(media.thumb) + '" alt="' + esc(work.imageAlt) + '" loading="lazy" decoding="async" width="640" height="800" data-archiv-work-id="' + esc(work.id) + '"></div>';
        }
        h += "</" + frameTag + ">";
        h += '<div class="archiv-artwork-card__cartel archiv-work-card__body">';
        h += '<p class="archiv-artwork-card__date-line archiv-work-card__meta">' + esc(work.date) + " · " + esc(work.technique) + "</p>";
        h += '<h3 class="archiv-artwork-card__title"><a href="' + esc(work.internalLink) + '">' + esc(work.title) + "</a></h3>";
        h += '<p class="archiv-artwork-card__institution">' + esc(work.museum) + "</p>";
        h += '<p class="archiv-artwork-card__summary">' + esc(work.summary) + "</p>";
        h += '<footer class="archiv-source-block archiv-card-actions">';
        h += '<span class="archiv-label">Documentation</span>';
        h += '<a href="' + esc(work.internalLink) + '">Fiche œuvre</a>';
        h += ' · <a href="' + esc(work.source) + '" target="_blank" rel="noopener noreferrer">' + esc(work.sourceLabel) + "</a>";
        h += "</footer></div></div></article>";
        return h;
    }

    function sortWorks(list, mode) {
        var arr = list.slice();
        if (mode === "date-desc") {
            arr.sort(function (a, b) {
                return String(b.date).localeCompare(String(a.date), undefined, { numeric: true });
            });
        } else if (mode === "date-asc") {
            arr.sort(function (a, b) {
                return String(a.date).localeCompare(String(b.date), undefined, { numeric: true });
            });
        } else if (mode === "title") {
            arr.sort(function (a, b) {
                return a.title.localeCompare(b.title, "fr");
            });
        } else if (mode === "museum") {
            arr.sort(function (a, b) {
                return (a.museum || "").localeCompare(b.museum || "", "fr");
            });
        }
        return arr;
    }

    function renderOeuvresGrid($container, filter, sortMode) {
        var data = window.ARCHIV_OEUVRES || [];
        var filtered = data.filter(function (work) {
            return !filter || filter === "all" || work.category === filter;
        });
        filtered = sortWorks(filtered, sortMode || "date-desc");
        var html = "";
        filtered.forEach(function (work) {
            html += renderWorkCard(work);
        });
        if (!html) {
            html = '<p class="col-12 archiv-lead">Aucune œuvre dans cette catégorie.</p>';
        }
        $container.html(html);
        if (window.archivInitMuseumImages) window.archivInitMuseumImages($container[0]);
        initLightbox($container.find(".archiv-zoom-link"));
    }

    function initLightbox($links) {
        if (!$links || !$links.length || !$.fn.magnificPopup) return;
        $links.magnificPopup({
            type: "image",
            gallery: { enabled: true, navigateByImgClick: true, preload: [1, 2] },
            closeOnContentClick: false,
            image: {
                titleSrc: function (item) {
                    var id = item.el.data("work-id");
                    if (id && window.archivGetOeuvre) {
                        var w = window.archivGetOeuvre(id);
                        if (w) return lightboxTitleFromWork(w);
                    }
                    var $card = item.el.closest(".archiv-work-card, .archiv-oeuvre-hero");
                    if ($card.length) {
                        var t = $card.find("h1, h3").first().text();
                        var m = $card.find(".archiv-work-card__meta, .archiv-cartel").first().text();
                        return "<strong>" + esc(t) + "</strong><br>" + esc(m);
                    }
                    return "";
                }
            },
            mainClass: "mfp-archiv",
            removalDelay: 200,
            callbacks: {
                open: function () {
                    document.body.classList.add("archiv-lightbox-open");
                },
                close: function () {
                    document.body.classList.remove("archiv-lightbox-open");
                }
            }
        });
    }

    function initCollectionSpotlight() {
        var $el = $("#archiv-collection-spotlight");
        if (!$el.length) return;
        var id = ($el.data("feature-id") || "melencolia").toString();
        var w = window.archivGetOeuvre(id);
        if (w) {
            $el.html(renderWorkCard(w, { feature: true, zoom: true }));
            if (window.archivInitMuseumImages) window.archivInitMuseumImages($el[0]);
            initLightbox($el.find(".archiv-zoom-link"));
        }
    }

    function initCollectionCount() {
        var $c = $("#archiv-collection-count");
        if (!$c.length || !window.ARCHIV_OEUVRES) return;
        $c.text(window.ARCHIV_OEUVRES.length + " œuvres documentées · sources institutionnelles");
    }

    function initEngravingSpotlight() {
        var $el = $("#archiv-engraving-spotlight");
        if (!$el.length) return;
        var ids = ($el.data("ids") || "knight-death-devil,melencolia,saint-jerome").toString().split(",");
        var html = "";
        ids.forEach(function (id) {
            var w = window.archivGetOeuvre(id.trim());
            if (!w) return;
            var media = window.archivMedia ? window.archivMedia(w) : { thumb: w.imageThumb };
            html += '<figure class="archiv-engraving-spotlight__cell">';
            html += '<a href="' + esc(w.internalLink) + '">';
            if (window.archivRenderMuseumImage) {
                html += window.archivRenderMuseumImage(w, { context: "print" });
            } else {
                html += '<img src="' + esc(media.thumb) + '" alt="' + esc(w.imageAlt) + '" loading="lazy" decoding="async" data-archiv-work-id="' + esc(w.id) + '">';
            }
            html += "</a>";
            html += "<figcaption>" + esc(w.title) + " · " + esc(w.date) + "</figcaption></figure>";
        });
        $el.html(html);
        if (window.archivInitMuseumImages) window.archivInitMuseumImages($el[0]);
    }

    function initFilters() {
        var $grid = $("#archiv-oeuvres-grid");
        if (!$grid.length) return;
        var sortMode = "date-desc";
        initCollectionSpotlight();
        initCollectionCount();
        renderOeuvresGrid($grid, "all", sortMode);
        $(".archiv-filter-btn").on("click", function () {
            var filter = $(this).data("filter");
            $(".archiv-filter-btn").removeClass("is-active");
            $(this).addClass("is-active");
            renderOeuvresGrid($grid, filter, sortMode);
        });
        $(".archiv-sort-btn").on("click", function () {
            sortMode = $(this).data("sort");
            $(".archiv-sort-btn").removeClass("is-active");
            $(this).addClass("is-active");
            var filter = $(".archiv-filter-btn.is-active").data("filter") || "all";
            renderOeuvresGrid($grid, filter, sortMode);
        });
    }

    function bindImageFallback($img, work) {
        if (!work || !$img || !$img.length) return;
        if (window.archivBindImageFallback) {
            window.archivBindImageFallback($img[0], work);
            return;
        }
        var remote = work.imageRemote || (window.ARCHIV_WORK_URLS && window.ARCHIV_WORK_URLS[work.id]) || work.image;
        if (!remote) return;
        $img.on("error", function () {
            if ($img.attr("src") !== remote) $img.attr("src", remote);
        });
    }

    /** Carte verticale — salle autoportraits */
    function renderPortraitCard(work) {
        var media = window.archivMedia ? window.archivMedia(work) : { thumb: work.imageThumb || work.image, full: work.imageFull || work.image };
        var thumb = media.thumb || work.imageThumb || work.image;
        var full = media.full || work.imageFull || work.image;
        var yearMatch = String(work.date || "").match(/\d{4}/);
        var year = yearMatch ? yearMatch[0] : work.date;
        var h = '<article class="archiv-portrait-obj archiv-reveal">';
        h += '<span class="archiv-portrait-obj__year">' + esc(year) + "</span>";
        h += '<a href="' + esc(full) + '" class="archiv-portrait-obj__frame archiv-zoom-link archiv-museum-frame archiv-museum-frame--portrait archiv-museum-frame--mat-dark" data-work-id="' + esc(work.id) + '">';
        if (window.archivRenderMuseumImage) {
            h += window.archivRenderMuseumImage(work, { context: "portrait", imageOnly: true });
        } else {
            h += '<img src="' + esc(thumb) + '" alt="' + esc(work.imageAlt) + '" loading="lazy" decoding="async" width="400" height="533" data-archiv-work-id="' + esc(work.id) + '">';
        }
        h += "</a>";
        h += '<div class="archiv-portrait-obj__body">';
        h += '<h3 class="archiv-portrait-obj__title"><a href="' + esc(work.internalLink) + '">' + esc(work.title) + "</a></h3>";
        h += '<p class="archiv-portrait-obj__meta">' + esc(work.date) + " · " + esc(work.technique) + "</p>";
        h += '<p class="archiv-portrait-obj__summary">' + esc(work.summary) + "</p>";
        h += '<footer class="archiv-portrait-obj__museum-caption archiv-museum-caption">';
        h += esc(work.museum);
        if (work.dimensions) h += " · " + esc(work.dimensions);
        h += "<br>";
        h += '<a href="' + esc(work.internalLink) + '">Fiche œuvre</a> · ';
        h += '<a href="' + esc(work.source) + '" target="_blank" rel="noopener noreferrer">Source : ' + esc(work.sourceLabel) + "</a>";
        h += "</footer></div></article>";
        return h;
    }

    function initPortraitHeroImages() {
        if (!$("body").hasClass("archiv-page-portraits")) return;
        $(".archiv-portraits-page .archiv-zoom-link[data-work-id]").each(function () {
            var $link = $(this);
            var id = $link.data("work-id");
            var w = window.archivGetOeuvre ? window.archivGetOeuvre(id) : null;
            if (!w) return;
            var media = window.archivMedia ? window.archivMedia(w) : { thumb: w.image, full: w.image };
            var $img = $link.find("img").first();
            if ($img.length && media.thumb) {
                $img.attr("src", media.thumb);
                bindImageFallback($img, w);
            }
            if (media.full) $link.attr("href", media.full);
        });
    }

    function initAutoportraitsPage() {
        var $tri = $("#archiv-portraits-triptych");
        if (!$tri.length) return;
        var ids = ($tri.data("ids") || "").toString().split(",");
        var html = "";
        ids.forEach(function (id) {
            var w = window.archivGetOeuvre(id.trim());
            if (w) html += renderPortraitCard(w);
        });
        $tri.html(html);
        $tri.find(".archiv-portrait-obj img").each(function () {
            var $img = $(this);
            var id = $img.closest(".archiv-zoom-link").data("work-id");
            var w = window.archivGetOeuvre(id);
            if (w) bindImageFallback($img, w);
        });
        if (window.archivInitMuseumImages) window.archivInitMuseumImages($tri[0]);
        initLightbox($tri.find(".archiv-zoom-link"));
        initPortraitHeroImages();
    }

    function renderHomeWorkCard(work) {
        var media = window.archivMedia ? window.archivMedia(work) : { thumb: work.imageThumb || work.image };
        var thumb = media.thumb || work.imageThumb || work.image;
        var h = '<article class="archiv-home-work-item">';
        h += '<a href="' + esc(work.internalLink) + '" class="archiv-home-work">';
        h += '<div class="archiv-home-work__frame archiv-museum-frame archiv-museum-frame--card archiv-museum-frame--mat-dark">';
        if (window.archivRenderMuseumImage) {
            h += window.archivRenderMuseumImage(work, { context: "card", imageOnly: true });
        } else {
            h += '<img src="' + esc(thumb) + '" alt="' + esc(work.imageAlt) + '" loading="lazy" decoding="async" width="400" height="500" data-archiv-work-id="' + esc(work.id) + '">';
        }
        h += "</div>";
        h += '<span class="archiv-home-work__title">' + esc(work.title) + "</span>";
        h += '<span class="archiv-home-work__meta">' + esc(work.date) + " · " + esc(work.technique) + "</span>";
        h += '<span class="archiv-home-work__institution">' + esc(work.museum) + "</span>";
        h += "</a></article>";
        return h;
    }

    function initHomeFeatured() {
        var $el = $("#archiv-home-featured");
        if (!$el.length) return;
        var ids = ($el.data("ids") || "").toString().split(",");
        var html = "";
        ids.forEach(function (id) {
            var w = window.archivGetOeuvre(id.trim());
            if (w) html += renderHomeWorkCard(w);
        });
        $el.html(html);
        if (window.archivInitMuseumImages) window.archivInitMuseumImages($el[0]);
    }

    function initFeaturedGrid() {
        var $el = $("#archiv-featured-grid");
        if (!$el.length) return;
        var ids = ($el.data("ids") || "").toString().split(",");
        var html = "";
        ids.forEach(function (id) {
            var w = window.archivGetOeuvre(id.trim());
            if (w) html += renderWorkCard(w);
        });
        $el.html(html);
        if (window.archivInitMuseumImages) window.archivInitMuseumImages($el[0]);
        initLightbox($el.find(".archiv-zoom-link"));
    }

    function initGravuresCards() {
        var $el = $("#archiv-gravures-cards");
        if (!$el.length) return;
        var ids = [
            "knight-death-devil", "melencolia", "saint-jerome", "apocalypse-four-riders", "rhinoceros",
            "st-eustace", "nemesis", "lansquenet", "st-paul", "ecce-homo",
            "large-passion-cycle", "life-of-virgin-cycle", "small-passion-cycle", "large-passion-last-supper",
            "large-passion-christ-mount", "virgin-pear"
        ];
        var html = '<div class="row g-4">';
        ids.forEach(function (id) {
            var w = window.archivGetOeuvre(id);
            if (w) html += renderWorkCard(w, { colClass: "col-md-6 col-lg-6" });
        });
        html += "</div>";
        $el.html(html);
        if (window.archivInitMuseumImages) window.archivInitMuseumImages($el[0]);
        initLightbox($el.find(".archiv-zoom-link"));
        initEngravingSpotlight();
    }

    function initOeuvreDetail() {
        var $root = $("#archiv-oeuvre-detail");
        if (!$root.length) return;
        var params = new URLSearchParams(window.location.search);
        var id = params.get("id");
        var work = id ? window.archivGetOeuvre(id) : null;
        if (!work) {
            $root.html('<p class="archiv-lead">Œuvre introuvable. <a href="oeuvres.html">Retour au catalogue</a>.</p>');
            document.title = "Œuvre — ARCHIV";
            return;
        }
        document.title = work.title + " — Albrecht Dürer | ARCHIV";
        var meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute("content", work.summary);
        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", work.title + " — ARCHIV");
        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute("content", work.summary);
        if (window.archivAbsoluteUrl) {
            var canon = document.querySelector('link[rel="canonical"]');
            if (canon) canon.setAttribute("href", window.archivAbsoluteUrl("oeuvre.html?id=" + work.id));
            var ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute("content", window.archivAbsoluteUrl("oeuvre.html?id=" + work.id));
            var ogImg = document.querySelector('meta[property="og:image"]');
            var twImg = document.querySelector('meta[name="twitter:image"]');
            var imgUrl = work.image && window.archivAbsoluteUrl
                ? (work.image.indexOf("http") === 0 ? work.image : window.archivAbsoluteUrl(work.image.replace(/^\//, "")))
                : (window.ARCHIV_SITE && window.ARCHIV_SITE.defaultOgImage);
            if (ogImg && imgUrl) ogImg.setAttribute("content", imgUrl);
            if (twImg && imgUrl) twImg.setAttribute("content", imgUrl);
        }

        var html = '<nav class="archiv-breadcrumb" aria-label="Fil d\'Ariane"><a href="/">Vue d\'ensemble</a> · <a href="oeuvres.html">Œuvres</a> · <span>' + esc(work.title) + "</span></nav>";
        html += '<div class="row archiv-oeuvre-layout">';
        html += '<div class="col-lg-7 mb-4 mb-lg-0">';
        html += '<figure class="archiv-oeuvre-hero">';
        var media = window.archivMedia ? window.archivMedia(work) : { full: work.imageFull || work.image, thumb: work.imageThumb || work.image };
        html += '<a href="' + esc(media.full) + '" class="archiv-zoom-link" data-work-id="' + esc(work.id) + '">';
        if (window.archivRenderMuseumImage) {
            html += window.archivRenderMuseumImage(work, { context: "detail", eager: true, width: 1200, height: 900 });
        } else {
            html += '<img src="' + esc(media.thumb) + '" alt="' + esc(work.imageAlt) + '" width="1200" loading="eager" decoding="async" data-archiv-work-id="' + esc(work.id) + '">';
        }
        html += "</a>";
        html += '<figcaption class="archiv-museum-caption archiv-oeuvre-caption">';
        if (work.imageCredit) html += esc(work.imageCredit) + " ";
        html += '<a href="' + esc(work.source) + '" target="_blank" rel="noopener noreferrer">' + esc(work.sourceLabel) + "</a>";
        html += "</figcaption></figure></div>";
        html += '<div class="col-lg-5"><div class="archiv-oeuvre-cartel">';
        html += '<p class="archiv-kicker">' + esc(work.date) + "</p>";
        html += "<h1>" + esc(work.title) + "</h1>";
        if (work.titleDe) html += '<p class="archiv-title-de">' + esc(work.titleDe) + "</p>";
        html += '<div class="archiv-metadata-panel" role="group" aria-label="Métadonnées">';
        html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Technique</span><p class="archiv-metadata-panel__val">' + esc(work.technique) + "</p></div>";
        if (work.dimensions) html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Dimensions</span><p class="archiv-metadata-panel__val">' + esc(work.dimensions) + "</p></div>";
        html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Collection</span><p class="archiv-metadata-panel__val">' + esc(work.museum);
        if (work.location) html += " · " + esc(work.location);
        html += "</p></div>";
        html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Source</span><p class="archiv-metadata-panel__val"><a href="' + esc(work.source) + '" target="_blank" rel="noopener">' + esc(work.sourceLabel) + "</a></p></div>";
        if (work.rights) html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Droits</span><p class="archiv-metadata-panel__val">' + esc(work.rights) + "</p></div>";
        html += "</div>";
        html += '<h2>Lecture</h2><p class="archiv-lead">' + esc(work.summary) + "</p>";
        html += "<p>" + esc(work.importance) + "</p>";
        if (work.visual) {
            html += "<h2>Regard</h2><p>" + esc(work.visual) + "</p>";
        }
        html += '<p class="mt-4"><a href="' + esc(work.source) + '" class="archiv-btn archiv-btn--dark" target="_blank" rel="noopener noreferrer">Source : ' + esc(work.sourceLabel) + "</a></p>";
        html += "</div></div></div>";
        $root.html(html);
        if (window.archivInitMuseumImages) window.archivInitMuseumImages($root[0]);
        initLightbox($root.find(".archiv-zoom-link"));

        var ld = {
            "@context": "https://schema.org",
            "@type": "VisualArtwork",
            "name": work.title,
            "dateCreated": work.date,
            "artMedium": work.technique,
            "creator": { "@type": "Person", "name": "Albrecht Dürer" },
            "image": work.image,
            "description": work.summary
        };
        var s = document.createElement("script");
        s.type = "application/ld+json";
        s.textContent = JSON.stringify(ld);
        document.head.appendChild(s);
    }

    function initTimelinePage() {
        var $list = $("#archiv-timeline-full");
        if (!$list.length || !window.ARCHIV_TIMELINE) return;
        var html = "";
        window.ARCHIV_TIMELINE.forEach(function (ev) {
            html += "<li><span class=\"archiv-tl-year\">" + esc(ev.year) + "</span><div><h3>" + esc(ev.title) + "</h3><p>" + esc(ev.text) + "</p></div></li>";
        });
        $list.html(html);
    }

    function initReveal() {
        if (!window.IntersectionObserver) return;
        document.querySelectorAll(".archiv-timeline-full li, .archiv-timeline-mini li, .archiv-reveal-section, .archiv-pillar, .archiv-work-card").forEach(function (el) {
            if (!el.classList.contains("archiv-reveal-section")) el.classList.add("archiv-reveal");
        });
        document.querySelectorAll(".archiv-reveal-section").forEach(function (el) {
            el.classList.add("archiv-reveal");
        });
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) entry.target.classList.add("is-visible");
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
        document.querySelectorAll(".archiv-reveal, .archiv-reveal-section").forEach(function (el) { obs.observe(el); });
    }

    function initActiveNav() {
        var page = document.body.getAttribute("data-archiv-page");
        if (!page) return;
        $("[data-archiv-nav]").removeClass("active");
        $('[data-archiv-nav="' + page + '"]').addClass("active");
        $(".archiv-nav-dropdown__menu a.active").each(function () {
            $(this).closest(".archiv-nav-dropdown").find(".archiv-nav-dropdown__trigger").addClass("active");
        });
    }

    function initNavDropdowns() {
        var $dropdowns = $(".archiv-nav-dropdown");
        if (!$dropdowns.length) return;

        var closeTimer = null;
        var desktopMq = window.matchMedia("(min-width: 992px)");

        function closeAll() {
            $dropdowns.removeClass("is-open").find(".archiv-nav-dropdown__trigger").attr("aria-expanded", "false");
        }

        function openDropdown($dd) {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            $dropdowns.not($dd).removeClass("is-open").find(".archiv-nav-dropdown__trigger").attr("aria-expanded", "false");
            $dd.addClass("is-open");
            $dd.find(".archiv-nav-dropdown__trigger").attr("aria-expanded", "true");
        }

        function scheduleClose($dd) {
            if (closeTimer) clearTimeout(closeTimer);
            closeTimer = setTimeout(function () {
                $dd.removeClass("is-open").find(".archiv-nav-dropdown__trigger").attr("aria-expanded", "false");
                closeTimer = null;
            }, 220);
        }

        $dropdowns.each(function () {
            var $dd = $(this);
            var $btn = $dd.find(".archiv-nav-dropdown__trigger");

            $dd.on("mouseenter", function () {
                if (!desktopMq.matches) return;
                openDropdown($dd);
            });

            $dd.on("mouseleave", function () {
                if (!desktopMq.matches) return;
                scheduleClose($dd);
            });

            $btn.on("click", function (e) {
                if (desktopMq.matches) return;
                e.preventDefault();
                e.stopPropagation();
                var isOpen = $dd.hasClass("is-open");
                closeAll();
                if (!isOpen) openDropdown($dd);
            });

            $btn.on("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    var isOpen = $dd.hasClass("is-open");
                    closeAll();
                    if (!isOpen) openDropdown($dd);
                }
                if (e.key === "Escape") closeAll();
            });
        });

        $(document).on("click", function (e) {
            if (!$(e.target).closest(".archiv-nav-dropdown").length) closeAll();
        });

        desktopMq.addEventListener("change", closeAll);
    }

    function initMuseumNav() {
        var $mobile = $("#archiv-museum-nav-mobile");
        var $open = $("#archiv-nav-open");
        if (!$mobile.length || !$open.length) return;

        function openNav() {
            $mobile.addClass("is-open").attr("aria-hidden", "false");
            $open.attr("aria-expanded", "true");
            $("body").addClass("archiv-nav-open");
        }

        function closeNav() {
            $mobile.removeClass("is-open").attr("aria-hidden", "true");
            $open.attr("aria-expanded", "false");
            $("body").removeClass("archiv-nav-open");
            $(".archiv-nav-dropdown").removeClass("is-open").find(".archiv-nav-dropdown__trigger").attr("aria-expanded", "false");
        }

        $open.on("click", function () {
            if ($mobile.hasClass("is-open")) closeNav();
            else openNav();
        });

        $mobile.find("[data-archiv-nav-close]").on("click", closeNav);
        $mobile.find(".archiv-museum-nav-mobile__list a").on("click", closeNav);

        $(document).on("keydown", function (e) {
            if (e.key === "Escape") {
                if ($mobile.hasClass("is-open")) closeNav();
                $(".archiv-nav-dropdown").removeClass("is-open").find(".archiv-nav-dropdown__trigger").attr("aria-expanded", "false");
            }
        });
    }

    function initSourcesPage() {
        var $inv = $("#archiv-sources-inventory");
        if ($inv.length && window.ARCHIV_IMAGE_INVENTORY) {
            var html = "<table class=\"archiv-credits-table\"><thead><tr><th>Œuvre</th><th>Date</th><th>Collection</th><th>Crédit</th></tr></thead><tbody>";
            window.ARCHIV_IMAGE_INVENTORY.forEach(function (row) {
                html += "<tr><td><a href=\"oeuvre.html?id=" + esc(row.id) + "\">" + esc(row.title) + "</a></td>";
                html += "<td>" + esc(row.date) + "</td><td>" + esc(row.museum) + "</td>";
                html += "<td>" + esc(row.imageCredit) + "</td></tr>";
            });
            html += "</tbody></table>";
            $inv.html(html);
        }
        var $edInv = $("#archiv-editions-sources-inventory");
        if ($edInv.length && window.ARCHIV_EDITIONS) {
            var edHtml = "<table class=\"archiv-credits-table\"><thead><tr><th>Édition</th><th>Œuvre source</th><th>Institution</th><th>Droits</th><th>Usage prévu</th></tr></thead><tbody>";
            window.ARCHIV_EDITIONS.forEach(function (ed) {
                edHtml += "<tr><td><a href=\"" + esc(ed.internalLink) + "\">" + esc(ed.title) + "</a></td>";
                edHtml += "<td>" + esc(ed.relatedWork) + (ed.originalWorkDate ? " (" + esc(ed.originalWorkDate) + ")" : "") + "</td>";
                edHtml += "<td><a href=\"" + esc(ed.sourceUrl) + "\" target=\"_blank\" rel=\"noopener\">" + esc(ed.sourceLabel) + "</a></td>";
                edHtml += "<td>" + esc(ed.rightsStatus || ed.imageRights) + "</td>";
                edHtml += "<td>" + esc(ed.plannedUse) + (ed.validationRequired ? " · validation requise" : "") + "</td></tr>";
            });
            edHtml += "</tbody></table>";
            $edInv.html(edHtml);
        }
    }

    function renderEditionCard(ed) {
        var html = '<article class="archiv-edition-card" data-category="' + esc(ed.categoryId) + '">';
        html += '<a href="' + esc(ed.internalLink) + '" class="archiv-edition-card__frame">';
        html += '<img src="' + esc(ed.image) + '" alt="' + esc(ed.imageAlt) + '" loading="lazy" decoding="async" width="640" height="800">';
        html += "</a>";
        html += '<div class="archiv-edition-card__body">';
        html += '<p class="archiv-edition-card__category">' + esc(ed.category) + "</p>";
        html += '<h3 class="archiv-edition-card__title"><a href="' + esc(ed.internalLink) + '">' + esc(ed.title) + "</a></h3>";
        html += '<p class="archiv-edition-card__source">Œuvre source : ' + esc(ed.relatedWork) + "</p>";
        html += '<div class="archiv-edition-card__meta">';
        html += '<span class="archiv-edition-status">' + esc(ed.status) + "</span>";
        if (ed.format) html += '<span class="archiv-edition-card__format">' + esc(ed.format) + "</span>";
        html += "</div>";
        html += '<p class="archiv-edition-card__cta"><a class="archiv-edition-cta" href="' + esc(ed.internalLink) + '">Découvrir l\'édition</a></p>';
        html += "</div></article>";
        return html;
    }

    function initEditionsPage() {
        var $grid = $("#archiv-editions-grid");
        if (!$grid.length || !window.ARCHIV_EDITIONS) return;
        var filter = "all";

        function render() {
            var html = "";
            window.ARCHIV_EDITIONS.forEach(function (ed) {
                if (filter !== "all" && ed.categoryId !== filter) return;
                html += renderEditionCard(ed);
            });
            if (!html) {
                html = '<p class="archiv-lead">Aucune édition dans cette catégorie pour le moment.</p>';
            }
            $grid.html(html);
        }

        render();

        $("#archiv-editions-filters .archiv-filter-btn").on("click", function () {
            filter = $(this).data("filter") || "all";
            $("#archiv-editions-filters .archiv-filter-btn").removeClass("is-active");
            $(this).addClass("is-active");
            render();
        });
    }

    function initEditionDetail() {
        var $root = $("#archiv-edition-detail");
        if (!$root.length || !window.archivGetEdition) return;
        var params = new URLSearchParams(window.location.search);
        var id = params.get("id");
        var ed = id ? window.archivGetEdition(id) : null;
        if (!ed) {
            $root.html('<p class="archiv-lead">Édition introuvable. <a href="editions.html">Retour aux éditions</a>.</p>');
            document.title = "Édition — ARCHIV";
            return;
        }
        document.title = ed.title + " — Éditions ARCHIV";
        var meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute("content", ed.description);
        if (window.archivAbsoluteUrl) {
            var canon = document.querySelector('link[rel="canonical"]');
            if (canon) canon.setAttribute("href", window.archivAbsoluteUrl("edition.html?id=" + ed.slug));
            var ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute("content", window.archivAbsoluteUrl("edition.html?id=" + ed.slug));
            var ogImg = document.querySelector('meta[property="og:image"]');
            if (ogImg && ed.image) ogImg.setAttribute("content", window.archivAbsoluteUrl(ed.image.replace(/^\//, "")));
        }

        var html = '<nav class="archiv-breadcrumb" aria-label="Fil d\'Ariane"><a href="/">Vue d\'ensemble</a> · <a href="editions.html">Éditions</a> · <span>' + esc(ed.title) + "</span></nav>";
        html += '<div class="row archiv-oeuvre-layout archiv-edition-layout">';
        html += '<div class="col-lg-7 mb-4 mb-lg-0">';
        html += '<figure class="archiv-oeuvre-hero archiv-edition-hero">';
        html += '<img src="' + esc(ed.image) + '" alt="' + esc(ed.imageAlt) + '" width="1200" loading="eager" decoding="async">';
        html += '<figcaption class="archiv-museum-caption">Reproduction source documentée — ' + esc(ed.credit) + "</figcaption>";
        html += "</figure></div>";
        html += '<div class="col-lg-5"><div class="archiv-oeuvre-cartel">';
        html += '<p class="archiv-edition-card__category">' + esc(ed.category) + "</p>";
        html += '<span class="archiv-edition-detail__status">' + esc(ed.status) + "</span>";
        html += "<h1>" + esc(ed.title) + "</h1>";
        html += '<p class="archiv-lead">' + esc(ed.description) + "</p>";
        html += '<p class="archiv-edition-detail__rights">' + esc(ed.rightsStatus) + "</p>";
        html += '<div class="archiv-metadata-panel" role="group" aria-label="Métadonnées édition">';
        html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Format</span><p class="archiv-metadata-panel__val">' + esc(ed.format) + "</p></div>";
        if (ed.paper) html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Support</span><p class="archiv-metadata-panel__val">' + esc(ed.paper) + "</p></div>";
        html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Statut</span><p class="archiv-metadata-panel__val">' + esc(ed.status) + "</p></div>";
        if (ed.price != null && ed.currency) {
            html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Tarif</span><p class="archiv-metadata-panel__val">' + esc(ed.price) + " " + esc(ed.currency) + "</p></div>";
        }
        html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Droits image</span><p class="archiv-metadata-panel__val">' + esc(ed.imageRights) + "</p></div>";
        html += '<div class="archiv-metadata-panel__row"><span class="archiv-metadata-panel__key">Source</span><p class="archiv-metadata-panel__val"><a href="' + esc(ed.sourceUrl) + '" target="_blank" rel="noopener">' + esc(ed.sourceLabel) + "</a></p></div>";
        html += "</div>";
        html += '<p class="mt-4"><a href="editions.html#archiv-edition-inquiry" class="archiv-btn archiv-btn--ghost">' + esc(ed.ctaLabel) + "</a></p>";
        html += "</div></div></div>";

        html += '<section class="archiv-edition-source-panel" aria-labelledby="edition-source-title">';
        html += '<h2 id="edition-source-title">Œuvre source</h2>';
        html += "<p><strong>" + esc(ed.relatedWork) + "</strong>";
        if (ed.originalWorkDate) html += ", " + esc(ed.originalWorkDate);
        if (ed.originalTechnique) html += " — " + esc(ed.originalTechnique);
        html += ".</p>";
        html += "<p>Institution de référence : " + esc(ed.museum) + ".</p>";
        if (ed.relatedWorkId) {
            html += '<p><a href="oeuvre.html?id=' + esc(ed.relatedWorkId) + '" class="archiv-text-link">Voir la fiche œuvre</a></p>';
        }
        html += "</section>";

        html += '<p class="archiv-editions-disclaimer mt-4">' + esc(window.ARCHIV_EDITIONS_DISCLAIMER || "") + "</p>";
        $root.html(html);
    }

    function initArchivShell() {
        if (!$("body").hasClass("archiv-site")) return;
        $("#preloader, .preloader-bg").fadeOut(200);
        $(".progress-wrap").remove();
        $(".archiv-nav .rolling-text, .navbar .rolling-text").each(function () {
            var t = $(this).text();
            $(this).parent().html(t);
        });
        $("body.archiv-site .navbar").not(".archiv-museum-header").remove();
        $("body.archiv-site .nav-scroll").remove();
    }

    $(function () {
        initArchivShell();
        if (window.archivHydrateStaticImages) window.archivHydrateStaticImages(document);
        initActiveNav();
        initNavDropdowns();
        initMuseumNav();
        initFilters();
        initHomeFeatured();
        initFeaturedGrid();
        initAutoportraitsPage();
        initGravuresCards();
        initEngravingSpotlight();
        initOeuvreDetail();
        initEditionsPage();
        initEditionDetail();
        initTimelinePage();
        initReveal();
        initSourcesPage();
        initLightbox($(".archiv-zoom-link"));
        if (window.archivInitMuseumImages) window.archivInitMuseumImages(document);
    });
})(jQuery);
