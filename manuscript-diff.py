#!/usr/bin/env python3
"""Build a local HTML comparison; no model calls, uploads, or science scoring."""
import argparse
import difflib
from pathlib import Path


def render(original, candidate):
    table = difflib.HtmlDiff(wrapcolumn=70).make_table(
        original.splitlines(), candidate.splitlines(),
        fromdesc='Original', todesc='Candidate', context=False)
    return '''<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Manuscript language comparison</title>
<style>body{font:16px system-ui;margin:2rem;color:#17212b}
table{border-collapse:collapse;font:14px ui-monospace,monospace}
td,th{padding:.3rem;border:1px solid #ddd;vertical-align:top}
.diff_header{background:#eef1f4}.diff_add{background:#c8f7cf}
.diff_sub{background:#ffd0cf}.diff_chg{background:#fff0a8}
.scroll{overflow:auto}li{margin:.4rem 0}</style>
<h1>Original and candidate: review the differences</h1>
<p>Local text comparison, not an authorship, plagiarism or factual-accuracy test.
Changes are marked by colour and position. The complete input is shown.</p>
<ul><li>Read unchanged text too: a wrong claim may appear in both versions.</li>
<li>Check which group, condition and time point each comparison names.</li>
<li>Verify numbers, references and uncertainty against the actual study record.</li></ul>
<div class="scroll">''' + table + '''</div>
<p>Product-team resource from <a href="https://paperhumanizer.com/ai-humanizer?utm_source=github&amp;utm_medium=resource&amp;utm_campaign=local_diff_20261114">PaperHumanizer</a>.
The comparison script runs locally without network requests. PaperHumanizer is a separate online rewriting service requiring sign-in and credits.</p>
</html>'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('original', type=Path)
    parser.add_argument('candidate', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    # Never overwrite either input, or an existing report, accidentally.
    if args.output.resolve() in {args.original.resolve(), args.candidate.resolve()}:
        parser.error('Output must differ from both input paths.')
    try:
        a = args.original.read_text(encoding='utf-8')
        b = args.candidate.read_text(encoding='utf-8')
        result = render(a, b)
        with args.output.open('x', encoding='utf-8') as stream:
            stream.write(result)
    except (OSError, UnicodeError) as exc:
        parser.exit(1, f'No new comparison report written: {exc}\n')
    print('Created report. Open the output file in your browser for manual review.')


if __name__ == '__main__':
    main()
