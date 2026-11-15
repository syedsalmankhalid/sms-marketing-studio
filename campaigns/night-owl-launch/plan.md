# Night Owl Bundle Launch: Campaign Plan

Written 2026-11-15. Status: draft, waiting for sign-off.

## At a glance

| | |
|---|---|
| **Campaign name** | Up Late? (Night Owl Bundle launch) |
| **Summary** | Tell our opted-in prepaid subscribers about the Night Owl Bundle by SMS, and make it easy to add by replying OWL. |
| **Goal** | 500 subscribers add the Night Owl Bundle in the first 4 weeks. |
| **Audience** | About 20,000 prepaid subscribers who opted in to offers: students, gamers and budget-callers. |
| **Dates** | Monday 7 December 2026 to Sunday 3 January 2027 (4 weeks). |
| **Channel** | SMS only. No paid ads. |
| **Send window** | 9 am to 9 pm, subscriber's local time. Never at night. |
| **Budget** | Not given. The only cost is SMS sending (about 75,000 texts, see section 8). |

### Before we start: facts we still need

These go into every text. We must not guess them, because the brand voice says we always state the price, the hours and the catch.

1. **Price** of the Night Owl Bundle. Shown as `[price]` below.
2. **How much data** it gives. Shown as `[X GB]` below.
3. **How long it lasts**: one night, 7 days, 30 days? Does it renew by itself?
4. **What happens at 7 am**: does use after 7 am come from normal data or credit?
5. **How OWL works**: does replying OWL take the money from prepaid credit straight away? What if there is not enough credit?
6. **Segment sizes**: how many of the 20,000 are students, gamers and budget-callers?

## 1. Campaign overview

**Main goal.** 500 activations by Sunday 3 January 2027. That is 2.5% of 20,000 people.

**Other goals.**
- Keep opt-outs low: fewer than 1% of people texted reply STOP after any one send.
- Learn which group and which message works best, so the next offer is easier to plan.
- Keep people using it: at least 40% of people who add the bundle use it again (or buy it again) within the 4 weeks.

**Weekly targets.** Most sign-ups come from the first text, so the targets drop each week.

| Week | Dates | Activations | Running total |
|---|---|---|---|
| 1 | 7 to 13 Dec | 200 | 200 |
| 2 | 14 to 20 Dec | 150 | 350 |
| 3 | 21 to 27 Dec | 75 | 425 |
| 4 | 28 Dec to 3 Jan | 75 | 500 |

## 2. Target audience

Everyone in this campaign is a prepaid subscriber who opted in to offers. Nobody else gets a text.

| Group | Who they are | Why the bundle helps them | What may stop them |
|---|---|---|---|
| **Students** | Young, on a tight budget, often up late studying or watching videos. | Cheap data for videos, lectures and downloads late at night. December is exam time. | Low credit. May think "cheap" means "slow". |
| **Gamers** | Play online, often late. Game updates and downloads are big. | Big game downloads and updates after midnight at a low price. | Speed worries. We must not promise speeds. |
| **Budget-callers** | Mostly call and text. Watch every bit of credit. | Good value data. Can save daytime data by doing big downloads at night. | Not online late. May not need much data. |

**Stage.** They know us but have never heard of this bundle. Each text must explain the offer and ask for one action: reply OWL.

**Where they are.** On their phones. SMS is the only channel in this plan.

## 3. Key messages

**Core message.** Up late? Get cheap data from midnight to 7 am with the Night Owl Bundle.

**Supporting messages.**

| Message | For | Proof we can stand behind |
|---|---|---|
| Low price for data from midnight to 7 am. | Everyone | The real price and data amount. |
| Do your big downloads after midnight and save your daytime data. | Budget-callers, gamers | How the bundle works. True only if bundle data is kept apart from normal data. Check this first. |
| Catch up on lectures and videos late at night. | Students | Same as above. Don't promise it is "fast enough to stream" unless we have tested it. |
| Easy to add: just reply OWL. | Everyone | OWL keyword works on day one (tested on the practice server). |

**Rules for every text** (from `brand/voice.md`):
- Starts with `Chirpnet:` and ends with `Reply STOP to opt out.`
- 160 characters or fewer.
- States the hours as "midnight to 7 am". Never "all night", "24/7" or "any time".
- Never "unlimited", "free", "cheapest", "fastest", or any fake deadline.
- No emoji, no ALL CAPS words, no "hurry" or "last chance".
- Plain keyboard characters only. Curly quotes and long dashes can switch a text to a format that only fits 70 characters, which would split it into several paid parts.

## 4. Channel strategy

**SMS, owned channel.** Effort: low to medium.

Why it fits: these people already opted in to offer texts, everyone has a phone, and replying OWL turns a text straight into a sale. No website or app is needed.

**How we use it:**
- **One text a week, at most**, per person. Four campaign texts in four weeks, in total.
- **Only non-buyers get the next text.** Once someone adds the bundle, they stop getting sales texts and get a short "how to use it" text instead.
- **STOP is final.** Anyone who replies STOP is removed at once and gets no more campaign texts.
- **Each group gets its own text** where it helps (weeks 1 to 3).

**Send times (all inside 9 am to 9 pm):**

| Group | Best time | Why |
|---|---|---|
| Students | 4 pm to 7 pm | After classes, before the evening. |
| Gamers | 6 pm to 8:30 pm | Just before they settle in for the night, so they can add it "for tonight". |
| Budget-callers | 10 am to 12 pm | Daytime, when they check their phones and credit. |

**The night-time rule.** The bundle is for the night, but we never text at night.
- Every send must **start by 8:30 pm** so that slow batches finish well before 9 pm.
- The sending script must **refuse to send** before 9:00 am or after 9:00 pm in the subscriber's local time. This is a hard block in code, not just a note.
- **Replies at night.** If someone replies OWL at 11 pm, we add the bundle straight away, but the "Done" confirmation text waits until 9 am. **Please confirm this is what you want** (see Next steps). The other choice is to allow instant confirmations because the person texted us first.

**Practice only.** While we build and test, every text goes to the practice server at `http://127.0.0.1:4000`. Nothing goes to real Twilio or real phones.

## 5. Content calendar

Week 0 is set-up, before the launch.

| Week | Dates | What | Who gets it | Notes | Status |
|---|---|---|---|---|---|
| 0 | 16 Nov to 4 Dec | Get the missing facts (price, data, length, rules) | n/a | Blocks every text below. | To do |
| 0 | 16 Nov to 27 Nov | Write and approve all texts | n/a | Check each one against `brand/voice.md`. | To do |
| 0 | 16 Nov to 27 Nov | Tag every subscriber as student, gamer or budget-caller | n/a | Anyone without a tag gets the general text. | To do |
| 0 | 30 Nov to 4 Dec | Set up OWL, HELP and STOP replies; build the 9 am to 9 pm block | n/a | Test end to end on the practice server. | To do |
| 0 | 30 Nov to 4 Dec | Pick a holdout group of 1,000 people who get no texts | n/a | So we can tell how many sign-ups the texts caused. Optional. | To do |
| 1 | Mon 7 Dec | **Launch test**: two versions of the launch text, 1,000 people each | 2,000 | Pick the winner by reply rate on Tuesday. | To do |
| 1 | Tue 8 to Wed 9 Dec | **Launch text** (winner, one version per group) | Everyone else | Split over two days to spread the load on support. | To do |
| 1 | Ongoing | **"Done" text** after each OWL reply | Buyers | Held until 9 am if they reply at night. | To do |
| 2 | Tue 15 Dec | **How it works** text, one per group | Non-buyers | Answers "what do I get and how?" | To do |
| 2 | Fri 18 Dec | Week 2 check-in: numbers so far | Team | Decide if week 3 needs a change. | To do |
| 3 | Tue 22 Dec | **Holiday downloads** text | Non-buyers | Sent before Christmas Eve. No texts on 24 or 25 Dec. | To do |
| 4 | Tue 29 Dec | **Still here** reminder | Non-buyers who have not replied to anything | Honest, no deadline. No texts on 31 Dec or 1 Jan. | To do |
| 4 | Mon 4 Jan | Final count and short report | Team | Save results in this folder. | To do |

**Order that matters:**
1. Price and data amount must be confirmed before any text is final.
2. OWL, HELP and STOP must work on the practice server before the launch test.
3. The 9 am to 9 pm block must be in place before the first send.
4. Each week's list must remove people who bought or opted out.

## 6. Content pieces needed

All drafts below are 160 characters or fewer if `[X GB]` and `[price]` are each 5 characters or fewer (for example "10 GB" and "$2.99"). Recount once the real values are in.

| # | Text | Group | Week | Priority | Draft | Chars |
|---|---|---|---|---|---|---|
| 1 | Launch, version A | All / no tag | 1 | Must | Chirpnet: Up late? Meet the Night Owl Bundle: [X GB] of data from midnight to 7 am for [price]. Reply OWL to add it. Reply STOP to opt out. | 136 |
| 2 | Launch, students | Students | 1 | Must | Chirpnet: Studying late? The Night Owl Bundle gives you [X GB] of data from midnight to 7 am for [price]. Reply OWL to add it. Reply STOP to opt out. | 146 |
| 3 | Launch, gamers | Gamers | 1 | Must | Chirpnet: Big game update? Get it after midnight with the Night Owl Bundle: [X GB], midnight to 7 am, [price]. Reply OWL to add it. Reply STOP to opt out. | 151 |
| 4 | Launch, budget-callers | Budget-callers | 1 | Must | Chirpnet: Good value data for night owls. The Night Owl Bundle is [X GB] from midnight to 7 am for [price]. Reply OWL to add it. Reply STOP to opt out. | 148 |
| 5 | How it works | All | 2 | Must | Chirpnet: How the Night Owl Bundle works: reply OWL, we add it, and you get [X GB] to use from midnight to 7 am. Price: [price]. Reply STOP to opt out. | 148 |
| 6 | Week 2, students | Students | 2 | Nice | Chirpnet: Lectures to catch up on? Watch them from midnight to 7 am with the Night Owl Bundle, [X GB] for [price]. Reply OWL to add it. Reply STOP to opt out. | 155 |
| 7 | Week 2, gamers | Gamers | 2 | Nice | Chirpnet: Got a big download waiting? The Night Owl Bundle gives you [X GB] from midnight to 7 am for [price]. Reply OWL to add it. Reply STOP to opt out. | 151 |
| 8 | Week 2, budget-callers | Budget-callers | 2 | Nice | Chirpnet: Save your daytime data. Use the Night Owl Bundle for big downloads from midnight to 7 am, [price]. Reply OWL to add it. Reply STOP to opt out. | 150 |
| 9 | Holiday downloads | All | 3 | Must | Chirpnet: New apps or games for the holidays? Get them from midnight to 7 am with the Night Owl Bundle, [price]. Reply OWL to add it. Reply STOP to opt out. | 155 |
| 10 | Still here | All | 4 | Must | Chirpnet: The Night Owl Bundle is still here if you want it. [X GB] from midnight to 7 am for [price]. Reply OWL to add it. Reply STOP to opt out. | 143 |
| 11 | "Done" confirmation | Buyers | 1 to 4 | Must | Chirpnet: Done. Your Night Owl Bundle is added. Use it from midnight to 7 am. Questions? Reply HELP. Reply STOP to opt out. | 123 |
| 12 | HELP reply | Anyone | 1 to 4 | Must | Short answer with price, hours, how long it lasts and how to get help. Write once the facts are in. | n/a |
| 13 | Not enough credit | Anyone | 1 to 4 | Must | Tells them the bundle was not added and how to top up. Write once we know how OWL charges. | n/a |
| 14 | Launch, version B | All | 1 | Must | A second launch text for the Monday test, for example leading with the price instead of "Up late?". | n/a |

Text 8 needs a check: "Save your daytime data" is only true if bundle data is used first between midnight and 7 am.

## 7. Success metrics

**Main KPI.** Night Owl Bundle activations from OWL replies: **500 by 3 January 2027.**

**Other KPIs.**

| KPI | Target | How we track it |
|---|---|---|
| Activations by group and by text | Find the best group and text | Tag each OWL reply with the last text that person got. |
| Activation rate per send | 1% for the launch text | Activations ÷ texts delivered. |
| Opt-out (STOP) rate per send | Under 1% | STOP replies ÷ texts delivered. If over 1%, pause and review. |
| Delivery rate | Over 95% | Delivery reports from the sending service. |
| Repeat use | 40% of buyers use it again or buy again | Usage records after the first activation. |
| Lift over holdout | Clearly higher than the holdout group | Compare buyers in the texted group with the 1,000 who got nothing. |

**Reporting.**
- Daily during week 1: sends, activations, STOPs.
- Weekly (Fridays): numbers against the weekly targets, plus any change for next week.
- Final report on 4 January 2027, saved in `campaigns/night-owl-launch/`.

## 8. Budget

No budget was given, and there are no paid ads. The only real cost is sending texts.

- **Texts to send:** about 19,000 (week 1, which is 20,000 minus the 1,000 holdout) + 18,750 (week 2) + 18,550 (week 3) + 18,400 (week 4) = **about 74,700**, plus about 600 "Done" and HELP texts. Each week drops because buyers and opt-outs are taken off the list.
- **Cost:** about 75,300 × our cost per text. Every draft is one SMS part (160 characters or fewer), so the cost stays at one part per text.
- **Cost per activation:** total SMS cost ÷ activations. Track this to compare with future offers.
- **Saving option:** if week 1 shows one group barely responds, send it fewer texts in weeks 3 and 4.
- **Contingency:** keep 10% extra for resends and a possible extra test.

## 9. Risks and how we handle them

| Risk | What we do about it |
|---|---|
| **We text people at night by mistake** (wrong time zone, slow batch). | Hard block in the script outside 9 am to 9 pm local time. Start every send by 8:30 pm. Test the block on the practice server. |
| **Too many texts annoy people** and opt-outs rise. | One text a week at most. Buyers stop getting sales texts. Pause if STOP goes over 1% on any send. |
| **Texts promise more than the bundle gives** (speed, hours, "free"). | Check every text against `brand/voice.md` before sending. Always say "midnight to 7 am". Never promise speed. |
| **Holiday weeks are quiet** and weeks 3 and 4 miss target. | Front-load: weeks 1 and 2 aim for 350 of the 500. Avoid 24, 25 and 31 December and 1 January. |
| **OWL replies fail** (no credit, keyword typo). | Clear "not enough credit" reply. Also accept "owl", "Owl" and "OWL " with spaces. |
| **A text goes to real phones during testing.** | All testing uses only the practice server at `http://127.0.0.1:4000`. Real Twilio is not set up in this project. |

## 10. Next steps

**To do now:**
1. Get the bundle facts (price, data, length, renewal, what happens at 7 am).
2. Get the segment sizes and tag every subscriber.
3. Write launch version B and the HELP and "not enough credit" replies.
4. Build the OWL / HELP / STOP flow and the 9 am to 9 pm block, and test them on the practice server.

**Sign-offs needed:**
- Final text wording (marketing lead).
- Price and offer wording (product / pricing owner).
- Opt-in and opt-out handling (whoever owns compliance).

**Decisions for you:**
- **Night-time OWL replies:** hold the "Done" text until 9 am (this plan's default), or allow an instant reply because they texted us first?
- **Holdout group:** keep 1,000 people back to measure real lift, or text everyone?
- **Weak group:** if one group barely responds in week 1, keep texting it or drop it?
