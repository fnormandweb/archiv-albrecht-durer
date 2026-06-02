#!/usr/bin/env python3
"""Génère / met à jour les pages ARCHIV intérieures."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NAV = "\n".join((ROOT / "partials/archiv-nav.html").read_text(encoding="utf-8").splitlines()[1:])
FOOTER = (ROOT / "partials/archiv-footer.html").read_text(encoding="utf-8")
SCRIPTS_LITE = (ROOT / "partials/archiv-scripts-production.html").read_text(encoding="utf-8")
SITE_ORIGIN = "https://albrechtdurer.uk"
OG_IMAGE_DEFAULT = "img/durer/portraits/durer-self-portrait-1500.webp"


def abs_url(path: str) -> str:
    path = (path or "").lstrip("/")
    return f"{SITE_ORIGIN}/{path}"
SKIP = (ROOT / "partials/archiv-skip.html").read_text(encoding="utf-8").strip()

SPEC_MELENCOLIA = """<figure class="archiv-archive-hero__specimen">
<a href="oeuvre.html?id=melencolia"><img src="img/durer/prints/durer-melencolia-i-1514.webp" alt="Melencolia I, gravure au burin, 1514" width="320" height="420" loading="eager" decoding="async" data-archiv-work-id="melencolia"></a>
<figcaption class="archiv-museum-caption" style="border:0;padding:0.5rem 0 0;margin:0;color:rgba(205,189,157,0.7);">Melencolia I · 1514 · NGA, Washington</figcaption>
</figure>"""

SPEC_SELF_1500 = """<figure class="archiv-archive-hero__specimen">
<a href="oeuvre.html?id=self-portrait-1500"><img src="img/durer/portraits/durer-self-portrait-1500.webp" alt="Autoportrait d'Albrecht Dürer de 1500, visage frontal et manteau sombre" width="280" height="380" loading="eager" decoding="async" data-archiv-work-id="self-portrait-1500"></a>
<figcaption class="archiv-museum-caption" style="border:0;padding:0.5rem 0 0;margin:0;color:rgba(205,189,157,0.7);">Autoportrait · 1500 · Munich</figcaption>
</figure>"""

SPEC_KNIGHT = """<figure class="archiv-archive-hero__specimen">
<a href="oeuvre.html?id=knight-death-devil"><img src="img/durer/prints/durer-knight-death-devil-1513.webp" alt="Gravure Le Chevalier, la Mort et le Diable d'Albrecht Dürer, cavalier en armure, 1513" width="320" height="420" loading="eager" decoding="async" data-archiv-work-id="knight-death-devil"></a>
<figcaption class="archiv-museum-caption" style="border:0;padding:0.5rem 0 0;margin:0;color:rgba(205,189,157,0.7);">Le Chevalier, la Mort et le Diable · 1513 · NGA, Washington</figcaption>
</figure>"""

SPEC_HARE = """<figure class="archiv-archive-hero__specimen">
<a href="oeuvre.html?id=hare"><img src="img/durer/drawings/durer-young-hare-1502.webp" alt="Aquarelle Jeune lièvre d'Albrecht Dürer, animal représenté avec précision naturaliste, 1502" width="280" height="220" loading="eager" decoding="async" data-archiv-work-id="hare"></a>
<figcaption class="archiv-museum-caption" style="border:0;padding:0.5rem 0 0;margin:0;color:rgba(205,189,157,0.7);">Jeune lièvre · 1502 · Albertina</figcaption>
</figure>"""

def head(title, desc, page_id, canonical, og_title=None, body_class="", extra_css="", og_image=None):
    og = og_title or title
    og_img = og_image or OG_IMAGE_DEFAULT
    if og_img.startswith("img/"):
        og_img_abs = abs_url(og_img)
    else:
        og_img_abs = og_img
    canon_abs = abs_url(canonical)
    extra_link = f'\n    <link rel="stylesheet" href="{extra_css}">' if extra_css else ""
    body_cls = "archiv-site"
    if body_class:
        body_cls += " " + body_class
    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{title}</title>
    <meta name="description" content="{desc}">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#15100C">
    <meta property="og:type" content="website">
    <meta property="og:title" content="{og}">
    <meta property="og:description" content="{desc}">
    <meta property="og:url" content="{canon_abs}">
    <meta property="og:image" content="{og_img_abs}">
    <meta property="og:locale" content="fr_FR">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{og}">
    <meta name="twitter:description" content="{desc}">
    <meta name="twitter:image" content="{og_img_abs}">
    <link rel="canonical" href="{canon_abs}">
    <link rel="dns-prefetch" href="https://upload.wikimedia.org">
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/plugins.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/archiv.css">
    <link rel="stylesheet" href="css/archiv-museum.css">
    <link rel="stylesheet" href="css/archiv-system.css">
    <link rel="stylesheet" href="css/archiv-stable.css">
    <link rel="stylesheet" href="css/archiv-premium-2026.css">
    <link rel="stylesheet" href="css/archiv-images.css">
    <link rel="stylesheet" href="css/archiv-production.css">{extra_link}
</head>
<body class="{body_cls}" data-site-logo="img/logo_Albrecht_Durer.svg" data-archiv-page="{page_id}">
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

def page(title, desc, page_id, canonical, h1, sub, main, og=None, use_hero=True, body_class="", extra_css="", hero_specimen=""):
    body = main if main.strip().startswith("<main") else f'<main id="archiv-main" class="archiv-page-main">{main}</main>'
    hero = archive_hero(h1, sub, text_only=not hero_specimen, specimen=hero_specimen) if use_hero else ""
    return head(title, desc, page_id, canonical, og, body_class, extra_css) + NAV + hero + body + FOOTER + SCRIPTS_LITE + "\n</body>\n</html>\n"

PAGES = {
"oeuvre.html": page(
    "Œuvre — Albrecht Dürer | ARCHIV",
    "Fiche d'œuvre documentée : technique, conservation, lecture visuelle et source muséale.",
    "oeuvre", "oeuvre.html",
    "Œuvre", "Fiche documentée",
    """<main id="archiv-main" class="archiv-museum-section archiv-museum-section--paper archiv-page-main"><div class="archiv-page-shell" id="archiv-oeuvre-detail"></div></main>""",
    use_hero=False,
),

"vie.html": page(
    "Biographie d'Albrecht Dürer — vie et parcours | ARCHIV",
    "Biographie par périodes : Nuremberg, formation, Italie, cour de Maximilien, Pays-Bas et traités (1471–1528).",
    "vie", "vie.html", "Vie", "De Nuremberg aux cours d'Europe",
    """<main class="archiv-museum-section archiv-museum-section--paper"><div class="archiv-page-shell"><div class="archiv-prose-block">
<p class="archiv-lead">La vie de Dürer ne se résume pas à une chronologie : c'est l'émergence d'un artiste-auteur dans une cité d'imprimerie, au carrefour des échanges rhénans, italiens et impériaux.</p>
<article class="archiv-period" id="nuremberg"><p class="archiv-period-years">1471</p><h2>Nuremberg</h2><p>Naissance le 21 mai. Nuremberg, ville libre impériale, concentre imprimeurs, orfèvres et marchands — le milieu où l'image imprimée deviendra le vecteur de la renommée de Dürer.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1486–1490</p><h2>Formation familiale et atelier</h2><p>Apprentissage chez Michael Wolgemut : chroniques illustrées, gravure sur bois, composition de foule. Le jeune Dürer y apprend la rigueur du trait reproductible.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1490–1494</p><h2>Voyages de compagnon</h2><p>Colmar, Bâle, Strasbourg. Ces années posent le réseau rhénan et la conscience d'un maître capable de signer son œuvre.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1495</p><h2>Ouverture de l'atelier</h2><p>Retour définitif, mariage avec Agnes Frey, monogramme AD. L'atelier structure peinture, dessin et estampe comme activités complémentaires.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1498</p><h2>Apocalypse et premières estampes</h2><p>Publication du cycle sur bois : succès immédiat en Europe. Voir <a href="oeuvre.html?id=apocalypse-four-riders" class="archiv-text-link">Les Quatre cavaliers</a>.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1505–1507</p><h2>Voyages en Italie</h2><p>Venise : couleur, antiquité, Bellini. Le second séjour nourrit portraits et théorie de la beauté.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1508–1514</p><h2>Maturité artistique</h2><p>Études naturalistes, <em>Grande Passion</em>, puis les maîtres gravures de 1513–1514 : <a href="oeuvre.html?id=knight-death-devil" class="archiv-text-link">Le Chevalier, la Mort et le Diable</a>, <a href="oeuvre.html?id=saint-jerome" class="archiv-text-link">Saint Jérôme</a>, <a href="oeuvre.html?id=melencolia" class="archiv-text-link">Melencolia I</a>.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1512–1518</p><h2>Maximilien I<sup>er</sup></h2><p>Commandes impériales, décorations, <em>Triomphe</em> gravé — l'artiste au service du pouvoir.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1520–1521</p><h2>Voyage aux Pays-Bas</h2><p>Journal, Anvers, Érasme. Voir <a href="voyages.html" class="archiv-text-link">Voyages</a>.</p></article>
<article class="archiv-period"><p class="archiv-period-years">1525–1528</p><h2>Derniers traités et fin de vie</h2><p><a href="science.html" class="archiv-text-link">Traité de la mesure</a>, fortification, proportions ; mort le 6 avril 1528.</p></article>
<p class="mt-4"><a href="chronologie.html" class="archiv-btn archiv-btn--dark">Chronologie complète</a></p>
</div></div></main>""",
    "Biographie d'Albrecht Dürer | ARCHIV",
),

"oeuvres.html": page(
    "Œuvres d'Albrecht Dürer — catalogue | ARCHIV",
    "Catalogue filtrable : peinture, gravure sur bois, burin, dessin, aquarelle et traités. Fiches documentées et sources muséales.",
    "oeuvres", "oeuvres.html", "Œuvres", "Catalogue documenté et filtrable",
    """<main class="archiv-museum-section archiv-museum-section--paper archiv-collection-index"><div class="archiv-page-shell">
<p class="archiv-lead mb-2">Index de collection — fiches, métadonnées et sources institutionnelles.</p>
<p id="archiv-collection-count" class="archiv-collection-count"></p>
<section class="archiv-collection-spotlight" aria-label="Œuvre en vedette">
<p class="archiv-label archiv-collection-spotlight__label">Œuvre en vedette</p>
<div id="archiv-collection-spotlight" data-feature-id="knight-death-devil"></div>
</section>
<div class="archiv-toolbar archiv-work-filter">
<div><span class="archiv-toolbar__label">Catégorie</span>
<div class="archiv-filters" role="tablist" aria-label="Filtrer par technique">
<button type="button" class="archiv-filter-btn is-active" data-filter="all">Toutes</button>
<button type="button" class="archiv-filter-btn" data-filter="peinture">Peinture</button>
<button type="button" class="archiv-filter-btn" data-filter="bois">Gravure sur bois</button>
<button type="button" class="archiv-filter-btn" data-filter="burin">Gravure au burin</button>
<button type="button" class="archiv-filter-btn" data-filter="dessin">Dessin</button>
<button type="button" class="archiv-filter-btn" data-filter="aquarelle">Aquarelle</button>
<button type="button" class="archiv-filter-btn" data-filter="theorie">Théorie</button>
</div></div>
<div><span class="archiv-toolbar__label">Tri</span>
<div class="archiv-sort-group" role="group" aria-label="Trier le catalogue">
<button type="button" class="archiv-filter-btn archiv-sort-btn is-active" data-sort="date-desc">Date ↓</button>
<button type="button" class="archiv-filter-btn archiv-sort-btn" data-sort="date-asc">Date ↑</button>
<button type="button" class="archiv-filter-btn archiv-sort-btn" data-sort="title">Titre</button>
<button type="button" class="archiv-filter-btn archiv-sort-btn" data-sort="museum">Institution</button>
</div></div>
</div>
<div id="archiv-oeuvres-grid" class="row archiv-collection-grid"></div>
</div></main>""",
    "Œuvres d'Albrecht Dürer | ARCHIV",
    hero_specimen=SPEC_MELENCOLIA,
),

"gravures.html": page(
    "Gravures d'Albrecht Dürer — estampe et Renaissance nordique | ARCHIV",
    "Apocalypse, burin, Melencolia I, Saint Jérôme, Chevalier et Rhinocéros : comment Dürer fit de l'estampe un art majeur.",
    "gravures", "gravures.html", "Gravures", "L'estampe comme langage autonome",
    """<main>
<section class="archiv-museum-section archiv-museum-section--ink archiv-section--engraving"><div class="archiv-page-shell archiv-page-shell--narrow archiv-prose-block">
<p class="archiv-lead">Chez Dürer, l'estampe n'est pas un accessoire de l'atelier : c'est le médium par lequel l'image devient science, récit et marchandise européenne.</p>
<h2>Pourquoi l'estampe est centrale</h2>
<p>À Nuremberg, l'imprimerie permet la reproduction en série. Dürer conçoit des cycles narratifs (<a href="oeuvre.html?id=apocalypse-four-riders" class="archiv-text-link" style="color:var(--aged-gold)">Apocalypse</a>, <a href="oeuvre.html?id=large-passion-cycle" class="archiv-text-link" style="color:var(--aged-gold)">Grande Passion</a>, <a href="oeuvre.html?id=life-of-virgin-cycle" class="archiv-text-link" style="color:var(--aged-gold)">Vie de la Vierge</a>) et des planches uniques d'une densité inédite (<a href="oeuvre.html?id=melencolia" class="archiv-text-link" style="color:var(--aged-gold)">Melencolia I</a>). L'œuvre voyage sans que l'artiste accompagne chaque exemplaire — naissance de l'image transmissible.</p>
<h2>Bois, burin, estampe</h2>
<div class="archiv-compare">
<div class="archiv-compare__col"><h3>Gravure sur bois</h3><p>Trait dans le bois enduit ; formats narratifs, contrastes francs. L'image est <em>reproductible</em> en centaines d'exemplaires — fondement de la diffusion européenne.</p></div>
<div class="archiv-compare__col"><h3>Gravure au burin</h3><p>Incision dans le cuivre ; modelé par hachures, lumière précise. Les trois maîtres gravures de 1513–1514 (<a href="oeuvre.html?id=knight-death-devil" class="archiv-text-link" style="color:var(--aged-gold)">Chevalier</a>, <a href="oeuvre.html?id=saint-jerome" class="archiv-text-link" style="color:var(--aged-gold)">Saint Jérôme</a>, <a href="oeuvre.html?id=melencolia" class="archiv-text-link" style="color:var(--aged-gold)">Melencolia</a>) atteignent une profondeur quasi picturale.</p></div>
</div>
<p class="mt-3"><strong>Estampe</strong> désigne l'impression tirée de la matrice (bois ou cuivre) ; chez Dürer, elle devient signature, autorité et marchandise contrôlée depuis l'atelier de Nuremberg.</p>
<div id="archiv-engraving-spotlight" class="archiv-engraving-spotlight" data-ids="knight-death-devil,melencolia,saint-jerome" aria-label="Détails de gravures"></div>
<aside class="archiv-engraving-detail">
<div class="archiv-engraving-detail__img">
<a href="oeuvre.html?id=knight-death-devil"><img src="img/durer/prints/durer-knight-death-devil-1513.webp" alt="Gravure Le Chevalier, la Mort et le Diable d'Albrecht Dürer, 1513" width="800" height="1000" loading="lazy" decoding="async" data-archiv-work-id="knight-death-devil"></a>
</div>
<div class="archiv-engraving-detail__text archiv-prose-block">
<p class="archiv-kicker">Détail</p>
<h2>Le Chevalier, la Mort et le Diable</h2>
<p class="archiv-lead">Gravure au burin de 1513 : le cavalier avance dans un paysage rocheux, indifférent à la Mort et au Diable — l'une des trois maîtres gravures de Dürer.</p>
<p><a href="oeuvre.html?id=knight-death-devil" class="archiv-text-link" style="color:var(--aged-gold)">Consulter la fiche œuvre</a></p>
</div>
</aside>
<h2>Diffusion et réputation</h2>
<p>L'<em>Apocalypse</em> impose Dürer sur le marché européen avant même ses séjours italiens. Le <a href="oeuvre.html?id=rhinoceros" class="archiv-text-link" style="color:var(--aged-gold)">Rhinocéros</a> (1515), gravé d'après récits, circule par milliers — preuve que l'image imprimée peut fixer le savoir visuel du continent.</p>
<h2>Trois maîtres gravures (1513–1514)</h2>
<p><a href="oeuvre.html?id=knight-death-devil" class="archiv-text-link" style="color:var(--aged-gold)">Le Chevalier, la Mort et le Diable</a> : épreuve morale. <a href="oeuvre.html?id=saint-jerome" class="archiv-text-link" style="color:var(--aged-gold)">Saint Jérôme dans son cabinet</a> : lumière du studiolo. <a href="oeuvre.html?id=melencolia" class="archiv-text-link" style="color:var(--aged-gold)">Melencolia I</a> : pensée technique et mélancolie créatrice.</p>
<p class="mt-3"><a href="oeuvres.html" class="archiv-btn">Catalogue complet</a></p>
</div></section>
<section class="archiv-museum-section archiv-museum-section--paper archiv-section--engraving"><div class="archiv-page-shell">
<div class="archiv-museum-section__head"><p class="archiv-kicker">Collection</p><h2>Œuvres majeures</h2><p>Gravures sur bois et au burin — sources NGA, Met, Cleveland.</p></div>
<div id="archiv-gravures-cards"></div>
</div></section></main>""",
    "Gravures d'Albrecht Dürer | ARCHIV",
    hero_specimen=SPEC_KNIGHT,
),

"autoportraits.html": page(
    "Autoportraits de Dürer — artiste-auteur | ARCHIV",
    "Autoportraits de 1493, 1498 et 1500 : monogramme AD, regard frontal et naissance de l'artiste-auteur.",
    "autoportraits", "autoportraits.html", "", "",
    """<main id="archiv-main" class="archiv-portraits-page">
<header class="archiv-portraits-hero" aria-labelledby="portraits-hero-title">
<div class="archiv-portraits-hero__texture" aria-hidden="true"></div>
<div class="archiv-portraits-hero__inner">
<div class="archiv-portraits-hero__copy">
<p class="archiv-portraits-hero__kicker">ARCHIV · Albrecht Dürer</p>
<h1 id="portraits-hero-title" class="archiv-portraits-hero__title">Autoportraits</h1>
<p class="archiv-portraits-hero__tagline">L'artiste comme auteur et comme image</p>
<p class="archiv-portraits-hero__text">Chez Dürer, l'autoportrait devient plus qu'un exercice de ressemblance. Il affirme un statut, une signature et une autorité nouvelle : celle de l'artiste qui se pense lui-même comme œuvre, auteur et figure publique.</p>
<div class="archiv-portraits-hero__actions">
<a href="#portraits-triptych" class="archiv-btn">Voir les autoportraits</a>
<a href="#portraits-author" class="archiv-btn archiv-btn--ghost">Comprendre le monogramme</a>
</div>
</div>
<figure class="archiv-portraits-hero__specimen">
<a href="oeuvre.html?id=self-portrait-1500" class="archiv-zoom-link" data-work-id="self-portrait-1500">
<img src="img/durer/portraits/durer-self-portrait-1500.webp" alt="Autoportrait d'Albrecht Dürer de 1500, visage frontal et manteau sombre" width="480" height="640" loading="eager" decoding="async" data-archiv-work-id="self-portrait-1500">
</a>
<ul class="archiv-portraits-hero__caption archiv-museum-caption">
<li>Albrecht Dürer · Autoportrait à 28 ans</li>
<li>1500 · Huile sur panneau de tilleul</li>
<li>Alte Pinakothek, Munich</li>
<li><a href="https://www.sammlung.pinakothek.de/en/artist/albrecht-durer" target="_blank" rel="noopener">Alte Pinakothek</a></li>
</ul>
</figure>
</div>
</header>

<section class="archiv-portraits-intro" aria-labelledby="portraits-intro-title">
<div class="archiv-portraits-intro__grid">
<h2 id="portraits-intro-title" class="archiv-portraits-intro__label">Se donner à voir</h2>
<div class="archiv-portraits-intro__body">
<p>Dürer invente une série d'autoportraits sans équivalent en Europe du Nord. À travers eux, il ne documente pas seulement son apparence : il construit une image sociale, intellectuelle et presque souveraine de l'artiste.</p>
<p>De la main levée de 1493 au gentleman de 1498, puis au frontal de 1500, chaque tableau est une mise en scène du statut — costume, regard, inscription, monogramme.</p>
<p class="archiv-portraits-intro__note">Sources : Musée du Louvre, Museo del Prado, Alte Pinakothek — notices et reproductions documentées.</p>
</div>
</div>
</section>

<section id="portraits-triptych" class="archiv-portraits-gallery" aria-labelledby="portraits-gallery-title">
<div class="archiv-portraits-gallery__head">
<p class="archiv-kicker">Collection</p>
<h2 id="portraits-gallery-title">Trois autoportraits</h2>
<p>1493 · 1498 · 1500 — peinture sur panneau, notices et sources institutionnelles.</p>
</div>
<div id="archiv-portraits-triptych" class="archiv-portraits-triptych" data-ids="self-portrait-1493,self-portrait-1498,self-portrait-1500"></div>
</section>

<section id="portraits-author" class="archiv-portraits-author" aria-labelledby="portraits-author-title">
<div class="archiv-portraits-author__inner">
<p class="archiv-portraits-author__mono" aria-hidden="true">AD</p>
<div class="archiv-portraits-author__content">
<p class="archiv-kicker">Identité</p>
<h2 id="portraits-author-title">L'artiste-auteur</h2>
<p>Le monogramme AD signe estampes et tableaux ; la signature manuscrite scelle un contrat de visibilité avec le spectateur. Dürer dépasse la condition d'artisan au service des corporations.</p>
<p>Il revendique l'auteur, la théorie et la diffusion contrôlée de l'image — passage de l'artisan au peintre-théoricien reconnu en Europe.</p>
<ul class="archiv-portraits-author__list">
<li>Monogramme AD</li>
<li>Signature et inscription</li>
<li>Image de soi</li>
<li>Statut social</li>
</ul>
</div>
</div>
</section>

<section class="archiv-portraits-gaze" aria-labelledby="portraits-gaze-title">
<div class="archiv-portraits-gaze__inner">
<figure class="archiv-portraits-gaze__visual">
<a href="oeuvre.html?id=self-portrait-1500" class="archiv-zoom-link" data-work-id="self-portrait-1500">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Albrecht_D%C3%BCrer_-_1500_self-portrait_%28High_resolution_and_detail%29.jpg/1280px-Albrecht_D%C3%BCrer_-_1500_self-portrait_%28High_resolution_and_detail%29.jpg" alt="Détail du regard, autoportrait 1500" width="900" height="1100" loading="lazy" decoding="async">
</a>
<p class="archiv-portraits-gaze__visual-note">Détail du regard · Autoportrait, 1500</p>
</figure>
<div class="archiv-portraits-gaze__copy">
<p class="archiv-kicker">Analyse</p>
<h2 id="portraits-gaze-title">Le regard frontal</h2>
<p>Dans l'autoportrait de 1500, la frontalité transforme l'image de l'artiste. Dürer n'apparaît plus seulement comme peintre : il se présente comme figure d'autorité, presque iconique, inscrite dans une tradition visuelle religieuse et savante.</p>
<p>Regard direct, main gantée, chevelure en symétrie : la narration cède la place à la présence.</p>
<ul class="archiv-museum-caption archiv-portraits-hero__caption" style="margin-top:1.5rem;border-top:1px solid rgba(182,138,58,0.2);padding-top:1rem;">
<li>Albrecht Dürer · 1500</li>
<li><a href="oeuvre.html?id=self-portrait-1500">Fiche œuvre</a> · <a href="https://www.sammlung.pinakothek.de/en/artist/albrecht-durer" target="_blank" rel="noopener">Source Pinakothek</a></li>
</ul>
</div>
</div>
</section>
</main>""",
    "Autoportraits de Dürer | ARCHIV",
    use_hero=False,
    body_class="archiv-page-portraits",
    extra_css="css/archiv-portraits.css",
),

"science.html": page(
    "Dürer théoricien — science et proportion humaine | ARCHIV",
    "Mesure, perspective, proportion, fortification : les traités de Dürer (1525–1528) et l'art comme méthode.",
    "science", "science.html", "Science et proportion", "L'image comme méthode",
    """<main class="archiv-museum-section archiv-museum-section--paper archiv-science-grid"><div class="archiv-page-shell">
<div class="row g-5">
<div class="col-lg-6 archiv-prose-block">
<p class="archiv-lead">Dürer ne sépare pas l'atelier du laboratoire géométrique : dessin, estampe et traité obéissent à une même exigence de mesure.</p>
<h2>Géométrie et perspective</h2>
<p>Les <em>Instructions de la mesure</em> enseignent perspective, polyèdres et tracés au compas — outils visibles dans <a href="oeuvre.html?id=melencolia" class="archiv-text-link">Melencolia I</a>.</p>
<h2>Proportion humaine</h2>
<p>Le projet aboutit aux <em>Quatre livres sur les proportions humaines</em> (1528), publiés par l'atelier après sa mort. <a href="oeuvre.html?id=adam-eve" class="archiv-text-link">Adam et Ève</a> (1504) en est l'anticipation gravée.</p>
<h2>Nature et fortification</h2>
<p><a href="oeuvre.html?id=hare" class="archiv-text-link">Le lièvre</a> et la <a href="oeuvre.html?id=great-piece-of-turf" class="archiv-text-link">Grande touffe d'herbes</a> : science du visible. Le traité de fortification (1527) applique la mathématique à la défense des villes.</p>
</div>
<div class="col-lg-6">
<a href="oeuvre.html?id=hare" class="archiv-zoom-link d-block mb-4"><img src="img/durer/drawings/durer-young-hare-1502.webp" alt="Aquarelle Jeune lièvre d'Albrecht Dürer, animal représenté avec précision naturaliste, 1502" class="img-fluid" loading="lazy" decoding="async" data-archiv-work-id="hare"></a>
<div class="row g-3">
<div class="col-12"><article class="archiv-treatise-card"><p class="archiv-kicker">1525</p><h3>Instructions de la mesure</h3><p class="archiv-title-de">Underweysung der Messung</p><p>Manuel de perspective et de proportion pour artistes et artisans.</p><a href="https://www.metmuseum.org/toah/hd/durr/hd_durr.htm" class="archiv-text-link" target="_blank" rel="noopener">The Met</a></article></div>
<div class="col-md-6"><article class="archiv-treatise-card"><p class="archiv-kicker">1527</p><h3>Fortification</h3><p class="archiv-title-de">Befestigungslehre</p><p>Architecture militaire et mathématiques.</p></article></div>
<div class="col-md-6"><article class="archiv-treatise-card"><p class="archiv-kicker">1528</p><h3>Proportion humaine</h3><p class="archiv-title-de">Vier Bücher von menschlicher Proportion</p><p>Somme posthume sur le corps.</p></article></div>
</div></div></div></div></main>""",
    "Dürer théoricien — proportion | ARCHIV",
    hero_specimen=SPEC_HARE,
),

"voyages.html": page(
    "Voyages d'Albrecht Dürer — carte narrative | ARCHIV",
    "Nuremberg, Italie, Pays-Bas : cartographie des déplacements et du journal de voyage (1520–1521).",
    "voyages", "voyages.html", "Voyages", "Cartographie des déplacements",
    """<main class="archiv-museum-section archiv-museum-section--paper"><div class="archiv-page-shell archiv-page-shell--narrow archiv-prose-block">
<p class="archiv-lead">Les voyages ne sont pas des digressions : ils alimentent réseau commercial, regard italien et journal intime d'un artiste devenu figure européenne.</p>
<div class="archiv-map my-5">
<div class="archiv-map__place is-hub">Nuremberg</div>
<div class="archiv-map__place">Colmar</div>
<div class="archiv-map__place">Bâle</div>
<div class="archiv-map__place">Strasbourg</div>
<div class="archiv-map__place">Venise</div>
<div class="archiv-map__place">Cologne</div>
<div class="archiv-map__place">Anvers</div>
<div class="archiv-map__place">Flandre</div>
</div>
<h2>Nuremberg</h2><p>Centre permanent de l'atelier et de l'imprimerie.</p>
<h2>Italie (1494–1495 ; 1505–1507)</h2><p>Venise : Bellini, couleur, marché de l'art — concurrence et dialogue avec l'antique.</p>
<h2>Pays-Bas (1520–1521)</h2><p>Journal documenté ; Anvers, Érasme, collections des marchands.</p>
</div></main>""",
    "Voyages Albrecht Dürer | ARCHIV",
),

"chronologie.html": page(
    "Chronologie d'Albrecht Dürer (1471–1528) | ARCHIV",
    "Dates majeures : Apocalypse, maîtres gravures, Rhinocéros, traités et décès à Nuremberg.",
    "chronologie", "chronologie.html", "Chronologie", "1471 — 1528",
    """<main class="archiv-museum-section archiv-museum-section--paper"><div class="archiv-page-shell archiv-page-shell--narrow">
<p class="archiv-lead mb-5">Dates structurantes — renvoi vers <a href="vie.html" class="archiv-text-link">Vie</a> et fiches œuvre.</p>
<ul id="archiv-timeline-full" class="archiv-timeline-full"></ul>
</div></main>""",
    "Chronologie Albrecht Dürer | ARCHIV",
),

"sources.html": page(
    "Sources et crédits — ARCHIV Albrecht Dürer",
    "Musées, collections et crédits images : Met, NGA, British Museum, Albertina, Pinakothek, Wikimedia Commons.",
    "sources", "sources.html", "Sources", "Documentation et crédits",
    """<main class="archiv-museum-section archiv-museum-section--paper"><div class="archiv-page-shell archiv-page-shell--narrow archiv-prose-block">
<p class="archiv-lead">ARCHIV privilégie les notices de musées, les collections publiques et les reproductions documentées. Aucune image n'est affichée sans crédit ni renvoi vers la collection de référence.</p>
<h2>Méthode de sélection</h2>
<p>Les faits biographiques et techniques sont vérifiés sur les sites institutionnels (Met, NGA, British Museum, Albertina, Pinakothek, Prado, Louvre, MFA, Cleveland). Les visuels proviennent de fichiers en <strong>domaine public</strong> (artiste mort en 1528) hébergés sur Wikimedia Commons lorsque l'institution ne fournit pas d'URL stable, ou de copies WebP optimisées produites par ARCHIV à partir de ces fichiers.</p>
<h2>Musées et collections</h2>
<ul class="archiv-sources-list">
<li><a href="https://www.metmuseum.org/" target="_blank" rel="noopener">The Metropolitan Museum of Art</a> — estampes, cycles, Heilbrunn Timeline.</li>
<li><a href="https://www.nga.gov/" target="_blank" rel="noopener">National Gallery of Art, Washington</a> — Melencolia I, maîtres gravures (ex. fichiers NGA sur Commons).</li>
<li><a href="https://www.britishmuseum.org/" target="_blank" rel="noopener">British Museum</a> — estampes et Rhinocéros.</li>
<li><a href="https://www.albertina.at/" target="_blank" rel="noopener">Albertina, Vienne</a> — dessins et aquarelles.</li>
<li><a href="https://www.pinakothek.de/en/alte-pinakothek" target="_blank" rel="noopener">Alte Pinakothek, Munich</a> — autoportraits, Quatre Apôtres.</li>
<li><a href="https://www.museodelprado.es/" target="_blank" rel="noopener">Museo del Prado</a> — autoportrait de 1498.</li>
<li><a href="https://collections.louvre.fr/" target="_blank" rel="noopener">Musée du Louvre</a> — autoportrait de 1493.</li>
<li><a href="https://www.mfa.org/" target="_blank" rel="noopener">Museum of Fine Arts, Boston</a> — Adam et Ève.</li>
<li><a href="https://www.clevelandart.org/" target="_blank" rel="noopener">Cleveland Museum of Art</a> — Vie de la Vierge.</li>
<li><a href="https://www.uffizi.it/" target="_blank" rel="noopener">Gallerie degli Uffizi</a> — Adoration des Mages.</li>
</ul>
<h2 class="mt-5">Images utilisées</h2>
<p>Inventaire généré depuis le catalogue œuvres (titres, dates, collections, crédits). Les fichiers locaux sont stockés sous <code>img/durer/</code> (works, portraits, prints, drawings, books).</p>
<div id="archiv-sources-inventory" class="archiv-table-wrap mt-3"></div>
<h2 class="mt-5">Œuvres principales</h2>
<p>Voir le <a href="oeuvres.html" class="archiv-text-link">catalogue</a> et les fiches : Melencolia I, maîtres gravures, Apocalypse, Rhinocéros, autoportraits, études naturalistes, traités.</p>
<h2 class="mt-4">Sources biographiques et traités</h2>
<ul>
<li><a href="https://www.metmuseum.org/toah/hd/durr/hd_durr.htm" target="_blank" rel="noopener">The Met — Heilbrunn Timeline, Albrecht Dürer</a></li>
<li>Notices des musées cités sur chaque fiche œuvre.</li>
</ul>
<h2 class="mt-4">Notes sur les droits</h2>
<p>Œuvres de Dürer : domaine public dans l'Union européenne et aux États-Unis (décès 1528). Les musées peuvent restreindre la <em>photographie</em> de leurs exemplaires ; ARCHIV indique la collection de référence et n'affirme pas la libre réutilisation commerciale sans vérifier la politique du détenteur. Textes éditoriaux © ARCHIV.</p>
</div></main>""",
    "Sources ARCHIV — Albrecht Dürer",
),
}

for name, html in PAGES.items():
    (ROOT / name).write_text(html, encoding="utf-8")
    print("OK", name)

print("Done", len(PAGES), "pages")
