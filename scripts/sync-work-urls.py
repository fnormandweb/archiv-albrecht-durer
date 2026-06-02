#!/usr/bin/env python3
"""Fusionne ARCHIV_WORK_URLS (catalogue) + résolutions manifest pour work-urls.json."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "js" / "archiv-catalog.js"
FETCH = ROOT / "scripts" / "fetch-archiv-images.py"
MANIFEST = ROOT / "img/durer/manifest.json"
OUT = ROOT / "img/durer/work-urls.json"


def catalog_urls():
    text = CATALOG.read_text(encoding="utf-8")
    block = re.search(r"ARCHIV_WORK_URLS = \{([^}]+)\}", text, re.S)
    if not block:
        raise SystemExit("ARCHIV_WORK_URLS introuvable")
    return dict(re.findall(r'"([^"]+)"\s*:\s*"(https://[^"]+)"', block.group(1)))


def asset_map():
    text = FETCH.read_text(encoding="utf-8")
    block = re.search(r"ASSETS = \[(.*?)\]", text, re.S)
    pairs = re.findall(
        r'\("([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"([^"]+)"\)',
        block.group(1),
    )
    return pairs


def main():
    urls = catalog_urls()
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}
    for wid, commons_file in asset_map():
        if manifest.get(commons_file):
            urls[wid] = manifest[commons_file]
    OUT.write_text(json.dumps(urls, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"OK {len(urls)} URLs → {OUT}")


if __name__ == "__main__":
    main()
