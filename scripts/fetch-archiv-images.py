#!/usr/bin/env python3
"""Télécharge les reproductions domaine public (Wikimedia API) et génère des WebP pour ARCHIV."""
import json
import subprocess
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CWEBP = "/opt/homebrew/bin/cwebp"
API = "https://commons.wikimedia.org/w/api.php"
WIDTH = 1280
PAUSE_API = 4
PAUSE_DL = 1.5

ASSETS = [
    ("melencolia", "prints", "durer-melencolia-i-1514.webp", "Albrecht Dürer - Melencolia I - Google Art Project.jpg"),
    ("saint-jerome", "prints", "durer-saint-jerome-1514.webp", "Albrecht Dürer - Saint Jerome in His Study - Google Art Project.jpg"),
    ("knight-death-devil", "prints", "durer-knight-death-devil-1513.webp", "Albrecht Dürer - Ritter, Tod und Teufel - Google Art Project.jpg"),
    ("rhinoceros", "prints", "durer-rhinoceros-1515.webp", "Dürer Rhinoceros.jpg"),
    ("apocalypse-four-riders", "prints", "durer-four-horsemen-apocalypse-1498.webp", "Albrecht Dürer - The Four Horsemen of the Apocalypse - Google Art Project.jpg"),
    ("large-passion-last-supper", "prints", "durer-last-supper-large-passion-1510.webp", "The Last Supper (Dürer).jpg"),
    ("life-of-virgin-nativity", "prints", "durer-nativity-life-of-virgin-1511.webp", "Albrecht Dürer - The Nativity - Google Art Project.jpg"),
    ("large-passion-christ-mount", "prints", "durer-christ-mount-olives-large-passion.webp", "Albrecht Dürer - Christ on the Mount of Olives - Google Art Project.jpg"),
    ("self-portrait-1500", "portraits", "durer-self-portrait-1500.webp", "Albrecht Dürer - Self-Portrait - Google Art Project.jpg"),
    ("self-portrait-1498", "portraits", "durer-self-portrait-1498.webp", "Albrecht Dürer - Self-Portrait (1498) - Google Art Project.jpg"),
    ("self-portrait-1493", "portraits", "durer-self-portrait-1493.webp", "Albrecht Dürer - Self-Portrait at 13 - Google Art Project.jpg"),
    ("hare", "drawings", "durer-young-hare-1502.webp", "Albrecht Dürer - Hare - Google Art Project.jpg"),
    ("great-piece-of-turf", "drawings", "durer-great-piece-of-turf-1503.webp", "Albrecht Dürer - The Great Piece of Turf - Google Art Project.jpg"),
    ("prayer-hands", "drawings", "durer-prayer-hands-c1508.webp", "Albrecht Dürer - Betende Hände - Google Art Project.jpg"),
    ("adam-eve", "prints", "durer-adam-and-eve-1504.webp", "Albrecht Dürer - Adam and Eve - Google Art Project.jpg"),
    ("adoration-magi", "works", "durer-adoration-of-the-magi-1504.webp", "Albrecht Dürer - The Adoration of the Magi - Google Art Project.jpg"),
    ("four-apostles", "works", "durer-four-apostles-1526.webp", "Albrecht Dürer - Four Apostles - Google Art Project.jpg"),
    ("underweysung", "books", "durer-underweysung-proportion-1525.webp", "Dürer Vitruvius.jpg"),
    ("travel-drawing-antwerp", "drawings", "durer-view-antwerp-1520.webp", "Dürer reisebüchlein 1520 1521 001.jpg"),
    ("winged-roller", "drawings", "durer-winged-roller-1512.webp", "Albrecht Dürer - The Blue Roller - Google Art Project.jpg"),
    ("large-passion-cycle", "prints", "durer-large-passion-cycle.webp", "Albrecht Dürer - Christ on the Mount of Olives - Google Art Project.jpg"),
    ("life-of-virgin-cycle", "prints", "durer-life-of-virgin-nativity-1511.webp", "Albrecht Dürer - The Nativity - Google Art Project.jpg"),
    ("small-passion-cycle", "prints", "durer-small-passion-cycle.webp", "The Last Supper (Dürer).jpg"),
]


def api_query(titles: list[str]) -> dict:
    params = urllib.parse.urlencode({
        "action": "query",
        "format": "json",
        "prop": "imageinfo",
        "iiprop": "url|thumburl",
        "iiurlwidth": str(WIDTH),
        "titles": "|".join("File:" + t for t in titles),
    })
    req = urllib.request.Request(API + "?" + params, headers={"User-Agent": "ARCHIV-Durer/1.0 (museum archive; contact: local)"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return json.loads(r.read().decode())["query"]["pages"]


def resolve_urls() -> dict[str, str]:
    out = {}
    files = list({a[3] for a in ASSETS})
    for i in range(0, len(files), 4):
        batch = files[i : i + 4]
        time.sleep(PAUSE_API)
        try:
            pages = api_query(batch)
        except Exception as e:
            print("API batch fail:", e)
            continue
        for p in pages.values():
            title = p.get("title", "").replace("File:", "")
            if "imageinfo" in p:
                info = p["imageinfo"][0]
                out[title] = info.get("thumburl") or info["url"]
            else:
                print("  missing:", title)
    return out


def fetch_one(folder: str, name: str, url: str) -> Path | None:
    out_dir = ROOT / "img" / "durer" / folder
    out_dir.mkdir(parents=True, exist_ok=True)
    webp = out_dir / name
    tmp = out_dir / (name.replace(".webp", ".jpg"))
    if webp.exists() and webp.stat().st_size > 8000:
        print(f"skip {webp.name}")
        return webp
    print(f"fetch -> {webp.name}")
    req = urllib.request.Request(url, headers={"User-Agent": "ARCHIV-Durer/1.0"})
    with urllib.request.urlopen(req, timeout=120) as r:
        tmp.write_bytes(r.read())
    subprocess.run(["sips", "-Z", "1400", str(tmp), "--out", str(tmp)], check=False, capture_output=True)
    subprocess.run([CWEBP, "-q", "82", str(tmp), "-o", str(webp)], check=True)
    tmp.unlink(missing_ok=True)
    print(f"  ok {webp.stat().st_size // 1024} KB")
    return webp


def main():
    print("Resolving Wikimedia URLs (patient mode)...")
    time.sleep(8)
    urls = resolve_urls()
    manifest = ROOT / "img" / "durer" / "manifest.json"
    manifest.write_text(json.dumps(urls, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Resolved {len(urls)} / {len({a[3] for a in ASSETS})} files")
    seen = set()
    for _id, folder, name, commons_file in ASSETS:
        key = (folder, name)
        if key in seen:
            continue
        seen.add(key)
        url = urls.get(commons_file)
        if not url:
            print(f"SKIP {_id}: no URL for {commons_file}")
            continue
        time.sleep(PAUSE_DL)
        try:
            fetch_one(folder, name, url)
        except Exception as e:
            print(f"FAIL {_id}: {e}")


if __name__ == "__main__":
    main()
