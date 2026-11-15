# Skills and servers I chose

Researched 2026-11-15. Nothing has been installed yet.

Our practice server at `http://127.0.0.1:4000` is running and currently holds 2 messages. Its port and test credentials (`AC000…`, `twilio_test_auth_token`) match **vercel-labs/emulate**, Vercel's fake Twilio, so that is almost certainly what it is.

## Use these

1. **Writing campaigns: `anthropics/knowledge-work-plugins@campaign-plan`**
   Anthropic publishes it (official), the repo has about 36,000 GitHub stars, it's Apache-2.0 licensed, and it was updated this week. It produces a full campaign brief: goal, audience, messaging, channels, calendar and metrics. For SMS-specific copy and the rules around it (opt-in, quiet hours, TCPA, A2P 10DLC), add `coreyhaines31/marketingskills@sms`. One person maintains it, but it has about 60,000 stars and 74,000 installs, and the skill file reads well.

2. **Sending text messages: `twilio/ai@twilio-send-message`**
   This is Twilio's own skill, from the official `twilio` GitHub org (MIT, updated this week). The repo is new and has only 41 stars. That's fine here, because the publisher is the thing we're trusting. It explains `messages.create()` correctly, which is the same call our practice server copies. Its sibling skills `twilio-compliance-traffic` and `twilio-messaging-webhooks` are also worth knowing about.
   The emulator's own skill, `vercel-labs/emulate@twilio` (about 2,000 stars), is a good companion. It documents how to point code at the practice server instead of `api.twilio.com`.

## Avoid these

1. **`caffeinelabs/skills@connector-twilio`**: the numbers don't match. It shows 14,900 installs but the repo has **2 stars**, which points to installs pulled in automatically or padded. The skill also says of itself that it is "EXPERIMENTAL, NOT YET VERIFIED AGAINST LIVE TWILIO" and that "no call has ever been made from this client." It was written for a different platform (Caffeine/ICP canisters), not for our setup.

2. **`sales-skills/sales@sales-sms-marketing`**: the `sales-skills/sales` repo **doesn't exist on GitHub** (404). I can't see who wrote it or read its code before installing it. Also skip the dozens of `<someone>/marketingskills@sms` results with 1 or 2 installs. They are mostly copies of Corey Haines' skill, and any of them could have been changed.

## The MCP decision

**Build a small MCP server of our own for practice mode. Keep Twilio's official one for later, when we use real Twilio.**

Twilio's server (`@twilio-alpha/mcp` v0.7.0, from the `twilio-labs/mcp` repo, 114 stars) **can't be pointed at `127.0.0.1:4000`**. I read its source. Its only options are credentials, `--services` and `--tags`. It takes each request's address from Twilio's API specs (`servers[0].url`, which is `https://api.twilio.com`). There's no flag or environment variable to change that. To redirect it we would have to fork and patch the code, or trick the network, and either way a mistake could send real paid texts. It's also labelled "alpha", and the repo hasn't changed since February 2026.

Our own server would need only 3 or 4 tools (send a message, list messages, get a message), with the base URL set in config and defaulting to localhost. That's small enough to read in one sitting, and it makes it hard to reach real Twilio by accident.

## How I decided

Before installing any skill or MCP server, check these three things:

1. **Who publishes it.** Is it an official org (anthropics, twilio, twilio-labs, vercel-labs) or a person with a track record? Does the GitHub repo exist? A missing repo means no install.
2. **Do the numbers agree?** Compare GitHub stars, install count and the date of the last update. Lots of installs with almost no stars, or a repo that hasn't been touched in a long time, is a warning sign.
3. **Read the file before running it.** Open the `SKILL.md` or the server's source. What commands does it run, which services does it call, and what credentials does it want? Does it work with our setup, which here means it can be pointed at the practice server?
