#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entry = path.resolve(__dirname, "..", "index.ts");
const args = process.argv.slice(2);

const result = spawnSync("bun", [entry, ...args], {
  stdio: "inherit",
  shell: true,
});

if (result.error) {
  console.error("Failed to start Bun:", result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);