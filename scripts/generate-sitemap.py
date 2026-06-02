#!/usr/bin/env python3
"""Génère sitemap.xml pour ARCHIV (pages statiques + fiches œuvre/édition)."""
from datetime import date
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = "https://albrechtdurer.uk"
TODAY = date.today().isoformat()

STATIC_PAGES = [
    ("", "weekly", "1.0"),
    ("vie.html", "monthly", "0.9"),
    ("oeuvres.html", "weekly", "0.9"),
    ("gravures.html", "monthly", "0.9"),
    ("autoportraits.html", "monthly", "0.85"),
    ("science.html", "monthly", "0.85"),
    ("voyages.html", "monthly", "0.8"),
    ("chronologie.html", "monthly", "0.8"),
    ("editions.html", "monthly", "0.7"),
    ("sources.html", "monthly", "0.75"),
    ("oeuvre.html", "weekly", "0.65"),
    ("edition.html", "monthly", "0.55"),
    ("fr/", "weekly", "0.88"),
    ("fr/vie.html", "monthly", "0.82"),
    ("fr/oeuvres.html", "weekly", "0.82"),
    ("fr/gravures.html", "monthly", "0.82"),
    ("fr/autoportraits.html", "monthly", "0.78"),
    ("fr/science.html", "monthly", "0.78"),
    ("fr/voyages.html", "monthly", "0.74"),
    ("fr/chronologie.html", "monthly", "0.74"),
    ("fr/editions.html", "monthly", "0.65"),
    ("fr/sources.html", "monthly", "0.7"),
    ("fr/oeuvre.html", "weekly", "0.58"),
    ("fr/edition.html", "monthly", "0.48"),
]


def extract_block_ids(text: str, marker: str) -> list[str]:
    start = text.find(marker)
    if start < 0:
        return []
    chunk = text[start:]
    end = chunk.find("];")
    if end < 0:
        return []
    return re.findall(r'\bid:\s*"([^"]+)"', chunk[: end + 2])


def oeuvre_ids() -> list[str]:
    data = (ROOT / "js/archiv-data.js").read_text(encoding="utf-8")
    catalog = (ROOT / "js/archiv-catalog.js").read_text(encoding="utf-8")
    ids = extract_block_ids(data, "var oeuvres = [")
    ids += extract_block_ids(catalog, "var extraOeuvres = [")
    return sorted(set(ids))


def edition_ids() -> list[str]:
    text = (ROOT / "js/archiv-editions.js").read_text(encoding="utf-8")
    return sorted(set(extract_block_ids(text, "var editions = [")))


def url(loc: str) -> str:
    loc = loc.lstrip("/")
    return ORIGIN if not loc else f"{ORIGIN}/{loc}"


def main() -> None:
    all_work_ids = oeuvre_ids()
    all_edition_ids = edition_ids()

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    for path, freq, priority in STATIC_PAGES:
        lines.append("  <url>")
        lines.append(f"    <loc>{url(path)}</loc>")
        lines.append(f"    <lastmod>{TODAY}</lastmod>")
        lines.append(f"    <changefreq>{freq}</changefreq>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append("  </url>")

    for wid in all_work_ids:
        for prefix in ("", "fr/"):
            lines.append("  <url>")
            lines.append(f"    <loc>{url(prefix + 'oeuvre.html')}?id={wid}</loc>")
            lines.append(f"    <lastmod>{TODAY}</lastmod>")
            lines.append("    <changefreq>monthly</changefreq>")
            lines.append(f"    <priority>{'0.56' if prefix else '0.6'}</priority>")
            lines.append("  </url>")

    for eid in all_edition_ids:
        for prefix in ("", "fr/"):
            lines.append("  <url>")
            lines.append(f"    <loc>{url(prefix + 'edition.html')}?id={eid}</loc>")
            lines.append(f"    <lastmod>{TODAY}</lastmod>")
            lines.append("    <changefreq>monthly</changefreq>")
            lines.append(f"    <priority>{'0.46' if prefix else '0.5'}</priority>")
            lines.append("  </url>")

    lines.append("</urlset>")
    out = ROOT / "sitemap.xml"
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"OK {out} — {len(STATIC_PAGES)} pages, {len(all_work_ids)} œuvres, {len(all_edition_ids)} éditions")


if __name__ == "__main__":
    main()
