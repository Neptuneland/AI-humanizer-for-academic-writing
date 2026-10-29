# A revision receipt: keep the source, the candidate, and the decision separate

A free worksheet for postgraduate researchers and academic writers using English as an additional language. Prepared by the PaperHumanizer product team with AI assistance, October 29, 2026. All examples below are synthetic; they are not measured tool output or a report of an actual study.

A fluent paragraph does not tell a co-author which file was edited, which wording was accepted, or what still needs checking. Keep a small private revision receipt alongside the manuscript. It is an editing record, not proof that an AI disclosure satisfies a journal's rules.

## 1. Freeze the input before editing

Save a separate copy of the original file. Keep the original Word document as well as any text extracted for editing: plain text may omit tables, formulas, comments, notes, and tracked changes. Name a candidate separately rather than overwriting the original.

| Private receipt field | Your entry |
| --- | --- |
| Original file / local version | [record privately] |
| Candidate file / local version | [record privately] |
| Section and paragraph locator | [e.g. Discussion, paragraph 2] |
| Editing purpose | [e.g. reduce repetition; do not add claims] |
| Editor or tool and date | [record actual process] |
| Source material consulted | [local source / page locator] |
| Accepted, rejected, unresolved changes | [record decisions separately] |
| Final reviewer / date | [author or co-author] |

Do not put manuscript text, private file names, unpublished results, or reviewer comments in this public repository, issues, or comments. Completed receipts belong in your approved private storage.

## 2. Compare a candidate with its actual source

Synthetic original: “Participants completed a voluntary questionnaire after the workshop. We did not collect baseline confidence ratings.”

Synthetic candidate: “The workshop improved participants' confidence.”

Decision: **reject**. The candidate changes a description of data collection into an improvement claim and drops the missing-baseline limitation. A cleaner sentence is not automatically an acceptable revision.

Synthetic acceptable language-only candidate: “After the workshop, participants completed a voluntary questionnaire; baseline confidence was not measured.”

Even the acceptable example needs checking against the real methods and sources in an actual manuscript. These invented sentences do not validate a product's output.

## 3. Use a local byte receipt if you need an exact-file reference

The optional [revision-receipt.mjs](revision-receipt.mjs) reads two local files and prints SHA-256 digests and byte counts. It does not send network requests or print file contents or names. Run it with Node.js:

```sh
node revision-receipt.mjs original.txt candidate.txt > receipt.json
```

Keep the receipt and the mapping from its `original` / `candidate` labels to your files privately. Each digest identifies the bytes read at that moment. It is not a backup, trusted timestamp, signature, authorship proof, or a measure of semantic similarity. Re-saving a Word archive may change its bytes even if the displayed text is unchanged. A different newline or Unicode representation also changes the receipt.

A hash is not anonymization: someone with a candidate file can compare its digest. Do not publish hashes of confidential material. Avoid editing the files while the script is reading them; a receipt is not an atomic snapshot of a changing file.

## 4. Make the review decision explicit

- Check numbers, references, equations, negation, and uncertainty against the original and sources.
- Classify each substantial change: language only; verified factual correction; rejected; unresolved.
- Ask the appropriate co-author about an unresolved interpretation. Do not silently choose the smoother wording.
- Compare the exported document visually, especially tables, references, and tracked changes. Preserve the original until the final version is accepted.
- Record actual AI use in the form your institution, collaborators, and target journal require. This worksheet does not prescribe a universal disclosure.

## Product relationship

We build [PaperHumanizer for academic prose revision](https://paperhumanizer.com/ai-humanizer?utm_source=github&utm_medium=referral&utm_campaign=revision_receipt_20261029). Generation requires sign-in and credits; see the live site for current pricing. The worksheet and local script above are free and do not require a product account. Treat any generated rewrite as a candidate and verify it yourself. No detector result, source accuracy, or publication acceptance is guaranteed.
