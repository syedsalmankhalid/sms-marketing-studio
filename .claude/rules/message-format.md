---
paths:
  - "campaigns/*/messages/*.md"
---

# Campaign message format

Every message file in a campaign's `messages/` folder must pass these checks. Measure with a command. Do not eyeball.

1. **Length.** The Label line is 40 characters or fewer. The body is 160 characters or fewer, with `{{first_name}}` counted as 10.
2. **Start.** The body starts with `Chirpnet:` and greets the reader with `{{first_name}}`.
3. **Link.** The body has exactly one link.
4. **End.** The body ends with `Reply STOP to opt out`.
5. **Characters.** No emoji, curly quotes or non-English script. Check every character.
6. **Brand voice.** No word or claim that `brand/voice.md` says to avoid.
7. **Placeholders.** While a message is a draft, count `[X GB]` and `[price]` as written and say so in the Length line. Before any send, no `[ ]` placeholder may be left. Fill in the real values and measure again.
