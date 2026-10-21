# Academic rewrite review worksheet

A reusable worksheet for students, researchers and developers evaluating AI-assisted prose revisions. Maintained by the PaperHumanizer product team; prepared with AI assistance. This worksheet is a review aid, not a certification of accuracy or originality.

## 1. Capture the baseline

Before rewriting, save an untouched copy of the document. Record the section name, source version and purpose of the edit. Use synthetic or shareable examples for public bug reports; do not post an unpublished manuscript here.

| Field | Fill in before revision |
| --- | --- |
| Section | Abstract / introduction / methods / results / discussion |
| Goal | Improve readability, reduce repetition, or adjust tone |
| Fixed facts | Sample size, dates, quantities, units, statistical results |
| Fixed terminology | Technical terms, named methods, instruments, acronyms |
| Source support | Reference for each substantive claim |
| Constraints | Length, formatting and institutional AI-use requirements |

## 2. Review one paragraph at a time

| Check | Pass / needs review | Notes |
| --- | --- | --- |
| Every number and unit remains correct | | |
| Population and method remain unchanged | | |
| Association has not become causation | | |
| Uncertainty and limitations remain explicit | | |
| No new evidence, reference or result was invented | | |
| Each citation still supports its surrounding claim | | |
| Technical terms retain their intended meaning | | |
| Transitions reflect the argument rather than add one | | |
| The author can explain and defend every sentence | | |

### Worked synthetic example

Original:

> In a pilot involving 42 participants, the intervention was associated with a 12% reduction in response time (Lee, 2025). The study did not establish causation.

Candidate A:

> A pilot with 42 participants found an association between the intervention and a 12% reduction in response time (Lee, 2025). Causation was not established.

Candidate B:

> The intervention proved a 21% improvement in response time (Lee, 2025).

A preserves the listed facts and qualification in this invented example, but the real source would still need checking. B changes the quantity, drops the sample size and strengthens the claim. Keeping the reference does not make B acceptable. Lee (2025) is an invented reference used only for this exercise.

## 3. Check the document after export

- Compare against the untouched original, not just the latest intermediate draft.
- Check headings, equations, symbols, tables and footnotes in the document editor.
- Check that citation-manager fields still work; plain-text output is not a formatted Word file.
- Recheck references and bibliography after reinserting a revised paragraph.
- Save the reviewed version separately and retain the revision history.
- Disclose AI assistance wherever your institution, journal or assessment requires it.

## 4. Optional automated checks

The accompanying [small JavaScript fixture checker](revision-fixture-checker.mjs) checks manually chosen substrings. Run it locally with Node.js:

```sh
node revision-fixture-checker.mjs
```

It sends no requests. It does not read your files or certify semantic equivalence. Its built-in positive and negative examples show both the useful check and its limits. A required substring can occur in the wrong context; a harmless formatting change may also trigger a flag.

## Try a comparison workflow

[PaperHumanizer's academic editor](https://paperhumanizer.com/ai-humanizer?utm_source=github&utm_medium=referral&utm_campaign=academic_review_20261021) provides an original/rewrite comparison view, academic tone choices and document upload. Rewriting requires sign-in and credits. Use the checklist above to review any output against your sources.

This is a resource from the product team, not an independent review or a detector-performance benchmark.
