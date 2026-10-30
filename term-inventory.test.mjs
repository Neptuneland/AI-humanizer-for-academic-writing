import test from 'node:test';
import assert from 'node:assert/strict';
import { inventory } from './term-inventory.mjs';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

test('escapes punctuation and regex metacharacters literally',()=>{
  const r=inventory('C++ C.. C++ RQI (RQI)',[{label:'literals',variants:['C++','(RQI)']}]);
  assert.deepEqual(r[0].counts.map(v=>v.count),[2,1]);
});
test('word boundaries block embeddings; hyphen is a boundary; exact case is optional',()=>{
  const s='RQI rqi RQI-based aRQI RQI_2 前RQI';
  assert.equal(inventory(s,[{label:'abbr',variants:['RQI'],caseSensitive:true}])[0].counts[0].count,2);
  assert.equal(inventory(s,[{label:'abbr',variants:['RQI']}])[0].counts[0].count,3);
});
test('overlapping entries are independent; no whitespace or Unicode normalization',()=>{
  const r=inventory('revision quality quality revision  quality café cafe' + String.fromCodePoint(0x301),[
    {label:'phrases',variants:['revision quality','quality','café']}]);
  assert.deepEqual(r[0].counts.map(v=>v.count),[1,3,1]);
});
test('invalid dictionaries fail rather than silently produce clean counts',()=>{
  for(const x of [[],[{label:'a',variants:['']}],[{label:'',variants:['ok']}],[{label:'a',variants:['ok'],caseSensitive:'yes'}]]) assert.throws(()=>inventory('text',x));
});
test('CLI does not print manuscript snippets or private dictionary paths',()=>{
  const dir=mkdtempSync(join(tmpdir(),'term-inventory-')); const p=join(dir,'private.json');
  try {
    writeFileSync(p,JSON.stringify([{label:'term',variants:['RQI']}]));
    const script=new URL('./term-inventory.mjs',import.meta.url).pathname;
    const r=spawnSync(process.execPath,[script,p],{input:'private unpublished sentence RQI',encoding:'utf8'});
    assert.equal(r.status,0); assert.equal(JSON.parse(r.stdout)[0].counts[0].count,1); assert.ok(!r.stdout.includes('unpublished')); assert.ok(!r.stdout.includes(p));
    writeFileSync(p,'{invalid');const bad=spawnSync(process.execPath,[script,p],{input:'secret',encoding:'utf8'});
    assert.equal(bad.status,1);assert.equal(bad.stdout,'');assert.ok(!bad.stderr.includes(p));
  } finally {rmSync(dir,{recursive:true,force:true});}
});
