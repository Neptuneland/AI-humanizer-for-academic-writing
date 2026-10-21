// Synthetic examples only. No dependencies, network access or manuscript input.
import assert from 'node:assert/strict';

export function checkRevision(text, fixture) {
  const missing = fixture.required.filter((value) => !text.includes(value));
  const introduced = fixture.forbidden.filter((value) => text.includes(value));
  return { missing, introduced, needsReview: missing.length > 0 || introduced.length > 0 };
}

const fixture = {
  required: ['42', '12%', '(Lee, 2025)'],
  forbidden: ['proved that', 'established causation'],
};
const preserved = 'In 42 participants, response time was 12% lower (Lee, 2025).';
const changed = 'The intervention proved that response time fell by 21% (Lee, 2025).';
assert.equal(checkRevision(preserved, fixture).needsReview, false);
assert.deepEqual(checkRevision(changed, fixture), {
  missing: ['42', '12%'], introduced: ['proved that'], needsReview: true,
});
assert.equal(checkRevision('', fixture).needsReview, true);

// Deliberate limitation: substring checks miss a stronger claim if the chosen
// forbidden strings do not cover it. This output must still receive human review.
const semanticFailure = '42 participants: 12% reduction (Lee, 2025). This proves causality.';
assert.equal(checkRevision(semanticFailure, fixture).needsReview, false);
console.log(JSON.stringify({
  preserved: checkRevision(preserved, fixture),
  changed: checkRevision(changed, fixture),
  knownFalseNegative: checkRevision(semanticFailure, fixture),
  note: 'All fixture checks passed. A lexical pass is not semantic validation.',
}, null, 2));
