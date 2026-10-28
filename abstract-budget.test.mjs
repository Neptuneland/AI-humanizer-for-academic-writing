import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { abstractBudget, countWords } from './abstract-budget.mjs';

test('the counting convention handles whitespace explicitly', () => {
  assert.equal(countWords('  one\ttwo\nthree  '), 3);
  assert.equal(countWords('one\u00a0two\u2009three'), 3);
  assert.equal(countWords('single-centre study'), 2);
  assert.equal(countWords('  \n'), 0);
});
test('section bodies span lines; labels remain in the total', () => {
  const r = abstractBudget('Methods: one two\r\nthree\r\nResults: four', 5);
  assert.equal(r.words, 6);
  assert.equal(r.overBy, 1);
  assert.equal(r.remaining, 0);
  assert.deepEqual(r.sections, [{ label: 'Methods', bodyWords: 3 }, { label: 'Results', bodyWords: 1 }]);
});
test('bad limits fail rather than silently claiming compliance', () => {
  for (const x of [0, -1, 1.5, NaN, Infinity, '150']) assert.throws(() => abstractBudget('text', x), RangeError);
});
test('CLI reads stdin, outputs metadata, and does not echo draft text', () => {
  const output = execFileSync(process.execPath, ['abstract-budget.mjs', '4'], { input: 'Methods: private draft text', encoding: 'utf8' });
  assert.equal(JSON.parse(output).words, 4);
  assert.equal(output.includes('private draft'), false);
  const bad = spawnSync(process.execPath, ['abstract-budget.mjs', '2e2'], { input: '', encoding: 'utf8' });
  assert.equal(bad.status, 1);
});
