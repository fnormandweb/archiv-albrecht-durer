/**
 * ARCHIV — UI strings and locale helpers (fr / en).
 */
(function (global) {
    "use strict";

    var STRINGS = {
        fr: {
            skip: "Aller au contenu",
            overview: "Vue d'ensemble",
            parcours: "Parcours",
            oeuvres: "Œuvres",
            allWorks: "Toutes les œuvres",
            engravings: "Gravures",
            selfPortraits: "Autoportraits",
            scienceSources: "Science & sources",
            science: "Science et proportion",
            sources: "Sources",
            editions: "Éditions",
            menu: "Menu",
            closeMenu: "Fermer le menu",
            category: "Catégorie",
            sort: "Tri",
            filterTechnique: "Filtrer par technique",
            sortCatalog: "Trier le catalogue",
            all: "Toutes",
            painting: "Peinture",
            woodcut: "Gravure sur bois",
            engraving: "Gravure au burin",
            drawing: "Dessin",
            watercolor: "Aquarelle",
            theory: "Théorie",
            dateDesc: "Date ↓",
            dateAsc: "Date ↑",
            title: "Titre",
            museum: "Institution",
            worksDocumented: "œuvres documentées · sources institutionnelles",
            featuredWork: "Œuvre en vedette",
            documentation: "Documentation",
            workSheet: "Fiche œuvre",
            seeAlso: "Voir aussi",
            biography: "Biographie",
            fullChronology: "Chronologie complète",
            fullCatalogue: "Catalogue complet",
            lecture: "Lecture",
            regard: "Regard",
            workNotFound: "Œuvre introuvable.",
            backCatalogue: "Retour au catalogue",
            editionNotFound: "Édition introuvable.",
            backEditions: "Retour aux éditions",
            breadcrumbAria: "Fil d'Ariane",
            metadata: "Métadonnées",
            technique: "Technique",
            dimensions: "Dimensions",
            collection: "Collection",
            source: "Source",
            rights: "Droits",
            format: "Format",
            support: "Support",
            status: "Statut",
            price: "Tarif",
            imageRights: "Droits image",
            sourceWork: "Œuvre source",
            referenceInstitution: "Institution de référence",
            viewWorkSheet: "Voir la fiche œuvre",
            requestAvailability: "Demander disponibilité",
            documentedReproduction: "Reproduction documentée (Wikimedia Commons)",
            deepenWiki: "Approfondir — article Wikipédia",
            langFr: "Français",
            langEn: "English",
            langSwitchAria: "Langue du site"
        },
        en: {
            skip: "Skip to content",
            overview: "Overview",
            parcours: "Journey",
            oeuvres: "Works",
            allWorks: "All works",
            engravings: "Engravings",
            selfPortraits: "Self-portraits",
            scienceSources: "Science & sources",
            science: "Science and proportion",
            sources: "Sources",
            editions: "Editions",
            menu: "Menu",
            closeMenu: "Close menu",
            category: "Category",
            sort: "Sort",
            filterTechnique: "Filter by technique",
            sortCatalog: "Sort catalogue",
            all: "All",
            painting: "Painting",
            woodcut: "Woodcut",
            engraving: "Engraving",
            drawing: "Drawing",
            watercolor: "Watercolour",
            theory: "Theory",
            dateDesc: "Date ↓",
            dateAsc: "Date ↑",
            title: "Title",
            museum: "Institution",
            worksDocumented: "works documented · institutional sources",
            featuredWork: "Featured work",
            documentation: "Documentation",
            workSheet: "Work record",
            seeAlso: "See also",
            biography: "Biography",
            fullChronology: "Full chronology",
            fullCatalogue: "Full catalogue",
            lecture: "Essay",
            regard: "Visual reading",
            workNotFound: "Work not found.",
            backCatalogue: "Back to catalogue",
            editionNotFound: "Edition not found.",
            backEditions: "Back to editions",
            breadcrumbAria: "Breadcrumb",
            metadata: "Metadata",
            technique: "Technique",
            dimensions: "Dimensions",
            collection: "Collection",
            source: "Source",
            rights: "Rights",
            format: "Format",
            support: "Support",
            status: "Status",
            price: "Price",
            imageRights: "Image rights",
            sourceWork: "Source work",
            referenceInstitution: "Reference institution",
            viewWorkSheet: "View work record",
            requestAvailability: "Request availability",
            documentedReproduction: "Documented reproduction (Wikimedia Commons)",
            deepenWiki: "Read more — Wikipedia article",
            langFr: "Français",
            langEn: "English",
            langSwitchAria: "Site language"
        }
    };

    global.archivLang = function () {
        var lang = (document.documentElement && document.documentElement.lang) || "fr";
        return lang.indexOf("en") === 0 ? "en" : "fr";
    };

    global.archivLocale = function () {
        return global.archivLang() === "en" ? "en_GB" : "fr_FR";
    };

    global.archivT = function (key) {
        var lang = global.archivLang();
        var pack = STRINGS[lang] || STRINGS.fr;
        return pack[key] != null ? pack[key] : (STRINGS.fr[key] || key);
    };

    global.archivBasePath = function () {
        return global.archivLang() === "fr" ? "/fr/" : "/";
    };

    global.archivPageUrl = function (page) {
        var base = global.archivBasePath();
        if (!page) return base;
        if (page.indexOf("http") === 0) return page;
        return base + page.replace(/^\//, "");
    };

    global.archivWorkLink = function (id) {
        return global.archivPageUrl("oeuvre.html?id=" + id);
    };

    global.ARCHIV_CATEGORY_LABELS = function () {
        return {
            peinture: global.archivT("painting"),
            bois: global.archivT("woodcut"),
            burin: global.archivT("engraving"),
            dessin: global.archivT("drawing"),
            aquarelle: global.archivT("watercolor"),
            theorie: global.archivT("theory")
        };
    };
})(typeof window !== "undefined" ? window : global);
