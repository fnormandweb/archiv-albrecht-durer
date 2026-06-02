#!/usr/bin/env node
/**
 * ARCHIV — audit œuvre / image / source
 * Usage: npm run audit:images
 */
"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const JS_DIR = path.join(ROOT, "js");

const sandbox = {
  window: {},
  global: {},
  console,
};
sandbox.global = sandbox.window;
const vmContext = vm.createContext(sandbox);

function loadGlobalScript(filename) {
  const code = fs.readFileSync(path.join(JS_DIR, filename), "utf8");
  vm.runInContext(code, vmContext, { filename: path.join(JS_DIR, filename) });
  return sandbox.window;
}

function sha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function relExists(rel) {
  if (!rel || rel.startsWith("http")) return true;
  return fs.existsSync(path.join(ROOT, rel.replace(/^\//, "")));
}

function main() {
  const g = loadGlobalScript("archiv-data.js");
  loadGlobalScript("archiv-catalog.js");
  loadGlobalScript("archiv-local-ready.js");

  const works = g.ARCHIV_OEUVRES || [];
  const localMap = g.ARCHIV_LOCAL_IMAGES || {};
  const ready = g.ARCHIV_LOCAL_READY || {};
  const workUrls = g.ARCHIV_WORK_URLS || {};
  const placeholder = g.ARCHIV_PLACEHOLDER_IMAGE || "img/durer/placeholder-artwork.svg";

  const byImage = new Map();
  const byRemote = new Map();
  const byHash = new Map();
  const issues = [];

  console.log("\n=== ARCHIV — Audit catalogue images ===\n");
  console.log(`Œuvres: ${works.length}\n`);

  works.forEach(function (work) {
    const media = g.archivMedia(work);
    const resolved = media.full || media.thumb || "";
    const localPath = localMap[work.id];
    const remote = workUrls[work.id] || work.imageRemote || "";

    if (!work.imageAlt || !String(work.imageAlt).trim()) {
      issues.push({ type: "MISSING_ALT", id: work.id, title: work.title });
    }
    if (!work.source || !work.sourceLabel) {
      issues.push({ type: "MISSING_SOURCE", id: work.id, title: work.title });
    }
    if (resolved === placeholder) {
      issues.push({ type: "PLACEHOLDER", id: work.id, title: work.title });
    }
    if (localPath && ready[work.id] && !relExists(localPath)) {
      issues.push({ type: "BROKEN_LOCAL", id: work.id, title: work.title, image: localPath });
    }
    if (localPath && !ready[work.id] && remote) {
      /* remote fallback — OK */
    }

    const track = (map, key, label) => {
      if (!key || key === placeholder) return;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push({ id: work.id, title: work.title, label });
    };

    track(byImage, resolved, "resolved");
    track(byRemote, remote, "remote");
    if (localPath && ready[work.id] && relExists(localPath)) {
      const hash = sha256(path.join(ROOT, localPath));
      track(byHash, hash, localPath);
    }
  });

  let dupCount = 0;
  console.log("--- Images dupliquées (fichier local identique) ---");
  byHash.forEach(function (users, hash) {
    if (users.length < 2) return;
    const paths = [...new Set(users.map((u) => u.label))];
    if (paths.length === 1 && users.length > 1) {
      dupCount++;
      console.log("\nDUPLICATE IMAGE (hash):");
      console.log("  file:", paths[0]);
      console.log("  usedBy:");
      users.forEach(function (u) {
        console.log("    -", u.title, `(${u.id})`);
      });
      console.log("  status: erreur probable");
      console.log("  action: télécharger une image distincte par œuvre");
    }
  });
  if (!dupCount) console.log("  (aucun doublon de hash local)\n");

  console.log("--- Même URL Commons pour plusieurs titres ---");
  let remoteDup = 0;
  byRemote.forEach(function (users, url) {
    if (users.length < 2) return;
    remoteDup++;
    console.log("\nDUPLICATE REMOTE:");
    console.log("  url:", url.slice(0, 90) + (url.length > 90 ? "…" : ""));
    console.log("  usedBy:");
    users.forEach(function (u) {
      console.log("    -", u.title, `(${u.id})`);
    });
    const allSeries = users.every(function (u) {
      const w = works.find((x) => x.id === u.id);
      return w && w.series;
    });
    console.log("  status:", allSeries ? "cycles — vérifier planches distinctes" : "erreur probable");
  });
  if (!remoteDup) console.log("  (aucun)\n");

  const sections = [
    ["MISSING_ALT", "Alt text manquants"],
    ["MISSING_SOURCE", "Source manquante"],
    ["BROKEN_LOCAL", "Fichier local absent"],
    ["PLACEHOLDER", "Placeholder actif"],
  ];
  sections.forEach(function ([type, title]) {
    const rows = issues.filter((i) => i.type === type);
    if (!rows.length) return;
    console.log(`--- ${title} (${rows.length}) ---`);
    rows.forEach(function (r) {
      console.log(`  • ${r.title} (${r.id})${r.image ? " → " + r.image : ""}`);
    });
    console.log("");
  });

  const err = dupCount + remoteDup + issues.filter((i) => i.type === "BROKEN_LOCAL" || i.type === "PLACEHOLDER").length;
  console.log("=== Résumé ===");
  console.log(`Doublons locaux (hash): ${dupCount}`);
  console.log(`Doublons URL remote: ${remoteDup}`);
  console.log(`Problèmes alt/source/cassé: ${issues.length}`);
  console.log(err ? "\n⚠ Audit : corrections recommandées.\n" : "\n✓ Audit : aucun problème critique détecté.\n");
  process.exit(err ? 1 : 0);
}

main();
