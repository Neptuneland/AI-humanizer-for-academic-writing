# Review an academic rewrite in a local HTML comparison

Disclosure: this resource is maintained by the PaperHumanizer product team and was prepared with AI assistance and editorial review. Examples are synthetic; they are not actual research findings or product outputs.

When you have an original paragraph and a candidate revision, a visual comparison can help locate edits before you accept them. This small Python script creates a side-by-side HTML report from two UTF-8 text files. It uses only the Python standard library and makes no network requests. It is independent of the online rewriting product.

## Run it

1. Download [manuscript-diff.py](./manuscript-diff.py) and inspect the source.
2. Save two plain UTF-8 text files as `original.txt` and `candidate.txt`. Exporting plain text removes Word formatting, comments and tracked-change metadata; keep your original document separately.
3. With Python 3 installed, run:

```sh
python3 manuscript-diff.py original.txt candidate.txt comparison.html
```

Open `comparison.html` in your browser. The script refuses to overwrite an input or an existing output. Use another output name for another comparison. It reads UTF-8 files; it does not parse DOCX or PDF. The generated report contains both complete input texts, so keep it private when the source is private.

## What to review

Suppose the original says:

> After training, response times were lower in Group A than in Group B.

A candidate says:

> In Group A, response times were lower after training than before training.

Both are fluent, but one compares groups and the other compares time points. A coloured difference cannot decide which is supported. Consult the study record, then identify the outcome, both comparison conditions and their time points. If these are not documented, ask a co-author instead of guessing.

For each meaningful change, record `accept`, `revise` or `ask co-author`, with a short reason. Review unchanged text as well: an inaccurate statement can occur in both files. The tool does not validate statistics, citations, causality, authorship, originality or an institution’s AI policy. It does not label one version as better.

## Why this is separate from a file fingerprint

A fingerprint tells you whether the bytes changed. A visual diff shows where text differs. Neither explains whether a scientific claim remains correct. This report is intended for manual language review, not automatic approval.

## Optional rewriting step

We build [PaperHumanizer](https://paperhumanizer.com/ai-humanizer?utm_source=github&utm_medium=resource&utm_campaign=local_diff_20261114), an online AI text humanizer and rewriting tool. You can use this local comparison script with drafts from any source; no PaperHumanizer account is needed for the script. The online service requires sign-in and credits. Authors must check the resulting language and follow applicable AI-use and disclosure requirements. No detector, factual-accuracy or publication guarantee is implied.

## Validation and limits

The included development check used invented group-label changes and an HTML-like input to verify that a report is generated and text is escaped. This is not a benchmark of language quality. Line alignment can be noisy after large paragraph moves. Very large files may take considerable time and memory; start with a paragraph or section. The comparison is local, but opening links in the report follows ordinary browser behaviour.
