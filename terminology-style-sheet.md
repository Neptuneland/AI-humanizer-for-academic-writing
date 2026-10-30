# A terminology style sheet for an academic revision

A free, copyable resource for postgraduate researchers and writers using English as an additional language. Prepared by the PaperHumanizer product team with AI assistance, October 30, 2026. The instrument name and passages below are fictional teaching examples, not research findings or measured product output.

A paragraph editor may treat two words as stylistic alternatives even when your study uses them for different constructs. Before revising, make a small *term sheet*: decide which names are fixed, which spelling variants are allowed, and which replacements need an author's decision.

## Copy this private table

| Concept or item | Preferred form | Allowed variants and context | Review-only forms | Source to check |
| --- | --- | --- | --- | --- |
| Named instrument | Revision Quality Index (RQI) at first mention | RQI later, if permitted by journal | writing ability scale | Actual instrument documentation; example here is invented |
| Measured construct | revision quality | none chosen for this exercise | writing ability; confidence | Actual outcome definition |
| Sample label | postgraduate writers | participants when unambiguous | students if it changes the defined population | Methods and participant criteria |
| Abbreviation | [full form] ([short form]) | [rules for abstract/body/table] | [ambiguous or undefined forms] | Journal and discipline guidance |
| Variable or code label | [exact case-sensitive symbol] | [none unless specified] | [similar-looking labels] | Analysis script / data dictionary |

“Review-only” means inspect the context, not globally replace. A different form may be correct in a quote, another study, a separate variable, or a sentence contrasting two constructs. Keep your completed table and unpublished material private.

## A synthetic example

Original: “We assessed revision quality with the Revision Quality Index (RQI). Confidence was collected separately.”

Candidate: “We assessed writing ability with the writing ability scale. Confidence was collected separately.”

Decision: reject this candidate. It replaces the named instrument and changes the construct. This is not just a choice between more natural synonyms. It does not show how any real product performed.

Language-only alternative for this exercise: “Revision quality was assessed using the Revision Quality Index (RQI); confidence was collected separately.” Check the real manuscript before accepting any corresponding edit.

## A short review sequence

1. Build the sheet from the actual manuscript, sources, instrument documentation, and analysis dictionary. Do not ask a model to invent a full form or decide which constructs are equivalent.
2. Set a paragraph-level purpose: e.g. remove repetition while keeping instrument names, outcome names, units, and variable symbols unchanged.
3. Compare the candidate with the original. Search for review-only forms and inspect every hit in context; do not replace them automatically.
4. Check the abstract, main text, tables, figures, notes, and supplementary material separately. An extracted text file may omit parts of the original document.
5. Verify abbreviation definitions under your target journal's rules. Whether an abbreviation needs redefining in an abstract or a caption is a venue-specific choice.
6. Ask a co-author about unresolved terminology. Keep separate terms for separate constructs even if repetition remains.

## Optional local literal-term inventory

[term-inventory.mjs](term-inventory.mjs) counts user-specified literal strings in local UTF-8 text. [term-sheet.example.json](term-sheet.example.json) is a synthetic starter dictionary. With Node.js:

```sh
node term-inventory.mjs term-sheet.example.json < private-draft.txt > private-counts.json
```

It reports only dictionary labels, variants, and counts, not manuscript excerpts. It makes no network request. Keep the dictionary and output private too: labels and counts may themselves reveal unpublished information.

Matching is literal: spaces, punctuation, and Unicode representations must match. Boundaries treat Unicode letters/numbers and underscore as part of a word. A hyphen is a boundary, so `RQI` is counted in `RQI-based`. The optional `caseSensitive` flag applies to every variant in that entry. Counts for overlapping phrases and entries are independent and must not be summed as unique mentions. The script does not parse equations or Word files, check first-use definitions, establish synonymy, judge meaning, or decide whether a hit is a problem. A zero count is not proof that a term was omitted from the complete manuscript.

## About the product

We build [PaperHumanizer for academic prose revision](https://paperhumanizer.com/ai-humanizer?utm_source=github&utm_medium=referral&utm_campaign=term_sheet_20261030). Generation requires sign-in and credits; consult the live site for current pricing. This sheet and script are free without a product account, and can be used with human editing too. Treat rewrites as candidates. Check facts, citations, terminology, and claim strength yourself and follow your institution's and journal's AI-use policies. We do not guarantee a detector result or publication acceptance.
