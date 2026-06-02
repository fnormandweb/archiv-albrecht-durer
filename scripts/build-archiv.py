#!/usr/bin/env python3
"""Génère les pages ARCHIV à partir des partials."""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
NAV = "\n".join(pathlib.Path(ROOT / "partials/archiv-nav.html").read_text(encoding="utf-8").splitlines()[1:])
FOOTER = pathlib.Path(ROOT / "partials/archiv-footer.html").read_text(encoding="utf-8")
SCRIPTS = pathlib.Path(ROOT / "partials/archiv-scripts.html").read_text(encoding="utf-8")

HEAD = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{title}</title>
    <meta name="description" content="{desc}">
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/plugins.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/archiv.css">
{extra_head}
</head>
<body class="archiv-site" data-site-logo="img/logo_Albrecht_Durer.svg" data-archiv-page="{page_id}">
    <div class="preloader-bg"></div>
    <div id="preloader"><div id="preloader-status"><div class="preloader-position loader"><span></span></div></div></div>
    <div class="progress-wrap cursor-pointer"><svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102"><path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" /></svg></div>
"""

PAGE_HERO = """
    <header class="archiv-page-hero">
        <div class="container">
            <p class="archiv-kicker mb-2">ARCHIV · Albrecht Dürer</p>
            <h1>{h1}</h1>
            <p class="archiv-page-hero__sub">{sub}</p>
        </div>
    </header>
"""

def page(title, desc, page_id, h1, sub, main, extra_head=""):
    return HEAD.format(title=title, desc=desc, page_id=page_id, extra_head=extra_head) + NAV + PAGE_HERO.format(h1=h1, sub=sub) + main + FOOTER + SCRIPTS + "\n</body>\n</html>\n"

# Inner pages content abbreviated in script - full content below
pages = {}

pages["vie.html"] = page(
    "Vie d'Albrecht Dürer — biographie | ARCHIV",
    "Biographie structurée d'Albrecht Dürer : Nuremberg, formation, voyages, atelier, cour impériale et dernières années.",
    "vie",
    "Vie",
    "De Nuremberg aux cours d'Europe, une trajectoire d'artiste-auteur",
    """
    <main class="archiv-section">
        <div class="container archiv-container-narrow">
            <article class="archiv-period" id="nuremberg">
                <p class="archiv-period-years">1471</p>
                <h2>Nuremberg</h2>
                <p>Albrecht Dürer naît le 21 mai 1471 dans une famille d'orfèvre hongrois établie à Nuremberg, ville impériale libre et carrefour commercial. La cité, réputée pour ses corporations et son activité d'imprimerie, façonne l'environnement dans lequel il développera atelier, réseau et prestige.</p>
            </article>
            <article class="archiv-period" id="formation">
                <p class="archiv-period-years">1486–1490</p>
                <h2>Formation familiale et atelier</h2>
                <p>Formé d'abord dans l'atelier paternel, il entre chez Michael Wolgemut, maître des grandes chroniques illustrées. Il y acquiert la gravure sur bois, le dessin de composition et le contact avec les commandes éditoriales qui structureront sa carrière.</p>
            </article>
            <article class="archiv-period" id="compagnon">
                <p class="archiv-period-years">1490–1494</p>
                <h2>Voyages de compagnon</h2>
                <p>Les années errantes le mènent vers la Haute-Allemagne : Colmar, Bâle, Strasbourg. Il y affine son trait, observe les ateliers rhénans et prépare l'autonomie d'un maître capable de fonder sa propre marque.</p>
            </article>
            <article class="archiv-period" id="atelier">
                <p class="archiv-period-years">1495</p>
                <h2>Ouverture de l'atelier</h2>
                <p>De retour à Nuremberg, il ouvre son atelier et épouse Agnes Frey. Les portraits, les gravures et les commandes locales posent les bases d'une maison d'art structurée autour de la production reproductible.</p>
            </article>
            <article class="archiv-period" id="apocalypse">
                <p class="archiv-period-years">1498</p>
                <h2>Apocalypse et premières estampes</h2>
                <p>Le cycle de l'<em>Apocalypse</em> (gravures sur bois) connaît un succès européen immédiat. Dürer impose une énergie narrative et une maîtrise technique qui transforment l'estampe en médium majeur de la Renaissance du Nord.</p>
            </article>
            <article class="archiv-period" id="italie">
                <p class="archiv-period-years">1505–1507</p>
                <h2>Voyages en Italie</h2>
                <p>Second séjour italien, surtout à Venise : dialogue avec Bellini, étude de la couleur et de l'antique. Il y affirme sa signature et son monogramme face aux modèles méditerranéens.</p>
            </article>
            <article class="archiv-period" id="maturite">
                <p class="archiv-period-years">1508–1511</p>
                <h2>Maturité artistique</h2>
                <p>Période des études naturalistes (lièvre, gazon), des retables et des gravures de la <em>Grande Passion</em>. Le dessin devient laboratoire scientifique autant que préparation picturale.</p>
            </article>
            <article class="archiv-period" id="maximilian">
                <p class="archiv-period-years">1512–1518</p>
                <h2>Maximilien I<sup>er</sup> et commandes impériales</h2>
                <p>Liens avec la cour de Maximilien : décorations, vitraux projetés, <em>Triomphe</em> gravé. Dürer occupe une position d'artiste reconnu au service du pouvoir impérial.</p>
            </article>
            <article class="archiv-period" id="pays-bas">
                <p class="archiv-period-years">1520–1521</p>
                <h2>Voyage aux Pays-Bas</h2>
                <p>Journal de voyage documenté : Anvers, Bruges, Malines. Rencontres avec Érasme et milieu des marchands ; observation des collections et des innovations artistiques.</p>
            </article>
            <article class="archiv-period" id="fin">
                <p class="archiv-period-years">1525–1528</p>
                <h2>Derniers traités et fin de vie</h2>
                <p>Publication des <em>Instructions de la mesure</em> (1525) et du traité des fortifications. Il meurt à Nuremberg le 6 avril 1528, laissant un fonds d'œuvres et de textes théoriques déterminant pour l'histoire de l'art européen.</p>
            </article>
            <p class="mt-4"><a href="chronologie.html" class="archiv-btn" style="color:var(--ink);border-color:var(--walnut);">Voir la chronologie complète</a></p>
        </div>
    </main>
""",
)

print("Building", len(pages), "pages...")
for name, content in pages.items():
    (ROOT / name).write_text(content, encoding="utf-8")
    print("Wrote", name)

PYEOF
