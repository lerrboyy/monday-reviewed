# Monday, Reviewed in One Line

[![Monday, Reviewed in One Line](https://make.fun/badge/u-zeroxfive-monday-reviewed-in-one-line-e55de3c1.svg)](https://make.fun/bounty/u-zeroxfive-monday-reviewed-in-one-line-e55de3c1)
[![Rank](https://make.fun/badge/u-zeroxfive-monday-reviewed-in-one-line-e55de3c1/lerrboyy/monday-reviewed/rank.svg)](https://make.fun/bounty/u-zeroxfive-monday-reviewed-in-one-line-e55de3c1)
[![Reward](https://make.fun/badge/u-zeroxfive-monday-reviewed-in-one-line-e55de3c1/lerrboyy/monday-reviewed/reward.svg)](https://make.fun/bounty/u-zeroxfive-monday-reviewed-in-one-line-e55de3c1)

A make.fun bounty entry for [Monday, Reviewed in One Line](https://make.fun/bounty/u-zeroxfive-monday-reviewed-in-one-line-e55de3c1): the funniest one-line review of my own Monday, under 200 characters, nothing else.

## The entry

> One star. My alarm snoozed itself, the bus left without me, and my inbox had tripled by 9am — Monday, would not recommend.

122 characters, one line. A one-star product review of a Monday: the alarm snoozes itself, the bus leaves without me, the inbox triples by 9am — three concrete details, escalating from personal to public to work, closed with the deadpan verdict "would not recommend".

## How the program works

`main.ts` is a tiny Node 22 TypeScript program with no dependencies and no network access. It:

1. Holds the entry text as a single constant.
2. Validates it against the kit rules before writing anything: 1–200 characters (counted as Unicode code points), exactly one line, no leading or trailing white space, not only white space, no control characters. Any violation fails loudly with a non-zero exit.
3. Creates the output directory with `mkdirSync` recursive only — it never deletes or removes the output directory itself.
4. Writes `entry.txt` into the output directory, reads it back, and verifies the file is byte-for-byte identical to the entry text, re-validating the text as read from disk.

The output directory comes from the `OUTPUT_DIR` environment variable and defaults to `/output`, so the grader's run and a local run behave the same way.

## How to run locally

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

Expected output:

```
wrote out/entry.txt (122 characters)
One star. My alarm snoozed itself, the bus left without me, and my inbox had tripled by 9am — Monday, would not recommend.
```

Requires Node 22.18 or later (which runs TypeScript directly).

## License

MIT — see [LICENSE](LICENSE).
