#!/usr/bin/env python3
"""Télécharge les URLs de work-urls.json vers img/durer/ et met à jour archiv-local-ready.js."""
import json
import shutil
import subprocess
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
URLS = json.loads((ROOT / "img/durer/work-urls.json").read_text(encoding="utf-8"))
PATHS = {
    "melencolia": ("prints", "durer-melencolia-i-1514.webp"),
    "saint-jerome": ("prints", "durer-saint-jerome-1514.webp"),
    "knight-death-devil": ("prints", "durer-knight-death-devil-1513.webp"),
    "rhinoceros": ("prints", "durer-rhinoceros-1515.webp"),
    "apocalypse-four-riders": ("prints", "durer-four-horsemen-apocalypse-1498.webp"),
    "large-passion-last-supper": ("prints", "durer-last-supper-1523.webp"),
    "life-of-virgin-nativity": ("prints", "durer-nativity-life-of-virgin-1511.webp"),
    "large-passion-cycle": ("prints", "durer-large-passion-cycle.webp"),
    "large-passion-christ-mount": ("prints", "durer-christ-mount-olives-large-passion.webp"),
    "self-portrait-1500": ("portraits", "durer-self-portrait-1500.webp"),
    "self-portrait-1498": ("portraits", "durer-self-portrait-1498.webp"),
    "self-portrait-1493": ("portraits", "durer-self-portrait-1493.webp"),
    "hare": ("drawings", "durer-young-hare-1502.webp"),
    "great-piece-of-turf": ("drawings", "durer-great-piece-of-turf-1503.webp"),
    "prayer-hands": ("drawings", "durer-prayer-hands-c1508.webp"),
    "adam-eve": ("prints", "durer-adam-and-eve-1504.webp"),
    "adoration-magi": ("works", "durer-adoration-of-the-magi-1504.webp"),
    "four-apostles": ("works", "durer-four-apostles-1526.webp"),
    "underweysung": ("books", "durer-underweysung-proportion-1525.webp"),
    "winged-roller": ("drawings", "durer-winged-roller-1512.webp"),
    "life-of-virgin-cycle": ("prints", "durer-life-of-virgin-cycle.webp"),
    "small-passion-cycle": ("prints", "durer-small-passion-cycle.webp"),
    "travel-drawing-antwerp": ("drawings", "durer-view-antwerp-1520.webp"),
}
READY_JS = ROOT / "js/archiv-local-ready.js"
MIN_BYTES = 8000


def find_cwebp():
    for p in ("/opt/homebrew/bin/cwebp", "/usr/local/bin/cwebp"):
        if Path(p).is_file():
            return p
    return shutil.which("cwebp")


def write_ready(ready: dict):
    lines = [
        "/**",
        " * ARCHIV — fichiers WebP locaux disponibles (généré par scripts/download-work-images.py)",
        " * Ne pas éditer à la main.",
        " */",
        "(function (global) {",
        '    "use strict";',
        "    global.ARCHIV_LOCAL_READY = " + json.dumps(ready, indent=4, ensure_ascii=False) + ";",
        "})(typeof window !== \"undefined\" ? window : this);",
        "",
    ]
    READY_JS.write_text("\n".join(lines), encoding="utf-8")


def dl(wid: str, url: str, cwebp: str | None):
    folder, name = PATHS[wid]
    out = ROOT / "img/durer" / folder / name
    out.parent.mkdir(parents=True, exist_ok=True)
    if out.exists() and out.stat().st_size > MIN_BYTES:
        print("skip", name)
        return str(out.relative_to(ROOT)).replace("\\", "/")
    tmp = out.with_suffix(".jpg")
    print("get", wid, name)
    req = urllib.request.Request(url, headers={"User-Agent": "ARCHIV/1.0 (museum archive)"})
    with urllib.request.urlopen(req, timeout=120) as r:
        tmp.write_bytes(r.read())
    subprocess.run(["sips", "-Z", "1400", str(tmp), "--out", str(tmp)], check=False, capture_output=True)
    if cwebp:
        subprocess.run([cwebp, "-q", "82", str(tmp), "-o", str(out)], check=True)
        tmp.unlink(missing_ok=True)
    else:
        out = out.with_suffix(".jpg")
        tmp.rename(out)
    print("  ", out.stat().st_size // 1024, "KB")
    return str(out.relative_to(ROOT)).replace("\\", "/")


def main():
    cwebp = find_cwebp()
    if not cwebp:
        print("cwebp absent — export JPEG (.jpg) dans img/durer/")
    ready = {}
    for wid, url in URLS.items():
        if wid not in PATHS:
            continue
        time.sleep(1.0)
        try:
            rel = dl(wid, url, cwebp)
            ready[wid] = True
            if rel.endswith(".jpg"):
                print("TODO: mettre à jour ARCHIV_LOCAL_IMAGES pour", wid, "→", rel)
        except Exception as e:
            print("FAIL", wid, e)
    write_ready(ready)
    print("OK", len(ready), "images prêtes →", READY_JS)


if __name__ == "__main__":
    main()
