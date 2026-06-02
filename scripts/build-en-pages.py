#!/usr/bin/env python3
"""Generate English pages at site root (default locale)."""
import json
import re
from pathlib import Path

_re = re

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT
SITE_ORIGIN = "https://albrechtdurer.uk"
ASSET = ""
NAV = "\n".join((ROOT / "partials/archiv-nav.html").read_text(encoding="utf-8").splitlines()[1:])
FOOTER = (ROOT / "partials/archiv-footer.html").read_text(encoding="utf-8")
SCRIPTS = (ROOT / "partials/archiv-scripts-production.html").read_text(encoding="utf-8")
SKIP = (ROOT / "partials/archiv-skip-en.html").read_text(encoding="utf-8").strip()
FAVICON = (ROOT / "partials/archiv-favicon.html").read_text(encoding="utf-8").strip()
FAVICON = FAVICON.replace('href="img/', f'href="{ASSET}img/').replace('href="img/', f'href="{ASSET}img/')
OG_IMAGE_DEFAULT = f"{ASSET}img/og/albrecht-durer-archive-og.jpg"

OG_IMAGES = {
    "oeuvres": f"{ASSET}img/og/durer-oeuvres-og.jpg",
    "gravures": f"{ASSET}img/og/durer-gravures-og.jpg",
    "autoportraits": f"{ASSET}img/durer/portraits/durer-self-portrait-1500.webp",
    "science": f"{ASSET}img/durer/drawings/durer-young-hare-1502.webp",
    "vie": OG_IMAGE_DEFAULT,
    "voyages": OG_IMAGE_DEFAULT,
    "chronologie": OG_IMAGE_DEFAULT,
    "sources": OG_IMAGE_DEFAULT,
    "oeuvre": OG_IMAGE_DEFAULT,
}

SPEC_MELENCOLIA = f"""<figure class="archiv-archive-hero__specimen">
<a href="oeuvre.html?id=melencolia"><img src="{ASSET}img/durer/prints/durer-melencolia-i-1514.webp" alt="Melencolia I, engraving, 1514" width="320" height="420" loading="eager" decoding="async" data-archiv-work-id="melencolia"></a>
<figcaption class="archiv-museum-caption" style="border:0;padding:0.5rem 0 0;margin:0;color:rgba(205,189,157,0.7);">Melencolia I · 1514 · NGA, Washington</figcaption>
</figure>"""

SPEC_KNIGHT = f"""<figure class="archiv-archive-hero__specimen">
<a href="oeuvre.html?id=knight-death-devil"><img src="{ASSET}img/durer/prints/durer-knight-death-devil-1513.webp" alt="Knight, Death and the Devil, engraving by Albrecht Dürer, 1513" width="320" height="420" loading="eager" decoding="async" data-archiv-work-id="knight-death-devil"></a>
<figcaption class="archiv-museum-caption" style="border:0;padding:0.5rem 0 0;margin:0;color:rgba(205,189,157,0.7);">Knight, Death and the Devil · 1513 · NGA, Washington</figcaption>
</figure>"""


def abs_url(path: str) -> str:
    path = (path or "").lstrip("/")
    return f"{SITE_ORIGIN}/{path}" if path else f"{SITE_ORIGIN}/"


def hreflang_links(canonical_en: str) -> str:
    en_path = canonical_en.lstrip("/")
    en_url = abs_url(en_path)
    fr_path = f"fr/{en_path}" if en_path else "fr/"
    fr_url = f"{SITE_ORIGIN}/{fr_path}"
    return (
        f'    <link rel="alternate" hreflang="fr" href="{fr_url}">\n'
        f'    <link rel="alternate" hreflang="en" href="{en_url}">\n'
        f'    <link rel="alternate" hreflang="x-default" href="{en_url}">\n'
    )


def head(title, desc, page_id, canonical, og_title=None, body_class="", extra_css="", og_image=None, json_ld=None):
    og = og_title or title
    og_img = og_image or OG_IMAGES.get(page_id) or OG_IMAGE_DEFAULT
    og_img_abs = abs_url(og_img.lstrip("../")) if og_img.startswith(ASSET) else og_img
    canon_abs = abs_url(canonical)
    extra_link = f'\n    <link rel="stylesheet" href="{ASSET}{extra_css.lstrip("../")}">' if extra_css else ""
    body_cls = "archiv-site"
    if body_class:
        body_cls += " " + body_class
    ld_blocks = json_ld or []
    ld_html = ""
    for block in ld_blocks:
        ld_html += f'\n    <script type="application/ld+json">\n    {json.dumps(block, ensure_ascii=False)}\n    </script>'
    css_links = "\n".join(
        f'    <link rel="stylesheet" href="{ASSET}{f}">'
        for f in [
            "css/plugins.css",
            "css/style.css",
            "css/archiv.css",
            "css/archiv-museum.css",
            "css/archiv-system.css",
            "css/archiv-stable.css",
            "css/archiv-premium-2026.css",
            "css/archiv-images.css",
            "css/archiv-production.css",
        ]
    )
    fav = FAVICON.replace('href="img/', f'href="{ASSET}img/')
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{title}</title>
    <meta name="description" content="{desc}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#15100C">
    <meta property="og:site_name" content="ARCHIV — Albrecht Dürer">
    <meta property="og:type" content="website">
    <meta property="og:title" content="{og}">
    <meta property="og:description" content="{desc}">
    <meta property="og:url" content="{canon_abs}">
    <meta property="og:image" content="{og_img_abs}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="en_GB">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{og}">
    <meta name="twitter:description" content="{desc}">
    <meta name="twitter:image" content="{og_img_abs}">
    <link rel="canonical" href="{canon_abs}">
{hreflang_links(canonical)}{ld_html}
    <link rel="dns-prefetch" href="https://upload.wikimedia.org">
    {fav}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400&display=swap" rel="stylesheet">
{css_links}{extra_link}
</head>
<body class="{body_cls}" data-site-logo="{ASSET}img/logo_Albrecht_Durer.svg" data-archiv-page="{page_id}">
{SKIP}
"""


def archive_hero(h1, sub, text_only=True, specimen=""):
    mod = " archiv-archive-hero--text-only" if text_only and not specimen else ""
    spec_block = specimen if specimen else ""
    return f"""
    <header class="archiv-archive-hero{mod}" aria-labelledby="archiv-hero-title">
        <div class="archiv-archive-hero__texture" aria-hidden="true"></div>
        <div class="archiv-page-shell archiv-archive-hero__grid">
            <div class="archiv-archive-hero__copy">
                <p class="archiv-kicker">ARCHIV · Albrecht Dürer</p>
                <h1 id="archiv-hero-title">{h1}</h1>
                <p class="archiv-archive-hero__sub">{sub}</p>
            </div>
            {spec_block}
        </div>
    </header>
"""


def web_page_schema(name, desc, path):
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": name,
        "description": desc,
        "url": abs_url(path),
        "inLanguage": "en",
        "isPartOf": {"@type": "WebSite", "name": "ARCHIV — Albrecht Dürer", "url": SITE_ORIGIN + "/"},
    }


NAV_SEE_ALSO = {
    "vie": '<nav class="archiv-see-also mt-5" aria-label="Related pages"><p class="archiv-kicker">See also</p><ul><li><a href="chronologie.html">Chronology</a></li><li><a href="voyages.html">Travels</a></li><li><a href="autoportraits.html">Self-portraits</a></li><li><a href="sources.html">Sources and credits</a></li></ul></nav>',
    "oeuvres": '<nav class="archiv-see-also mt-5" aria-label="Related pages"><p class="archiv-kicker">See also</p><ul><li><a href="gravures.html">Engravings</a></li><li><a href="autoportraits.html">Self-portraits</a></li><li><a href="science.html">Science and proportion</a></li><li><a href="sources.html">Sources and credits</a></li></ul></nav>',
    "gravures": '<nav class="archiv-see-also mt-5" aria-label="Related pages"><p class="archiv-kicker">See also</p><ul><li><a href="oeuvre.html?id=melencolia">Melencolia I</a></li><li><a href="oeuvre.html?id=rhinoceros">Rhinoceros</a></li><li><a href="oeuvre.html?id=apocalypse-four-riders">The Four Horsemen</a></li><li><a href="oeuvres.html">Full catalogue</a></li></ul></nav>',
    "science": '<nav class="archiv-see-also mt-5" aria-label="Related pages"><p class="archiv-kicker">See also</p><ul><li><a href="oeuvre.html?id=hare">Young Hare</a></li><li><a href="oeuvre.html?id=melencolia">Melencolia I</a></li><li><a href="sources.html">Sources and credits</a></li></ul></nav>',
    "voyages": '<nav class="archiv-see-also mt-5" aria-label="Related pages"><p class="archiv-kicker">See also</p><ul><li><a href="vie.html">Biography</a></li><li><a href="chronologie.html">Chronology</a></li><li><a href="sources.html">Sources</a></li></ul></nav>',
    "chronologie": '<nav class="archiv-see-also mt-5" aria-label="Related pages"><p class="archiv-kicker">See also</p><ul><li><a href="vie.html">Biography</a></li><li><a href="oeuvres.html">Works</a></li><li><a href="gravures.html">Engravings</a></li></ul></nav>',
    "autoportraits": '<nav class="archiv-see-also mt-5" aria-label="Related pages"><p class="archiv-kicker">See also</p><ul><li><a href="vie.html">Biography</a></li><li><a href="oeuvre.html?id=self-portrait-1500">Self-portrait of 1500</a></li><li><a href="sources.html">Sources</a></li></ul></nav>',
}


def page(title, desc, page_id, canonical, h1, sub, main, og=None, use_hero=True, body_class="", extra_css="", hero_specimen="", json_ld=None, extra_scripts=""):
    body = main if main.strip().startswith("<main") else f'<main id="archiv-main" class="archiv-page-main">{main}</main>'
    if page_id in NAV_SEE_ALSO and NAV_SEE_ALSO[page_id] not in body:
        body = body.replace("</main>", NAV_SEE_ALSO[page_id] + "\n</main>", 1)
    hero = archive_hero(h1, sub, text_only=not hero_specimen, specimen=hero_specimen) if use_hero else ""
    ld = json_ld if json_ld is not None else [web_page_schema(h1 or title.split("—")[0].strip(), desc, canonical)]
    scripts = SCRIPTS
    if extra_scripts:
        scripts = SCRIPTS.replace(
            '    <script src="js/archiv.js" defer></script>',
            extra_scripts + '\n    <script src="js/archiv.js" defer></script>',
        )
    return head(title, desc, page_id, canonical, og, body_class, extra_css, json_ld=ld) + NAV + hero + body + FOOTER + scripts + "\n</body>\n</html>\n"


PAGES = {
    "oeuvre.html": page(
        "Albrecht Dürer — Work record | ARCHIV",
        "Documented work by Albrecht Dürer: technique, collection, visual reading and museum source.",
        "oeuvre",
        "oeuvre.html",
        "Work",
        "Documented record",
        """<main id="archiv-main" class="archiv-museum-section archiv-museum-section--paper archiv-page-main"><div class="archiv-page-shell" id="archiv-oeuvre-detail"></div></main>""",
        use_hero=False,
        extra_scripts=f'    <script src="{ASSET}js/archiv-oeuvre-lectures.js" defer></script>',
    ),
    "vie.html": page(
        "Albrecht Dürer — Biography, travels and workshop | ARCHIV",
        "Life of Albrecht Dürer from Nuremberg to European courts: training, workshop, artistic maturity and final treatises.",
        "vie",
        "vie.html",
        "Life",
        "From Nuremberg to the courts of Europe",
        """<main class="archiv-museum-section archiv-museum-section--paper"><div class="archiv-page-shell"><div class="archiv-prose-block">
<p class="archiv-lead">Dürer's life is more than a chronology: it is the emergence of an artist-author in a city of print, at the crossroads of Rhenish, Italian and imperial exchange.</p>
<article class="archiv-period" id="nuremberg"><p class="archiv-period-years">1471</p><h2>Nuremberg</h2><p>Born on 21 May. Nuremberg, a free imperial city, gathered printers, goldsmiths and merchants — the milieu in which printed image would become the vector of Dürer's fame.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1486–1490</p><h2>Family training and workshop</h2><p>Apprenticeship with Michael Wolgemut: illustrated chronicles, woodcut, crowd composition. The young Dürer learned the rigour of a reproducible line.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1490–1494</p><h2>Journeyman travels</h2><p>Colmar, Basel, Strasbourg. These years built the Rhenish network and the awareness of a master able to sign his work.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1495</p><h2>Opening the workshop</h2><p>Definitive return, marriage to Agnes Frey, AD monogram. The workshop structured painting, drawing and print as complementary activities.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1498</p><h2>Apocalypse and first prints</h2><p>Publication of the woodcut cycle: immediate success across Europe. See <a href="oeuvre.html?id=apocalypse-four-riders" class="archiv-text-link">The Four Horsemen</a>.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1505–1507</p><h2>Travels in Italy</h2><p>Venice: colour, antiquity, Bellini. The second stay nourished portraits and a theory of beauty.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1508–1514</p><h2>Artistic maturity</h2><p>Naturalist studies, the <em>Large Passion</em>, then the master engravings of 1513–1514: <a href="oeuvre.html?id=knight-death-devil" class="archiv-text-link">Knight, Death and the Devil</a>, <a href="oeuvre.html?id=saint-jerome" class="archiv-text-link">St. Jerome</a>, <a href="oeuvre.html?id=melencolia" class="archiv-text-link">Melencolia I</a>.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1512–1518</p><h2>Maximilian I</h2><p>Imperial commissions, decorations, engraved <em>Triumph</em> — the artist in the service of power.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1520–1521</p><h2>Journey to the Low Countries</h2><p>Journal, Antwerp, Erasmus. See <a href="voyages.html" class="archiv-text-link">Travels</a>.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1525–1528</p><h2>Final treatises and death</h2><p><a href="science.html" class="archiv-text-link">Treatise on measurement</a>, fortification, proportions; death on 6 April 1528.</p></article>
<p class="mt-4"><a href="chronologie.html" class="archiv-btn archiv-btn--dark">Full chronology</a></p>
</div></div></main>""",
    ),
    "oeuvres.html": page(
        "Works by Albrecht Dürer — Paintings, engravings and drawings | ARCHIV",
        "Explore major works by Albrecht Dürer: paintings, engravings, drawings, watercolours, self-portraits and theoretical books.",
        "oeuvres",
        "oeuvres.html",
        "Works",
        "Documented, filterable catalogue",
        """<main class="archiv-museum-section archiv-museum-section--paper archiv-collection-index"><div class="archiv-page-shell">
<p class="archiv-lead mb-2">Collection index — records, metadata and institutional sources.</p>
<p id="archiv-collection-count" class="archiv-collection-count"></p>
<section class="archiv-collection-spotlight" aria-label="Featured work">
<p class="archiv-label archiv-collection-spotlight__label">Featured work</p>
<div id="archiv-collection-spotlight" data-feature-id="knight-death-devil"></div>
</section>
<div class="archiv-toolbar archiv-work-filter">
<div><span class="archiv-toolbar__label">Category</span>
<div class="archiv-filters" role="tablist" aria-label="Filter by technique">
<button type="button" class="archiv-filter-btn is-active" data-filter="all">All</button>
<button type="button" class="archiv-filter-btn" data-filter="peinture">Painting</button>
<button type="button" class="archiv-filter-btn" data-filter="bois">Woodcut</button>
<button type="button" class="archiv-filter-btn" data-filter="burin">Engraving</button>
<button type="button" class="archiv-filter-btn" data-filter="dessin">Drawing</button>
<button type="button" class="archiv-filter-btn" data-filter="aquarelle">Watercolour</button>
<button type="button" class="archiv-filter-btn" data-filter="theorie">Theory</button>
</div></div>
<div><span class="archiv-toolbar__label">Sort</span>
<div class="archiv-sort-group" role="group" aria-label="Sort catalogue">
<button type="button" class="archiv-filter-btn archiv-sort-btn is-active" data-sort="date-desc">Date ↓</button>
<button type="button" class="archiv-filter-btn archiv-sort-btn" data-sort="date-asc">Date ↑</button>
<button type="button" class="archiv-filter-btn archiv-sort-btn" data-sort="title">Title</button>
<button type="button" class="archiv-filter-btn archiv-sort-btn" data-sort="museum">Institution</button>
</div></div>
</div>
<div id="archiv-oeuvres-grid" class="row archiv-collection-grid"></div>
</div></main>""",
        hero_specimen=SPEC_MELENCOLIA,
    ),
    "gravures.html": page(
        "Engravings by Albrecht Dürer — Melencolia I, Rhinoceros, Apocalypse | ARCHIV",
        "Page devoted to Dürer's prints: Melencolia I, St. Jerome, Knight Death and Devil, Rhinoceros and the Apocalypse.",
        "gravures",
        "gravures.html",
        "Engravings",
        "Print as an autonomous language",
        """<main>
<section class="archiv-museum-section archiv-museum-section--ink archiv-section--engraving"><div class="archiv-page-shell archiv-page-shell--narrow archiv-prose-block">
<p class="archiv-lead">For Dürer, the print is not a workshop accessory: it is the medium through which image becomes science, narrative and European merchandise.</p>
<h2>Why print is central</h2>
<p>In Nuremberg, printing enabled serial reproduction. Dürer designed narrative cycles (<a href="oeuvre.html?id=apocalypse-four-riders" class="archiv-text-link" style="color:var(--aged-gold)">Apocalypse</a>, <a href="oeuvre.html?id=large-passion-cycle" class="archiv-text-link" style="color:var(--aged-gold)">Large Passion</a>, <a href="oeuvre.html?id=life-of-virgin-cycle" class="archiv-text-link" style="color:var(--aged-gold)">Life of the Virgin</a>) and single plates of unprecedented density (<a href="oeuvre.html?id=melencolia" class="archiv-text-link" style="color:var(--aged-gold)">Melencolia I</a>). The work travelled without the artist accompanying each impression — birth of transmissible image.</p>
<h2>Wood, burin, print</h2>
<div class="archiv-compare">
<div class="archiv-compare__col"><h3>Woodcut</h3><p>Line cut in coated wood; narrative formats, sharp contrasts. The image is <em>reproducible</em> in hundreds of copies — foundation of European diffusion.</p></div>
<div class="archiv-compare__col"><h3>Engraving</h3><p>Incision in copper; modelling by hatching, precise light. The three master prints of 1513–1514 (<a href="oeuvre.html?id=knight-death-devil" class="archiv-text-link" style="color:var(--aged-gold)">Knight</a>, <a href="oeuvre.html?id=saint-jerome" class="archiv-text-link" style="color:var(--aged-gold)">St. Jerome</a>, <a href="oeuvre.html?id=melencolia" class="archiv-text-link" style="color:var(--aged-gold)">Melencolia</a>) reach an almost pictorial depth.</p></div>
</div>
<p class="mt-3"><strong>Print</strong> denotes the impression pulled from the matrix (wood or copper); for Dürer it becomes signature, authority and merchandise controlled from the Nuremberg workshop.</p>
<div id="archiv-engraving-spotlight" class="archiv-engraving-spotlight" data-ids="knight-death-devil,melencolia,saint-jerome" aria-label="Engraving details"></div>
<aside class="archiv-engraving-detail">
<div class="archiv-engraving-detail__img">
<a href="oeuvre.html?id=knight-death-devil"><img src="../img/durer/prints/durer-knight-death-devil-1513.webp" alt="Knight, Death and the Devil, engraving by Albrecht Dürer, 1513" width="800" height="1000" loading="lazy" decoding="async" data-archiv-work-id="knight-death-devil"></a>
</div>
<div class="archiv-engraving-detail__text archiv-prose-block">
<p class="archiv-kicker">Detail</p>
<h2>Knight, Death and the Devil</h2>
<p class="archiv-lead">Engraving of 1513: the rider advances through rocky landscape, indifferent to Death and the Devil — one of Dürer's three master prints.</p>
<p><a href="oeuvre.html?id=knight-death-devil" class="archiv-text-link" style="color:var(--aged-gold)">View work record</a></p>
</div>
</aside>
<h2>Diffusion and reputation</h2>
<p>The <em>Apocalypse</em> established Dürer on the European market before his Italian stays. The <a href="oeuvre.html?id=rhinoceros" class="archiv-text-link" style="color:var(--aged-gold)">Rhinoceros</a> (1515), engraved from reports, circulated in thousands — proof that printed image could fix the continent's visual knowledge.</p>
<h2>Three master prints (1513–1514)</h2>
<p><a href="oeuvre.html?id=knight-death-devil" class="archiv-text-link" style="color:var(--aged-gold)">Knight, Death and the Devil</a>: moral proof. <a href="oeuvre.html?id=saint-jerome" class="archiv-text-link" style="color:var(--aged-gold)">St. Jerome in His Study</a>: light of the studiolo. <a href="oeuvre.html?id=melencolia" class="archiv-text-link" style="color:var(--aged-gold)">Melencolia I</a>: technical thought and creative melancholy.</p>
<p class="mt-3"><a href="oeuvres.html" class="archiv-btn">Full catalogue</a></p>
</div></section>
<section class="archiv-museum-section archiv-museum-section--paper archiv-section--engraving"><div class="archiv-page-shell">
<div class="archiv-museum-section__head"><p class="archiv-kicker">Collection</p><h2>Major works</h2><p>Woodcuts and engravings — NGA, Met, Cleveland sources.</p></div>
<div id="archiv-gravures-cards"></div>
</div></section></main>""",
        hero_specimen=SPEC_KNIGHT,
    ),
    "science.html": page(
        "Dürer as theorist — Science, proportion, measure and perspective | ARCHIV",
        "Dürer the theorist: measurement, perspective, geometry, human proportion, fortification and scientific observation of the visible.",
        "science",
        "science.html",
        "Science and proportion",
        "Image as method",
        """<main id="archiv-main" class="archiv-museum-section archiv-museum-section--paper archiv-science-page"><div class="archiv-page-shell">
<p class="archiv-lead">Dürer did not separate the workshop from the geometry laboratory: drawing, print and treatise obey the same demand for measure.</p>
<div class="row g-5 archiv-science-layout align-items-start">
<div class="col-lg-7 archiv-prose-block">
<h2>Geometry and perspective</h2>
<p>The <em>Instructions on Measurement</em> teach perspective, polyhedra and compass constructions — tools visible in <a href="oeuvre.html?id=melencolia" class="archiv-text-link">Melencolia I</a>.</p>
<h2>Human proportion</h2>
<p>The project culminated in the <em>Four Books on Human Proportion</em> (1528), published by the workshop after his death. <a href="oeuvre.html?id=adam-eve" class="archiv-text-link">Adam and Eve</a> (1504) anticipates it in engraving.</p>
<h2>Nature and fortification</h2>
<p><a href="oeuvre.html?id=hare" class="archiv-text-link">Young Hare</a> and <a href="oeuvre.html?id=great-piece-of-turf" class="archiv-text-link">Great Piece of Turf</a>: science of the visible. The fortification treatise (1527) applies mathematics to city defence.</p>
</div>
<div class="col-lg-5">
<figure class="archiv-science-specimen archiv-museum-frame archiv-museum-frame--mat-light">
<a href="oeuvre.html?id=hare" class="archiv-zoom-link" data-work-id="hare"><img src="../img/durer/drawings/durer-young-hare-1502.webp" alt="Young Hare, watercolour by Albrecht Dürer, 1502" width="480" height="380" loading="lazy" decoding="async" data-archiv-work-id="hare"></a>
<figcaption class="archiv-museum-caption">Young Hare · 1502 · Albertina, Vienna</figcaption>
</figure>
</div>
</div>
<section class="archiv-science-treatises" aria-labelledby="archiv-science-treatises-title">
<p class="archiv-kicker" id="archiv-science-treatises-title">Theoretical treatises</p>
<div class="row g-3">
<div class="col-md-4"><article class="archiv-treatise-card"><p class="archiv-kicker">1525</p><h3>Instructions on Measurement</h3><p class="archiv-title-de">Underweysung der Messung</p><p>Manual of perspective and proportion for artists and artisans.</p><a href="https://www.metmuseum.org/toah/hd/durr/hd_durr.htm" class="archiv-text-link" target="_blank" rel="noopener">The Met</a></article></div>
<div class="col-md-4"><article class="archiv-treatise-card"><p class="archiv-kicker">1527</p><h3>Fortification</h3><p class="archiv-title-de">Befestigungslehre</p><p>Military architecture and mathematics.</p></article></div>
<div class="col-md-4"><article class="archiv-treatise-card"><p class="archiv-kicker">1528</p><h3>Human proportion</h3><p class="archiv-title-de">Vier Bücher von menschlicher Proportion</p><p>Posthumous sum on the body.</p></article></div>
</div>
</section>
</div></main>""",
    ),
    "voyages.html": page(
        "Travels of Albrecht Dürer — Nuremberg, Venice and the Low Countries | ARCHIV",
        "Map of Dürer's journeys: Nuremberg, Italy, Venice, Rhineland and Low Countries journal (1520–1521).",
        "voyages",
        "voyages.html",
        "Travels",
        "Mapping movement",
        """<main class="archiv-museum-section archiv-museum-section--paper"><div class="archiv-page-shell archiv-page-shell--narrow archiv-prose-block">
<p class="archiv-lead">Travels are not digressions: they feed commercial networks, the Italian gaze and the intimate journal of an artist who became a European figure.</p>
<div class="archiv-map" role="list" aria-label="Places on Dürer's journeys">
<article class="archiv-map__place is-hub" role="listitem"><span class="archiv-map__name">Nuremberg</span><span class="archiv-map__role">Workshop and print centre</span></article>
<article class="archiv-map__place" role="listitem"><span class="archiv-map__name">Colmar</span><span class="archiv-map__role">Journeyman travels, Rhenish tradition</span></article>
<article class="archiv-map__place" role="listitem"><span class="archiv-map__name">Basel</span><span class="archiv-map__role">Humanists and printers</span></article>
<article class="archiv-map__place" role="listitem"><span class="archiv-map__name">Strasbourg</span><span class="archiv-map__role">Early northern contacts</span></article>
<article class="archiv-map__place" role="listitem"><span class="archiv-map__name">Venice</span><span class="archiv-map__role">1505–1507: colour, Bellini, art market</span></article>
<article class="archiv-map__place" role="listitem"><span class="archiv-map__name">Cologne</span><span class="archiv-map__role">Rhenish stage</span></article>
<article class="archiv-map__place" role="listitem"><span class="archiv-map__name">Antwerp</span><span class="archiv-map__role">1520–1521: merchants and collections</span></article>
<article class="archiv-map__place" role="listitem"><span class="archiv-map__name">Low Countries</span><span class="archiv-map__role">Travel journal, Erasmus</span></article>
</div>
<h2>Nuremberg</h2><p>Permanent centre of workshop and printing.</p>
<h2>Italy (1494–1495; 1505–1507)</h2><p>Venice: Bellini, colour, art market — competition and dialogue with antiquity.</p>
<h2>Low Countries (1520–1521)</h2><p>Documented journal; Antwerp, Erasmus, merchants' collections.</p>
</div></main>""",
    ),
    "chronologie.html": page(
        "Chronology of Albrecht Dürer — Key dates and major works | ARCHIV",
        "Structural dates in Dürer's life (1471–1528): Apocalypse, master prints, Rhinoceros, treatises and European legacy.",
        "chronologie",
        "chronologie.html",
        "Chronology",
        "1471 — 1528",
        """<main class="archiv-museum-section archiv-museum-section--paper"><div class="archiv-page-shell archiv-page-shell--narrow">
<p class="archiv-lead mb-5">Structural dates — see <a href="vie.html" class="archiv-text-link">Life</a> and work records.</p>
<ul id="archiv-timeline-full" class="archiv-timeline-full"></ul>
</div></main>""",
    ),
    "sources.html": page(
        "Sources and credits — Albrecht Dürer Archive | ARCHIV",
        "Museums, notices, biographical sources and image credits: ARCHIV method, work inventory and documented rights.",
        "sources",
        "sources.html",
        "Sources",
        "Documentation and credits",
        """<main class="archiv-museum-section archiv-museum-section--paper"><div class="archiv-page-shell archiv-page-shell--narrow archiv-prose-block">
<p class="archiv-lead">ARCHIV favours museum notices, public collections and documented reproductions. No image is shown without credit and reference to the holding institution.</p>
<h2>Selection method</h2>
<p>Biographical and technical facts are checked against institutional sites (Met, NGA, British Museum, Albertina, Pinakothek, Prado, Louvre, MFA, Cleveland, Uffizi). Visuals come from <strong>public domain</strong> files (artist died 1528) on Wikimedia Commons when institutions do not provide stable URLs, or WebP copies optimised by ARCHIV.</p>
<h2 id="archiv-editions-sources" class="mt-5">Edition sources</h2>
<p>Each ARCHIV edition links to a documented source work. Until commercial reproduction rights are confirmed, status remains « Coming soon » — no price or online order.</p>
<div id="archiv-editions-sources-inventory" class="archiv-table-wrap mt-3"></div>
<h2 class="mt-5">Image sources</h2>
<p>Inventory generated from the works catalogue. Local files under <code>img/durer/</code>.</p>
<div id="archiv-sources-inventory" class="archiv-table-wrap mt-3"></div>
<h2 class="mt-5">Work sources</h2>
<p>See the <a href="oeuvres.html" class="archiv-text-link">catalogue</a> and records: <a href="oeuvre.html?id=melencolia">Melencolia I</a>, <a href="oeuvre.html?id=knight-death-devil">Knight, Death and the Devil</a>, <a href="oeuvre.html?id=rhinoceros">Rhinoceros</a>.</p>
<nav class="archiv-see-also mt-5" aria-label="Explore"><p class="archiv-kicker">Explore the archive</p><ul><li><a href="/">Overview</a></li><li><a href="vie.html">Biography</a></li><li><a href="oeuvres.html">Works</a></li><li><a href="editions.html">Editions</a></li></ul></nav>
</div></main>""",
        extra_css=f"{ASSET}css/archiv-editions.css",
        extra_scripts=f'    <script src="{ASSET}js/archiv-editions.js" defer></script>',
    ),
}


def localize_autoportraits(html: str) -> str:
    reps = [
        ('lang="fr"', 'lang="en"'),
        ("Autoportraits", "Self-portraits"),
        ("L'artiste comme auteur et comme image", "The artist as author and image"),
        ("Voir les autoportraits", "View self-portraits"),
        ("Comprendre le monogramme", "Understand the monogramme"),
        ("Se donner à voir", "Making oneself visible"),
        ("Trois autoportraits", "Three self-portraits"),
        ("L'artiste-auteur", "The artist-author"),
        ("Le regard frontal", "The frontal gaze"),
        ("Fiche œuvre", "Work record"),
        ("Détail du regard", "Detail of the gaze"),
        ("Collection", "Collection"),
        ("Identité", "Identity"),
        ("Analyse", "Analysis"),
        ('href="css/', f'href="{ASSET}css/'),
        ('href="img/', f'href="{ASSET}img/'),
        ('src="img/', f'src="{ASSET}img/'),
    ]
    for old, new in reps:
        html = html.replace(old, new)
    return html


STATIC_REPL = [
    ('lang="fr"', 'lang="en"'),
    ("Aller au contenu", "Skip to content"),
    ("Fermer le menu", "Close menu"),
    ('aria-label="Menu de navigation"', 'aria-label="Navigation menu"'),
    ('aria-label="Navigation principale"', 'aria-label="Main navigation"'),
    ('aria-label="Navigation mobile"', 'aria-label="Mobile navigation"'),
    ("L'artiste qui fit de l'image une science", "The artist who made image a science"),
    ("Explorer l'archive", "Explore the archive"),
    ("Voir les œuvres", "View works"),
    ("Les cinq piliers", "Five pillars"),
    ("Œuvres majeures", "Major works"),
    ("Catalogue complet", "Full catalogue"),
    ("Explorer l'archive", "Explore the archive"),
    ("Sources principales", "Main sources"),
    ("Éditions ARCHIV", "ARCHIV Editions"),
    ("tirages et dossiers numériques en préparation", "prints and digital dossiers in preparation"),
    ("Méthode et droits", "Method and rights"),
    ("Méthode ARCHIV", "ARCHIV method"),
    ("Biographie documentée", "Documented biography"),
    ("Catalogue des œuvres", "Works catalogue"),
    ("Inventaire des images", "Image inventory"),
    ("Archive numérique consacrée", "A digital archive devoted"),
    ("Parcours", "Journey"),
    ("Vue d'ensemble", "Overview"),
    ("Autoportraits", "Self-portraits"),
    ("Gravures", "Engravings"),
    ("Science et proportion", "Science and proportion"),
    ("Éditions", "Editions"),
]


def prefix_assets(html: str) -> str:
    pairs = [
        ('href="css/', f'href="{ASSET}css/'),
        ('href="img/', f'href="{ASSET}img/'),
        ('src="js/', f'src="{ASSET}js/'),
        ('src="img/', f'src="{ASSET}img/'),
        ("url('img/", f"url('{ASSET}img/"),
        ('preload" as="image" href="img/', f'preload" as="image" href="{ASSET}img/'),
    ]
    for old, new in pairs:
        html = html.replace(old, new)
    html = html.replace('data-site-logo="img/', f'data-site-logo="{ASSET}img/')
    return html


def swap_nav_footer(html: str) -> str:
    start = html.find("<header class=\"archiv-museum-header\"")
    if start < 0:
        return html
    main_start = html.find("<main", start)
    if main_start < 0:
        return html
    footer_start = html.rfind("<footer class=\"archiv-archive-footer")
    scripts_start = html.rfind("<script src=")
    if footer_start < 0 or scripts_start < 0:
        return html
    return html[:start] + NAV + "\n" + html[main_start:footer_start] + FOOTER + "\n" + SCRIPTS + "\n" + html[html.rfind("</body>"):]


def build_static_en(filename: str, canonical: str, extra_script_editions: bool = False):
    html = (ROOT / filename).read_text(encoding="utf-8")
    for old, new in STATIC_REPL:
        html = html.replace(old, new)
    html = prefix_assets(html)
    html = swap_nav_footer(html)
    import re as _re

    canon_tag = _re.search(r'<link rel="canonical" href="[^"]+">', html)
    if canon_tag and 'hreflang="en"' not in html:
        html = html.replace(
            canon_tag.group(),
            f'<link rel="canonical" href="{abs_url(canonical)}">\n{hreflang_links(canonical)}',
            1,
        )
    html = html.replace('content="fr_FR"', 'content="en_GB"')
    if extra_script_editions and "archiv-editions.js" not in html:
        html = html.replace(
            '<script src="js/archiv.js" defer></script>',
            '    <script src="js/archiv-editions.js" defer></script>\n    <script src="js/archiv.js" defer></script>',
        )
    (OUT_DIR / filename).write_text(html, encoding="utf-8")
    print("OK", filename)


def polish_en_index():
    path = OUT_DIR / "index.html"
    html = path.read_text(encoding="utf-8")
    html = _re.sub(r'\n    <link rel="alternate" hreflang="[^"]+" href="[^"]+">', "", html)
    html = _re.sub(
        r'<link rel="canonical" href="[^"]+">',
        f'<link rel="canonical" href="{abs_url("")}">\n{hreflang_links("")}',
        html,
        count=1,
    )
    html = html.replace(
        "<title>Albrecht Dürer — Archive numérique, œuvres, gravures et écrits | ARCHIV</title>",
        "<title>Albrecht Dürer — Digital archive, works, prints and writings | ARCHIV</title>",
    )
    html = html.replace(
        'content="A digital archive devoted à Albrecht Dürer : œuvres, gravures, autoportraits, voyages, écrits théoriques et héritage visuel de la Renaissance du Nord."',
        'content="Digital archive devoted to Albrecht Dürer: works, prints, self-portraits, travels, theoretical writings and the legacy of the Northern Renaissance."',
    )
    og_desc = "Digital archive devoted to Albrecht Dürer: works, prints, self-portraits, travels and theoretical writings."
    html = html.replace('og:title" content="Albrecht Dürer — Archive numérique | ARCHIV"', f'og:title" content="Albrecht Dürer — Digital archive | ARCHIV"')
    html = html.replace('twitter:title" content="Albrecht Dürer — Archive numérique | ARCHIV"', f'twitter:title" content="Albrecht Dürer — Digital archive | ARCHIV"')
    html = _re.sub(r'og:description" content="[^"]+"', f'og:description" content="{og_desc}"', html, count=1)
    html = _re.sub(r'twitter:description" content="[^"]+"', f'twitter:description" content="{og_desc}"', html, count=1)
    html = html.replace('og:url" content="https://albrechtdurer.uk/fr/"', 'og:url" content="https://albrechtdurer.uk/"')
    html = html.replace('"inLanguage":"fr"', '"inLanguage":"en"')
    html = html.replace("https://albrechtdurer.uk/fr/vie.html", "https://albrechtdurer.uk/vie.html")
    hero_repl = [
        ("Peintre, graveur, dessinateur et théoricien", "Painter, engraver, draughtsman and theorist"),
        ("Cinq axes pour lire Dürer", "Five axes for reading Dürer"),
        ("Regard", "Vision"),
        ("Observer le monde visible", "Observing the visible world"),
        ("Faire de l'estampe un médium majeur", "Making the print a major medium"),
        ("Construire l'image de l'artiste", "Building the image of the artist"),
        ("Relier mesure, perspective", "Linking measure, perspective"),
        ("Faire circuler l'image", "Circulating the image"),
        ("Quatre œuvres emblématiques", "Four emblematic works"),
        ("Trois entrées pour approfondir", "Three entry points to go deeper"),
        ("La vie", "Life"),
        ("Les gravures", "The prints"),
        ("Le Chevalier, la Mort et le Diable", "Knight, Death and the Devil"),
        ("Nuremberg, Italie, cours impériales", "Nuremberg, Italy, imperial courts"),
    ]
    for old, new in hero_repl:
        html = html.replace(old, new)
    path.write_text(html, encoding="utf-8")


def prefix_assets_fr(html: str) -> str:
    fr_asset = "../"
    pairs = [
        ('href="css/', f'href="{fr_asset}css/'),
        ('href="img/', f'href="{fr_asset}img/'),
        ('src="js/', f'src="{fr_asset}js/'),
        ('src="img/', f'src="{fr_asset}img/'),
        ("url('img/", f"url('{fr_asset}img/"),
        ('preload" as="image" href="img/', f'preload" as="image" href="{fr_asset}img/'),
    ]
    for old, new in pairs:
        html = html.replace(old, new)
    return html.replace('data-site-logo="img/', f'data-site-logo="{fr_asset}img/')


def preserve_fr_static_pages():
    """Copy current FR manual pages to /fr/ before overwriting root with EN."""
    fr_dir = ROOT / "fr"
    fr_dir.mkdir(parents=True, exist_ok=True)
    nav_fr = "\n".join((ROOT / "partials/archiv-nav-fr.html").read_text(encoding="utf-8").splitlines()[1:])
    footer_fr = (ROOT / "partials/archiv-footer-fr.html").read_text(encoding="utf-8")
    scripts_fr = (ROOT / "partials/archiv-scripts-fr.html").read_text(encoding="utf-8")
    for filename in ("index.html", "editions.html", "edition.html"):
        src = ROOT / filename
        if not src.exists():
            continue
        html = src.read_text(encoding="utf-8")
        html = prefix_assets_fr(html)
        html = _re.sub(r'\n    <link rel="alternate" hreflang="[^"]+" href="[^"]+">', "", html)
        html = html.replace('og:url" content="https://albrechtdurer.uk/"', 'og:url" content="https://albrechtdurer.uk/fr/"')
        start = html.find("<header class=\"archiv-museum-header\"")
        main_start = html.find("<main", start) if start >= 0 else html.find("<main")
        footer_start = html.rfind("<footer class=\"archiv-archive-footer")
        if start >= 0 and main_start >= 0 and footer_start >= 0:
            html = html[:start] + nav_fr + "\n" + html[main_start:footer_start] + footer_fr + "\n" + scripts_fr + "\n" + html[html.rfind("</body>"):]
        canon = _re.search(r'<link rel="canonical" href="[^"]+">', html)
        if canon:
            fr_canon = f"fr/{filename}" if filename != "index.html" else "fr/"
            fr_canon_path = fr_canon.rstrip("/") if fr_canon.endswith("/") and filename == "index.html" else fr_canon
            if filename == "index.html":
                fr_abs = f"{SITE_ORIGIN}/fr/"
            else:
                fr_abs = f"{SITE_ORIGIN}/fr/{filename}"
            en_key = filename if filename != "index.html" else ""
            html = html.replace(canon.group(), f'<link rel="canonical" href="{fr_abs}">\n{hreflang_links(en_key)}', 1)
        (fr_dir / filename).write_text(html, encoding="utf-8")
        print("OK fr/", filename)


def main():
    preserve_fr_static_pages()
    for name, html in PAGES.items():
        (OUT_DIR / name).write_text(html, encoding="utf-8")
        print("OK", name)

    # Self-portraits: adapt FR page (rich layout)
    fr_dir = ROOT / "fr"
    fr_auto = (fr_dir / "autoportraits.html").read_text(encoding="utf-8")
    fr_main_start = fr_auto.find("<main")
    fr_main_end = fr_auto.rfind("</main>") + len("</main>")
    main_block = fr_main_start and fr_auto[fr_main_start:fr_main_end] or ""
    auto_page = page(
        "Self-portraits by Albrecht Dürer — The artist as author | ARCHIV",
        "Analysis of Dürer's self-portraits and his role in asserting the artist as author and public image.",
        "autoportraits",
        "autoportraits.html",
        "",
        "",
        localize_autoportraits(main_block),
        use_hero=False,
        body_class="archiv-page-portraits",
        extra_css=f"{ASSET}css/archiv-portraits.css",
    )
    (OUT_DIR / "autoportraits.html").write_text(auto_page, encoding="utf-8")
    print("OK autoportraits.html")

    build_static_en("index.html", "")
    polish_en_index()
    build_static_en("editions.html", "editions.html", extra_script_editions=True)
    build_static_en("edition.html", "edition.html", extra_script_editions=True)

    print("Done", len(PAGES) + 4, "EN pages at root")


if __name__ == "__main__":
    main()
