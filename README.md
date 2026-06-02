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
| Redirection legacy | `index4.html` → `/` (`_redirects`) |
| Éditions | `editions.html` · fiche `edition.html?id=…` |
| Erreur 404 | `404.html` |

Le dépôt ne contient plus les pages démo du thème **Ornava** (portfolio, shop, blog, etc.).

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
python3 scripts/fetch-archiv-images.py
python3 scripts/regenerate-local-ready.py
python3 scripts/sync-work-urls.py
```

Ou : `python3 scripts/download-work-images.py` (depuis `img/durer/work-urls.json`).

## Audit œuvre / image

```bash
npm run audit:images
```

Signale doublons de fichiers, URLs Commons partagées, alt manquants, chemins locaux cassés.

## Structure utile

- `js/archiv-data.js` — données œuvres, vie, sources
- `js/archiv-catalog.js` — URLs Commons + médias locaux
- `js/archiv-images.js` — cadres images, fallbacks
- `js/archiv.js` — UI, catalogue, lightbox
- `js/archiv-editions.js` — collection éditoriale (statut « À venir », sans paiement)
- `css/archiv-*.css` — design system ARCHIV
- `partials/` — `archiv-nav.html`, `archiv-footer.html`, `archiv-scripts-production.html`
- `img/durer/` — WebP œuvres ; `img/logo_Albrecht_Durer.svg`, `img/favicon.ico`
- `Livres/` — PDFs locaux (ignorés par git, non déployés)

## Déploiement

Déployer le contenu du dépôt à la racine du domaine **albrechtdurer.uk** (HTTPS recommandé).  
Fichiers SEO : `robots.txt`, `sitemap.xml`.
