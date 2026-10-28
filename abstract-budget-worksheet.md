# Shorten an abstract without deleting the study boundary

A free worksheet for postgraduate researchers and academic writers using English as an additional language. Prepared by the PaperHumanizer product team with AI assistance, October 28, 2026. All study details below are fictional teaching examples, not research findings or measured product output.

## 1. Write down the submission rule

- Journal or conference: [name]
- Abstract limit and whether headings count: [rule]
- Required headings: [rule]
- Counting tool used by the submission system: [name / unknown]
- Current draft version: [date / version]

The example uses an intentionally short 80-word exercise budget. This is not a claim that 80 words is a standard journal limit.

## 2. Make a keep-list before cutting

| Keep | Fictional example detail | What would change if removed? |
|---|---|---|
| Study design | Observational survey; not randomized | Readers could mistake the comparison for an intervention trial. |
| Population and setting | 64 postgraduate students, one centre | The scope and generalizability become unclear. |
| Timing | Two weeks after an optional workshop | The observation point disappears. |
| Measurement | Attendance and confidence were self-reported | Confidence could be mistaken for measured writing skill. |
| Comparison and values | Attendees 3.8/5; non-attendees 3.2/5 | The direction or size of the descriptive difference disappears. |
| Missing information | No baseline confidence; no adjustment for prior writing experience | Readers may assume stronger control of alternative explanations. |
| Claim boundary | Association; no established skill improvement; limited generalizability | A short abstract could overstate what the study shows. |

Keep-list entries must come from your actual methods and results, not from a writing tool's suggestions.

## 3. Compare the drafts

### Original fictional abstract

```text
Background: It is important to understand whether students who attend an optional writing workshop report different levels of confidence when they prepare abstracts for research projects.
Methods: In a single-centre observational study, we surveyed 64 postgraduate students two weeks after an optional workshop. Attendance and confidence were self-reported, and there was no baseline confidence measure.
Results: Attendees reported a mean confidence score of 3.8 out of 5, compared with 3.2 among non-attendees. The groups were not randomly assigned, and the analysis did not adjust for prior writing experience.
Conclusion: Attendance was associated with higher self-reported confidence. These findings do not establish that the workshop improved writing skill, and they may not generalize beyond this setting.
```

### Shorter fictional revision

```text
Background: We examined workshop attendance and abstract-writing confidence.
Methods: We conducted an observational survey of 64 postgraduate students at one centre two weeks after an optional workshop. Attendance and confidence were self-reported; baseline confidence was unavailable.
Results: Mean confidence was 3.8/5 among attendees and 3.2/5 among non-attendees. Groups were not randomized; prior writing experience was not adjusted for.
Conclusion: Attendance was associated with confidence, without establishing improved writing skill. Findings may not generalize beyond this setting.
```

The edit removes the long introductory lead-in and compresses repeated wording. It does not turn confidence into skill, make optional attendance randomized, or remove the single-centre limitation. The slash notation is a formatting choice: check your journal's convention before using it.

## 4. Count using a named convention

The companion [abstract-budget.mjs](abstract-budget.mjs) is a local, dependency-free Node.js example. It counts whitespace-separated tokens, including heading labels. Under that convention, the original is 115 words and the revision is 76. Hyphenated compounds and `3.8/5` each count as one token. A journal may count differently.

```sh
node abstract-budget.mjs 80 < abstract.txt
node --test abstract-budget.test.mjs
```

The script reads your local standard input and prints counts and section metadata. It does not call a model or send text to a server. Keep confidential drafts on an appropriate private device and out of public issues, commits, logs, and online paste services.

The test suite covers whitespace (including non-breaking spaces), headings across lines, invalid limits, and CLI output that omits manuscript text. See [the tests](abstract-budget.test.mjs). A count within budget says nothing about scientific validity, completeness, or journal acceptance.

## 5. Cut in this order

1. Remove empty lead-ins such as “It is important to understand whether”.
2. Combine repeated subject phrases without changing who was studied.
3. Shorten formatting where the journal permits it.
4. Check the keep-list again after every substantive cut.
5. If still over budget, ask a coauthor which detail can be moved or condensed under the journal's rules. Do not silently delete the study design or an essential limitation.

## Optional editing support

I build [PaperHumanizer's academic editor](https://paperhumanizer.com/ai-humanizer?utm_source=github&utm_medium=referral&utm_campaign=abstract_budget_20261028), which provides prose revision and original/revised text comparison. Generation requires sign-in and credits. This worksheet and local counter can be used independently of the product. Authors must verify rewritten text against their research and comply with institutional and journal AI-use policies. No detector-pass or publication-acceptance guarantee is made.
