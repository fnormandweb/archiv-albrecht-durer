#!/usr/bin/env python3
"""Regénère js/archiv-local-ready.js selon fichiers WebP présents et ARCHIV_LOCAL_IMAGES."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "js" / "archiv-catalog.js"
OUT = ROOT / "js" / "archiv-local-ready.js"
MIN_BYTES = 8000


def parse_local_images():
    text = CATALOG.read_text(encoding="utf-8")
    block = re.search(r"ARCHIV_LOCAL_IMAGES = \{([^}]+)\}", text, re.S)
    if not block:
        return {}
    pairs = re.findall(r'"([^"]+)"\s*:\s*"(img/durer/[^"]+)"', block.group(1))
    pairs += re.findall(r"(\w+)\s*:\s*\"(img/durer/[^\"]+)\"", block.group(1))
    out = {}
    for wid, rel in pairs:
        out[wid] = rel
    return out


def main():
    mapping = parse_local_images()
    ready = {}
    for wid, rel in mapping.items():
        p = ROOT / rel
        if p.is_file() and p.stat().st_size >= MIN_BYTES:
            ready[wid] = True
    lines = [
        "/**",
        " * ARCHIV — fichiers WebP locaux disponibles (généré par scripts/regenerate-local-ready.py)",
        " * Ne pas éditer à la main.",
        " */",
        "(function (global) {",
        '    "use strict";',
        "    global.ARCHIV_LOCAL_READY = " + json.dumps(ready, indent=4, ensure_ascii=False) + ";",
        "})(typeof window !== \"undefined\" ? window : this);",
        "",
    ]
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"OK {len(ready)} prêts → {OUT}")


if __name__ == "__main__":
    main()
