import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

function escapeLiteral(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function inventory(text, entries) {
  if (typeof text !== 'string' || !Array.isArray(entries) || entries.length === 0) throw new Error('Invalid input');
  return entries.map(entry => {
    if (!entry || typeof entry.label !== 'string' || !entry.label.trim() || !Array.isArray(entry.variants) || entry.variants.length === 0 || (entry.caseSensitive !== undefined && typeof entry.caseSensitive !== 'boolean')) throw new Error('Invalid entry');
    const counts = entry.variants.map(variant => {
      if (typeof variant !== 'string' || !variant.trim()) throw new Error('Invalid literal');
      const expression = new RegExp(`(?<![\\p{L}\\p{N}_])${escapeLiteral(variant)}(?![\\p{L}\\p{N}_])`, entry.caseSensitive ? 'gu' : 'giu');
      return { variant, count: [...text.matchAll(expression)].length };
    });
    return { label: entry.label, caseSensitive: !!entry.caseSensitive, counts };
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length !== 3) {
    process.stderr.write('Usage: node term-inventory.mjs DICTIONARY.json < draft.txt\n');
    process.exitCode = 1;
  } else {
    try {
      const entries = JSON.parse(readFileSync(process.argv[2], 'utf8'));
      const result = inventory(readFileSync(0, 'utf8'), entries);
      process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    } catch {
      process.stderr.write('Could not read valid text and term dictionary. No inventory produced.\n');
      process.exitCode = 1;
    }
  }
}
