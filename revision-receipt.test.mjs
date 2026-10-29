import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { receipt } from './revision-receipt.mjs';

async function files(a, b, fn) {
  const dir = await mkdtemp(join(tmpdir(), 'revision-receipt-'));
  const x = join(dir, 'private-original.txt'), y = join(dir, 'private-candidate.txt');
  try { await writeFile(x, a); await writeFile(y, b); await fn(x, y); }
  finally { await rm(dir, { recursive: true, force: true }); }
}
test('equal empty files use the known empty SHA-256 digest', async () => {
  await files('', '', async (a,b) => {
    const r=await receipt(a,b); assert.equal(r.sameBytes,true); assert.equal(r.original.bytes,0);
    assert.equal(r.original.sha256,'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });
});
test('Unicode bytes and newline changes are detected', async () => {
  await files('研究\n', '研究\r\n', async(a,b)=>{
    const r=await receipt(a,b); assert.equal(r.original.bytes,7); assert.equal(r.candidate.bytes,8); assert.equal(r.sameBytes,false);
  });
});
test('CLI emits only receipt fields and handles missing files without path leakage', async()=>{
  await files('private synthetic sentence','edited synthetic sentence',async(a,b)=>{
    const script=new URL('./revision-receipt.mjs',import.meta.url);
    const out=execFileSync(process.execPath,[script.pathname,a,b],{encoding:'utf8'});
    assert.equal(JSON.parse(out).sameBytes,false); assert.ok(!out.includes('private')); assert.ok(!out.includes(a));
    const bad=spawnSync(process.execPath,[script.pathname,a,b+'-missing'],{encoding:'utf8'});
    assert.equal(bad.status,1); assert.equal(bad.stdout,''); assert.ok(!bad.stderr.includes(b));
  });
});
