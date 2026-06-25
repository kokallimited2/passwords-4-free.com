# Graph Report - passwords-4-free.com  (2026-06-18)

## Corpus Check
- 1 files · ~15,099 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 16 nodes · 27 edges · 3 communities (2 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ebcfba24`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]

## God Nodes (most connected - your core abstractions)
1. `analyse()` - 7 edges
2. `generate()` - 6 edges
3. `applyPreset()` - 3 edges
4. `randomInt()` - 2 edges
5. `buildPool()` - 2 edges
6. `setStrength()` - 2 edges
7. `clearStrength()` - 2 edges
8. `syncLength()` - 2 edges
9. `poolSize()` - 2 edges
10. `hasSequence()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `applyPreset()` --calls--> `generate()`  [EXTRACTED]
  assets/app.js → assets/app.js  _Bridges community 1 → community 2_

## Import Cycles
- None detected.

## Communities (3 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.39
Nodes (7): analyse(), fmtTime(), hasSequence(), isRepeated(), poolSize(), render(), setBar()

### Community 1 - "Community 1"
Cohesion: 0.40
Nodes (5): buildPool(), clearStrength(), generate(), randomInt(), setStrength()

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `generate()` connect `Community 1` to `Community 0`, `Community 2`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `applyPreset()` connect `Community 2` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._