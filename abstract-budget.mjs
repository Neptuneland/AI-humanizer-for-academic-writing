import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// An explicit whitespace convention, not a publisher's official word counter.
export function countWords(text) {
  const value = text.trim();
  return value ? value.split(/\s+/u).length : 0;
}

export function abstractBudget(text, limit) {
  if (!Number.isSafeInteger(limit) || limit < 1) {
    throw new RangeError('Limit must be a positive safe integer.');
  }
  const words = countWords(text);
  const sections = [];
  let active = null;
  for (const line of text.split(/\r?\n/u)) {
    const heading = line.match(/^(Background|Objective|Methods?|Results?|Conclusions?):\s*(.*)$/iu);
    if (heading) {
      active = { label: heading[1], lines: [heading[2]] };
      sections.push(active);
    } else if (active) {
      active.lines.push(line);
    }
  }
  return {
    convention: 'whitespace-v1; headings included in total',
    words,
    limit,
    overBy: Math.max(0, words - limit),
    remaining: Math.max(0, limit - words),
    sections: sections.map(({ label, lines }) => ({
      label,
      bodyWords: countWords(lines.join('\n')),
    })),
    warning: 'Counts only. Check the journal convention and review meaning manually.',
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const arg = process.argv[2] ?? '150';
    if (!/^\d+$/u.test(arg)) throw new RangeError('Limit must contain decimal digits only.');
    const text = readFileSync(0, 'utf8');
    console.log(JSON.stringify(abstractBudget(text, Number(arg)), null, 2));
  } catch (error) {
    // Do not echo the manuscript or a file path into error output.
    console.error(error instanceof RangeError ? error.message : 'Could not read standard input.');
    process.exitCode = 1;
  }
}
