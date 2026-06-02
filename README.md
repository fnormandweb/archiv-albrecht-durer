# ARCHIV — Albrecht Dürer

Archive numérique premium consacrée à **Albrecht Dürer** (1471–1528).

**Site en production :** [https://albrechtdurer.uk](https://albrechtdurer.uk)

## Pages principales

| Page | Fichier |
|------|---------|
| Accueil | `index.html` (URL `/`) |
| Vie | `vie.html` |
| Œuvres | `oeuvres.html` |
| Gravures | `gravures.html` |
| Autoportraits | `autoportraits.html` |
| Science | `science.html` |
| Voyages | `voyages.html` |
| Chronologie | `chronologie.html` |
| Sources | `sources.html` |
| Fiche œuvre | `oeuvre.html?id=…` |

## Développement local

```bash
python3 -m http.server 8080
# Ouvrir http://localhost:8080/
```

## Régénérer les pages intérieures

Les pages ARCHIV intérieures sont générées depuis les partials :

```bash
python3 scripts/build-archiv-pages.py
```

## Images locales (WebP)

```bash
python3 scripts/download-work-images.py
```

Met à jour `js/archiv-local-ready.js` et les fichiers sous `img/durer/`.

## Structure utile

- `js/archiv-data.js` — données œuvres, vie, sources
- `js/archiv-catalog.js` — URLs Commons + médias locaux
- `js/archiv-images.js` — cadres images, fallbacks
- `js/archiv.js` — UI, catalogue, lightbox
- `css/archiv-*.css` — design system ARCHIV
- `partials/` — navigation, footer, scripts

## Déploiement

Déployer le contenu du dépôt à la racine du domaine **albrechtdurer.uk** (HTTPS recommandé).  
Fichiers SEO : `robots.txt`, `sitemap.xml`.
