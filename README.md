# SMS Marketing Studio

A Claude Code workspace for planning and writing SMS campaigns for **Chirpnet Mobile**, a small (fictional) prepaid mobile network. It holds the brand voice, subscriber segments, campaign plans and message drafts. It also includes a small SMS server that can send texts to a practice server only, never to real people.

The current campaign is the **Night Owl Bundle** launch: cheap data from midnight to 7 am.

> **All data here is made up.** Subscriber names and numbers are test data (`+1202555xxxx`). No real person is in this repo.

## What is in the box

| Folder / file | What it is |
|---|---|
| `CLAUDE.md` | Project rules Claude Code follows every session: plain English, send limits, quiet hours, ask before deleting. |
| `brand/voice.md` | Brand voice: three words (friendly, clear, honest), words to use and avoid, claims never to make, how every text starts and ends. |
| `subscribers/` | `subscribers.csv` (24 test subscribers in 3 groups) and `CLAUDE.md` with the data rules. |
| `campaigns/night-owl-launch/` | The campaign: `plan.md`, four master drafts in `messages/`, and one copy per group in `groups/`. |
| `notes/` | Research and decisions, such as which skills and MCP servers to use and why. |
| `mcp/sms-server.mjs` | The SMS MCP server (Twilio-style API, with a send guard). |
| `.mcp.json` | Registers the SMS server with Claude Code. |
| `.claude/rules/message-format.md` | Checks every message file must pass. |
| `.claude/skills/personalize/` | A skill that writes one version of each message per subscriber group. |
| `.claude/settings.json` | Enables the `marketing` plugin from `anthropics/knowledge-work-plugins`. |

## Campaign at a glance

- **Offer:** The Night Owl Bundle, data from midnight to 7 am only.
- **Goal:** 500 subscribers add the bundle in the first 4 weeks (7 Dec 2026 to 3 Jan 2027).
- **Audience:** about 20,000 opted-in prepaid subscribers: `student`, `gamer`, `budget-caller`.
- **Call to action:** reply `OWL` to add the bundle.
- **Messages:** teaser, launch, reminder and last day (`01` to `04`).
- **Open items:** price, data amount, length of the bundle and a few more facts are still placeholders (`[price]`, `[X GB]`). See the "facts we still need" list in `plan.md`. No message may be sent until they are filled in.

## Rules that keep it safe

These come from `CLAUDE.md` and the files it links to.

1. **No real sends.** Texts go only to the practice server at `http://127.0.0.1:4000`. The only real-Twilio exceptions are Twilio's test number `+15005550006` and the owner's own phone (`MY_PHONE`).
2. **Quiet hours.** Nothing is planned or sent outside 9 am to 9 pm in the subscriber's local time. Every send starts by 8:30 pm.
3. **Calendar entries.** Each message in a campaign calendar needs a date, a send time, an audience group and a purpose.
4. **Message format.** Each text is 160 characters or fewer, starts with `Chirpnet:`, has one link, ends with `Reply STOP to opt out.`, and uses no emoji or curly quotes.
5. **Brand claims.** Never "unlimited" without a fair-use limit, never "free" with hidden conditions, never "all night" or "24/7". See `brand/voice.md`.
6. **Test data only.** Subscriber rows must use the `+12025550101`-style fake numbers and an allowed group. See `subscribers/CLAUDE.md`.
7. **Ask before deleting** anything.

## The SMS MCP server

`mcp/sms-server.mjs` is a small [Model Context Protocol](https://modelcontextprotocol.io) server. It talks to the Twilio Messages API and exposes four tools:

- `send-sms`: send one message.
- `send-bulk-sms`: send the same message to several numbers.
- `list-messages`: list recent messages.
- `get-message`: look up one message.

### The send guard

- If `TWILIO_BASE_URL` points at `127.0.0.1` or `localhost`, it is **practice mode**. Nothing reaches a real phone.
- Otherwise the base URL must be exactly `https://api.twilio.com`, and the recipient must be `+15005550006` or your own `MY_PHONE`. Any other number is blocked.
- `MY_PHONE` must look like `+` followed by 8 to 15 digits. If it is missing or invalid, only the Twilio test number is allowed.

### Configuration

`.mcp.json` reads these environment variables. Each has a safe default, so practice mode works with no setup.

| Variable | Default | Purpose |
|---|---|---|
| `TWILIO_ACCOUNT_SID` | `AC000...000` (fake) | Twilio account ID |
| `TWILIO_AUTH_TOKEN` | `twilio_test_auth_token` (fake) | Twilio auth token |
| `TWILIO_BASE_URL` | `http://127.0.0.1:4000` | Where to send. Keep the default while practising. |
| `TWILIO_FROM` | `+15551234567` | Sender number |
| `MY_PHONE` | empty | Your own number, in `+countrycode` form |

Put your own `MY_PHONE` in `.claude/settings.local.json`. That file is git-ignored, so your number stays off GitHub:

```json
{ "env": { "MY_PHONE": "+15551234567" } }
```

Never commit real credentials or a real phone number.

## Getting started

You need [Node.js](https://nodejs.org) 18 or newer and [Claude Code](https://claude.com/claude-code).

```bash
git clone https://github.com/syedsalmankhalid/sms-marketing-studio.git
cd sms-marketing-studio
npm install
claude
```

Start the practice server on port 4000 (a fake Twilio, such as `vercel-labs/emulate`) before you send anything. Claude Code will ask you to approve the `sms` server from `.mcp.json` the first time.

## Working in the studio

- **Plan a campaign:** ask Claude to plan it. The `marketing:campaign-plan` skill from the enabled plugin fits well.
- **Write messages:** ask for drafts. Claude follows `brand/voice.md` and the message format rules, and measures length with a command.
- **Personalize:** run `/personalize campaigns/night-owl-launch` to write one copy of each message per subscriber group into `groups/<group>/messages/`.
- **Practice send:** ask Claude to send a message through the `sms` server. With the default config it goes to the practice server only.

## Subscriber data

`subscribers/subscribers.csv` has these columns: `subscriber_id`, `first_name`, `phone`, `group`, `joined_on`, `consent`. There are 8 subscribers in each group. Allowed groups: `student`, `gamer`, `budget-caller`.

## Notes

`notes/skills-i-chose.md` records which skills and servers were picked, which were rejected, and the three checks used before installing anything: who publishes it, whether the numbers agree, and whether you read the source first.

`ASSIGNMENT_SMS_MKTG_STUDIO.mhtml` is the course brief this project was built from (Panaversity FDE-102).

## Status

Work in progress. Drafts are waiting for sign-off, and the offer details are not final. This is a learning project, not a production system.
