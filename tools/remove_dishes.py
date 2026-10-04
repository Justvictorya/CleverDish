"""
Remove named dishes from a TypeScript data file, one object at a time.

Brace-counting alone is not enough: a mis-located object start silently swallows
its neighbours. Every candidate span is therefore validated before anything is
written, and the run aborts rather than saving a partial edit.

  python3 tools/remove_dishes.py <file> <region-start-regex> <region-end-regex> <title> [<title> ...]
"""
import re
import sys


def indent(line: str) -> int:
    return len(line) - len(line.lstrip())


def find_span(lines: list, title: str, lo: int, hi: int):
    """Locate the whole object literal for `title`, or return None with a reason."""
    wanted = f"title: '{title}',"
    hits = [i for i in range(lo, hi) if lines[i].strip() == wanted]
    if not hits:
        return None, f"no `title: '{title}',` line in region"
    if len(hits) > 1:
        return None, f"{len(hits)} lines match `{title}` in region"

    t = hits[0]
    start = next(
        (i for i in range(t, lo - 1, -1)
         if lines[i].strip() == '{' and indent(lines[i]) < indent(lines[t])),
        None,
    )
    if start is None:
        return None, f"no opening brace above `{title}`"

    depth = 0
    end = None
    for i in range(start, hi):
        depth += lines[i].count('{') - lines[i].count('}')
        if depth == 0 and i > start:
            end = i
            break
    if end is None:
        return None, f"unbalanced braces for `{title}`"
    if lines[end].strip() not in ('},', '}'):
        return None, f"object for `{title}` ends on `{lines[end].strip()!r}`, not a brace"

    titles = [i for i in range(start, end + 1) if lines[i].strip().startswith('title:')]
    if len(titles) != 1:
        return None, f"span for `{title}` swallows {len(titles)} dishes"

    return (start, end), None


def main() -> int:
    path, start_re, end_re, *titles = sys.argv[1:]
    lines = open(path, encoding='utf-8').read().split('\n')

    lo = next((i for i, l in enumerate(lines) if re.search(start_re, l)), None)
    if lo is None:
        print(f"region start {start_re!r} not found")
        return 1
    hi = next((i for i, l in enumerate(lines) if i > lo and re.search(end_re, l)), len(lines))

    spans = {}
    failures = {}
    for title in titles:
        span, err = find_span(lines, title, lo, hi)
        if span:
            spans[title] = span
        else:
            failures[title] = err

    for title, err in failures.items():
        print(f"  SKIP  {title}: {err}")
    if failures:
        print(f"\n{len(failures)} title(s) unresolved; aborting without writing")
        return 1

    drop = set()
    for start, end in spans.values():
        drop.update(range(start, end + 1))

    kept = [l for i, l in enumerate(lines) if i not in drop]
    open(path, 'w', encoding='utf-8').write('\n'.join(kept))
    print(f"\nremoved {len(titles)} dishes / {len(drop)} lines from {path}")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
