import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { pathToFileURL } from 'node:url';

export async function fingerprint(path) {
  const hash = createHash('sha256');
  let bytes = 0;
  for await (const chunk of createReadStream(path)) {
    hash.update(chunk);
    bytes += chunk.length;
  }
  return { bytes, sha256: hash.digest('hex') };
}

export async function receipt(original, candidate) {
  const [a, b] = await Promise.all([fingerprint(original), fingerprint(candidate)]);
  return { algorithm: 'sha256', original: a, candidate: b, sameBytes: a.bytes === b.bytes && a.sha256 === b.sha256 };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    process.stderr.write('Usage: node revision-receipt.mjs ORIGINAL CANDIDATE\n');
    process.exitCode = 1;
  } else {
    try {
      process.stdout.write(JSON.stringify(await receipt(...args), null, 2) + '\n');
    } catch {
      process.stderr.write('Could not read both files. No receipt was produced.\n');
      process.exitCode = 1;
    }
  }
}
